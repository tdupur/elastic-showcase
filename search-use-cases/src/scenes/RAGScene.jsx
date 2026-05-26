import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faMagnifyingGlass,
  faDatabase,
  faRobot,
  faArrowRight,
  faCircleCheck,
  faGear,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'

const ragSteps = [
  { icon: faUser, color: '#48EFCF', label: '1. User Query', description: 'User submits a natural language question' },
  { icon: faMagnifyingGlass, color: '#0B64DD', label: '2. Elasticsearch Retrieval', description: 'Full-text, vector, or hybrid search retrieves relevant documents' },
  { icon: faDatabase, color: '#FEC514', label: '3. Context Assembly', description: 'Retrieved documents are assembled as context for the LLM' },
  { icon: faRobot, color: '#F04E98', label: '4. LLM Response', description: 'Language model generates a grounded, accurate answer' },
]

const advantages = [
  { icon: faCircleCheck, color: '#48EFCF', text: 'Reduced hallucination — LLM cites your authoritative data' },
  { icon: faCircleCheck, color: '#48EFCF', text: 'Up-to-date answers — no retraining needed as data changes' },
  { icon: faCircleCheck, color: '#48EFCF', text: 'Built-in security — role-based and document-level access control' },
  { icon: faCircleCheck, color: '#48EFCF', text: 'Cost efficient — no fine-tuning, just retrieval + prompting' },
]

const buildingOptions = [
  { icon: faGear, color: '#FF957D', title: 'ES|QL COMPLETION', description: 'Send prompts + context to LLMs directly within ES|QL queries' },
  { icon: faPlay, color: '#0B64DD', title: 'Playground UI', description: 'Build and test RAG interfaces visually — download Python code to ship' },
  { icon: faRobot, color: '#F04E98', title: 'Agent Builder', description: 'Full framework for stateful agentic RAG apps with tool use and memory' },
]

function RAGScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            AI + Search
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            RAG with <span className="gradient-text">Elasticsearch</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Retrieval Augmented Generation grounds your AI assistant in real, authoritative data — eliminating hallucination while keeping answers current.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {/* RAG Flow */}
          <motion.div
            className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className={`text-xs font-bold mb-4 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>RAG WORKFLOW</p>
            <div className="space-y-3">
              {ragSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <FontAwesomeIcon icon={step.icon} style={{ color: step.color }} className="text-xs" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{step.label}</p>
                    <p className={`text-[11px] ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>{step.description}</p>
                  </div>
                  {i < ragSteps.length - 1 && (
                    <FontAwesomeIcon icon={faArrowRight} className={`text-xs mt-2 ${isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'}`} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-3">
            {/* Advantages */}
            <motion.div
              className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className={`text-xs font-bold mb-3 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>WHY RAG WITH ELASTICSEARCH</p>
              <div className="space-y-2">
                {advantages.map((adv, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <FontAwesomeIcon icon={adv.icon} style={{ color: adv.color }} className="text-xs mt-0.5 flex-shrink-0" />
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/70'}`}>{adv.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Building options */}
            <motion.div
              className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className={`text-xs font-bold mb-3 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>BUILD YOUR RAG APP</p>
              <div className="space-y-2">
                {buildingOptions.map((opt, i) => (
                  <div key={opt.title} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${opt.color}20` }}
                    >
                      <FontAwesomeIcon icon={opt.icon} style={{ color: opt.color }} className="text-[10px]" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{opt.title}</p>
                      <p className={`text-[10px] ${isDark ? 'text-white/45' : 'text-elastic-dev-blue/55'}`}>{opt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RAGScene
