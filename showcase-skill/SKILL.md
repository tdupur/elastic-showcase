---
name: showcase
description: Build a complete interactive Elastic feature showcase presentation app from a documentation URL or blog post. Scaffolds from template, generates all scene content, wires navigation, builds, and deploys to Vercel via GitHub. Use when Terry asks to build a new showcase for any Elastic feature or capability.
---

# Showcase Factory

Build a fully functional, deployed interactive Elastic feature showcase presentation app — from a source URL to a live Vercel URL — fully automated.

## Inputs

Parse the following from `$ARGUMENTS` (accept natural language or flags):

| Input | Flag | Description |
|---|---|---|
| **objective** | `--objective` | The Elastic feature or capability name (e.g. "Elastic Security AI Assistant") |
| **url** | `--url` | One or more documentation or blog URLs (space-separated or comma-separated) |
| **name** | `--name` | Folder slug for the project (e.g. `security-ai-assistant`) — derive from objective if omitted |
| **presenter-notes** *(optional)* | `--presenter-notes` | Apply the Presenter Notes add-on (Step 11) without asking. If omitted, Step 11 asks at the end of the build. |

**Examples of valid invocations:**
```
/showcase --objective "Elastic Security AI Assistant" --url "https://www.elastic.co/docs/..." --name "security-ai-assistant"

/showcase Build me a showcase for EIS using https://www.elastic.co/docs/...

/showcase https://www.elastic.co/blog/... --name "observability-slos"
```

If any required input is missing or ambiguous, ask the user before proceeding.

---

## Execution Workflow

Use TodoWrite to track progress through every step. Mark each task complete as you finish it.

---

### STEP 1 — Research: Fetch and Analyze the Source

Use the `mcp__elastic-docs__get_document_by_url` tool (with `includeBody: true`) for any `elastic.co/docs` URL.
Use `WebFetch` for blog posts or other URLs.

For each URL, extract:
- **Feature name** — the exact marketing/product name
- **One-line value proposition** — what pain does it solve?
- **The problem it solves** — why does it exist? (for ChallengeScene)
- **Core concept** — what IS this thing? (for WhatIsXScene)
- **Architecture components** — what pieces exist, how do they connect? (for ArchitectureScene)
- **Installation/setup steps** — how to get started? (for InstallationScene)
- **Key capabilities** — what does it do / what does it monitor? (for CapabilitiesScene)
- **Integrations or connectors** — what does it connect to? (for IntegrationsScene, if applicable)
- **Supported versions and license requirements**
- **Relevant CTA links** — docs pages, trial links, contact URLs

If related documentation pages are referenced, use `mcp__elastic-docs__find_related_docs` to fetch supplementary context.

---

### STEP 2 — Scaffold the Project

```bash
# Copy the template to the new project folder
cp -r ~/Demos/elastic-showcases/_template \
      ~/Demos/elastic-showcases/{name}

cd ~/Demos/elastic-showcases/{name}
```

Then update identity in three files:

**`package.json`** — update `name` field:
```json
"name": "{name}"
```

**`vite.config.js`** — ensure `base: './'` is set (required for Vercel static deployment).

**`index.html`** — update `<title>`:
```html
<title>{Feature Name} | Elastic Showcase</title>
```

---

### STEP 3 — Install Dependencies

```bash
cd ~/Demos/elastic-showcases/{name}
npm install
```

---

### STEP 4 — Plan the Scene Structure

Map the extracted content to the standard 10-scene structure below. Decide which scenes to include — skip any that have no meaningful content from the source material (mark them disabled in App.jsx rather than deleting).

| # | Scene ID | Scene File | Purpose | Content Source |
|---|---|---|---|---|
| 0 | `hero-static` | `HeroStaticScene.jsx` | **Default title slide** — logo + feature name + badges (clean, no interaction required) | Feature name + one-liner |
| 1 | `hero` | `HeroScene.jsx` | **Optional animated intro** — types out topic name, reveals title + badges (**default hidden**) | Feature name + one-liner |
| 2 | `team` | `TeamScene.jsx` | Team introductions | Driven by Settings — **keep as-is from template, no content changes** |
| 2 | `agenda` | `AgendaScene.jsx` | Auto-generated agenda grid | **Keep as-is — auto-generates from scene list** |
| 3 | `challenge` | `ChallengeScene.jsx` | The problem being solved | Pain points, why this exists |
| 4 | `what-is-x` | `WhatIsXScene.jsx` | Core concept explained | What it is, how it works |
| 5 | `architecture` | `ArchitectureScene.jsx` | Animated component flow | Architecture components + data flow |
| 6 | `installation` | `InstallationScene.jsx` | Setup methods with steps | Install/setup steps per method |
| 7 | `capabilities` | `CapabilitiesScene.jsx` | What it does / monitors | Feature list, capabilities, metrics |
| 8 | `integrations` | `IntegrationsScene.jsx` | Connectors, integrations | Third-party tools it connects to |
| 9 | `next-steps` | `NextStepsScene.jsx` | CTAs, checklist, demo link | Docs links, trial URLs, contact |

**Pre-built template scenes — do NOT regenerate these:**
- `HeroStaticScene.jsx` — **default first scene**. Update the four constants at the top (`SHOWCASE_TITLE_LINE1/2`, `SHOWCASE_SUBTITLE`, `SHOWCASE_BADGES`). Keep `defaultHidden` absent (it is the default-on scene).
- `HeroScene.jsx` — **optional animated scene** (default hidden). Update the five constants at the top (`SHOWCASE_SEARCH_TEXT`, `SHOWCASE_TITLE_LINE1/2`, `SHOWCASE_SUBTITLE`, `SHOWCASE_BADGES`). Keep `defaultHidden: true` in App.jsx; presenters can enable it via Settings → Scenes if they want the animated search-bar opening.
- `TeamScene.jsx` — keep entirely as-is, driven by Settings
- `AgendaScene.jsx` — keep entirely as-is, auto-generates from scene list with clickable tiles
- `NextStepsScene.jsx` — already includes Back to Topics button and Click-Through Demo tile; only update the `actions` array with showcase-specific CTAs (trial URL, docs URL, contact URL). For the Click-Through Demo tile set `url: '__DEMO_URL__'` (template sentinel) and add `const FALLBACK_DEMO_URL = 'https://elastic.navattic.com/...'` if a Navattic link is known, then use `demoUrl || FALLBACK_DEMO_URL` in the render loop.

**Pre-built components — do NOT regenerate these (copy from `_template/src/components/`):**
- `SceneSettings.jsx` — includes scene toggle/reorder, demo URL input, and Team tab with **drag-handle grab-to-reorder for team members** (Framer Motion `Reorder.Group` + `useDragControls`). The `useDemoUrl` and `useEnabledScenes` hooks live here — do not remove or re-add them.
- `Navigation.jsx` — animated dot-chain nav with prev/next arrows. Do not modify.
- `ErrorBoundary.jsx` — per-scene error isolation. Do not modify.

Only create net-new scene files for the feature content (Challenge, WhatIsX, Architecture, etc.).

---

### STEP 5 — Generate Scene Files

Create each planned scene file in `src/scenes/`. Follow these rules for every scene:

#### Component Contract (mandatory)
```jsx
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function XxxScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        {/* content */}
      </div>
    </div>
  )
}

export default XxxScene
```

Most custom scenes won't use `demoUrl` — it is only consumed by `NextStepsScene`. Include it in the signature so React doesn't warn about unknown props if it's passed down.

#### Non-negotiable rules
- **Always** wrap in `<div className="scene">` — handles full-viewport centering and padding
- **Always** use `isDark` for conditional styling — never hardcode dark/light colours
- **No scrollbars** — all content must fit within the viewport at 1080p (1920×1080)
- If a scene has too much content, split into tabs/panels rather than scrolling
- If a panel might overflow, add `overflow-y-auto` with a `max-h` constraint on that panel only

#### Elastic Brand Colours (Tailwind tokens + hex)
```
elastic-blue    #0B64DD   Primary actions, links
elastic-teal    #48EFCF   Dark-mode accents, highlights
elastic-pink    #F04E98   Alerts, emphasis, CTAs
elastic-poppy   #FF957D   Warm accents, secondary
elastic-yellow  #FEC514   Warnings, informational
elastic-dev-blue #101C3F  Dark backgrounds, light-mode text base
```

