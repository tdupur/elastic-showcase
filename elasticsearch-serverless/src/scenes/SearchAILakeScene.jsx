import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faServer, faDatabase, faGaugeHigh, faClock, faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

const layers = [
  {
    icon: faServer,
    color: '#48EFCF',
    label: 'Cache Layer',
    badge: 'Search-Ready',
    description: 'Recent and frequently queried data served at high speed. Time-series data within the Search Boost Window lands here.',
  },
  {
    icon: faDatabase,
    color: '#0B64DD',
    label: 'General Storage',
    badge: 'Cost-Efficient',
    description: 'All ingested data lives here by default. Cost-optimized object storage that scales without limits.',
  },
]

const searchPowerOptions = [
  { label: 'On-demand', detail: 'Autoscales with variable latency and lower baseline cost' },
  { label: 'Performant', detail: 'Consistent low latency with moderate throughput' },
  { label: 'High-throughput', detail: 'Maximum query volume while maintaining latency' },
]

const settings = [
  {
    icon: faClock,
    color: '#FEC514',
    title: 'Search Boost Window',
    subtitle: 'Elasticsearch projects only',
    description: 'Determines what portion of time-series data (requires @timestamp) is promoted into the cache layer and becomes search-ready. Widening the window increases cache volume.',
  },
  {
    icon: faDatabase,
    color: '#F04E98',
    title: 'Data Retention',
    subtitle: 'All project types',
    description: 'Configure max and default retention periods via data streams. Ensures consistent data lifecycle management across your entire project.',
  },
]

function SearchAILakeScene() {
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
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Storage Architecture
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Search <span className="gradient-text">AI Lake</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            A two-layer storage model that balances cost-efficiency with high-speed search — configurable to match your performance and budget targets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">

          {/* Left — Architecture layers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className={`flex items-center gap-2 mb-3 px-1`}>
              <FontAwesomeIcon icon={faLayerGroup} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
              <span className={`text-sm font-semibold ${isDark ? 'text-white/70' : 'text-elastic-dark-ink/70'}`}>
                Two-Layer Architecture
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.label}
                  className={`p-4 rounded-xl border group relative overflow-hidden ${
                    isDark
                      ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      : 'bg-white border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
                  }`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 10% 90%, ${layer.color}12, transparent 60%)` }}
                  />
                  <div className="relative flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${layer.color}20` }}>
                      <FontAwesomeIcon icon={layer.icon} style={{ color: layer.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{layer.label}</h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
                        >
                          {layer.badge}
                        </span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{layer.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Search-Ready Data note */}
            <motion.div
              className={`mt-3 p-3 rounded-lg border text-xs ${
                isDark ? 'bg-elastic-teal/5 border-elastic-teal/20 text-elastic-light-grey/70' : 'bg-elastic-blue/5 border-elastic-blue/20 text-elastic-ink'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <span className={`font-semibold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>Search-ready data</span>
              {' '}= all non-time-series data + time-series data within your Search Boost Window.
            </motion.div>
          </motion.div>

          {/* Right — Search Power + other settings */}
          <div className="flex flex-col gap-3">

            {/* Search Power card */}
            <motion.div
              className={`p-4 rounded-xl border group relative overflow-hidden ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at 90% 10%, #48EFCF12, transparent 60%)` }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#48EFCF20' }}>
                    <FontAwesomeIcon icon={faGaugeHigh} style={{ color: '#48EFCF' }} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>Search Power</h3>
                    <p className="text-xs font-medium mt-0.5" style={{ color: '#48EFCF' }}>Elasticsearch projects only</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {searchPowerOptions.map((opt, i) => (
                    <motion.div
                      key={opt.label}
                      className={`flex items-start gap-2 p-2 rounded-lg ${
                        isDark ? 'bg-white/[0.04]' : 'bg-elastic-dev-blue/5'
                      }`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <span className={`text-xs font-bold min-w-[90px] mt-0.5 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                        {opt.label}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                        {opt.detail}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Search Boost Window + Data Retention */}
            {settings.map((setting, index) => (
              <motion.div
                key={setting.title}
                className={`p-4 rounded-xl border group relative overflow-hidden ${
                  isDark
                    ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    : 'bg-white border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 90% 10%, ${setting.color}12, transparent 60%)` }}
                />
                <div className="relative flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${setting.color}20` }}>
                    <FontAwesomeIcon icon={setting.icon} style={{ color: setting.color }} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{setting.title}</h3>
                    <p className="text-xs font-medium mt-0.5" style={{ color: setting.color }}>{setting.subtitle}</p>
                    <p className={`text-sm mt-1.5 ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{setting.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </div>
  )
}

export default SearchAILakeScene
