import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faServer, faRocket, faGear, faCheck, faBolt } from '@fortawesome/free-solid-svg-icons'

const deployments = [
  {
    id: 'serverless',
    icon: faBolt,
    color: '#48EFCF',
    badge: 'Recommended',
    title: 'Elastic Cloud Serverless',
    tagline: 'Fully managed SaaS — zero infrastructure',
    pros: [
      'Automatic scaling — no cluster management',
      'Usage-based pricing',
      'Always on the latest version',
      'Focus on data, not operations',
    ],
    ideal: 'Teams that want to move fast without managing infrastructure',
  },
  {
    id: 'cloud-hosted',
    icon: faCloud,
    color: '#0B64DD',
    badge: 'Popular',
    title: 'Elastic Cloud Hosted',
    tagline: 'Dedicated cluster on AWS, GCP, or Azure',
    pros: [
      'Full control over cluster configuration',
      'Choose cloud region and hardware',
      'Fine-tune nodes, memory, and storage',
      '14-day free trial available',
    ],
    ideal: 'Teams needing control with managed infrastructure',
  },
  {
    id: 'self-managed',
    icon: faServer,
    color: '#FF957D',
    badge: 'Full Control',
    title: 'Self-Managed',
    tagline: 'On-premises or private cloud',
    pros: [
      'Maximum control over environment',
      'On-premises or private cloud deployment',
      'Air-gapped and compliance use cases',
      'Elastic Cloud on Kubernetes (ECK) supported',
    ],
    ideal: 'Organizations with strict data residency or security requirements',
  },
]

function DeploymentScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState(0)

  const dep = deployments[active]

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Deployment Options
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Run Elastic{' '}
            <span className="gradient-text">Anywhere</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Choose the deployment model that best fits your operational needs — from fully managed SaaS to on-premises.
          </p>
        </motion.div>

        {/* Deployment cards (top row) */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {deployments.map((d, i) => (
            <motion.button
              key={d.id}
              onClick={() => setActive(i)}
              className={`p-4 rounded-xl border text-left transition-all ${
                active === i
                  ? 'border-transparent'
                  : isDark ? 'bg-white/[0.03] border-white/10 hover:border-white/20' : 'bg-white border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
              }`}
              style={active === i ? { borderColor: d.color, backgroundColor: `${d.color}10` } : {}}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${d.color}20` }}
                >
                  <FontAwesomeIcon icon={d.icon} style={{ color: d.color }} className="text-base" />
                </div>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ color: d.color, backgroundColor: `${d.color}15` }}
                >
                  {d.badge}
                </span>
              </div>
              <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{d.title}</div>
              <div className={`text-xs mt-1 ${isDark ? 'text-elastic-light-grey/60' : 'text-elastic-ink/70'}`}>{d.tagline}</div>
            </motion.button>
          ))}
        </div>

        {/* Active detail */}
        <motion.div
          key={active}
          className={`p-5 rounded-2xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${dep.color}20` }}
            >
              <FontAwesomeIcon icon={dep.icon} style={{ color: dep.color }} className="text-xl" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{dep.title}</h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>{dep.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {dep.pros.map((pro, i) => (
              <motion.div
                key={pro}
                className="flex items-start gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.07 }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${dep.color}20` }}
                >
                  <FontAwesomeIcon icon={faCheck} style={{ color: dep.color }} className="text-xs" />
                </div>
                <span className={`text-sm ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{pro}</span>
              </motion.div>
            ))}
          </div>

          <div
            className="p-3 rounded-xl text-sm"
            style={{ backgroundColor: `${dep.color}10`, borderLeft: `3px solid ${dep.color}` }}
          >
            <span className={isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}>
              <span className="font-semibold">Ideal for: </span>{dep.ideal}
            </span>
          </div>
        </motion.div>

        <motion.div
          className={`mt-3 p-3 rounded-xl border text-center ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <FontAwesomeIcon icon={faRocket} className={`mr-2 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
          <span className={`text-sm ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Start free with a <span className={`font-semibold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>14-day trial</span> — no credit card required
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default DeploymentScene
