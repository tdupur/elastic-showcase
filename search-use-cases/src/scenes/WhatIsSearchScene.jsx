import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faServer,
  faCloud,
  faMagnifyingGlassChart,
  faBolt,
  faDatabase,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'

const pillars = [
  {
    icon: faMagnifyingGlassChart,
    color: '#48EFCF',
    title: 'Multiple Search Techniques',
    description: 'Full-text, vector, semantic, and hybrid search — all in one engine. Start simple and layer in AI capabilities as needed.',
  },
  {
    icon: faDatabase,
    color: '#0B64DD',
    title: 'Unified Data Platform',
    description: 'Store, index, and search structured and unstructured data alongside vectors — no separate vector database required.',
  },
  {
    icon: faBolt,
    color: '#FEC514',
    title: 'Built for Scale',
    description: 'Sub-second search across billions of documents with distributed architecture, sharding, and replication built in.',
  },
  {
    icon: faCloud,
    color: '#F04E98',
    title: 'Any Deployment',
    description: 'Run on Elastic Cloud Serverless, managed hosted, self-managed on-prem, or Kubernetes — same API everywhere.',
  },
]

const deploymentOptions = [
  { label: 'Elastic Cloud Serverless', note: 'Fastest start' },
  { label: 'Elastic Cloud Hosted', note: 'Full control' },
  { label: 'Self-Managed (Docker)', note: '`curl -fsSL https://elastic.co/start-local | sh`' },
  { label: 'Kubernetes (ECK)', note: 'Enterprise' },
]

function WhatIsSearchScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            The Solution
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What Is <span className="gradient-text">Elasticsearch Search</span>?
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Elasticsearch is a distributed search and analytics engine that powers every search technique — from classic full-text to cutting-edge AI semantic search — on a single platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className={`p-5 rounded-xl border flex gap-4 ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${pillar.color}20` }}
              >
                <FontAwesomeIcon icon={pillar.icon} style={{ color: pillar.color }} />
              </div>
              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {pillar.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon icon={faServer} className={`text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
              Deployment Options
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {deploymentOptions.map((opt, i) => (
              <motion.div
                key={opt.label}
                className={`p-3 rounded-lg border text-center ${
                  isDark ? 'bg-white/[0.03] border-white/10' : 'bg-elastic-light-grey/50 border-elastic-dev-blue/10'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <FontAwesomeIcon icon={faCircleCheck} className={`text-xs mb-1 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{opt.label}</p>
                <p className={`text-[10px] mt-0.5 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>{opt.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WhatIsSearchScene
