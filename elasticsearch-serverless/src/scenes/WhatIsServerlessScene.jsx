import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faBolt, faDatabase, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const concepts = [
  {
    icon: faCloud,
    color: '#48EFCF',
    title: 'Fully Managed by Elastic',
    body: 'Elastic provisions, scales, upgrades, and backs up your Elasticsearch resources automatically. You never touch a node, shard, or data tier.',
  },
  {
    icon: faDatabase,
    color: '#0B64DD',
    title: 'Decoupled Compute & Storage',
    body: 'Search and indexing run on separate compute resources. A cache layer sits on top of cost-efficient general storage for hot/recent data — optimizing both speed and cost.',
  },
  {
    icon: faBolt,
    color: '#F04E98',
    title: 'Real-Time Autoscaling',
    body: 'Resources scale up automatically during ingest spikes and scale back down when workloads drop — with no manual intervention and no wasted capacity.',
  },
]

const architectureSteps = [
  { label: 'Your App', color: '#48EFCF' },
  { label: 'Serverless API', color: '#0B64DD' },
  { label: 'Index Layer', color: '#F04E98' },
  { label: 'Cache Layer', color: '#FF957D' },
  { label: 'General Storage', color: '#FEC514' },
]

function WhatIsServerlessScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Overview
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What Is <span className="gradient-text">Elastic Cloud Serverless?</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            A fully managed deployment model that shifts all infrastructure responsibility to Elastic — letting you create projects instead of managing clusters.
          </p>
        </motion.div>

        {/* Three concept cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {concepts.map((c, index) => (
            <motion.div
              key={c.title}
              className={`p-5 rounded-xl border ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${c.color}20` }}>
                <FontAwesomeIcon icon={c.icon} style={{ color: c.color }} className="text-lg" />
              </div>
              <h3 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{c.title}</h3>
              <p className={`text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{c.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Architecture flow */}
        <motion.div
          className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className={`text-xs font-semibold uppercase tracking-widest mb-4 text-center ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
            Serverless Architecture
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {architectureSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <motion.div
                  className="px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: `${step.color}20`, color: step.color, border: `1px solid ${step.color}40` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {step.label}
                </motion.div>
                {i < architectureSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className={`text-xs ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          <p className={`text-xs text-center mt-3 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/40'}`}>
            Managed entirely by Elastic — no nodes, no tiers, no manual scaling
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default WhatIsServerlessScene
