# Elastic Showcase

A collection of interactive, browser-based presentation apps that demonstrate Elastic features and capabilities. Each showcase is a standalone React + Vite single-page application built on a shared design system using Elastic's official brand language.

These showcases are designed to be used in customer conversations, demos, and enablement sessions — running entirely in the browser with no backend required.

---

## Live Showcases

Find a showcase by pillar — click a name to jump to its description and live link. ⭐ = start here.

| **Search** (2) | **Observability** (1) | **Security** (2) | **Platform** (7) |
|---|---|---|---|
| [Search&nbsp;AI&nbsp;Serverless](#elastic-search-ai-serverless)<br>[Search&nbsp;Use&nbsp;Cases](#search-use-cases) | [Elastic&nbsp;Observability](#what-is-observability) | [Security&nbsp;Overview](#elastic-security-overview)<br>[AlertZero](#alertzero) | [What&nbsp;is&nbsp;Elastic?](#what-is-elastic) ⭐<br>[Cloud&nbsp;Serverless](#elasticsearch-serverless)<br>[Deployment&nbsp;Options](#elastic-deployment-options)<br>[AutoOps](#autoops-cloud-connect)<br>[Platform&nbsp;Workflows](#elastic-platform-workflow)<br>[Agent&nbsp;Builder](#elastic-agent-builder)<br>[Agent&nbsp;Builder&nbsp;Skills](#elastic-ab-skills) |

<details>
<summary><b>Search</b> — 2 showcases</summary>

| Showcase | What it covers | Live |
|---|---|---|
| <a id="elastic-search-ai-serverless"></a>**Search AI Serverless** | Search AI Lake, Search Power, vector search, zero-ops | [Open ↗](https://elastic-search-ai-serverless.vercel.app) |
| <a id="search-use-cases"></a>**Search Use Cases** | Full-text, vector, semantic, hybrid search, RAG, 8 patterns | [Open ↗](https://elastic-search-use-cases-showcase.vercel.app) |

</details>

<details>
<summary><b>Observability</b> — 1 showcase</summary>

| Showcase | What it covers | Live |
|---|---|---|
| <a id="what-is-observability"></a>**Elastic Observability** | Unified logs, metrics, traces, and AIOps at any scale | [Open ↗](https://what-is-observability.vercel.app) |

</details>

<details>
<summary><b>Security</b> — 2 showcases</summary>

| Showcase | What it covers | Live |
|---|---|---|
| <a id="elastic-security-overview"></a>**Elastic Security Overview** | Agentic SIEM + XDR, AI detection, automation | [Open ↗](https://elastic-security-overview.vercel.app) |
| <a id="alertzero"></a>**AlertZero** | Agentic AI SOC: Watches, Proposed Actions (tech preview) | [Open ↗](https://elastic-alertzero-preview.vercel.app) |

</details>

<details open>
<summary><b>Platform</b> — 7 showcases</summary>

| Showcase | What it covers | Live |
|---|---|---|
| <a id="what-is-elastic"></a>**What is Elastic?** | Start here: the Search AI Platform, Search, Obs, Security | [Open ↗](https://what-is-elastic.vercel.app) |
| <a id="elasticsearch-serverless"></a>**Elastic Cloud Serverless** | Serverless overview, project types, Hosted vs Serverless | [Open ↗](https://elastic-serverless-showcase.vercel.app) |
| <a id="elastic-deployment-options"></a>**Elastic Deployment Options Comparison** | Self-Managed vs Hosted vs Serverless: who owns what | [Open ↗](https://elastic-stack-deployment-options-showcase.vercel.app) |
| <a id="autoops-cloud-connect"></a>**AutoOps via Cloud Connect** | Connect self-managed clusters to AutoOps, no migration | [Open ↗](https://elastic-autoops-showcase.vercel.app) |
| <a id="elastic-platform-workflow"></a>**Platform Workflows** | YAML automation in Kibana: insights to outcomes | [Open ↗](https://elastic-platform-workflow.vercel.app) |
| <a id="elastic-agent-builder"></a>**Elastic Agent Builder** | Custom AI agents on enterprise data: tools, skills | [Open ↗](https://elastic-agent-builder-showcase.vercel.app) |
| <a id="elastic-ab-skills"></a>**Agent Builder Skills** | Reusable skills that give agents domain expertise | [Open ↗](https://elastic-ab-skills.vercel.app) |

</details>

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

Every showcase is a copy of `_template/` — one folder per showcase, each with its own `src/scenes/`.

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

| Pillar | Folder | Showcase | Scenes |
|---|---|---|--:|
| Search | `elastic-search-ai-serverless/` | Search AI Serverless | 10 |
| Search | `search-use-cases/` | Search Use Cases | 11 |
| Observability | `what-is-observability/` | Elastic Observability | 10 |
| Security | `elastic-security-overview/` | Elastic Security Overview | 11 |
| Security | `alertzero/` | AlertZero | 12 |
| Platform | `what-is-elastic/` | What is Elastic? | 10 |
| Platform | `elasticsearch-serverless/` | Elastic Cloud Serverless | 9 |
| Platform | `elastic-deployment-options/` | Elastic Deployment Options Comparison | 9 |
| Platform | `autoops-cloud-connect/` | AutoOps via Cloud Connect | 11 |
| Platform | `elastic-platform-workflow/` | Platform Workflows | 11 |
| Platform | `elastic-agent-builder/` | Elastic Agent Builder | 10 |
| Platform | `elastic-ab-skills/` | Agent Builder Skills | 10 |

<details>
<summary>Scene-by-scene reference (all 12 showcases)</summary>

```
Search AI Serverless  (elastic-search-ai-serverless/src/scenes/)
   1. HeroScene.jsx                  Animated search-bar intro (always on)
   2. HeroStaticScene.jsx            Static logo/title/badges (default hidden)
   3. TeamScene.jsx                  Presenter introductions
   4. AgendaScene.jsx                Clickable agenda grid
   5. ChallengeScene.jsx             Infrastructure management pain points
   6. WhatIsXScene.jsx               Elasticsearch Serverless explained
   7. ArchitectureScene.jsx          Search AI Lake & separated compute
   8. SearchPowerScene.jsx           On-demand, Performant, High-throughput
   9. CapabilitiesScene.jsx          Vector search, ELSER, ES|QL, AI Playground
  10. NextStepsScene.jsx             Free trial, docs, demo link

Search Use Cases  (search-use-cases/src/scenes/)
   1. HeroScene.jsx                  Animated search-bar intro (always on)
   2. HeroStaticScene.jsx            Static logo/title/badges (default hidden)
   3. TeamScene.jsx                  Presenter introductions
   4. AgendaScene.jsx                Clickable agenda grid
   5. ChallengeScene.jsx             Why search is harder than it looks
   6. WhatIsSearchScene.jsx          The unified Elasticsearch search platform
   7. UseCasesScene.jsx              8 use cases across industries
   8. SearchApproachesScene.jsx      Full-text, vector, semantic, hybrid, geo
   9. RAGScene.jsx                   RAG workflow, advantages, and build options
  10. GettingStartedScene.jsx        Zero to search in 4 steps
  11. NextStepsScene.jsx             Free trial, docs, contact, demo link

Elastic Observability  (what-is-observability/src/scenes/)
   1. HeroStaticScene.jsx            Default title slide (Elastic Observability)
   2. HeroScene.jsx                  Animated search-bar intro (default hidden)
   3. TeamScene.jsx                  Presenter introductions
   4. AgendaScene.jsx                Clickable agenda grid
   5. ChallengeScene.jsx             Why modern observability is broken
   6. WhatIsObservabilityScene.jsx   Three pillars, OpenTelemetry, and AIOps
   7. ArchitectureScene.jsx          Animated data flow: sources → EDOT → ES → Kibana
   8. CapabilitiesScene.jsx          APM, logs, infra, digital experience, LLM obs, profiling
   9. AIOpsScene.jsx                 AI Assistant, anomaly detection, SLOs, alerting
  10. NextStepsScene.jsx             Free trial, docs, contact, demo link

Elastic Security Overview  (elastic-security-overview/src/scenes/)
   1. HeroScene.jsx                  Animated search-bar intro (always on)
   2. HeroStaticScene.jsx            Static logo/title/badges (default hidden)
   3. TeamScene.jsx                  Presenter introductions
   4. AgendaScene.jsx                Clickable agenda grid
   5. ChallengeScene.jsx             Security industry taxes and fragmentation
   6. WhatIsElasticSecurityScene.jsx Unified SIEM, XDR & agentic AI platform
   7. ArchitectureScene.jsx          Animated data-to-action flow
   8. CapabilitiesScene.jsx          Detect, respond, protect (tabbed)
   9. IntegrationsScene.jsx          Cloud, endpoint, identity, network connectors
  10. ProofPointsScene.jsx           Customer stats & industry recognition
  11. NextStepsScene.jsx             Free trial, docs, contact, demo link

AlertZero  (alertzero/src/scenes/)
   1. HeroStaticScene.jsx            Default title slide (AlertZero)
   2. HeroScene.jsx                  Animated search-bar intro (default hidden)
   3. TeamScene.jsx                  Presenter introductions
   4. AgendaScene.jsx                Clickable agenda grid
   5. ChallengeScene.jsx             The alert queue sets the agenda
   6. WhatIsAlertZeroScene.jsx       Watches, Workers, Proposed Actions, and lineage
   7. WatchesScene.jsx               Triage, Hunt, Detection, and Forensics Watches
   8. WalkthroughScene.jsx           Suspicious login session, step by step
   9. BeyondTriageScene.jsx          Threat hunting and rule tuning
  10. AutonomyScene.jsx              Manual, assisted, and supervised per Worker
  11. OpenByDesignScene.jsx          Any model, any environment, built-on components
  12. NextStepsScene.jsx             Tech preview sign-up, blog, docs, demo link

What is Elastic?  (what-is-elastic/src/scenes/)
   1. HeroScene.jsx                  Animated search-bar intro (always on)
   2. HeroStaticScene.jsx            Static logo/title/badges (default hidden)
   3. TeamScene.jsx                  Presenter introductions
   4. AgendaScene.jsx                Clickable agenda grid
   5. ChallengeScene.jsx             Data silos and fragmented tooling pain
   6. WhatIsElasticScene.jsx         The Search AI Platform explained
   7. ArchitectureScene.jsx          The Elastic Stack: Ingest, Store, Explore
   8. SolutionsScene.jsx             Elasticsearch, Observability, Security
   9. DeploymentScene.jsx            Serverless, Cloud Hosted, Self-Managed
  10. NextStepsScene.jsx             Free trial, docs, contact, demo link

Elastic Cloud Serverless  (elasticsearch-serverless/src/scenes/)
   1. HeroScene.jsx                  Title & intro
   2. TeamScene.jsx                  Presenter introductions
   3. AgendaScene.jsx                Clickable agenda grid
   4. ChallengeScene.jsx             Infrastructure management pain
   5. WhatIsServerlessScene.jsx      Overview & architecture
   6. BenefitsScene.jsx              6 key benefits
   7. ProjectTypesScene.jsx          Search, Observability, Security
   8. ComparisonScene.jsx            Serverless vs Cloud Hosted table
   9. NextStepsScene.jsx             Trial, docs, demo link

Elastic Deployment Options Comparison  (elastic-deployment-options/src/scenes/)
   1. HeroScene.jsx                  Title & intro
   2. TeamScene.jsx                  Presenter introductions
   3. AgendaScene.jsx                Clickable agenda grid
   4. ChallengeScene.jsx             Why choosing wrong model costs you
   5. DeploymentOverviewScene.jsx    Three ways to run Elastic
   6. SharedResponsibilityScene.jsx  Who owns what (interactive matrix)
   7. FeatureComparisonScene.jsx     Feature availability by deployment
   8. WhenToChooseScene.jsx          Decision guide for each model
   9. NextStepsScene.jsx             Trial, docs, contact

AutoOps via Cloud Connect  (autoops-cloud-connect/src/scenes/)
   1. HeroScene.jsx                  Title & intro
   2. TeamScene.jsx                  Presenter introductions
   3. AgendaScene.jsx                Clickable agenda grid
   4. ChallengeScene.jsx             The problem being solved
   5. WhatIsAutoOpsScene.jsx         AutoOps explained
   6. CloudConnectScene.jsx          What is Cloud Connect
   7. ArchitectureScene.jsx          Animated data flow
   8. InstallationScene.jsx          4 install methods + diagrams
   9. MonitoringScene.jsx            What AutoOps monitors
  10. NotificationsScene.jsx         7 notification connectors
  11. NextStepsScene.jsx             CTAs, checklist, demo link

Platform Workflows  (elastic-platform-workflow/src/scenes/)
   1. HeroScene.jsx                  Animated search-bar intro (always on)
   2. HeroStaticScene.jsx            Static logo/title/badges (default hidden)
   3. TeamScene.jsx                  Presenter introductions
   4. AgendaScene.jsx                Clickable agenda grid
   5. ChallengeScene.jsx             Alert fatigue, tool fragmentation, manual work
   6. WhatIsWorkflowsScene.jsx       YAML-defined automation in Kibana
   7. ArchitectureScene.jsx          Triggers, steps, data flow, outcomes
   8. CapabilitiesScene.jsx          Action, flow control, and AI steps (tabbed)
   9. UseCasesScene.jsx              Security, observability, AI-augmented patterns
  10. InstallationScene.jsx          Enable in Kibana + configure privileges
  11. NextStepsScene.jsx             Docs, first workflow, contact, demo link

Elastic Agent Builder  (elastic-agent-builder/src/scenes/)
   1. HeroStaticScene.jsx            Default title slide (Elastic Agent Builder)
   2. HeroScene.jsx                  Animated search-bar intro (default hidden)
   3. TeamScene.jsx                  Presenter introductions
   4. AgendaScene.jsx                Clickable agenda grid
   5. ChallengeScene.jsx             Why building AI agents is hard
   6. WhatIsAgentBuilderScene.jsx    Platform overview: Chat, Tools, Skills, Workflows
   7. ArchitectureScene.jsx          Animated flow: Data → Tools → Skills → Agent → Chat
   8. CapabilitiesScene.jsx          Tabbed capabilities: Chat, Tools, Skills, Workflows
   9. BuiltInSkillsScene.jsx         Domain skills: Platform, Observability, Security, Search
  10. NextStepsScene.jsx             Free trial, docs, contact, demo link

Agent Builder Skills  (elastic-ab-skills/src/scenes/)
   1. HeroScene.jsx                  Animated search-bar intro (always on)
   2. HeroStaticScene.jsx            Static logo/title/badges (default hidden)
   3. TeamScene.jsx                  Presenter introductions
   4. AgendaScene.jsx                Clickable agenda grid
   5. ChallengeScene.jsx             Copy-paste expertise, bloated prompts pain
   6. WhatIsSkillsScene.jsx          Skills explained: knowledge, tools, selective loading
   7. HowSkillsWorkScene.jsx         Dynamic skill selection & activation flow
   8. BuiltInSkillsScene.jsx         Platform, Observability, Security, Elasticsearch skills
   9. CustomSkillsScene.jsx          Fields, workflow, best practices for custom skills
  10. NextStepsScene.jsx             Trial, docs, custom skills guide, contact
```

</details>

---

## Running Locally

Each showcase is an independent project. Pick a folder from the table above:

```bash
cd <folder>        # e.g. cd alertzero
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

7. **Update this README** — pick the showcase's pillar (Search, Observability, Security, or Platform), then: add its name to that pillar's column in the Live Showcases grid, add a row to that pillar's collapsible table, and add a row to the folder table (plus its scene list in the "Scene-by-scene reference") under Project Structure.

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
5. **Updates this README** — adds the new showcase under its pillar (Search / Observability / Security / Platform) in Live Showcases and Project Structure
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

---

## Author

Built by Terry Dupureur — Elastic Solutions Architecture
Powered by [Claude Code](https://claude.ai/code)