#### Typography CSS utilities
```
text-eyebrow    Small uppercase label above headings
text-headline   Section headings
text-paragraph  Body copy
text-code       Monospace labels, numbers (Space Mono font)
gradient-text   Teal-to-blue gradient — use on key heading words
```

#### Icons — Font Awesome 7 Free Solid ONLY
```jsx
import { faIconName } from '@fortawesome/free-solid-svg-icons'
```
**Never** import from `@fortawesome/free-brands-svg-icons` — that package is not installed.
Common safe icons: `faServer, faCloud, faShieldHalved, faRocket, faBolt, faChartLine,
faBook, faGear, faCheck, faArrowRight, faArrowLeft, faPlay, faCircleCheck, faCirclePlay,
faTriangleExclamation, faCircleInfo, faFire, faBell, faEnvelope, faLink,
faUsers, faCube, faTerminal, faKey, faPlug, faMagnifyingGlassChart, faSlidersH`

#### Standard Scene Header Pattern
```jsx
<motion.div
  className="text-center mb-5"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
>
  <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
    Eyebrow Label
  </span>
  <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
    Heading with <span className="gradient-text">Gradient Word</span>
  </h2>
  <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
    Supporting description sentence.
  </p>
</motion.div>
```

#### Card/Panel Pattern
```jsx
<div className={`p-5 rounded-xl border ${
  isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
}`}>
  {/* content */}
</div>
```

#### Reference Implementation
Study `~/Demos/elastic-showcases/autoops-cloud-connect/src/scenes/` for production examples of every scene type.

---

### STEP 6 — Wire App.jsx

Open `src/App.jsx` in the new project and:

1. Import all new scene components
2. Register them in the `scenes` array with correct metadata:

```jsx
import HeroStaticScene from './scenes/HeroStaticScene'
import HeroScene from './scenes/HeroScene'
import TeamScene from './scenes/TeamScene'
import AgendaScene from './scenes/AgendaScene'
import ChallengeScene from './scenes/ChallengeScene'
// ... all other scenes

const scenes = [
  { id: 'hero-static', component: HeroStaticScene, title: 'Introduction',          hideFromAgenda: true },
  { id: 'hero',        component: HeroScene,        title: 'Introduction (Animated)', hideFromAgenda: true, defaultHidden: true },
  { id: 'team',        component: TeamScene,         title: 'Team Introductions',   hideFromAgenda: true },
  { id: 'agenda',      component: AgendaScene,       title: 'Agenda',               hideFromAgenda: true },
  { id: 'challenge',   component: ChallengeScene,    title: 'The Problem',          description: '...', duration: '3 min' },
  // ... etc
]
```

3. Ensure `CurrentSceneComponent` receives all props:
```jsx
<CurrentSceneComponent
  onNext={nextScene}
  scenes={activeScenes}
  allScenes={orderedScenes}
  onNavigate={navigateToScene}
  demoUrl={demoUrl}
/>
```
The template's `App.jsx` already has `useDemoUrl` imported and wired — do not remove or re-add it. Just add your new scene imports and scene array entries.

---

### STEP 7 — Build and Verify

```bash
cd ~/Demos/elastic-showcases/{name}
npm run build
```

**If the build fails:**
- Check for missing icon imports (most common issue — verify all icons exist in free-solid)
- Check for undefined component references
- Check for any `@fortawesome/free-brands-svg-icons` imports and replace with solid equivalents
- Fix all errors before proceeding

**Do not proceed to Step 8 until the build exits with zero errors.**

---

### STEP 8 — Update README.md

Open `~/Demos/elastic-showcases/README.md` and make the following updates:

**Pillar rule:** every showcase belongs to exactly ONE pillar — **Search**, **Observability**, **Security**, or **Platform**. Infer it from the feature (Agent Builder, deployment, Cloud, AutoOps, Workflows and general "What is Elastic" overviews are **Platform**). If it is genuinely ambiguous, ask the user. Keep the README organized by pillar — never append a flat row at the bottom. All pillar `<details>` blocks stay **collapsed** (no `open` attribute). The root README is presenter-facing and lean: **do not** add per-showcase trees, `cd` blocks, or scene lists to it.

**1. README.md → Live Showcases → grid.** In the 4-column table (Search | Observability | Security | Platform), append the showcase's SHORT label (about 20 characters max) to that pillar's cell, `<br>`-separated, with `&nbsp;` between words so it never wraps inside the column. Names are plain text, NOT links (GitHub cannot jump into a collapsed section). Bump the pillar count in the column header, e.g. `[**Search** (2)](#search)` becomes `[**Search** (3)](#search)`.

**2. README.md → Live Showcases → that pillar's collapsible table.** Add one row and update the `<summary>` count. Description is about 12 words. The URL is inline code so users can copy it (not a clickable link). `Scenes` is the number of scene files in `src/scenes/`:
```markdown
| **{Feature Name}** | {short description, ~12 words} | `https://{vercel-url}` | `{name}/` | {N} |
```
*(Until the real URL exists, write the URL cell as `*(deploy Vercel project — root dir: `{name}`)*`.)*

**3. docs/BUILDING.md → Roadmap.** Add a checked item (the Roadmap lives in `docs/BUILDING.md`, not the root README):
```markdown
- [x] {Feature Name} showcase
```

Save the files before proceeding to Step 9.

---

### STEP 9 — Deploy via GitHub

```bash
cd ~/Demos/elastic-showcases
git add .
git commit -m "Add {name} showcase: {Feature Name}"
git push origin main
```

Vercel auto-deploys on push to `main`. The new showcase will be live within ~60 seconds.

**However:** Each new showcase needs its own Vercel project pointing to its subfolder. Remind the user to:
1. Go to vercel.com/dashboard → **Add New Project**
2. Import the `elastic-showcases` GitHub repo
3. Set **Root Directory** to `{name}` (the new showcase folder)
4. Set the project name to `elastic-{name}-showcase`
5. Deploy — then replace the placeholder with the Vercel URL in the showcase's pillar table in `README.md` (Live Showcases) and push again

---

### STEP 10 — Confirm and Report

Return a summary to the user:

```
✅ Showcase built and pushed to GitHub.

📁 Project:     ~/Demos/elastic-showcases/{name}/
🎬 Scenes:      [list the scene titles]
🔨 Build:       Passed
📝 README:      Updated — Live Showcases (pillar grid + table) + docs/BUILDING.md Roadmap
🚀 GitHub:      Pushed to main — Vercel auto-deploy triggered

⚠️  Action needed: Create a new Vercel project for this showcase:
    → vercel.com/dashboard → Add New Project → Root Directory: {name}
    → Project name: elastic-{name}-showcase
    → Once live, replace the placeholder in the pillar table under Live Showcases in README.md and push again

➕ Optional add-on available: Presenter Notes (speaker notes on a second screen).
```

Then go to Step 11 and **ask** the user whether they want it. Never apply it unasked.

---

### STEP 11 — OPTIONAL ADD-ON: Presenter Notes (second-screen speaker notes)

**Optional. Off by default. Only run this step if the user says yes.** Ask once, at the end of every primary build, using AskUserQuestion:

> "Add the Presenter Notes add-on? It gives you a private notes window for a second display (HDMI/projector) while the audience sees only the deck."  Options: **Yes, add it** / **No, skip**.

If the user declines, stop. If the build was already requested with the add-on in the original prompt (for example "with presenter notes"), skip the question and run it.

**What it is:** pressing **P** in the deck opens a second window (`?presenter`) with SAY / DO ON SCREEN / WATCH OUT notes per scene, an up-next preview, a scene list, and total + per-scene timers. The two windows stay in sync through `BroadcastChannel` (same origin required). The audience deck shows no notes.

**Kit location:** `~/Demos/elastic-showcases/_addons/presenter-notes/` — never copy it by hand; always use the script. `_template` stays clean so default builds do not include the add-on.

#### 11a — Apply the kit
```bash
python3 ~/Demos/elastic-showcases/_addons/presenter-notes/apply.py \
        ~/Demos/elastic-showcases/{name}
```
The script is idempotent and all-or-nothing: it validates every anchor first and writes nothing if one is missing. It creates `src/presenter/{sync.js,PresenterView.jsx,notes.js}`, patches `src/main.jsx` and `src/App.jsx`, and gives the showcase a unique channel name from its folder name. Use `--dry-run` to preview.

If it exits with an anchor error (very old showcase), stop, tell the user which anchor failed, and do not hand-patch unless the user asks.

#### 11b — Write `src/presenter/notes.js` for this showcase
Overwrite the stub. `NOTES` is keyed by **scene id** exactly as registered in `App.jsx`, including `hero-static`, `hero`, `team`, `agenda`, and `next-steps`:

```js
export const TOTAL_MINUTES = 15            // sum of scene minutes, rounded

