import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faEye, faArrowRight, faPlug, faCube, faTerminal } from '@fortawesome/free-solid-svg-icons'

const layers = [
  {
    id: 'ingest',
    label: 'Ingest Layer',
    color: '#FF957D',
    components: [
      { name: 'Elastic Agent', desc: 'Unified data shipper for logs, metrics, security events' },
      { name: 'Logstash', desc: 'Complex ETL pipelines with 200+ plugins' },
      { name: 'OpenTelemetry', desc: 'Vendor-neutral traces, metrics, and logs' },
      { name: 'Beats', desc: 'Lightweight shippers for specific data types' },
    ],
    icon: faPlug,
  },
  {
    id: 'store',
    label: 'Storage & Search',
    color: '#0B64DD',
    components: [
      { name: 'Elasticsearch', desc: 'Distributed search engine & vector database' },
      { name: 'Ingest Pipelines', desc: 'Transform and enrich data before indexing' },
      { name: 'Index Management', desc: 'ILM policies, snapshots, and data tiers' },
      { name: 'ML Models', desc: 'Built-in NLP, ELSER, and anomaly detection' },
    ],
    icon: faDatabase,
  },
  {
    id: 'explore',
    label: 'Explore & Visualize',
    color: '#48EFCF',
    components: [
      { name: 'Kibana', desc: 'Dashboards, Discover, and Lens visualizations' },
      { name: 'ES|QL', desc: 'Powerful query language for analytics' },
      { name: 'AI Assistant', desc: 'Generative AI for search and investigation' },
      { name: 'Alerts & Cases', desc: 'Notifications and incident management' },
    ],
    icon: faEye,
  },
]

function ArchitectureScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeLayer, setActiveLayer] = useState(1)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            The Elastic Stack
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Built to{' '}
            <span className="gradient-text">Work Together</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            The Elastic Stack is a suite of open-source products that ingest, store, search, and visualize data at scale.
          </p>
        </motion.div>

        {/* Layer selector */}
        <div className="flex gap-2 justify-center mb-5">
          {layers.map((layer, i) => (
            <motion.button
              key={layer.id}
              onClick={() => setActiveLayer(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeLayer === i
                  ? 'text-white border-transparent'
                  : isDark ? 'bg-white/5 border-white/10 text-white/60 hover:text-white' : 'bg-white border-elastic-dev-blue/10 text-elastic-ink hover:text-elastic-blue'
              }`}
              style={activeLayer === i ? { backgroundColor: layer.color } : {}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <FontAwesomeIcon icon={layer.icon} />
              {layer.label}
            </motion.button>
          ))}
        </div>

        {/* Flow diagram */}
        <div className="flex items-center gap-2 mb-5">
          {layers.map((layer, i) => (
            <div key={layer.id} className="flex items-center gap-2 flex-1">
              <motion.div
                className={`flex-1 p-3 rounded-xl border-2 text-center cursor-pointer transition-all ${
                  activeLayer === i ? 'border-transparent' : isDark ? 'border-white/10 bg-white/[0.03]' : 'border-elastic-dev-blue/10 bg-white'
                }`}
                style={activeLayer === i ? { borderColor: layer.color, backgroundColor: `${layer.color}15` } : {}}
                onClick={() => setActiveLayer(i)}
                whileHover={{ scale: 1.02 }}
              >
                <FontAwesomeIcon icon={layer.icon} style={{ color: layer.color }} className="text-xl mb-1" />
                <div className={`text-xs font-bold mt-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{layer.label}</div>
              </motion.div>
              {i < layers.length - 1 && (
                <FontAwesomeIcon icon={faArrowRight} className={`text-sm flex-shrink-0 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Active layer detail */}
        <motion.div
          key={activeLayer}
          className={`p-5 rounded-2xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-2 gap-3">
            {layers[activeLayer].components.map((comp, i) => (
              <motion.div
                key={comp.name}
                className={`flex items-start gap-3 p-3 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-elastic-dev-blue/5'}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${layers[activeLayer].color}20` }}
                >
                  <FontAwesomeIcon icon={faCube} style={{ color: layers[activeLayer].color }} className="text-xs" />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{comp.name}</div>
                  <div className={`text-xs mt-0.5 ${isDark ? 'text-elastic-light-grey/60' : 'text-elastic-ink/70'}`}>{comp.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={`mt-3 p-3 rounded-xl border text-center flex items-center justify-center gap-2 ${
            isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <FontAwesomeIcon icon={faTerminal} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
          <span className={`text-sm ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Every component is accessible via <span className={`font-mono font-semibold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>REST API</span> — enabling infrastructure-as-code and full automation.
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default ArchitectureScene
