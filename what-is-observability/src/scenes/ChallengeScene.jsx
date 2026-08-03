import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLayerGroup, faBell, faClock, faEyeSlash, faServer, faRobot
} from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faLayerGroup,
    color: '#F04E98',
    title: 'Tool Sprawl',
    description: 'Separate tools for logs, metrics, and traces force teams to context-switch constantly. No single source of truth.',
  },
  {
    icon: faBell,
    color: '#FEC514',
    title: 'Alert Fatigue',
    description: 'Disconnected alerting systems fire in silos. Engineers miss critical signals buried in noise.',
  },
  {
    icon: faClock,
    color: '#FF957D',
    title: 'Slow MTTR',
    description: 'Manually correlating data across tools to find root cause takes hours. Every minute of downtime costs revenue.',
  },
  {
    icon: faEyeSlash,
    color: '#0B64DD',
    title: 'Blind Spots',
    description: 'No unified view across applications, infrastructure, and user experience leaves critical gaps in visibility.',
  },
  {
    icon: faServer,
    color: '#48EFCF',
    title: 'Storage Costs',
    description: 'Storing full-fidelity observability data at scale is expensive. Teams are forced to sample or delete data.',
  },
  {
    icon: faRobot,
    color: '#F04E98',
    title: 'No AI Assistance',
    description: 'Engineers manually sift through petabytes of telemetry. There is no intelligent layer to surface what matters.',
  },
]

function ChallengeScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-pink' : 'text-elastic-blue'}`}>
            The Problem
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Modern Observability{' '}
            <span className="gradient-text">Is Broken</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Teams are drowning in disconnected data, siloed tools, and reactive firefighting — instead of proactively understanding their systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              className={`relative p-4 rounded-xl border overflow-hidden group ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white/80 border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{ background: `radial-gradient(circle at 0% 0%, ${problem.color}15, transparent 60%)` }}
              />
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                style={{ backgroundColor: problem.color, opacity: 0.6 }}
              />
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${problem.color}20` }}
                >
                  <FontAwesomeIcon icon={problem.icon} style={{ color: problem.color }} className="text-lg" />
                </div>
                <h3 className={`text-headline text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {problem.title}
                </h3>
                <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`mt-4 p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/20'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`text-paragraph text-base ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            <span className="font-semibold">Elastic Observability</span> unifies all your telemetry into one platform — with AI to cut through the noise.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
