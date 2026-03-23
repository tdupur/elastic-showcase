import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faServer, faChartLine, faClock, faGear, faTriangleExclamation, faUsers
} from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faServer,
    color: '#F04E98',
    title: 'Cluster Overhead',
    description: 'Provisioning nodes, configuring data tiers, and tuning shard allocation consumes engineering time that should go to your data.',
  },
  {
    icon: faChartLine,
    color: '#FF957D',
    title: 'Capacity Planning Guesswork',
    description: 'Predicting traffic peaks and pre-provisioning resources leads to over-spend or under-performance — rarely just right.',
  },
  {
    icon: faClock,
    color: '#FEC514',
    title: 'Manual Upgrades & Patches',
    description: 'Version upgrades require testing, scheduling, and execution windows. Staying current is a recurring operational burden.',
  },
  {
    icon: faGear,
    color: '#0B64DD',
    title: 'Infrastructure Management',
    description: 'Managing cloud VMs, storage volumes, and networking adds complexity that distracts from your core application work.',
  },
  {
    icon: faTriangleExclamation,
    color: '#48EFCF',
    title: 'Backup & Recovery Risk',
    description: 'Snapshot scheduling, restore testing, and cross-region replication are your responsibility — and easy to overlook.',
  },
  {
    icon: faUsers,
    color: '#F04E98',
    title: 'Deep Expertise Required',
    description: 'Running Elasticsearch well at scale demands specialist knowledge most teams have to build from scratch or hire for.',
  },
]

function ChallengeScene() {
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
            The Challenge
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Infrastructure Gets{' '}
            <span className="gradient-text">In the Way</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Traditional Elasticsearch deployments shift focus from your data to your infrastructure. That's time and energy that shouldn't be spent this way.
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
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: problem.color, opacity: 0.6 }} />
              <div className="relative">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${problem.color}20` }}>
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
            <span className="font-semibold">Elastic Cloud Serverless</span> eliminates all of this — so you can focus entirely on your data, not your cluster.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
