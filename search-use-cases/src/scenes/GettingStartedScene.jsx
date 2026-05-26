import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloud,
  faTerminal,
  faDatabase,
  faMagnifyingGlass,
  faCode,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'

const steps = [
  {
    number: '01',
    icon: faCloud,
    color: '#48EFCF',
    title: 'Choose Your Deployment',
    description: 'Elastic Cloud Serverless for fastest start, or run locally with Docker in one command.',
    code: 'curl -fsSL https://elastic.co/start-local | sh',
    codeLabel: 'Local quickstart',
  },
  {
    number: '02',
    icon: faDatabase,
    color: '#0B64DD',
    title: 'Ingest Your Data',
    description: 'Add data via REST API, language clients, or guided UI workflows. Use semantic_text fields for instant AI search.',
    code: 'PUT /my-index\n{"mappings":{"properties":{"content":{"type":"semantic_text"}}}}',
    codeLabel: 'Semantic index mapping',
  },
  {
    number: '03',
    icon: faMagnifyingGlass,
    color: '#F04E98',
    title: 'Build Your Queries',
    description: 'Use Query DSL or ES|QL to implement full-text, vector, semantic, or hybrid search. Mix and match as needed.',
    code: 'GET /my-index/_search\n{"query":{"semantic":{"field":"content","query":"your question"}}}',
    codeLabel: 'Semantic search query',
  },
  {
    number: '04',
    icon: faCode,
    color: '#FF957D',
    title: 'Integrate Your App',
    description: 'Use official clients for Python, JavaScript, Go, Java, Ruby, .NET, and more. Or query the REST API directly.',
    code: null,
    codeLabel: null,
  },
]

const quickstarts = [
  'Index and search basics',
  'Keyword search with Python',
  'Semantic search quickstart',
  'Vector search tutorial',
]

function GettingStartedScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Get Started
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            From Zero to <span className="gradient-text">Search in 4 Steps</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Regardless of your deployment type, solution, or project — these core steps get you to production search fast.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={`p-4 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div className="flex items-start gap-3 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <FontAwesomeIcon icon={step.icon} style={{ color: step.color }} className="text-sm" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold text-code ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>{step.number}</span>
                    <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{step.title}</h3>
                  </div>
                  <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>{step.description}</p>
                </div>
              </div>
              {step.code && (
                <div className={`rounded-lg p-2.5 mt-1 ${isDark ? 'bg-black/40' : 'bg-elastic-dev-blue/5'}`}>
                  <p className={`text-[9px] font-mono mb-1 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/40'}`}>{step.codeLabel}</p>
                  <pre className={`text-[10px] font-mono leading-relaxed whitespace-pre-wrap ${isDark ? 'text-elastic-teal/80' : 'text-elastic-blue'}`}>
                    {step.code}
                  </pre>
                </div>
              )}
              {!step.code && (
                <div className={`rounded-lg p-2.5 mt-1 flex items-center gap-2 ${isDark ? 'bg-black/20' : 'bg-elastic-dev-blue/5'}`}>
                  <FontAwesomeIcon icon={faCode} className={`text-xs ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/40'}`} />
                  <span className={`text-[10px] ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>
                    Python · JavaScript · Go · Java · Ruby · .NET · PHP · Rust
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`p-4 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon icon={faTerminal} className={`text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>Hands-On Quickstarts Available</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {quickstarts.map((qs, i) => (
              <div
                key={qs}
                className={`flex items-center gap-2 text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/70'}`}
              >
                <FontAwesomeIcon icon={faCircleCheck} className={`text-[10px] flex-shrink-0 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                {qs}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GettingStartedScene
