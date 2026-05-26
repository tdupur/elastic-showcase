import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassChart, faChartLine, faShieldHalved, faCheck } from '@fortawesome/free-solid-svg-icons'

const solutions = [
  {
    id: 'search',
    icon: faMagnifyingGlassChart,
    color: '#0B64DD',
    title: 'Elasticsearch',
    tagline: 'Build powerful search experiences',
    audience: 'Developers · Architects · Data Engineers',
    capabilities: [
      'Full-text, vector, and semantic search',
      'Real-time analytics and aggregations',
      'AI-powered relevance with ELSER',
      'RAG for Generative AI applications',
      'Geospatial and time-series data',
      'Developer-friendly REST APIs & clients',
    ],
  },
  {
    id: 'observability',
    icon: faChartLine,
    color: '#48EFCF',
    title: 'Elastic Observability',
    tagline: 'Monitor and understand your systems',
    audience: 'DevOps · SREs · IT Operations',
    capabilities: [
      'Unified logs, metrics, and traces',
      'Application Performance Monitoring (APM)',
      'Infrastructure and cloud monitoring',
      'OpenTelemetry native support',
      'AI-driven anomaly detection',
      'Service health and SLOs',
    ],
  },
  {
    id: 'security',
    icon: faShieldHalved,
    color: '#F04E98',
    title: 'Elastic Security',
    tagline: 'Detect, investigate, and respond to threats',
    audience: 'SOC Teams · Security Analysts · IT Admins',
    capabilities: [
      'SIEM with AI-powered detection',
      'Endpoint protection (EDR)',
      'Cloud security posture management',
      'Threat intelligence integration',
      'Automated response workflows',
      'Attack framework mapping (MITRE)',
    ],
  },
]

function SolutionsScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState(0)

  const sol = solutions[active]

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Solutions Overview
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Choose Your{' '}
            <span className="gradient-text">Solution</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Three solutions — one platform. Each addresses a distinct use case while sharing the same open source foundation.
          </p>
        </motion.div>

        {/* Solution tabs */}
        <div className="flex gap-3 justify-center mb-5">
          {solutions.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                active === i
                  ? 'text-white border-transparent'
                  : isDark ? 'bg-white/5 border-white/10 text-white/60 hover:text-white' : 'bg-white border-elastic-dev-blue/10 text-elastic-ink hover:text-elastic-blue'
              }`}
              style={active === i ? { backgroundColor: s.color } : {}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <FontAwesomeIcon icon={s.icon} />
              {s.title}
            </motion.button>
          ))}
        </div>

        {/* Active solution detail */}
        <motion.div
          key={active}
          className={`p-6 rounded-2xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-5 mb-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${sol.color}20` }}
            >
              <FontAwesomeIcon icon={sol.icon} style={{ color: sol.color }} className="text-3xl" />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{sol.title}</h3>
              <p className={`text-base mt-1 ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{sol.tagline}</p>
              <span
                className="inline-block mt-2 text-xs font-mono px-3 py-1 rounded-full"
                style={{ color: sol.color, backgroundColor: `${sol.color}15` }}
              >
                {sol.audience}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {sol.capabilities.map((cap, i) => (
              <motion.div
                key={cap}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${sol.color}20` }}
                >
                  <FontAwesomeIcon icon={faCheck} style={{ color: sol.color }} className="text-xs" />
                </div>
                <span className={`text-sm ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{cap}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className={`text-center mt-3 text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          All solutions available as Serverless · Cloud Hosted · Self-Managed
        </motion.p>
      </div>
    </div>
  )
}

export default SolutionsScene
