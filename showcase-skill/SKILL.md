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
cp -r /Users/terrydupureur/Demos/elastic-showcases/_template \
      /Users/terrydupureur/Demos/elastic-showcases/{name}

cd /Users/terrydupureur/Demos/elastic-showcases/{name}
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
cd /Users/terrydupureur/Demos/elastic-showcases/{name}
npm install
```

---

### STEP 4 — Plan the Scene Structure

Map the extracted content to the standard 10-scene structure below. Decide which scenes to include — skip any that have no meaningful content from the source material (mark them disabled in App.jsx rather than deleting).

| # | Scene ID | Scene File | Purpose | Content Source |
|---|---|---|---|---|
| 0 | `hero` | `HeroScene.jsx` | Title slide — feature name + value prop | Feature name + one-liner |
| 1 | `team` | `TeamScene.jsx` | Team introductions | Driven by Settings — **keep as-is from template, no content changes** |
| 2 | `agenda` | `AgendaScene.jsx` | Auto-generated agenda grid | **Keep as-is — auto-generates from scene list** |
| 3 | `challenge` | `ChallengeScene.jsx` | The problem being solved | Pain points, why this exists |
| 4 | `what-is-x` | `WhatIsXScene.jsx` | Core concept explained | What it is, how it works |
| 5 | `architecture` | `ArchitectureScene.jsx` | Animated component flow | Architecture components + data flow |
| 6 | `installation` | `InstallationScene.jsx` | Setup methods with steps | Install/setup steps per method |
| 7 | `capabilities` | `CapabilitiesScene.jsx` | What it does / monitors | Feature list, capabilities, metrics |
| 8 | `integrations` | `IntegrationsScene.jsx` | Connectors, integrations | Third-party tools it connects to |
| 9 | `next-steps` | `NextStepsScene.jsx` | CTAs, checklist, demo link | Docs links, trial URLs, contact |

**Pre-built template scenes — do NOT regenerate these:**
- `HeroScene.jsx` — update the four constants at the top (`SHOWCASE_TITLE_LINE1/2`, `SHOWCASE_SUBTITLE`, `SHOWCASE_BADGES`)
- `TeamScene.jsx` — keep entirely as-is, driven by Settings
- `AgendaScene.jsx` — keep entirely as-is, auto-generates from scene list with clickable tiles
- `NextStepsScene.jsx` — already includes Back to Topics button and Click-Through Demo tile; only update the `actions` array with showcase-specific CTAs (trial URL, docs URL, contact URL). For the Click-Through Demo tile set `url: '__DEMO_URL__'` (template sentinel) and add `const FALLBACK_DEMO_URL = 'https://elastic.navattic.com/...'` if a Navattic link is known, then use `demoUrl || FALLBACK_DEMO_URL` in the render loop.

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
Study `/Users/terrydupureur/Demos/elastic-showcases/autoops-cloud-connect/src/scenes/` for production examples of every scene type.

---

### STEP 6 — Wire App.jsx

Open `src/App.jsx` in the new project and:

1. Import all new scene components
2. Register them in the `scenes` array with correct metadata:

```jsx
import HeroScene from './scenes/HeroScene'
import TeamScene from './scenes/TeamScene'
import AgendaScene from './scenes/AgendaScene'
import ChallengeScene from './scenes/ChallengeScene'
// ... all other scenes

const scenes = [
  { id: 'hero',        component: HeroScene,    title: 'Introduction',         hideFromAgenda: true },
  { id: 'team',        component: TeamScene,     title: 'Team Introductions',   hideFromAgenda: true },
  { id: 'agenda',      component: AgendaScene,   title: 'Agenda',               hideFromAgenda: true },
  { id: 'challenge',   component: ChallengeScene, title: 'The Problem',         description: '...', duration: '3 min' },
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
cd /Users/terrydupureur/Demos/elastic-showcases/{name}
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

Open `/Users/terrydupureur/Demos/elastic-showcases/README.md` and make the following updates:

**1. Add a row to the Live Showcases table:**
```markdown
| **{Feature Name}** | {one-line description} | `{name}/` | *(deploy Vercel project — root dir: `{name}`)* |
```

**2. Add the new showcase folder to the Project Structure tree**, listing each scene file with a one-line comment describing its purpose:
```
└── {name}/                           # {Feature Name} showcase
    └── src/scenes/
        ├── HeroScene.jsx              # Scene 1  — Title & intro
        ├── TeamScene.jsx              # Scene 2  — Presenter introductions
        ├── AgendaScene.jsx            # Scene 3  — Clickable agenda grid
        ├── {SceneName}.jsx            # Scene N  — {description}
        └── NextStepsScene.jsx         # Scene N  — CTAs, demo link
```

**3. Add a `cd` block to the Running Locally section:**
```bash
# {Feature Name}
cd {name}
npm install
npm run dev
```

**4. Add a checked item to the Roadmap:**
```markdown
- [x] {Feature Name} showcase
```

Save the file before proceeding to Step 9.

---

### STEP 9 — Deploy via GitHub

```bash
cd /Users/terrydupureur/Demos/elastic-showcases
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
5. Deploy — then update the Vercel URL in `README.md` Live Showcases table and push again

---

### STEP 10 — Confirm and Report

Return a summary to the user:

```
✅ Showcase built and pushed to GitHub.

📁 Project:     /Users/terrydupureur/Demos/elastic-showcases/{name}/
🎬 Scenes:      [list the scene titles]
🔨 Build:       Passed
📝 README:      Updated — Live Showcases table + Project Structure + Roadmap
🚀 GitHub:      Pushed to main — Vercel auto-deploy triggered

⚠️  Action needed: Create a new Vercel project for this showcase:
    → vercel.com/dashboard → Add New Project → Root Directory: {name}
    → Project name: elastic-{name}-showcase
    → Once live, update the Vercel URL in README.md and push again
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
- [ ] HeroScene shows the correct feature name and value proposition
- [ ] TeamScene is present and functional (driven by Settings — no hardcoded members)
- [ ] AgendaScene tiles are clickable and navigate to the correct scenes
- [ ] NextStepsScene has a Back to Topics button that returns to the Agenda slide
- [ ] NextStepsScene has a Click-Through Demo tile (uses `__DEMO_URL__` sentinel + `demoUrl || FALLBACK_DEMO_URL` in render loop)
- [ ] README.md Live Showcases table includes the new showcase row
- [ ] README.md Project Structure tree includes the new showcase folder and scenes
- [ ] README.md Roadmap includes the new showcase as a checked item

---

## Key Paths Reference

| Path | Purpose |
|---|---|
| `/Users/terrydupureur/Demos/elastic-showcases/_template/` | Source template to copy from |
| `/Users/terrydupureur/Demos/elastic-showcases/{name}/` | New showcase output |
| `/Users/terrydupureur/Demos/elastic-showcases/autoops-cloud-connect/` | Reference implementation |
| `~/.claude/CLAUDE.md` | Global project context |
