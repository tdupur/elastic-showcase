import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faServer, faArrowsRotate, faTriangleExclamation,
  faGear, faChartLine, faCircleXmark
} from '@fortawesome/free-solid-svg-icons'

const painPoints = [
  {
    icon: faServer,
    color: '#F04E98',
    title: 'Node & Shard Management',
    description: 'Teams spend weeks sizing clusters, allocating shards, and rebalancing nodes — before writing a single line of application code.',
  },
  {
    icon: faArrowsRotate,
    color: '#FF957D',
    title: 'Constant Version Upgrades',
    description: 'Every major release requires a coordinated upgrade window, rolling restarts, and thorough regression testing across your environments.',
  },
  {
    icon: faChartLine,
    color: '#FEC514',
    title: 'Unpredictable Scaling',
    description: 'Traffic spikes catch teams off guard. Manual scaling lags demand — leading to degraded performance or overprovisioned costs.',
  },
  {
    icon: faGear,
    color: '#48EFCF',
    title: 'Vector & ML Optimization',
    description: 'Tuning byte quantization, selecting embedding models, and managing ML node sizing is a full-time job — not a search feature.',
  },
  {
    icon: faTriangleExclamation,
    color: '#0B64DD',
    title: 'Infrastructure Overhead',
    description: 'Engineering cycles burn on storage tiers, JVM heap tuning, and cluster health monitoring instead of product differentiation.',
  },
]

function ChallengeScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            The Problem
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Search Infrastructure is a <span className="gradient-text">Full-Time Job</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Running Elasticsearch at scale forces teams to become infrastructure specialists instead of search engineers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              className={`p-5 rounded-xl border flex gap-4 items-start ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${point.color}20` }}
              >
                <FontAwesomeIcon icon={point.icon} style={{ color: point.color }} />
              </div>
              <div>
                <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {point.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/60'}`}>
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Summary card */}
          <motion.div
            className={`p-5 rounded-xl border flex gap-4 items-center ${
              isDark
                ? 'bg-elastic-pink/10 border-elastic-pink/20'
                : 'bg-elastic-pink/5 border-elastic-pink/20'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#F04E9830' }}>
              <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#F04E98' }} />
            </div>
            <div>
              <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                The Net Result
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/60'}`}>
                Slow time-to-market, unpredictable costs, and engineering talent wasted on undifferentiated infrastructure work.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ChallengeScene
