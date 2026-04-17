import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt, faChartLine, faFire, faCircleCheck, faCircleInfo, faSlidersH, faArrowRight
} from '@fortawesome/free-solid-svg-icons'

const searchPowerTiers = [
  {
    id: 'on-demand',
    icon: faBolt,
    color: '#48EFCF',
    label: 'On-demand',
    badge: 'Cost-Optimized',
    badgeColor: '#48EFCF',
    headline: 'Autoscales from a lower baseline',
    description:
      'Scales based on actual data and search load, with a lower minimum resource baseline. This flexibility results in more variable query latency and reduced maximum throughput.',
    bestFor: 'Dev / staging environments, low-traffic apps, cost-sensitive workloads',
    traits: [
      'Lowest minimum resource cost',
      'Variable query latency',
      'Reduced max throughput',
      'Autoscales with demand',
    ],
  },
  {
    id: 'performant',
    icon: faChartLine,
    color: '#0B64DD',
    label: 'Performant',
    badge: 'Recommended',
    badgeColor: '#0B64DD',
    headline: 'Consistently low latency',
    description:
      'Delivers consistently low latency and autoscales to accommodate moderately high query throughput. The balanced choice for production search applications.',
    bestFor: 'Production search apps, e-commerce, internal knowledge bases',
    traits: [
      'Consistently low latency',
      'Moderate-to-high throughput',
      'Autoscales for traffic bursts',
      'Balanced cost and performance',
    ],
  },
  {
    id: 'high-throughput',
    icon: faFire,
    color: '#F04E98',
    label: 'High-throughput',
    badge: 'Maximum Performance',
    badgeColor: '#F04E98',
    headline: 'Optimized for very high query volumes',
    description:
      'Optimized for high-throughput scenarios, autoscaling to maintain query latency even at very high query volumes. Ideal for mission-critical applications with demanding SLAs.',
    bestFor: 'High-traffic portals, real-time analytics, mission-critical apps',
    traits: [
      'Highest throughput capacity',
      'Maintains latency under load',
      'Aggressive autoscaling',
      'Premium resource provisioning',
    ],
  },
]

const otherSettings = [
  {
    icon: faCircleInfo,
    color: '#FF957D',
    label: 'Search Boost Window',
    description:
      'Controls how much time-series data (with @timestamp) is kept in the fast cache layer as "search-ready". A larger window = more data in cache = faster queries on recent data.',
  },
  {
    icon: faSlidersH,
    color: '#FEC514',
    label: 'Data Retention',
    description:
      'Set a maximum or default retention period for data streams. Data older than the retention policy is permanently deleted from your project.',
  },
]

function SearchPowerScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [selected, setSelected] = useState('performant')

  const activeTier = searchPowerTiers.find(t => t.id === selected)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Search AI Lake Settings
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Tune with <span className="gradient-text">Search Power</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Search Power controls how fast your serverless project responds to queries. Choose the right tier to balance cost and performance.
          </p>
        </motion.div>

        {/* Tier selector */}
        <div className="flex gap-3 mb-5 justify-center">
          {searchPowerTiers.map((tier, i) => (
            <motion.button
              key={tier.id}
              onClick={() => setSelected(tier.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                selected === tier.id
                  ? isDark
                    ? 'border-transparent text-white'
                    : 'border-transparent text-white'
                  : isDark
                    ? 'bg-white/[0.04] border-white/10 text-white/60 hover:text-white/80'
                    : 'bg-white border-elastic-dev-blue/15 text-elastic-dev-blue/60 hover:text-elastic-dev-blue/80'
              }`}
              style={selected === tier.id ? { backgroundColor: tier.color } : {}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FontAwesomeIcon icon={tier.icon} className="text-xs" />
              {tier.label}
            </motion.button>
          ))}
        </div>

        {/* Active tier detail */}
        {activeTier && (
          <motion.div
            key={activeTier.id}
            className={`p-6 rounded-xl border mb-5 ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${activeTier.color}20` }}
              >
                <FontAwesomeIcon icon={activeTier.icon} style={{ color: activeTier.color }} className="text-xl" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className={`font-extrabold text-xl ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                    {activeTier.label}
                  </h3>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${activeTier.badgeColor}20`, color: activeTier.badgeColor }}
                  >
                    {activeTier.badge}
                  </span>
                </div>
                <p className={`text-sm font-medium mb-2 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                  {activeTier.headline}
                </p>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/70'}`}>
                  {activeTier.description}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {activeTier.traits.map(trait => (
                    <div key={trait} className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCircleCheck} style={{ color: activeTier.color }} className="text-xs flex-shrink-0" />
                      <span className={`text-xs ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>{trait}</span>
                    </div>
                  ))}
                </div>
                <div className={`text-xs px-3 py-2 rounded-lg ${isDark ? 'bg-white/5 text-white/50' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/60'}`}>
                  <span className="font-semibold">Best for:</span> {activeTier.bestFor}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other settings row */}
        <div className="grid grid-cols-2 gap-3">
          {otherSettings.map((s, i) => (
            <motion.div
              key={s.label}
              className={`p-4 rounded-xl border flex gap-3 items-start ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${s.color}20` }}
              >
                <FontAwesomeIcon icon={s.icon} style={{ color: s.color }} className="text-xs" />
              </div>
              <div>
                <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{s.label}</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPowerScene
