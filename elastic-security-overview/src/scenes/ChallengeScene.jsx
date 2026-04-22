import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMoneyBillWave, faPuzzlePiece, faLockOpen, faDatabase, faTriangleExclamation, faClock
} from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faMoneyBillWave,
    color: '#F04E98',
    title: 'Per-Endpoint Fees',
    description: 'Security vendors charge per endpoint, per user, per GB — costs scale against you as your environment grows.',
  },
  {
    icon: faPuzzlePiece,
    color: '#FF957D',
    title: 'Separate SOAR Required',
    description: 'SIEM tools alone can\'t respond. You must buy a separate SOAR platform just to make your SIEM functional.',
  },
  {
    icon: faLockOpen,
    color: '#FEC514',
    title: 'Proprietary AI Black Boxes',
    description: 'Vendor AI lacks transparency. You can\'t see how detections work, tune logic, or trust what you can\'t inspect.',
  },
  {
    icon: faDatabase,
    color: '#0B64DD',
    title: 'Forced Data Centralization',
    description: 'Moving all security data to one vendor creates cost, latency, and compliance risk. Silos reduce visibility.',
  },
  {
    icon: faTriangleExclamation,
    color: '#48EFCF',
    title: 'Alert Fatigue',
    description: 'Security teams are buried in low-signal alerts. Critical incidents get missed in the noise.',
  },
  {
    icon: faClock,
    color: '#F04E98',
    title: 'Slow Investigation & Response',
    description: 'Manually correlating data across fragmented tools means hours to root cause. MTTR stays unacceptably high.',
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
            Security Is <span className="gradient-text">Built to Sell</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            The security industry imposes hidden taxes — per-endpoint fees, fragmented tools, opaque AI, and forced vendor lock-in.
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
            <span className="font-semibold">Elastic Security</span> eliminates these taxes — one platform, transparent AI, no per-endpoint fees.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
