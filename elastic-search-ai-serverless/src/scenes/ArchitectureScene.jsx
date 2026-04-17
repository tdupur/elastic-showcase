import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDatabase, faBolt, faMagnifyingGlassChart, faArrowDown, faArrowRight, faServer, faCube
} from '@fortawesome/free-solid-svg-icons'

const layers = [
  {
    id: 'ingest',
    icon: faArrowDown,
    color: '#F04E98',
    label: 'Data Ingest',
    description: 'Clients, APIs, agents send data',
    items: ['Language Clients', 'REST API', 'Elastic Agents', 'Logstash / Beats'],
  },
  {
    id: 'compute',
    icon: faServer,
    color: '#48EFCF',
    label: 'Separated Compute',
    description: 'Index & Search scale independently',
    items: ['Index Compute (autoscales)', 'Search Compute (autoscales)', 'ML Compute (on-demand)'],
  },
  {
    id: 'lake',
    icon: faDatabase,
    color: '#0B64DD',
    label: 'Search AI Lake',
    description: 'Two-tier storage for cost & speed',
    items: ['Cache Layer — Search-ready data', 'General Storage — cost-efficient object store'],
  },
]

const devTools = [
  { icon: faMagnifyingGlassChart, label: 'AI Playground', color: '#FF957D' },
  { icon: faBolt, label: 'ES|QL', color: '#FEC514' },
  { icon: faCube, label: 'Dev Console', color: '#48EFCF' },
]

function ArchitectureScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            How It Works
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            The <span className="gradient-text">Search AI Lake</span> Architecture
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Compute and storage are fully decoupled — indexing, search, and ML each scale independently over a unified data lake.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.15 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${layer.color}20` }}
                >
                  <FontAwesomeIcon icon={layer.icon} style={{ color: layer.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{layer.label}</h3>
                    <span className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>{layer.description}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map(item => (
                      <span
                        key={item}
                        className={`text-xs px-3 py-1 rounded-full border ${
                          isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-elastic-dev-blue/5 border-elastic-dev-blue/10 text-elastic-dev-blue/70'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {i < layers.length - 1 && (
                  <div className={`text-xs mt-1 ${isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'}`}>
                    <FontAwesomeIcon icon={faArrowDown} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dev Tools Row */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <p className={`text-xs uppercase tracking-widest mb-3 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/40'}`}>
            Built-in Developer Tools
          </p>
          <div className="flex gap-3">
            {devTools.map((tool, i) => (
              <motion.div
                key={tool.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
                  isDark ? 'bg-white/[0.04] border-white/10 text-white/80' : 'bg-white border-elastic-dev-blue/15 text-elastic-dark-ink'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <FontAwesomeIcon icon={tool.icon} style={{ color: tool.color }} className="text-xs" />
                {tool.label}
              </motion.div>
            ))}
            <motion.div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
                isDark ? 'bg-white/[0.04] border-white/10 text-white/80' : 'bg-white border-elastic-dev-blue/15 text-elastic-dark-ink'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.84 }}
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" style={{ color: '#48EFCF' }} />
              Language Clients
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ArchitectureScene
