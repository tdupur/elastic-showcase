import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTriangleExclamation, faClock, faGear, faLock, faMoneyBillWave, faCircleQuestion
} from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faCircleQuestion,
    color: '#F04E98',
    title: 'Analysis Paralysis',
    description: 'Five deployment types, dozens of features. Without a clear framework, teams spend weeks evaluating instead of deploying.',
  },
  {
    icon: faGear,
    color: '#FF957D',
    title: 'Hidden Operational Costs',
    description: 'Self-managed sounds free — until you factor in patching, upgrades, HA setup, monitoring, and on-call rotations.',
  },
  {
    icon: faLock,
    color: '#FEC514',
    title: 'Compliance & Control Trade-offs',
    description: 'Regulated industries need data sovereignty. But locking into self-managed means losing managed-service conveniences.',
  },
  {
    icon: faClock,
    color: '#0B64DD',
    title: 'Slow Time to Value',
    description: 'Provisioning bare-metal clusters or navigating cloud enterprise setups can delay first query by weeks or months.',
  },
  {
    icon: faMoneyBillWave,
    color: '#48EFCF',
    title: 'Unpredictable Pricing',
    description: 'Provisioned resources sit idle. Serverless usage-based billing surprises teams at month-end.',
  },
  {
    icon: faTriangleExclamation,
    color: '#F04E98',
    title: 'Feature Gaps Discovered Late',
    description: 'Teams choose Serverless for simplicity, then hit missing APIs — audit logging, custom plugins, cross-cluster replication.',
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
            Choosing the Wrong Deployment{' '}
            <span className="gradient-text">Costs You</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Every deployment model has a different operational burden, feature set, and pricing model. The wrong choice compounds over time.
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
            This showcase breaks down all three deployment models — responsibility by responsibility, feature by feature — so you walk away with clarity.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
