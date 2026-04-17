# Elastic Showcase Template

Reusable base for building interactive Elastic feature showcases.
Same design system, navigation, and animation patterns as the original presentation app.

---

## Creating a New Showcase

### Step 1 — Copy this template

```bash
cp -r /Users/terrydupureur/Demos/elastic-showcases/_template \
       /Users/terrydupureur/Demos/elastic-showcases/my-new-showcase
cd /Users/terrydupureur/Demos/elastic-showcases/my-new-showcase
```

### Step 2 — Update the title

Edit `index.html` line 7 — change the `<title>` tag.

### Step 3 — Build your scenes

Create one `.jsx` file per slide in `src/scenes/`.
Each scene must follow this pattern:

```jsx
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function MyFeatureScene({ onNext, scenes, allScenes, onNavigate }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        {/* Your content here */}
      </div>
    </div>
  )
}

export default MyFeatureScene
```

### Step 4 — Register scenes in App.jsx

```jsx
// 1. Import your scene
import MyFeatureScene from './scenes/MyFeatureScene'

// 2. Add to the scenes array
const scenes = [
  { id: 'hero', component: HeroScene, title: 'Introduction', hideFromAgenda: true },
  { id: 'agenda', component: AgendaScene, title: 'Agenda', hideFromAgenda: true },
  { id: 'my-feature', component: MyFeatureScene, title: 'My Feature', description: 'What it does', duration: '5 min' },
  { id: 'next-steps', component: NextStepsScene, title: 'Next Steps', description: 'Your path forward' },
]
```

### Step 5 — Install and run

```bash
npm install
npm run dev
# Opens at http://localhost:5173
```

---

## Design System Quick Reference

### Colors (Tailwind classes)
| Token | Hex | Usage |
|---|---|---|
| `elastic-blue` | `#0B64DD` | Primary actions, links |
| `elastic-teal` | `#48EFCF` | Accents, eyebrows (dark mode) |
| `elastic-pink` | `#F04E98` | Highlights, warnings |
| `elastic-dev-blue` | `#101C3F` | Dark background |
| `elastic-light-grey` | `#F5F7FA` | Light background |
| `elastic-yellow` | `#FEC514` | Attention, badges |

### Typography classes
```
text-headline   → Extrabold headlines
text-paragraph  → Regular body text
text-eyebrow    → Small uppercase labels
text-code       → Space Mono monospace
gradient-text   → Blue → Teal gradient text
```

### Scene layout
```jsx
<div className="scene">                    {/* Full-viewport centering */}
  <div className="max-w-5xl mx-auto w-full"> {/* Content width */}
```

### Animation pattern (Framer Motion)
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
```

### Card pattern
```jsx
<div className={`p-6 rounded-xl border ${
  isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'
}`}>
```

---

## Keyboard Navigation

| Key | Action |
|---|---|
| `→` / `Space` / `Enter` | Next scene |
| `←` / `Backspace` | Previous scene |
| `1`–`9` | Jump to scene |
| Gear icon (bottom-right) | Toggle/reorder scenes |
| Sun/Moon icon (bottom-left) | Dark/light mode |

---

## Deploying to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

Vercel auto-detects Vite and deploys. Each showcase gets its own URL.

---

## Latest Changes

- **Search AI Lake scene added** — New slide covering the two-layer Search AI Lake storage architecture (cache layer + general storage), search-ready data composition, and all three configurable settings: Search Power (On-demand / Performant / High-throughput), Search Boost Window, and Data Retention. Content sourced from the official Elastic docs project-settings page.
