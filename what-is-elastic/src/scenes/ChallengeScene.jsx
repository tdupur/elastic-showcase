import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDatabase, faMagnifyingGlass, faTriangleExclamation, faClock, faServer, faUsers
} from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faMagnifyingGlass,
    color: '#F04E98',
    title: 'Search is Hard to Build',
    description: 'Relevant search experiences require complex ranking, NLP, and vector capabilities that take months to build from scratch.',
  },
  {
    icon: faDatabase,
    color: '#FF957D',
    title: 'Data Silos Everywhere',
    description: 'Logs, metrics, traces, and events live in separate tools. Correlating them during incidents wastes critical time.',
  },
  {
    icon: faTriangleExclamation,
    color: '#FEC514',
    title: 'Security Blind Spots',
    description: 'Threats hide in high-volume event data. Without unified detection and response, attacks go unnoticed.',
  },
  {
    icon: faClock,
    color: '#0B64DD',
    title: 'Slow Time to Insight',
    description: 'Querying large datasets with traditional tools is slow. Real-time analytics require infrastructure teams don\'t have.',
  },
  {
    icon: faServer,
    color: '#48EFCF',
    title: 'Scale Without Limits',
    description: 'Data volumes grow exponentially. Most platforms can\'t scale cost-effectively while maintaining query performance.',
  },
  {
    icon: faUsers,
    color: '#F04E98',
    title: 'Too Many Specialized Tools',
    description: 'Teams manage separate solutions for search, logging, APM, and SIEM — driving up cost and operational complexity.',
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
            Data is Everywhere.{' '}
            <span className="gradient-text">Insight is Not.</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Organizations struggle to search, monitor, and secure their data at scale — using fragmented tools that don't work together.
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
            <span className="font-semibold">Elastic</span> unifies search, observability, and security on a single open platform — so your teams stop fighting tools and start getting answers.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
