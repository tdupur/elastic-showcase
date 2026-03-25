import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDatabase, faShieldHalved, faGear, faCube, faNetworkWired, faServer
} from '@fortawesome/free-solid-svg-icons'

// ✅ = Elastic owns it  👤 = Customer owns it  ↔ = Shared
const ELASTIC = 'elastic'
const CUSTOMER = 'customer'
const SHARED = 'shared'

const categories = [
  {
    id: 'data',
    icon: faDatabase,
    label: 'Data',
    color: '#0B64DD',
    rows: [
      { item: 'Data ingestion & pipelines', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: CUSTOMER },
      { item: 'Data classification & hygiene', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: CUSTOMER },
      { item: 'Index mappings & settings', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: CUSTOMER },
      { item: 'Retention & lifecycle policies', selfManaged: CUSTOMER, hosted: SHARED, serverless: SHARED },
    ],
  },
  {
    id: 'security',
    icon: faShieldHalved,
    label: 'Security',
    color: '#F04E98',
    rows: [
      { item: 'TLS / encryption at rest & in transit', selfManaged: CUSTOMER, hosted: SHARED, serverless: ELASTIC },
      { item: 'Access controls & custom roles', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: CUSTOMER },
      { item: 'Audit logging', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: ELASTIC },
      { item: 'IP filters & PrivateLink', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: CUSTOMER },
      { item: 'Authentication realms (LDAP/SAML)', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: SHARED },
    ],
  },
  {
    id: 'operations',
    icon: faGear,
    label: 'Operations',
    color: '#FF957D',
    rows: [
      { item: 'Cluster health monitoring', selfManaged: CUSTOMER, hosted: SHARED, serverless: ELASTIC },
      { item: 'Alerting & incident response', selfManaged: CUSTOMER, hosted: SHARED, serverless: SHARED },
      { item: 'Backup & snapshot management', selfManaged: CUSTOMER, hosted: SHARED, serverless: ELASTIC },
      { item: 'Plugin & bundle configuration', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: ELASTIC },
      { item: 'Version upgrades', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: ELASTIC },
    ],
  },
  {
    id: 'orchestration',
    icon: faCube,
    label: 'Orchestration',
    color: '#FEC514',
    rows: [
      { item: 'Container / pod management', selfManaged: CUSTOMER, hosted: ELASTIC, serverless: ELASTIC },
      { item: 'Deployment sizing & capacity', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: ELASTIC },
      { item: 'Autoscaling', selfManaged: CUSTOMER, hosted: SHARED, serverless: ELASTIC },
      { item: 'High availability / DR', selfManaged: CUSTOMER, hosted: SHARED, serverless: ELASTIC },
      { item: 'Shard & replica management', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: ELASTIC },
    ],
  },
  {
    id: 'platform',
    icon: faNetworkWired,
    label: 'Platform & Network',
    color: '#48EFCF',
    rows: [
      { item: 'Elastic software installation & hardening', selfManaged: CUSTOMER, hosted: ELASTIC, serverless: ELASTIC },
      { item: 'Component connectivity & isolation', selfManaged: CUSTOMER, hosted: ELASTIC, serverless: ELASTIC },
      { item: 'Network configuration', selfManaged: CUSTOMER, hosted: SHARED, serverless: ELASTIC },
      { item: 'Software patching', selfManaged: CUSTOMER, hosted: ELASTIC, serverless: ELASTIC },
    ],
  },
  {
    id: 'infrastructure',
    icon: faServer,
    label: 'Infrastructure',
    color: '#48EFCF',
    rows: [
      { item: 'Cloud resource provisioning', selfManaged: CUSTOMER, hosted: ELASTIC, serverless: ELASTIC },
      { item: 'OS updates & security patches', selfManaged: CUSTOMER, hosted: ELASTIC, serverless: ELASTIC },
      { item: 'Hardware capacity & availability', selfManaged: CUSTOMER, hosted: ELASTIC, serverless: ELASTIC },
      { item: 'Multi-cloud provider choice', selfManaged: CUSTOMER, hosted: CUSTOMER, serverless: CUSTOMER },
    ],
  },
]

function ResponsibilityBadge({ owner, isDark }) {
  if (owner === ELASTIC) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-elastic-teal/20 text-elastic-teal whitespace-nowrap">
        ✦ Elastic
      </span>
    )
  }
  if (owner === CUSTOMER) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
        isDark ? 'bg-white/10 text-white/70' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/80'
      }`}>
        👤 You
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-elastic-yellow/20 text-elastic-yellow whitespace-nowrap">
      ↔ Shared
    </span>
  )
}

function SharedResponsibilityScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeCategory, setActiveCategory] = useState('data')

  const current = categories.find(c => c.id === activeCategory)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Shared Responsibility Model
          </span>
          <h2 className={`text-headline text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Who Owns <span className="gradient-text">What?</span>
          </h2>
          <p className={`text-paragraph text-sm mt-2 max-w-xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Across all deployment types, responsibilities shift between you and Elastic. Select a category to explore.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === cat.id
                  ? 'border-transparent text-white'
                  : isDark
                    ? 'border-white/15 text-white/50 hover:text-white/80'
                    : 'border-elastic-dev-blue/15 text-elastic-dev-blue/50 hover:text-elastic-dev-blue/80'
              }`}
              style={activeCategory === cat.id ? { backgroundColor: cat.color } : {}}
            >
              <FontAwesomeIcon icon={cat.icon} className="text-xs" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Column headers */}
        <div className={`grid grid-cols-4 gap-0 mb-2 px-3`}>
          <div className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
            Responsibility
          </div>
          {[
            { label: 'Self-Managed', color: '#FF957D' },
            { label: 'Cloud Hosted', color: '#0B64DD' },
            { label: 'Serverless', color: '#48EFCF' },
          ].map(col => (
            <div key={col.label} className="text-center text-xs font-bold" style={{ color: col.color }}>
              {col.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border overflow-hidden ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}
          >
            {current.rows.map((row, i) => (
              <div
                key={row.item}
                className={`grid grid-cols-4 gap-0 px-3 py-2.5 items-center ${
                  i % 2 === 0
                    ? isDark ? 'bg-white/[0.03]' : 'bg-elastic-dev-blue/[0.02]'
                    : isDark ? 'bg-white/[0.01]' : 'bg-white'
                }`}
              >
                <div className={`text-sm font-medium pr-4 ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>
                  {row.item}
                </div>
                <div className="flex justify-center">
                  <ResponsibilityBadge owner={row.selfManaged} isDark={isDark} />
                </div>
                <div className="flex justify-center">
                  <ResponsibilityBadge owner={row.hosted} isDark={isDark} />
                </div>
                <div className="flex justify-center">
                  <ResponsibilityBadge owner={row.serverless} isDark={isDark} />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          className="flex items-center gap-6 justify-center mt-4 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-elastic-teal font-semibold">✦ Elastic = Elastic manages this</span>
          <span className={`font-semibold ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>👤 You = You own this</span>
          <span className="text-elastic-yellow font-semibold">↔ Shared = Collaborative responsibility</span>
        </motion.div>
      </div>
    </div>
  )
}

export default SharedResponsibilityScene
