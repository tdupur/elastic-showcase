# Building & Contributing

Everything for people who build, run, or extend showcases. For the list of showcases, see the [root README](../README.md).

## Contents

[Tech Stack](#tech-stack) · [Project Structure](#project-structure) · [Running Locally](#running-locally) · [Scene Architecture](#scene-architecture) · [Brand Design System](#elastic-brand-design-system) · [Creating a New Showcase](#creating-a-new-showcase) · [Deploying to Vercel](#deploying-to-vercel) · [Team Onboarding](#team-onboarding--getting-the-showcase-skill) · [Roadmap](#roadmap)

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

Every showcase is its own folder, copied from `_template/`. The list of showcase folders and scene counts lives in the [pillar tables](../README.md#live-showcases); scene order for each showcase is in its `src/App.jsx`.

```
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
```

---

## Running Locally

Each showcase is an independent project. Run from its own folder:

```bash
cd <folder>        # e.g. cd alertzero
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

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

7. **Update the root `README.md`** — pick the showcase's pillar (Search, Observability, Security, or Platform), add its name to that pillar's column in the Live Showcases grid (bump the count), and add a row to that pillar's collapsible table (description, URL, folder, scene count). Then add a checked item to the Roadmap below.

8. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add {name} showcase: {Feature Name}"
   git push origin main
   ```

9. **Create Vercel project** — dashboard → Add New Project → Root Directory: `{folder-name}` → project name: `elastic-{name}-showcase` → update the URL in the showcase's pillar table in the root `README.md`.

See `_template/README.md` for a detailed step-by-step walkthrough.

---

## Deploying to Vercel

Each showcase deploys as its own Vercel project pointing to its subfolder.

### First time (per showcase)

1. Push to GitHub (auto-deploy triggers on `git push main`)
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → **Add New Project**
3. Import the `elastic-showcase` GitHub repo
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
git clone https://github.com/tdupur/elastic-showcase.git
cd elastic-showcase
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
5. **Updates the root `README.md`** — adds the new showcase under its pillar (Search / Observability / Security / Platform) in Live Showcases, and adds a Roadmap item here
6. Pushes to GitHub → Vercel auto-deploys within ~60 seconds

**One manual step after generation:** Create a new Vercel project pointing to the new subfolder and update the URL in the root `README.md`.

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
- [x] Elastic Deployment Options Comparison showcase
- [x] Search AI Serverless showcase
- [x] Agent Builder Skills showcase
- [x] Elastic Security Overview showcase
- [x] Platform Workflows showcase
- [x] What is Elastic? showcase
- [x] Search Use Cases — What You Can Build showcase
- [x] Elastic Agent Builder showcase
- [x] Elastic Observability showcase
- [x] AlertZero showcase
- [ ] Additional showcases: EIS, …
