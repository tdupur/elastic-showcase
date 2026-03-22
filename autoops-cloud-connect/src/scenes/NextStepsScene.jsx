import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook, faFlask, faRocket, faComments, faArrowRight, faCheck, faCirclePlay, faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

const actions = [
  {
    icon: faFlask,
    color: '#48EFCF',
    title: 'Connect Your First Cluster',
    description: 'Install Elastic Agent on your ECE, ECK, or self-managed cluster and launch AutoOps in minutes.',
    cta: 'Start Setup',
    url: 'https://www.elastic.co/docs/deploy-manage/monitor/autoops/cc-connect-self-managed-to-autoops',
  },
  {
    icon: faBook,
    color: '#0B64DD',
    title: 'Read the Documentation',
    description: 'Full installation guides, troubleshooting, connectivity checks, and ECK AutoOpsAgentPolicy reference.',
    cta: 'View Docs',
    url: 'https://www.elastic.co/docs/deploy-manage/monitor/autoops',
  },
  {
    icon: faCirclePlay,
    color: '#FF957D',
    title: 'Click-Through Demo',
    description: 'Walk through the AutoOps + Cloud Connect implementation experience interactively at your own pace.',
    cta: 'Launch Demo',
    url: 'https://elastic.navattic.com/90h00op',
  },
  {
    icon: faComments,
    color: '#F04E98',
    title: 'Talk to Your Elastic Team',
    description: 'Ready to go further? Your Elastic team can help with setup, review your cluster health, and plan next steps.',
    cta: 'Get in Touch',
    url: 'https://www.elastic.co/contact',
  },
  {
    icon: faRocket,
    color: '#FEC514',
    title: 'Explore Cloud Connect',
    description: 'AutoOps is just the start. Cloud Connect also enables Elastic Inference Service for AI-powered search.',
    cta: 'Learn More',
    url: 'https://www.elastic.co/docs/deploy-manage/cloud-connect',
  },
]

const checklist = [
  'Install Elastic Agent alongside your cluster',
  'Configure AUTOOPS_ES_URL and API key',
  'Register with Elastic Cloud via Cloud Connect',
  'Launch AutoOps from your Elastic Cloud console',
  'Configure notification channels (Slack, PagerDuty…)',
]

// Elastic brand colors to cycle through on hover
const cycleColors = ['#48EFCF', '#0B64DD', '#F04E98', '#FF957D', '#FEC514', '#48EFCF']

function NextStepsScene({ onNavigate }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [backHovered, setBackHovered] = useState(false)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Get Started
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Your <span className="gradient-text">Next Steps</span>
          </h2>
          <p className={`text-paragraph text-base mt-2 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            AutoOps for Cloud Connect is free, quick to set up, and works with your existing cluster today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Action cards */}
          <div className="space-y-1.5">
            {actions.map((action, index) => (
              <motion.div
                key={action.title}
                className={`group relative p-3 rounded-xl border overflow-hidden transition-all ${
                  isDark
                    ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    : 'bg-white/80 border-elastic-dev-blue/10 hover:border-elastic-dev-blue/25'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.07 }}
                whileHover={{ scale: 1.01 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: `radial-gradient(circle at 0% 50%, ${action.color}12, transparent 60%)` }}
                />
                <div className="relative flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${action.color}20` }}
                  >
                    <FontAwesomeIcon icon={action.icon} style={{ color: action.color }} className="text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                      {action.title}
                    </h3>
                    <p className={`text-xs leading-snug ${isDark ? 'text-white/45' : 'text-elastic-dev-blue/50'}`}>
                      {action.description}
                    </p>
                  </div>
                  <a
                    href={action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                      isDark
                        ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/70 hover:bg-elastic-dev-blue/20 hover:text-elastic-dev-blue'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {action.cta}
                    <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Checklist */}
          <motion.div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={`text-headline text-base font-bold mb-3 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
              Setup Checklist
            </h3>
            <div className="space-y-2.5">
              {checklist.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDark ? 'border-elastic-teal/40' : 'border-elastic-blue/40'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-elastic-teal/30' : 'bg-elastic-blue/30'}`} />
                  </div>
                  <p className={`text-sm ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className={`mt-4 p-3 rounded-xl ${
                isDark ? 'bg-elastic-teal/10 border border-elastic-teal/20' : 'bg-elastic-blue/5 border border-elastic-blue/15'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className={`text-sm font-semibold mb-0.5 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                Free. No migration. Minutes to set up.
              </p>
              <p className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                AutoOps via Cloud Connect works with your existing cluster on ES 7.17+ across all self-managed license types.
              </p>
            </motion.div>

            {/* Back to Topics button — inside checklist panel, below the Free message */}
            <motion.div
              className="mt-4 flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md"
                onClick={() => onNavigate?.(1)}
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

          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NextStepsScene
