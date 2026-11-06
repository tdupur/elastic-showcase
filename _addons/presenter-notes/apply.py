#!/usr/bin/env python3
"""Apply the optional Presenter Notes add-on to a showcase built from _template.

Usage:
    python3 apply.py <showcase_dir> [--dry-run]

What it does (idempotent, all-or-nothing):
  - copies files/ into <showcase>/src/presenter/ (notes.js only if it does not exist yet)
  - sets a unique BroadcastChannel name from the showcase folder name
  - patches src/main.jsx  (renders PresenterView when the URL has ?presenter)
  - patches src/App.jsx   (broadcasts the current scene, accepts next/prev/goto, P key opens notes)

Afterwards, write src/presenter/notes.js for the showcase's scene ids.
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
FILES = HERE / "files"


def die(msg):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def patch_main(src):
    if "PresenterView" in src:
        return src, False
    a = "import App from './App.jsx'\n"
    if a not in src:
        die("main.jsx: anchor `import App from './App.jsx'` not found")
    src = src.replace(
        a,
        a + "import PresenterView from './presenter/PresenterView.jsx'\nimport { isPresenterView } from './presenter/sync'\n",
    )
    m = re.search(r"(?P<indent>[ ]*)<ThemeProvider>.*?</ThemeProvider>", src, re.S)
    if not m:
        die("main.jsx: <ThemeProvider>…</ThemeProvider> block not found")
    block = m.group(0)
    indented = "\n".join(("  " + l if l.strip() else l) for l in block.split("\n"))
    ind = m.group("indent")
    new = (
        f"{ind}{{isPresenterView() ? (\n{ind}  <PresenterView />\n{ind}) : (\n"
        f"{ind}  {indented.lstrip()}\n{ind})}}"
    )
    return src.replace(block, new), True


APP_SYNC_BLOCK = """
  // --- Presenter sync (speaker notes in a second window, opened with the P key) ---
  const syncRef = useRef(null)
  const syncState = useRef({ index: 0, scenes: [] })
  useEffect(() => {
    const sync = createSync()
    syncRef.current = sync
    sync.onMessage((m) => {
      if (m?.type === 'hello') sync.send({ type: 'state', ...syncState.current })
      else if (m?.type === 'goto') setCurrentScene(Math.max(0, Math.min(m.index, syncState.current.scenes.length - 1)))
      else if (m?.type === 'next') setCurrentScene(i => Math.min(i + 1, syncState.current.scenes.length - 1))
      else if (m?.type === 'prev') setCurrentScene(i => Math.max(i - 1, 0))
    })
    return () => sync.close()
  }, [])
  const sceneKey = activeScenes.map(s => s.id).join(',')
  useEffect(() => {
    syncState.current = {
      index: currentScene,
      scenes: activeScenes.map(s => ({ id: s.id, title: s.title })),
    }
    syncRef.current?.send({ type: 'state', ...syncState.current })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScene, sceneKey])
"""


def patch_app(src):
    if "createSync" in src:
        return src, False
    # 1. react import must include useRef
    m = re.search(r"import \{([^}]*)\} from 'react'", src)
    if not m:
        die("App.jsx: `import { ... } from 'react'` not found")
    if "useRef" not in m.group(1):
        src = src.replace(m.group(0), "import {" + m.group(1).rstrip() + ", useRef } from 'react'", 1)
    # 2. sync import
    a = "import Navigation from './components/Navigation'"
    if a not in src:
        die("App.jsx: anchor `import Navigation …` not found")
    src = src.replace(a, "import { createSync, openPresenter } from './presenter/sync'\n" + a, 1)
    # 3. sync effects after isReady effect
    b = "  useEffect(() => { setIsReady(true) }, [])\n"
    if b not in src:
        die("App.jsx: anchor `useEffect(() => { setIsReady(true) }, [])` not found")
    if "activeScenes" not in src.split(b)[0]:
        die("App.jsx: expected `activeScenes` to be defined before the isReady effect")
    src = src.replace(b, b + APP_SYNC_BLOCK, 1)
    # 4. P key
    c = "      else if (e.key >= '1' && e.key <= '9') navigateToScene(parseInt(e.key) - 1)"
    if c not in src:
        die("App.jsx: key-handler anchor for digit navigation not found")
    src = src.replace(c, "      else if (e.key === 'p' || e.key === 'P') openPresenter()\n" + c, 1)
    return src, True


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry-run" in sys.argv
    if len(args) != 1:
        die("usage: apply.py <showcase_dir> [--dry-run]")
    root = Path(args[0]).expanduser().resolve()
    app, main_jsx = root / "src" / "App.jsx", root / "src" / "main.jsx"
    if not app.exists() or not main_jsx.exists():
        die(f"{root} does not look like a showcase (missing src/App.jsx or src/main.jsx)")

    # Compute everything first, write nothing until all anchors matched.
    new_main, main_changed = patch_main(main_jsx.read_text())
    new_app, app_changed = patch_app(app.read_text())

    slug = re.sub(r"[^a-z0-9-]+", "-", root.name.lower()).strip("-")
    pdir = root / "src" / "presenter"
    plan = []
    for f in sorted(FILES.iterdir()):
        dest = pdir / f.name
        if f.name == "notes.js" and dest.exists():
            continue
        text = f.read_text().replace("__SHOWCASE_CHANNEL__", f"{slug}-presenter-sync")
        plan.append((dest, text))

    print(f"Showcase: {root.name}   channel: {slug}-presenter-sync")
    print(f"  main.jsx : {'patch' if main_changed else 'already patched'}")
    print(f"  App.jsx  : {'patch' if app_changed else 'already patched'}")
    for dest, _ in plan:
        print(f"  write    : {dest.relative_to(root)}")
    if dry:
        print("Dry run: nothing written.")
        return

    pdir.mkdir(parents=True, exist_ok=True)
    for dest, text in plan:
        dest.write_text(text)
    if main_changed:
        main_jsx.write_text(new_main)
    if app_changed:
        app.write_text(new_app)
    print("Done. Next: write src/presenter/notes.js for this showcase's scene ids, then npm run build.")


if __name__ == "__main__":
    main()
