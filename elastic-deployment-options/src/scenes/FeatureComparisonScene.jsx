import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShieldHalved, faServer, faBell, faDatabase, faPlug, faCode
} from '@fortawesome/free-solid-svg-icons'

// cell values
const YES = 'yes'
const NO = 'no'
const FULL = 'full'
const LIMITED = 'limited'
const MANAGED = 'managed'
const AUTO = 'auto'
const CUSTOM = 'custom'
const PLANNED = 'planned'

const sections = [
  {
    id: 'security',
    icon: faShieldHalved,
    label: 'Security',
    color: '#F04E98',
    cols: ['Self-Managed / ECE / ECK', 'Cloud Hosted', 'Serverless'],
    rows: [
      { feature: 'Security configurations', values: [FULL, LIMITED, LIMITED] },
      { feature: 'Authentication realms', values: [YES, YES, 'Via Elastic Cloud only'] },
      { feature: 'Custom roles', values: [YES, YES, YES] },
      { feature: 'Audit logging', values: [YES, YES, NO] },
    ],
  },
  {
    id: 'infra',
    icon: faServer,
    label: 'Infrastructure',
    color: '#FF957D',
    cols: ['Self-Managed', 'ECE / ECK', 'Cloud Hosted', 'Serverless'],
    rows: [
      { feature: 'Hosting location', values: ['Any', 'Any', 'AWS / Azure / GCP', 'AWS / Azure / GCP'] },
      { feature: 'Hardware configuration', values: [FULL, FULL, LIMITED, MANAGED] },
      { feature: 'Autoscaling', values: [NO, YES, YES, AUTO] },
      { feature: 'High availability', values: [YES, YES, YES, MANAGED] },
      { feature: 'Shard / replica management', values: [YES, YES, YES, MANAGED] },
      { feature: 'Snapshot management', values: [CUSTOM, CUSTOM, YES, MANAGED] },
    ],
  },
  {
    id: 'monitoring',
    icon: faBell,
    label: 'Monitoring',
    color: '#FEC514',
    cols: ['Self-Managed / ECE / ECK', 'Cloud Hosted', 'Serverless'],
    rows: [
      { feature: 'Deployment health monitoring', values: ['AutoOps or monitoring cluster', 'AutoOps or monitoring cluster', MANAGED] },
      { feature: 'Alerting engine', values: ['Watcher + Kibana', 'Watcher + Kibana', 'Kibana alerts only'] },
      { feature: 'Watcher (custom watches)', values: [YES, YES, NO] },
    ],
  },
  {
    id: 'data',
    icon: faDatabase,
    label: 'Data Lifecycle',
    color: '#0B64DD',
    cols: ['Self-Managed / ECE / ECK', 'Cloud Hosted', 'Serverless'],
    rows: [
      { feature: 'Index Lifecycle Management (ILM)', values: [YES, YES, NO] },
      { feature: 'Data stream lifecycle', values: [YES, YES, YES] },
      { feature: 'Data tiers (hot / warm / cold / frozen)', values: [YES, YES, NO] },
      { feature: 'Snapshot & restore', values: [CUSTOM, YES, MANAGED] },
    ],
  },
  {
    id: 'integrations',
    icon: faPlug,
    label: 'Integrations',
    color: '#48EFCF',
    cols: ['Self-Managed / ECE / ECK', 'Cloud Hosted', 'Serverless'],
    rows: [
      { feature: 'Custom plugins & bundles', values: [YES, YES, NO] },
      { feature: 'Self-managed connectors', values: [YES, LIMITED, LIMITED] },
      { feature: 'Elasticsearch-Hadoop', values: [YES, YES, NO] },
      { feature: 'Cross-cluster search (CCS)', values: [YES, YES, PLANNED] },
      { feature: 'Cross-cluster replication (CCR)', values: [YES, YES, PLANNED] },
    ],
  },
  {
    id: 'dev',
    icon: faCode,
    label: 'Development',
    color: '#F04E98',
    cols: ['Self-Managed / ECE / ECK', 'Cloud Hosted', 'Serverless'],
    rows: [
      { feature: 'Advanced testing features', values: [YES, NO, NO] },
      { feature: 'Java / JVM customization', values: [YES, NO, NO] },
    ],
  },
]

const valueDisplay = {
  [YES]: { label: '✓ Yes', cls: 'text-elastic-teal font-semibold' },
  [NO]: { label: '✗ No', cls: 'text-elastic-pink font-semibold' },
  [FULL]: { label: 'Full control', cls: 'text-elastic-teal font-semibold' },
  [LIMITED]: { label: 'Limited', cls: 'text-elastic-yellow font-semibold' },
  [MANAGED]: { label: 'Managed by Elastic', cls: 'text-elastic-teal font-semibold' },
  [AUTO]: { label: 'Automatic', cls: 'text-elastic-teal font-semibold' },
  [CUSTOM]: { label: 'Custom', cls: 'text-elastic-yellow font-semibold' },
  [PLANNED]: { label: '⏳ Planned', cls: 'text-elastic-yellow font-semibold' },
}

function CellValue({ val, isDark }) {
  const known = valueDisplay[val]
  if (known) {
    return <span className={`text-xs ${known.cls}`}>{known.label}</span>
  }
  return <span className={`text-xs ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>{val}</span>
}

function FeatureComparisonScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeSection, setActiveSection] = useState('security')

  const current = sections.find(s => s.id === activeSection)
  const colCount = current.cols.length + 1 // +1 for feature name

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Feature Availability
          </span>
          <h2 className={`text-headline text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What You Get <span className="gradient-text">Where</span>
          </h2>
          <p className={`text-paragraph text-sm mt-2 max-w-xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Feature availability varies by deployment. Click a category to drill in.
          </p>
        </motion.div>

        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                activeSection === sec.id
                  ? 'border-transparent text-white'
                  : isDark
                    ? 'border-white/15 text-white/50 hover:text-white/80'
                    : 'border-elastic-dev-blue/15 text-elastic-dev-blue/50 hover:text-elastic-dev-blue/80'
              }`}
              style={activeSection === sec.id ? { backgroundColor: sec.color } : {}}
            >
              <FontAwesomeIcon icon={sec.icon} className="text-xs" />
              {sec.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border overflow-hidden ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}
          >
            {/* Header row */}
            <div
              className="grid px-3 py-2"
              style={{ gridTemplateColumns: `1fr ${current.cols.map(() => '1fr').join(' ')}` }}
            >
              <div className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                Feature
              </div>
              {current.cols.map((col, i) => (
                <div key={i} className="text-center text-xs font-bold" style={{ color: current.color }}>
                  {col}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {current.rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid px-3 py-2.5 items-center ${
                  i % 2 === 0
                    ? isDark ? 'bg-white/[0.03]' : 'bg-elastic-dev-blue/[0.02]'
                    : isDark ? 'bg-white/[0.01]' : 'bg-white'
                }`}
                style={{ gridTemplateColumns: `1fr ${row.values.map(() => '1fr').join(' ')}` }}
              >
                <div className={`text-sm font-medium pr-4 ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>
                  {row.feature}
                </div>
                {row.values.map((val, vi) => (
                  <div key={vi} className="flex justify-center">
                    <CellValue val={val} isDark={isDark} />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className={`mt-4 text-center text-xs ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Source: elastic.co/docs/deploy-manage/deploy/deployment-comparison
        </motion.div>
      </div>
    </div>
  )
}

export default FeatureComparisonScene
