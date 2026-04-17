import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloud, faRocket, faBolt, faShieldHalved, faArrowsRotate, faKey
} from '@fortawesome/free-solid-svg-icons'

const pillars = [
  {
    icon: faCloud,
    color: '#48EFCF',
    title: 'Fully Managed',
    description: 'No nodes, no shards, no JVM tuning. Elastic handles all infrastructure, upgrades, and operations.',
  },
  {
    icon: faBolt,
    color: '#0B64DD',
    title: 'Auto-Scaling',
    description: 'Compute scales dynamically with your search and indexing load — up and down, in real time.',
  },
  {
    icon: faRocket,
    color: '#F04E98',
    title: 'Always Current',
    description: 'Access the latest Elasticsearch features and improvements the moment they are released — zero upgrade effort.',
  },
  {
    icon: faArrowsRotate,
    color: '#FF957D',
    title: 'Separated Compute & Storage',
    description: 'Indexing and search compute scale independently over a shared Search AI Lake, optimizing cost and performance.',
  },
  {
    icon: faShieldHalved,
    color: '#FEC514',
    title: '99.95% SLA',
    description: 'Enterprise-grade uptime guarantee backed by Elastic Cloud infrastructure across AWS, Azure, and GCP.',
  },
  {
    icon: faKey,
    color: '#48EFCF',
    title: 'Consumption-Based Pricing',
    description: 'Pay for what you use. Search Power, data volume, and compute are billed on actual consumption.',
  },
]

function WhatIsXScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            What It Is
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Elasticsearch, <span className="gradient-text">Without the Ops</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            A cloud-native, fully managed Elasticsearch service that separates compute from storage — so you build search applications, not infrastructure.
          </p>
        </motion.div>

        {/* Definition card */}
        <motion.div
          className={`p-5 rounded-xl border mb-6 text-center ${
            isDark
              ? 'bg-elastic-teal/5 border-elastic-teal/20'
              : 'bg-elastic-blue/5 border-elastic-blue/20'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className={`text-base font-medium ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            "Start instantly, no ops, no upgrades — the full power of Elasticsearch as a serverless cloud service."
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className={`p-5 rounded-xl border ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${pillar.color}20` }}
              >
                <FontAwesomeIcon icon={pillar.icon} style={{ color: pillar.color }} />
              </div>
              <h3 className={`font-bold text-sm mb-1.5 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                {pillar.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhatIsXScene
