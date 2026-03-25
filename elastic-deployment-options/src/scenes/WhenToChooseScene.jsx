import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faServer, faCloud, faBolt, faCheck, faXmark
} from '@fortawesome/free-solid-svg-icons'

const options = [
  {
    id: 'self-managed',
    icon: faServer,
    color: '#FF957D',
    label: 'Self-Managed',
    subtitle: '(incl. ECE & ECK)',
    choose: [
      'Air-gapped or offline environments',
      'Strict data sovereignty / on-prem mandate',
      'Full control over JVM, plugins, and OS',
      'Existing Kubernetes or private cloud infrastructure',
      'Regulated industries requiring custom security configs',
      'Advanced testing and development workflows',
    ],
    avoid: [
      'You don\'t have dedicated Ops/SRE capacity',
      'You want fast time-to-value (days, not weeks)',
      'Elastic-managed upgrades are important to you',
    ],
  },
  {
    id: 'cloud-hosted',
    icon: faCloud,
    color: '#0B64DD',
    label: 'Cloud Hosted',
    subtitle: '(Elastic Cloud)',
    choose: [
      'Need dedicated cluster with high configuration control',
      'Use ILM, data tiers, Watcher, or custom plugins',
      'Cross-cluster search or replication required today',
      'Want autoscaling without full self-management',
      'Audit logging is a compliance requirement',
      'Migrating from self-managed to cloud gradually',
    ],
    avoid: [
      'You want to eliminate all infrastructure decisions',
      'Usage-based pricing fits your model better than provisioned',
      'You don\'t need advanced cluster-level configurations',
    ],
  },
  {
    id: 'serverless',
    icon: faBolt,
    color: '#48EFCF',
    label: 'Serverless',
    subtitle: '(Elastic Cloud)',
    choose: [
      'Operational simplicity is the top priority',
      'Workloads are spiky or unpredictable (scales to zero)',
      'Usage-based pricing aligns better with your budget model',
      'You want Elastic to manage all upgrades automatically',
      'Building new projects without legacy constraints',
      'Fastest path from data to insights',
    ],
    avoid: [
      'Audit logging is a hard compliance requirement',
      'You need ILM, data tiers, or Watcher',
      'CCS / CCR needed today (not planned)',
      'Custom plugins or Elasticsearch-Hadoop required',
    ],
  },
]

function WhenToChooseScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState('self-managed')

  const current = options.find(o => o.id === active)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Decision Guide
          </span>
          <h2 className={`text-headline text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            When to <span className="gradient-text">Choose Each</span>
          </h2>
          <p className={`text-paragraph text-sm mt-2 max-w-xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Select a deployment type to see its ideal use cases and when to look elsewhere.
          </p>
        </motion.div>

        {/* Toggle buttons */}
        <div className="flex justify-center gap-3 mb-6">
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => setActive(opt.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                active === opt.id
                  ? 'border-transparent text-white shadow-lg'
                  : isDark
                    ? 'border-white/15 text-white/50 hover:text-white/80'
                    : 'border-elastic-dev-blue/15 text-elastic-dev-blue/50 hover:text-elastic-dev-blue/80'
              }`}
              style={active === opt.id ? { backgroundColor: opt.color } : {}}
            >
              <FontAwesomeIcon icon={opt.icon} className="text-xs" />
              {opt.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {/* Choose when... */}
            <div className={`p-5 rounded-xl border ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${current.color}20` }}>
                  <FontAwesomeIcon icon={faCheck} style={{ color: current.color }} />
                </div>
                <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  Choose <span style={{ color: current.color }}>{current.label}</span> when…
                </h3>
              </div>
              <div className="space-y-2.5">
                {current.choose.map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2.5 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="mt-0.5 flex-shrink-0 text-elastic-teal" />
                    <span className={isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Avoid when... */}
            <div className={`p-5 rounded-xl border ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-elastic-pink/10">
                  <FontAwesomeIcon icon={faXmark} className="text-elastic-pink" />
                </div>
                <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  Consider alternatives when…
                </h3>
              </div>
              <div className="space-y-2.5">
                {current.avoid.map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2.5 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <FontAwesomeIcon icon={faXmark} className="mt-0.5 flex-shrink-0 text-elastic-pink" />
                    <span className={isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}>{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Pricing callout */}
              <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
                <div className={`text-xs font-semibold mb-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                  Pricing model
                </div>
                <div className="text-sm" style={{ color: current.color }}>
                  {active === 'self-managed' && 'License + your own infrastructure costs'}
                  {active === 'cloud-hosted' && 'Provisioned resources — pay for what you configure'}
                  {active === 'serverless' && 'Usage-based — pay for ingest, storage, and search consumed'}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default WhenToChooseScene
