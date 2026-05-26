import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassChart, faShieldHalved, faChartLine, faBolt, faCloud, faCode } from '@fortawesome/free-solid-svg-icons'

const pillars = [
  {
    icon: faMagnifyingGlassChart,
    color: '#0B64DD',
    title: 'Search',
    subtitle: 'Elasticsearch',
    description: 'Distributed search and analytics engine. Near real-time full-text, vector, and semantic search over any data type at any scale.',
  },
  {
    icon: faChartLine,
    color: '#48EFCF',
    title: 'Observability',
    subtitle: 'Logs · Metrics · Traces · APM',
    description: 'Unified monitoring for infrastructure, applications, and services. Detect, investigate, and resolve issues faster.',
  },
  {
    icon: faShieldHalved,
    color: '#F04E98',
    title: 'Security',
    subtitle: 'SIEM · Endpoint · Cloud',
    description: 'Detect threats, investigate incidents, and respond at scale. AI-powered threat intelligence built into the platform.',
  },
]

const highlights = [
  { icon: faBolt, label: 'Near Real-Time', desc: 'Search and analyze data in milliseconds' },
  { icon: faCloud, label: 'Any Deployment', desc: 'Serverless, cloud hosted, or self-managed' },
  { icon: faCode, label: 'API-First', desc: 'REST APIs for every operation — automation-ready' },
]

function WhatIsElasticScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState(0)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            What is Elastic?
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            One Platform.{' '}
            <span className="gradient-text">Three Superpowers.</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Elastic is an open source Search AI platform that combines search, observability, and security — all built on Elasticsearch, the world's leading search engine.
          </p>
        </motion.div>

        {/* Pillar tabs */}
        <div className="flex gap-3 mb-4 justify-center">
          {pillars.map((p, i) => (
            <motion.button
              key={p.title}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                active === i
                  ? isDark ? 'text-white border-transparent' : 'text-white border-transparent'
                  : isDark ? 'bg-white/5 border-white/10 text-white/60 hover:text-white' : 'bg-white border-elastic-dev-blue/10 text-elastic-ink hover:text-elastic-blue'
              }`}
              style={active === i ? { backgroundColor: p.color } : {}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <FontAwesomeIcon icon={p.icon} className="mr-2" />
              {p.title}
            </motion.button>
          ))}
        </div>

        {/* Active pillar detail */}
        <motion.div
          key={active}
          className={`p-6 rounded-2xl border mb-4 ${
            isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${pillars[active].color}20` }}
            >
              <FontAwesomeIcon icon={pillars[active].icon} style={{ color: pillars[active].color }} className="text-2xl" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className={`text-headline text-2xl font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {pillars[active].title}
                </h3>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ color: pillars[active].color, backgroundColor: `${pillars[active].color}15` }}
                >
                  {pillars[active].subtitle}
                </span>
              </div>
              <p className={`text-paragraph text-base ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                {pillars[active].description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Highlights row */}
        <div className="grid grid-cols-3 gap-3">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              className={`p-4 rounded-xl border text-center ${
                isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <FontAwesomeIcon icon={h.icon} className={`text-xl mb-2 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
              <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{h.label}</div>
              <div className={`text-xs ${isDark ? 'text-elastic-light-grey/60' : 'text-elastic-ink/70'}`}>{h.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhatIsElasticScene
