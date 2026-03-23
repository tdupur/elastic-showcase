# Elastic Showcases

A collection of interactive, browser-based presentation apps that demonstrate Elastic features and capabilities. Each showcase is a standalone React + Vite single-page application built on a shared design system using Elastic's official brand language.

These showcases are designed to be used in customer conversations, demos, and enablement sessions — running entirely in the browser with no backend required.

---

## Live Showcases

| Showcase | Description | Folder |
|---|---|---|
| **AutoOps via Cloud Connect** | How self-managed clusters connect to AutoOps on Elastic Cloud without migration | `autoops-cloud-connect/` |

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
│   │   │   ├── SceneSettings.jsx      # Runtime scene toggle/reorder panel
│   │   │   └── ErrorBoundary.jsx      # Per-scene error isolation
│   │   └── scenes/
│   │       ├── HeroScene.jsx          # Title slide placeholder
│   │       ├── AgendaScene.jsx        # Auto-generated agenda grid
│   │       └── NextStepsScene.jsx     # CTAs + checklist placeholder
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md                     # How-to guide for this template
│
└── autoops-cloud-connect/            # AutoOps via Cloud Connect showcase
    ├── src/
    │   ├── App.jsx
    │   ├── index.css
    │   ├── context/
    │   ├── components/
    │   └── scenes/
    │       ├── HeroScene.jsx              # Scene 1  — Title & intro
    │       ├── AgendaScene.jsx            # Scene 2  — Clickable agenda grid
    │       ├── ChallengeScene.jsx         # Scene 3  — The problem being solved
    │       ├── WhatIsAutoOpsScene.jsx     # Scene 4  — AutoOps explained
    │       ├── CloudConnectScene.jsx      # Scene 5  — What is Cloud Connect
    │       ├── ArchitectureScene.jsx      # Scene 6  — Animated data flow
    │       ├── InstallationScene.jsx      # Scene 7  — 4 install methods + diagrams
    │       ├── MonitoringScene.jsx        # Scene 8  — What AutoOps monitors
    │       ├── NotificationsScene.jsx     # Scene 9  — 7 notification connectors
    │       └── NextStepsScene.jsx         # Scene 10 — CTAs, checklist, demo link
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## Running Locally

Each showcase is an independent project. Run from its own directory:

```bash
# AutoOps via Cloud Connect
cd autoops-cloud-connect
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
| Toggle dark/light | Sun/moon button (top-right) |
| Scene settings | Gear icon (top-right) — toggle/reorder scenes |

---

## Scene Architecture

Every scene follows the same component contract:

```jsx
function MyScene({ onNext, scenes, allScenes, onNavigate }) {
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
    hideFromAgenda: false,           // set true for Hero/Agenda themselves
    duration: '3 min',               // optional — shown in agenda
  },
]
```

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

2. **Update identity** in `package.json`, `vite.config.js` (`base: './'`), and `index.html` title.

3. **Register your scenes** in `src/App.jsx` — uncomment the placeholder slot and add your scene components.

4. **Create scene files** in `src/scenes/` following the component contract above.

5. **Run and iterate:**
   ```bash
   npm run dev
   ```

6. **Build for deployment:**
   ```bash
   npm run build
   ```

See `_template/README.md` for a detailed step-by-step walkthrough.

---

## Deploying to Vercel

Each showcase deploys as its own Vercel project pointing to its subfolder.

### First time (per showcase)

```bash
cd autoops-cloud-connect
npm run build          # verify build succeeds locally first
vercel                 # follow the prompts
```

Vercel settings:
- **Framework:** Vite (auto-detected)
- **Root Directory:** `autoops-cloud-connect` *(set this in Vercel UI when connecting repo)*
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Subsequent deploys

```bash
vercel --prod
```

### Auto-deploy via GitHub (recommended)

1. Connect this repo in the Vercel dashboard
2. Create a new Vercel project per showcase, setting **Root Directory** to the showcase subfolder
3. Every `git push` to `main` triggers an automatic redeploy

---

## Team Onboarding — Getting the `/showcase` Skill

The `/showcase` Claude Code skill lets any team member generate a complete, deployed interactive showcase from just a doc URL or blog post — no manual coding required.

### Prerequisites

- [Claude Code](https://claude.ai/code) installed and authenticated
- [Node.js](https://nodejs.org/) 18+ and npm
- [Git](https://git-scm.com/) + [GitHub CLI](https://cli.github.com/) (`brew install gh`)
- A free [Vercel](https://vercel.com/) account (for deployment)

### Install in 3 steps

**1. Clone this repo**
```bash
git clone https://github.com/tfrenchy/elastic-showcases.git
cd elastic-showcases
```

**2. Run the setup script**
```bash
./setup.sh
```

This installs the `/showcase` skill into your Claude Code environment automatically. That's it.

**3. Verify — start a new Claude Code session and type `/showcase`**

You should see the skill listed and available for use.

---

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
3. Generates all scene files (Hero, Agenda, Challenge, Architecture, Installation, Capabilities, Next Steps, and more)
4. Wires navigation, builds, and verifies zero errors
5. Pushes to GitHub → Vercel auto-deploys within ~60 seconds

**One manual step after generation:** Create a new Vercel project pointing to the new subfolder (the skill tells you exactly what to set).

---

### Updating the Skill

When the skill is updated in this repo, pull and re-run setup:
```bash
git pull
./setup.sh
```

---

## Roadmap

- [x] AutoOps via Cloud Connect showcase
- [x] `_template/` reusable scaffold
- [x] `/showcase` Agent Skill — automated showcase generation from doc URL or blog post
- [x] GitHub → Vercel auto-deploy pipeline
- [ ] Additional showcases: Elastic Security AI Assistant, EIS, Elastic Observability SLOs, …

---

## Author

Built by Terry Dupureur — Elastic Solutions Architecture
Powered by [Claude Code](https://claude.ai/code)
