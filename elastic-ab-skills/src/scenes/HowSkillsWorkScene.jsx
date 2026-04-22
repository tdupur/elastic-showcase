import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faMagnifyingGlass, faBolt, faTools, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const steps = [
  {
    icon: faComments,
    color: '#48EFCF',
    step: '01',
    title: 'User Sends a Message',
    description: 'The agent receives a query. The base system prompt is always in context, but skills are not yet loaded.',
    example: '"Why is my checkout service returning 5xx errors?"',
  },
  {
    icon: faMagnifyingGlass,
    color: '#0B64DD',
    step: '02',
    title: 'Skill Selection',
    description: 'The agent evaluates the query against each skill\'s name and description. It loads the skill whose description best matches the intent.',
    example: 'observability.investigation skill selected ✓',
  },
  {
    icon: faBolt,
    color: '#FEC514',
    step: '03',
    title: 'Knowledge + Tools Loaded',
    description: 'The matched skill\'s Markdown instructions and scoped tools are injected into the context window — ready to guide the agent\'s response.',
    example: 'APM, log search, SLO, alert tools now available',
  },
  {
    icon: faCircleCheck,
    color: '#F04E98',
    step: '04',
    title: 'Expert Response Delivered',
    description: 'The agent follows the skill\'s step-by-step instructions, calls the appropriate tools, and delivers a domain-expert-quality answer.',
    example: 'Root cause identified: upstream DB latency spike at 14:22',
  },
]

function HowSkillsWorkScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            How It Works
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Dynamic skill <span className="gradient-text">activation</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Agents don't load all skills at once. Each query triggers smart selection — only the relevant skill and its tools enter the context window.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className={`p-5 rounded-xl border relative overflow-hidden ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.13 }}
            >
              {/* Step number watermark */}
              <div
                className="absolute top-3 right-4 text-5xl font-black opacity-[0.06] select-none"
                style={{ color: step.color }}
              >
                {step.step}
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <FontAwesomeIcon icon={step.icon} style={{ color: step.color }} />
                </div>
                <div>
                  <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                    {step.title}
                  </h3>
                </div>
              </div>

              <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/65'}`}>
                {step.description}
              </p>

              <div className={`text-xs font-mono px-3 py-2 rounded-lg ${
                isDark ? 'bg-black/30 text-elastic-teal' : 'bg-elastic-dev-blue/5 text-elastic-blue'
              }`}>
                {step.example}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`mt-5 p-4 rounded-xl border flex items-center gap-3 ${
            isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <FontAwesomeIcon icon={faTools} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
          <p className={`text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            <span className="font-semibold">Skills vs Tools:</span> Tools are discrete operations an agent can invoke. Skills are higher-level capability packs that <em>bundle</em> tools, instructions, and context for a specific task domain.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default HowSkillsWorkScene
