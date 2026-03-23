# Elastic Showcases

A collection of interactive, browser-based presentation apps that demonstrate Elastic features and capabilities. Each showcase is a standalone React + Vite single-page application built on a shared design system using Elastic's official brand language.

These showcases are designed to be used in customer conversations, demos, and enablement sessions — running entirely in the browser with no backend required.

---

## Live Showcases

| Showcase | Description | Folder | Vercel URL |
|---|---|---|---|
| **AutoOps via Cloud Connect** | How self-managed clusters connect to AutoOps on Elastic Cloud without migration | `autoops-cloud-connect/` | [elastic-autoops-showcase.vercel.app](https://elastic-autoops-showcase.vercel.app) |
| **Elastic Cloud Serverless** | Overview, benefits, project types, and Hosted vs Serverless deployment comparison | `elasticsearch-serverless/` | [elastic-serverless-showcase.vercel.app](https://elastic-serverless-showcase.vercel.app) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 with Elastic brand tokens |
| Animation | Framer Motion |
| Icons | Font Awesome 7 Free (solid) |
| Fonts | Inter (UI) + Space Mono (code/numerals) via Google Fonts |
| Analytics | `@vercel/analytics` (inert locally, activates on Vercel) |
| Deployment | Vercel (static hosting) |

---

## Project Structure

```
elastic-showcases/
├── _template/                        # Reusable base for new showcases
│   ├── src/
│   │   ├── App.jsx                   # Scene registry + navigation wiring
│   │   ├── index.css                 # Elastic brand system + base styles
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx       # Dark/light mode with localStorage
│   │   │   └── TeamContext.jsx        # Presenter team config
│   │   ├── components/
│   │   │   ├── Navigation.jsx         # Dot-chain nav + prev/next arrows
│   │   │   ├── SceneSettings.jsx      # Runtime scene toggle/reorder/demo-URL panel
│   │   │   └── ErrorBoundary.jsx      # Per-scene error isolation
│   │   └── scenes/
│   │       ├── HeroScene.jsx          # Title slide placeholder
│   │       ├── TeamScene.jsx          # Presenter introductions (Settings-driven)
│   │       ├── AgendaScene.jsx        # Auto-generated agenda grid
│   │       └── NextStepsScene.jsx     # CTAs + Back to Topics + Click-Through Demo
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md                     # How-to guide for this template
│
├── autoops-cloud-connect/            # AutoOps via Cloud Connect showcase
│   └── src/scenes/
│       ├── HeroScene.jsx              # Scene 1  — Title & intro
│       ├── TeamScene.jsx              # Scene 2  — Presenter introductions
│       ├── AgendaScene.jsx            # Scene 3  — Clickable agenda grid
│       ├── ChallengeScene.jsx         # Scene 4  — The problem being solved
│       ├── WhatIsAutoOpsScene.jsx     # Scene 5  — AutoOps explained
│       ├── CloudConnectScene.jsx      # Scene 6  — What is Cloud Connect
│       ├── ArchitectureScene.jsx      # Scene 7  — Animated data flow
│       ├── InstallationScene.jsx      # Scene 8  — 4 install methods + diagrams
│       ├── MonitoringScene.jsx        # Scene 9  — What AutoOps monitors
│       ├── NotificationsScene.jsx     # Scene 10 — 7 notification connectors
│       └── NextStepsScene.jsx         # Scene 11 — CTAs, checklist, demo link
│
└── elasticsearch-serverless/         # Elastic Cloud Serverless showcase
    └── src/scenes/
        ├── HeroScene.jsx              # Scene 1  — Title & intro
        ├── TeamScene.jsx              # Scene 2  — Presenter introductions
        ├── AgendaScene.jsx            # Scene 3  — Clickable agenda grid
        ├── ChallengeScene.jsx         # Scene 4  — Infrastructure management pain
        ├── WhatIsServerlessScene.jsx  # Scene 5  — Overview & architecture
        ├── BenefitsScene.jsx          # Scene 6  — 6 key benefits
        ├── ProjectTypesScene.jsx      # Scene 7  — Search, Observability, Security
        ├── ComparisonScene.jsx        # Scene 8  — Serverless vs Cloud Hosted table
        └── NextStepsScene.jsx         # Scene 9  — Trial, docs, demo link
```

---

## Running Locally

Each showcase is an independent project. Run from its own directory:

```bash
# AutoOps via Cloud Connect
cd autoops-cloud-connect
npm install
npm run dev

# Elastic Cloud Serverless
cd elasticsearch-serverless
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Navigation

| Action | How |
|---|---|
| Next scene | Arrow key `→` or right nav button |
| Previous scene | Arrow key `←` or left nav button |
| Jump to scene | Click any dot in the navigation chain |
| Jump from Agenda | Click any agenda tile |
| Toggle dark/light | Sun/moon button (bottom-left) |
| Scene settings | Gear icon (bottom-right) — toggle/reorder scenes, set demo URL |
| Back to Topics | Button on Next Steps scene — returns to Agenda |

---

## Scene Architecture

Every scene follows the same component contract:

```jsx
function MyScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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

export default MyScene
```

**Key rules:**
- Always wrap content in `<div className="scene">` — this handles full-viewport centering and padding
- Keep content within `max-w-5xl mx-auto` to stay within the safe reading zone
- Use `isDark` (from `useTheme()`) for all conditional styling — never hardcode dark/light colours
- No horizontal or vertical scrollbars — every scene must fit within the viewport at 1080p
- Scenes are registered in `App.jsx` — the scene array drives everything (nav, agenda, settings)

### Scene Registration (App.jsx)

```jsx
const scenes = [
  {
    id: 'unique-id',
    component: MyScene,
    title: 'Display Title',          // shown in agenda + settings
    description: 'One liner',        // shown in agenda card
    hideFromAgenda: false,           // set true for Hero/Team/Agenda themselves
    duration: '3 min',               // optional — shown in agenda
  },
]
```

### Standard Scene Order

Every showcase built from `_template/` follows this opening sequence:

| # | Scene | Notes |
|---|---|---|
| 1 | `HeroScene` | Title + value prop + badges — `hideFromAgenda: true` |
| 2 | `TeamScene` | Presenter intros — Settings-driven, `hideFromAgenda: true` |
| 3 | `AgendaScene` | Auto-generated from scene list — `hideFromAgenda: true` |
| 4+ | Feature scenes | Challenge, What Is X, Architecture, etc. |
| Last | `NextStepsScene` | CTAs + Back to Topics + Click-Through Demo |

---

## Elastic Brand Design System

### Colour Tokens (Tailwind + CSS)

| Token | Hex | Usage |
|---|---|---|
| `elastic-blue` | `#0B64DD` | Primary actions, links |
| `elastic-teal` | `#48EFCF` | Accents, dark-mode highlights |
| `elastic-pink` | `#F04E98` | Alerts, emphasis |
| `elastic-poppy` | `#FF957D` | Warm accents, secondary CTAs |
| `elastic-yellow` | `#FEC514` | Warnings, informational |
| `elastic-dev-blue` | `#101C3F` | Dark backgrounds, light-mode text |
| `elastic-ink` | `#343741` | Body text (light mode) |
| `elastic-dark-ink` | `#1a1a2e` | Headings (light mode) |
| `elastic-light-grey` | `#D3DAE6` | Body text (dark mode) |

### Typography Utilities

| Class | Usage |
|---|---|
| `text-eyebrow` | Small uppercase label above headings |
| `text-headline` | Section headings (uses font-feature-settings) |
| `text-paragraph` | Body copy |
| `text-code` | Monospace labels, numbers (Space Mono) |
| `gradient-text` | Teal-to-blue gradient on heading words |

---

## Creating a New Showcase

1. **Copy the template:**
   ```bash
   cp -r _template my-new-showcase
   cd my-new-showcase
   npm install
   ```

2. **Update identity** in `package.json` (`name` field), and `index.html` (`<title>`). `vite.config.js` already has `base: './'`.

3. **Register your scenes** in `src/App.jsx` — import and add scene components to the `scenes` array.

4. **Create scene files** in `src/scenes/` following the component contract above.

5. **Run and iterate:**
   ```bash
   npm run dev
   ```

6. **Build for deployment:**
   ```bash
   npm run build
   ```

7. **Update this README** — add a row to the Live Showcases table and the showcase's folder/scenes to the Project Structure tree.

8. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add {name} showcase: {Feature Name}"
   git push origin main
   ```

9. **Create Vercel project** — dashboard → Add New Project → Root Directory: `{folder-name}` → project name: `elastic-{name}-showcase` → update the Vercel URL in the Live Showcases table.

See `_template/README.md` for a detailed step-by-step walkthrough.

---

## Settings Panel

The gear icon (⚙️, bottom-right) opens a settings panel with two tabs:

**Scenes tab:**
- Toggle individual scenes on/off
- Drag to reorder scenes
- Edit per-scene duration (shown on Agenda cards)
- Set the **Click-Through Demo URL** — paste a Navattic link to activate the "Launch Demo" button in Next Steps

**Team tab:**
- Add/edit/remove presenter cards shown on the Team Introductions scene
- Upload or clear headshot photos
- Set name, role, email, phone, accent colour
- Export/import team config as JSON for reuse across showcases

---

## Deploying to Vercel

Each showcase deploys as its own Vercel project pointing to its subfolder.

### First time (per showcase)

1. Push to GitHub (auto-deploy triggers on `git push main`)
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → **Add New Project**
3. Import the `elastic-showcases` GitHub repo
4. Set **Root Directory** to the showcase subfolder (e.g. `elasticsearch-serverless`)
5. Set project name to `elastic-{name}-showcase`
6. Deploy — live within ~60 seconds

Vercel settings (auto-detected for Vite):
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Auto-deploy

Every `git push` to `main` re-deploys all connected Vercel projects automatically.

---

## Team Onboarding — Getting the `/showcase` Skill

The `/showcase` Claude Code skill generates a complete, deployed interactive showcase from just a doc URL or blog post — no manual coding required.

### Prerequisites

- [Claude Code](https://claude.ai/code) installed and authenticated
- [Node.js](https://nodejs.org/) 18+ and npm
- [Git](https://git-scm.com/) + [GitHub CLI](https://cli.github.com/) (`brew install gh`)
- A free [Vercel](https://vercel.com/) account (for deployment)

### Install in 3 steps

**1. Clone this repo**
```bash
git clone https://github.com/tdupur/elastic-showcases.git
cd elastic-showcases
```

**2. Run the setup script**
```bash
./setup.sh
```

**3. Verify — start a new Claude Code session and type `/showcase`**

### Using the `/showcase` Skill

```bash
/showcase --objective "Elastic Security AI Assistant" \
          --url "https://www.elastic.co/docs/..." \
          --name "security-ai-assistant"
```

Or naturally in conversation:
```
/showcase Build me a showcase for Elastic Observability SLOs using https://www.elastic.co/docs/...
```

**What happens automatically:**
1. Fetches and analyzes the source URL(s) via the Elastic docs MCP tool
2. Scaffolds a new project from `_template/`
3. Generates all scene files (Hero, Team, Agenda, Challenge, Architecture, Capabilities, Next Steps, and more)
4. Wires navigation, builds, and verifies zero errors
5. **Updates this README** — adds the new showcase to the Live Showcases table and Project Structure tree
6. Pushes to GitHub → Vercel auto-deploys within ~60 seconds

**One manual step after generation:** Create a new Vercel project pointing to the new subfolder and update the Vercel URL in this README.

### Updating the Skill

```bash
git pull
./setup.sh
```

---

## Roadmap

- [x] AutoOps via Cloud Connect showcase
- [x] Elastic Cloud Serverless showcase
- [x] `_template/` reusable scaffold with TeamScene, Back to Topics, Click-Through Demo
- [x] `/showcase` Agent Skill — automated showcase generation from doc URL or blog post
- [x] GitHub → Vercel auto-deploy pipeline
- [x] Settings panel — scene toggle/reorder, team config, demo URL
- [ ] Additional showcases: Elastic Security AI Assistant, EIS, Elastic Observability SLOs, …

---

## Author

Built by Terry Dupureur — Elastic Solutions Architecture
Powered by [Claude Code](https://claude.ai/code)
