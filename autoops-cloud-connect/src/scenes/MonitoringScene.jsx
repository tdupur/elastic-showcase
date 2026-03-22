import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeartPulse, faMicrochip, faMemory, faHardDrive,
  faLayerGroup, faMagnifyingGlass, faArrowsUpDown, faDatabase,
  faNetworkWired, faShieldHalved, faClockRotateLeft
} from '@fortawesome/free-solid-svg-icons'

const categories = [
  {
    id: 'cluster',
    label: 'Cluster Health',
    color: '#48EFCF',
    icon: faHeartPulse,
    metrics: [
      'Cluster status (green / yellow / red)',
      'Node availability & join/leave events',
      'Unassigned & initializing shards',
      'Split-brain detection',
      'Master node stability',
    ],
  },
  {
    id: 'resources',
    label: 'Node Resources',
    color: '#0B64DD',
    icon: faMicrochip,
    metrics: [
      'CPU utilisation per node',
      'JVM heap usage & GC pressure',
      'Memory (OS & JVM)',
      'Disk usage & watermark breaches',
      'Thread pool queue depth & rejections',
    ],
  },
  {
    id: 'shards',
    label: 'Shards & Indices',
    color: '#F04E98',
    icon: faLayerGroup,
    metrics: [
      'Shard count per node',
      'Shard sizes & imbalance',
      'Index growth rate',
      'Segment counts & merge activity',
      'ILM policy transition events',
    ],
  },
  {
    id: 'performance',
    label: 'Search Performance',
    color: '#FEC514',
    icon: faMagnifyingGlass,
    metrics: [
      'Search latency (p50 / p95 / p99)',
      'Query cache hit rate',
      'Slow query detection',
      'Scroll context leaks',
      'Field data circuit breaker trips',
    ],
  },
  {
    id: 'indexing',
    label: 'Indexing Performance',
    color: '#FF957D',
    icon: faArrowsUpDown,
    metrics: [
      'Indexing rate & latency',
      'Bulk rejection rate',
      'Refresh & flush intervals',
      'Translog size & commit frequency',
      'Ingest pipeline failure rates',
    ],
  },
  {
    id: 'storage',
    label: 'Storage & ILM',
    color: '#48EFCF',
    icon: faDatabase,
    metrics: [
      'Hot / warm / cold / frozen tier usage',
      'Snapshot repository health',
      'SLM policy execution status',
      'Searchable snapshot cache hit rates',
      'Rollover condition detection',
    ],
  },
]

function MonitoringScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeCategory, setActiveCategory] = useState(0)

  const cat = categories[activeCategory]

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
            Observability
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What AutoOps <span className="gradient-text">Monitors</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Hundreds of signals across every layer of your Elasticsearch cluster — continuously, in real time.
          </p>
        </motion.div>

        {/* Category selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === i
                  ? 'text-elastic-dev-blue border-transparent'
                  : isDark
                    ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    : 'bg-white/60 border-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-white'
              }`}
              style={activeCategory === i ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <FontAwesomeIcon icon={cat.icon} className="text-xs" />
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Metric detail */}
        <motion.div
          key={activeCategory}
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Metric list */}
          <div className={`p-6 rounded-xl border ${
            isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
          }`}
            style={{ borderLeftWidth: '4px', borderLeftColor: cat.color }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                <FontAwesomeIcon icon={cat.icon} style={{ color: cat.color }} className="text-lg" />
              </div>
              <h3 className={`text-headline text-xl font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                {cat.label}
              </h3>
            </div>

            <ul className="space-y-3">
              {cat.metrics.map((metric, i) => (
                <motion.li
                  key={metric}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className={`text-sm ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
                    {metric}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Stats panel */}
          <div className="space-y-4">
            <div className={`p-5 rounded-xl border ${
              isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}>
              <p className={`text-xs uppercase tracking-wider font-semibold mb-4 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                AutoOps at a Glance
              </p>
              {[
                { label: 'Metrics monitored', value: '200+', color: '#48EFCF' },
                { label: 'Data retention', value: '10 days', color: '#0B64DD' },
                { label: 'Minimum ES version', value: '7.17.x', color: '#F04E98' },
                { label: 'Cost', value: 'Free', color: '#FEC514' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                  style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(16,28,63,0.06)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <span className={`text-sm ${isDark ? 'text-elastic-light-grey/60' : 'text-elastic-ink'}`}>
                    {stat.label}
                  </span>
                  <span className="text-code text-sm font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className={`p-5 rounded-xl border ${
              isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
            }`}>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faClockRotateLeft} className={`mt-0.5 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                <p className={`text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                  AutoOps correlates current state with historical data to distinguish anomalies from trends — reducing false positives and sharpening root-cause signals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MonitoringScene
