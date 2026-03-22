import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell, faFireFlameCurved, faEyeSlash, faClock, faChartLine, faWrench
} from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faEyeSlash,
    color: '#F04E98',
    title: 'No Visibility',
    description: 'Cluster health degrades silently. By the time you notice, users are already impacted.',
  },
  {
    icon: faFireFlameCurved,
    color: '#FF957D',
    title: 'Firefighting Mode',
    description: 'Teams spend more time reacting to incidents than preventing them. MTTR stays high.',
  },
  {
    icon: faBell,
    color: '#FEC514',
    title: 'Alert Fatigue',
    description: 'Too many low-signal alerts. Critical events get lost in the noise.',
  },
  {
    icon: faClock,
    color: '#0B64DD',
    title: 'Slow Root Cause',
    description: 'Correlating metrics, logs, and events manually takes hours. Problems compound.',
  },
  {
    icon: faChartLine,
    color: '#48EFCF',
    title: 'Performance Blind Spots',
    description: 'Shard imbalances, heap pressure, and JVM issues go undetected until they cause outages.',
  },
  {
    icon: faWrench,
    color: '#F04E98',
    title: 'Internal Teams Stretched',
    description: 'Running Elasticsearch well requires deep expertise that most ops teams simply don\'t have on hand.',
  },
]

function ChallengeScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-pink' : 'text-elastic-blue'}`}>
            The Problem
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Operating Elasticsearch{' '}
            <span className="gradient-text">Is Hard</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Self-managed clusters come with real operational overhead — visibility gaps, slow diagnosis, and stretched teams.
          </p>
        </motion.div>

        {/* Problem grid */}
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
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${problem.color}15, transparent 60%)`,
                }}
              />

              {/* Left accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                style={{ backgroundColor: problem.color, opacity: 0.6 }}
              />

              <div className="relative">
                {/* Icon */}
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

        {/* Bottom callout */}
        <motion.div
          className={`mt-4 p-4 rounded-xl border text-center ${
            isDark
              ? 'bg-elastic-teal/5 border-elastic-teal/20'
              : 'bg-elastic-blue/5 border-elastic-blue/20'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`text-paragraph text-base ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            <span className="font-semibold">AutoOps via Cloud Connect</span> solves this — bringing Elastic Cloud-grade intelligence to your self-managed deployments.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
