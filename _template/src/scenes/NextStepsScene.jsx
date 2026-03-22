import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBook, faFlask, faComments } from '@fortawesome/free-solid-svg-icons'

// TODO: Replace with your feature-specific next steps
const actions = [
  {
    icon: faFlask,
    color: '#48EFCF',
    title: 'Try It Now',
    description: 'Replace with your primary CTA — e.g. a trial, hands-on lab, or setup guide.',
    cta: 'Get Started',
    url: null,
  },
  {
    icon: faBook,
    color: '#0B64DD',
    title: 'Read the Docs',
    description: 'Link to the relevant Elastic documentation for this feature.',
    cta: 'View Docs',
    url: 'https://www.elastic.co/docs',
  },
  {
    icon: faComments,
    color: '#F04E98',
    title: 'Talk to Your Elastic Team',
    description: 'Your Elastic team can help you plan and implement this feature.',
    cta: 'Contact Us',
    url: null,
  },
]

function NextStepsScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Get Started
          </span>
          <h2 className={`text-headline text-5xl md:text-6xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Your <span className="gradient-text">Next Steps</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              className={`group relative p-5 rounded-xl border overflow-hidden transition-all ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white/80 border-elastic-dev-blue/10 hover:border-elastic-dev-blue/25'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <FontAwesomeIcon icon={action.icon} style={{ color: action.color }} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{action.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>{action.description}</p>
                </div>
                {action.url ? (
                  <a
                    href={action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all ${
                      isDark
                        ? 'bg-white/10 text-white/70 hover:bg-white/20'
                        : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/70 hover:bg-elastic-dev-blue/20'
                    }`}
                  >
                    {action.cta} <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </a>
                ) : (
                  <span className={`text-sm font-semibold px-4 py-2 rounded-full ${
                    isDark ? 'bg-white/10 text-white/40' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/40'
                  }`}>
                    {action.cta}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NextStepsScene
