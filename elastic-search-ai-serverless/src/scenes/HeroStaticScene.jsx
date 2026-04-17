import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

// TODO: Replace title, subtitle, and badge text with your feature content
// This scene is an alternative static hero — disabled by default in the Configurator.
// Enable it via Settings → Scenes if you prefer this simpler opening over HeroScene.
const SHOWCASE_TITLE_LINE1 = 'Elasticsearch'
const SHOWCASE_TITLE_LINE2 = 'Search AI Serverless'
const SHOWCASE_SUBTITLE = 'Zero operational overhead. Full search power. Fully managed on Elastic Cloud.'
const SHOWCASE_BADGES = ['Fully Managed', 'Auto-Scaling', 'Search AI Lake', 'AWS • Azure • GCP']

function HeroStaticScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <img
            src={isDark ? "/Elastic-Logo-tagline-secondary-white.svg" : "/Elastic-Logo-tagline-secondary-black.png"}
            alt="Elastic"
            className="h-14 w-auto mx-auto object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-headline text-5xl md:text-7xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className={isDark ? 'text-white' : 'text-elastic-dark-ink'}>{SHOWCASE_TITLE_LINE1}</span>
          <br />
          <span className="gradient-text">{SHOWCASE_TITLE_LINE2}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={`text-paragraph text-xl md:text-2xl max-w-3xl mx-auto mb-10 ${
            isDark ? 'text-elastic-light-grey' : 'text-elastic-blue'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {SHOWCASE_SUBTITLE}
        </motion.p>

        {/* Badges */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {SHOWCASE_BADGES.map((badge, i) => (
            <motion.span
              key={badge}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                isDark
                  ? 'bg-elastic-teal/10 border-elastic-teal/30 text-elastic-teal'
                  : 'bg-elastic-blue/10 border-elastic-blue/30 text-elastic-blue'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.12 }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default HeroStaticScene
