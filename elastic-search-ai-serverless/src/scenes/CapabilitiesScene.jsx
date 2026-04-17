import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlassChart, faBolt, faRocket, faGear, faChartLine, faTerminal, faKey, faUsers
} from '@fortawesome/free-solid-svg-icons'

const capabilities = [
  {
    icon: faMagnifyingGlassChart,
    color: '#48EFCF',
    title: 'Vector Search & ELSER',
    description: 'Semantic search with transformer models including ELSER. Byte quantization for cost-efficient vector storage at scale.',
  },
  {
    icon: faRocket,
    color: '#0B64DD',
    title: 'AI Playground',
    description: 'Built-in environment to prototype retrieval-augmented generation (RAG) pipelines against your serverless data.',
  },
  {
    icon: faBolt,
    color: '#F04E98',
    title: 'ES|QL',
    description: 'Elastic Query Language for powerful, pipe-based data exploration, aggregation, and visualization directly in your project.',
  },
  {
    icon: faGear,
    color: '#FF957D',
    title: 'On-Demand ML',
    description: 'Machine learning workloads autoscale independently. Deploy inference models without pre-allocating dedicated ML nodes.',
  },
  {
    icon: faChartLine,
    color: '#FEC514',
    title: 'Instant Auto-Scaling',
    description: 'Real-time autoscaling for both indexing and search compute — no manual intervention needed during traffic spikes.',
  },
  {
    icon: faKey,
    color: '#48EFCF',
    title: 'API Key Auth',
    description: 'Secure, scoped API keys for seamless integration with any language client — Python, JavaScript, Go, Java, and more.',
  },
  {
    icon: faTerminal,
    color: '#0B64DD',
    title: 'Developer Console',
    description: 'Fully featured in-browser Dev Tools console for running queries, exploring mappings, and managing your serverless index.',
  },
  {
    icon: faUsers,
    color: '#F04E98',
    title: 'Multi-Use Case',
    description: 'One serverless platform for Search, Observability, and Security. Choose your project type at provisioning.',
  },
]

function CapabilitiesScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            What You Get
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Full Power, <span className="gradient-text">Zero Overhead</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Every Elasticsearch capability you need — vector search, AI tooling, ES|QL, and auto-scaling — ready from day one.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.07 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${cap.color}20` }}
              >
                <FontAwesomeIcon icon={cap.icon} style={{ color: cap.color }} className="text-sm" />
              </div>
              <h3 className={`font-bold text-sm mb-1.5 leading-tight ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                {cap.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/55'}`}>
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CapabilitiesScene
