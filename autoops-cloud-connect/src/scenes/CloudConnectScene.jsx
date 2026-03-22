import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudArrowUp, faServer, faRobot, faMagnifyingGlassChart, faShieldHalved, faNetworkWired
} from '@fortawesome/free-solid-svg-icons'

const services = [
  {
    icon: faMagnifyingGlassChart,
    color: '#48EFCF',
    title: 'AutoOps',
    availability: 'ES 7.17+',
    license: 'All license types — Free',
    description: 'Automated monitoring, root-cause analysis, and performance recommendations for your clusters.',
    highlight: true,
  },
  {
    icon: faRobot,
    color: '#0B64DD',
    title: 'Elastic Inference Service (EIS)',
    availability: 'ES 9.3+',
    license: 'Enterprise license',
    description: 'Enables semantic search, AI Assistants, Agent Builder, and Attack Discovery without managing ML infrastructure.',
    highlight: false,
  },
]

const deploymentTypes = [
  { label: 'Elastic Cloud Enterprise', short: 'ECE', color: '#F04E98' },
  { label: 'Elastic Cloud on Kubernetes', short: 'ECK', color: '#0B64DD' },
  { label: 'Self-Managed Elasticsearch', short: 'Self-Managed', color: '#48EFCF' },
]

function CloudConnectScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeService, setActiveService] = useState(0)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            The Bridge
          </span>
          <h2 className={`text-headline text-5xl md:text-6xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What is{' '}
            <span className="gradient-text">Cloud Connect?</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Cloud Connect lets ECE, ECK, and self-managed clusters access Elastic Cloud services — without migrating your infrastructure.
          </p>
        </motion.div>

        {/* Deployment types row */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {deploymentTypes.map((d, i) => (
            <motion.div
              key={d.short}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
                isDark ? 'bg-white/5 border-white/15' : 'bg-white border-elastic-dev-blue/15'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <FontAwesomeIcon icon={faServer} style={{ color: d.color }} className="text-xs" />
              <span className={isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}>{d.label}</span>
            </motion.div>
          ))}

          {/* Arrow to cloud */}
          <motion.div
            className={`px-3 text-lg ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <FontAwesomeIcon icon={faNetworkWired} />
          </motion.div>

          <motion.div
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
              isDark
                ? 'bg-elastic-teal/10 border-elastic-teal/40 text-elastic-teal'
                : 'bg-elastic-blue/10 border-elastic-blue/40 text-elastic-blue'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <FontAwesomeIcon icon={faCloudArrowUp} className="text-xs" />
            <span className="font-semibold">Elastic Cloud</span>
          </motion.div>
        </motion.div>

        {/* Services cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              onClick={() => setActiveService(index)}
              className={`relative p-6 rounded-xl border cursor-pointer transition-all ${
                activeService === index
                  ? isDark
                    ? 'bg-white/[0.06] border-elastic-teal/50'
                    : 'bg-white border-elastic-blue/40'
                  : isDark
                    ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    : 'bg-white/60 border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.15 }}
              whileHover={{ scale: 1.01 }}
            >
              {service.highlight && (
                <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isDark ? 'bg-elastic-teal/20 text-elastic-teal' : 'bg-elastic-blue/10 text-elastic-blue'
                }`}>
                  This Showcase
                </div>
              )}

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <FontAwesomeIcon icon={service.icon} style={{ color: service.color }} className="text-xl" />
              </div>

              <h3 className={`text-headline text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                {service.title}
              </h3>

              <div className="flex gap-3 mb-3 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                  isDark ? 'bg-white/10 text-white/50' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60'
                }`}>
                  {service.availability}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                  isDark ? 'bg-elastic-teal/10 text-elastic-teal/70' : 'bg-elastic-blue/10 text-elastic-blue/70'
                }`}>
                  {service.license}
                </span>
              </div>

              <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className={`p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-blue/5 border-elastic-blue/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`text-paragraph text-sm ${isDark ? 'text-white/60' : 'text-elastic-ink'}`}>
            Cloud Connect is not a migration. Your data stays where it is. Only metrics and control signals travel to Elastic Cloud.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default CloudConnectScene
