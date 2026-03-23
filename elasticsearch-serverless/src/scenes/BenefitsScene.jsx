import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShieldHalved, faBolt, faDatabase, faCube, faChartLine, faSlidersH
} from '@fortawesome/free-solid-svg-icons'

const benefits = [
  {
    icon: faShieldHalved,
    color: '#48EFCF',
    title: 'Management Free',
    tagline: 'Zero operational overhead',
    description: 'Elastic handles automatic upgrades, data backups, and business continuity. Your team never needs to maintain the underlying cluster.',
  },
  {
    icon: faBolt,
    color: '#0B64DD',
    title: 'Autoscaled',
    tagline: 'Workload-aware elasticity',
    description: 'Resources scale up during ingest spikes and back down after — automatically. No capacity planning, no over-provisioning.',
  },
  {
    icon: faDatabase,
    color: '#F04E98',
    title: 'Optimized Storage',
    tagline: 'Cost-efficient by design',
    description: 'Data lives in cost-efficient general storage. A configurable cache layer serves recent and frequently queried data at high speed.',
  },
  {
    icon: faCube,
    color: '#FF957D',
    title: 'Dedicated Experiences',
    tagline: 'Purpose-built solutions',
    description: 'Each serverless project type — Search, Observability, Security — is tailored to its use case with a focused interface and capabilities.',
  },
  {
    icon: faChartLine,
    color: '#FEC514',
    title: 'Pay Per Usage',
    tagline: 'Spend only what you use',
    description: 'Each project type uses usage-based pricing. You\'re never locked into a deployment size — you pay for what your workload actually consumes.',
  },
  {
    icon: faSlidersH,
    color: '#48EFCF',
    title: 'Data & Performance Control',
    tagline: 'Configured to your needs',
    description: 'Define your own retention settings, choose what to ingest, and tune predefined performance settings per project to match your cost and speed targets.',
  },
]

function BenefitsScene() {
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
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Key Benefits
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Built to <span className="gradient-text">Remove Friction</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Six core advantages that let you focus on extracting value from your data — not running infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className={`p-5 rounded-xl border group relative overflow-hidden ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at 10% 90%, ${benefit.color}10, transparent 60%)` }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${benefit.color}20` }}>
                    <FontAwesomeIcon icon={benefit.icon} style={{ color: benefit.color }} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-base leading-tight ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{benefit.title}</h3>
                    <p className="text-xs font-medium mt-0.5" style={{ color: benefit.color }}>{benefit.tagline}</p>
                  </div>
                </div>
                <p className={`text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BenefitsScene
