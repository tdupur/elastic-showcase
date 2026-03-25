import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faBook, faFlask, faComments, faCirclePlay } from '@fortawesome/free-solid-svg-icons'

const FALLBACK_DEMO_URL = null

const actions = [
  {
    icon: faFlask,
    color: '#48EFCF',
    title: 'Start a Free Trial',
    description: 'Try Elastic Cloud Hosted or Serverless free for 14 days — no credit card required.',
    cta: 'Start Trial',
    url: 'https://cloud.elastic.co/registration',
  },
  {
    icon: faBook,
    color: '#0B64DD',
    title: 'Deployment Comparison Docs',
    description: 'Detailed feature-by-feature comparison across all Elastic deployment types.',
    cta: 'View Docs',
    url: 'https://www.elastic.co/docs/deploy-manage/deploy/deployment-comparison',
  },
  {
    icon: faComments,
    color: '#F04E98',
    title: 'Talk to Your Elastic Team',
    description: 'Not sure which deployment fits your use case? Your Elastic team can help you decide.',
    cta: 'Contact Us',
    url: null,
  },
  {
    icon: faCirclePlay,
    color: '#FF957D',
    title: 'Click-Through Demo',
    description: 'Walk through Elastic Cloud interactively at your own pace. Set the URL via Settings → Click-Through Demo URL.',
    cta: 'Launch Demo',
    url: '__DEMO_URL__',
  },
]

const cycleColors = ['#48EFCF', '#0B64DD', '#F04E98', '#FF957D', '#FEC514', '#48EFCF']

function NextStepsScene({ onNavigate, scenes, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [backHovered, setBackHovered] = useState(false)

  const agendaIndex = scenes?.findIndex(s => s.id === 'agenda') ?? 2

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
          {actions.map((action, index) => {
            const resolvedUrl = action.url === '__DEMO_URL__' ? (demoUrl || null) : action.url
            return (
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
                  {resolvedUrl ? (
                    <a
                      href={resolvedUrl}
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
            )
          })}
        </div>

        {/* Back to Topics */}
        <motion.div
          className="mt-6 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md"
            onClick={() => onNavigate?.(agendaIndex)}
            onHoverStart={() => setBackHovered(true)}
            onHoverEnd={() => setBackHovered(false)}
            animate={{
              backgroundColor: backHovered
                ? cycleColors
                : isDark ? 'rgba(255,255,255,0.10)' : 'rgba(16,28,63,0.08)',
            }}
            transition={
              backHovered
                ? { backgroundColor: { duration: 2, repeat: Infinity, ease: 'linear' } }
                : { duration: 0.3 }
            }
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{ color: backHovered ? '#fff' : isDark ? 'rgba(255,255,255,0.6)' : 'rgba(16,28,63,0.55)' }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            Back to Topics
          </motion.button>
        </motion.div>

      </div>
    </div>
  )
}

export default NextStepsScene