export const NOTES = {
  'scene-id': {
    minutes: 2,                            // target time (0 = no target, e.g. hidden/team scenes)
    say:   ['Talk-track line, in speaking order.'],
    doIt:  ['What to click or show on screen.'],
    watch: ['Claim NOT to make / thing to verify.'],
  },
}
export const FALLBACK_NOTE = { minutes: 0, say: ['No notes for this scene.'], doIt: [], watch: [] }
```
Rules:
- Base everything on the source material fetched in Step 1. Do not invent numbers, dates, pricing, or availability.
- `watch` must flag anything unreleased, unverified, or illustrative (for example "not open source", "no GA date", "example query is illustrative").
- For each interactive scene (tabs, steppers, toggles), tell the presenter what to click in `doIt`.
- Keep lines short enough to read at a glance (about 50 words per scene in `say`).
- **notes.js ships in the public site bundle.** Never include anything private, internal, or customer-specific.

#### 11c — Build, then test
```bash
cd ~/Demos/elastic-showcases/{name}
npm run build        # must pass with zero errors
```
Then tell the user how to try it locally: `npm run dev`, open `http://localhost:5173/`, press **P**, drag the notes window to the second display. Both windows must use the same address (do not mix `localhost` and an IP). Offer to start the dev server for them.

#### 11d — Commit and push (after the user is happy, or immediately if they said to)
```bash
cd ~/Demos/elastic-showcases
git add {name}/src
git commit -m "Add presenter notes add-on to {name} showcase"
git push origin main
```
If the push is rejected because the remote moved, `git pull --rebase origin main` and push again. Never force-push.

#### 11e — Report
```
➕ Presenter Notes add-on applied to {name}
   Open in the deck: press P  →  notes window (drag to second display)
   Edit notes: {name}/src/presenter/notes.js
   Timers: T = start/pause. Arrow keys work in both windows.
```

---

## Quality Checklist

Before pushing, verify:
- [ ] All scenes fit within viewport at 1080p — no scrollbars on any scene
- [ ] Dark mode and light mode both look correct on every scene
- [ ] Agenda scene links to all non-hidden scenes correctly
- [ ] NextSteps scene has working URLs (no `null` url values)
- [ ] No imports from `@fortawesome/free-brands-svg-icons`
- [ ] `npm run build` exits with zero errors and zero warnings about missing modules
- [ ] HeroStaticScene (default first scene) shows the correct feature name and value proposition
- [ ] TeamScene is present and functional (driven by Settings — no hardcoded members)
- [ ] AgendaScene tiles are clickable and navigate to the correct scenes
- [ ] NextStepsScene has a Back to Topics button that returns to the Agenda slide
- [ ] NextStepsScene has a Click-Through Demo tile (uses `__DEMO_URL__` sentinel + `demoUrl || FALLBACK_DEMO_URL` in render loop)
- [ ] README.md Live Showcases: showcase is in its pillar's grid cell AND in that pillar's collapsed table with a copyable URL, folder, and scene count (counts updated, no `open` attribute)
- [ ] README.md has NO new per-showcase tree, `cd` block, or scene list (presenter README stays lean)
- [ ] docs/BUILDING.md Roadmap includes the new showcase as a checked item
- [ ] *(Only if the Presenter Notes add-on was chosen)* `src/presenter/notes.js` has an entry for every scene id in `App.jsx`, and `npm run build` still passes

---

## Key Paths Reference

| Path | Purpose |
|---|---|
| `~/Demos/elastic-showcases/_template/` | Source template to copy from |
| `~/Demos/elastic-showcases/{name}/` | New showcase output |
| `~/Demos/elastic-showcases/autoops-cloud-connect/` | Reference implementation |
| `~/Demos/elastic-showcases/_addons/presenter-notes/` | Optional add-on kit (Step 11): `apply.py` + `files/` |
| `~/Demos/elastic-showcases/alertzero/src/presenter/` | Reference implementation of the Presenter Notes add-on |
| `~/.claude/CLAUDE.md` | Global project context |
