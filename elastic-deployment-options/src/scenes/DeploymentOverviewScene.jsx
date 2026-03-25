import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faCloud, faBolt, faCheck } from '@fortawesome/free-solid-svg-icons'

const deployments = [
  {
    id: 'self-managed',
    icon: faServer,
    color: '#FF957D',
    label: 'Self-Managed',
    tagline: 'Maximum control, maximum responsibility',
    description: 'Install, operate, and maintain the Elastic Stack on your own hardware — on-premises or private cloud.',
    includes: ['ECK (Elastic Cloud on Kubernetes)', 'ECE (Elastic Cloud Enterprise)', 'Bare-metal / VM installs'],
    bestFor: 'Air-gapped, regulated, or latency-sensitive environments',
    pricing: 'License + infrastructure costs',
    operationalLoad: 'High',
    loadColor: '#F04E98',
  },
  {
    id: 'cloud-hosted',
    icon: faCloud,
    color: '#0B64DD',
    label: 'Cloud Hosted',
    tagline: 'Dedicated cluster, Elastic managed',
    description: 'A dedicated Elasticsearch cluster on your choice of AWS, GCP, or Azure — provisioned and managed through Elastic Cloud.',
    includes: ['Configurable nodes, hardware & versions', 'Autoscaling available', 'Manual or automated upgrades'],
    bestFor: 'Teams wanting control without full infrastructure ownership',
    pricing: 'Provisioned resource billing',
    operationalLoad: 'Medium',
    loadColor: '#FEC514',
  },
  {
    id: 'serverless',
    icon: faBolt,
    color: '#48EFCF',
    label: 'Serverless',
    tagline: 'Zero infrastructure, infinite scale',
    description: 'A fully managed SaaS offering — Elastic handles all infrastructure, upgrades, and scaling automatically.',
    includes: ['Automatic scaling to zero', 'Usage-based pricing', 'Elastic manages all upgrades'],
    bestFor: 'Teams prioritising speed to value and operational simplicity',
    pricing: 'Usage-based (ingest + storage + search)',
    operationalLoad: 'Low',
    loadColor: '#48EFCF',
  },
]

function DeploymentOverviewScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            Your Options
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Three Ways to <span className="gradient-text">Run Elastic</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Every model runs the same Elasticsearch core. What differs is who owns operations, hardware, and upgrades.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {deployments.map((dep, index) => (
            <motion.div
              key={dep.id}
              className={`relative p-5 rounded-xl border flex flex-col ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.12 }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" style={{ backgroundColor: dep.color }} />

              {/* Icon + Label */}
              <div className="flex items-center gap-3 mb-3 mt-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${dep.color}20` }}>
                  <FontAwesomeIcon icon={dep.icon} style={{ color: dep.color }} className="text-xl" />
                </div>
                <div>
                  <div className={`font-extrabold text-lg ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{dep.label}</div>
                  <div className="text-xs" style={{ color: dep.color }}>{dep.tagline}</div>
                </div>
              </div>

              <p className={`text-paragraph text-sm mb-4 ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
                {dep.description}
              </p>

              {/* Includes list */}
              <div className="space-y-1.5 mb-4">
                {dep.includes.map(item => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <FontAwesomeIcon icon={faCheck} className="mt-0.5 flex-shrink-0" style={{ color: dep.color }} />
                    <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Footer metadata */}
              <div className={`mt-auto pt-3 border-t space-y-2 ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}>Best for</span>
                  <span className={`text-right max-w-[60%] ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>{dep.bestFor}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}>Pricing</span>
                  <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>{dep.pricing}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}>Ops load</span>
                  <span className="font-semibold" style={{ color: dep.loadColor }}>{dep.operationalLoad}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DeploymentOverviewScene
