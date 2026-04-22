import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShieldHalved, faMagnifyingGlass, faRobot, faCloud,
  faUsers, faBolt, faFire, faKey
} from '@fortawesome/free-solid-svg-icons'

const tabs = [
  {
    id: 'detect',
    label: 'Detect & Investigate',
    color: '#0B64DD',
    capabilities: [
      { icon: faMagnifyingGlass, title: 'Attack Discovery', description: 'RAG-based AI correlates alerts into full attack narratives — automatically.' },
      { icon: faRobot, title: 'AI Assistant', description: 'Context-aware AI guidance with environmental knowledge for faster investigation.' },
      { icon: faUsers, title: 'UEBA', description: 'User and Entity Behavior Analytics detects insider threats and compromised accounts.' },
      { icon: faBolt, title: 'ES|QL Threat Hunting', description: 'Query petabytes of security data with ES|QL for scalable, expressive hunting.' },
    ],
  },
  {
    id: 'respond',
    label: 'Respond & Automate',
    color: '#48EFCF',
    capabilities: [
      { icon: faRobot, title: 'Elastic Workflows', description: 'Built-in SOAR with AI reasoning — no separate platform purchase required.' },
      { icon: faFire, title: 'Automated Neutralization', description: 'Agentic automation executes playbooks and neutralizes threats in real time.' },
      { icon: faShieldHalved, title: 'Open Detection Rules', description: '2,300+ community-starred detection rules on GitHub — transparent and tunable.' },
      { icon: faBolt, title: 'ML Anomaly Detection', description: 'Real-time and historical ML models surface deviations before they become incidents.' },
    ],
  },
  {
    id: 'protect',
    label: 'Protect & Secure',
    color: '#F04E98',
    capabilities: [
      { icon: faShieldHalved, title: 'XDR Endpoint Protection', description: 'Ransomware and malware prevention across endpoints, containers, and cloud workloads.' },
      { icon: faCloud, title: 'Cloud Security', description: 'Multi-cloud threat detection across AWS, Azure, and Google Cloud environments.' },
      { icon: faKey, title: 'Identity Risk Detection', description: 'Continuous monitoring of identity risk signals and privilege escalation attempts.' },
      { icon: faFire, title: 'Third-Party EDR Integration', description: 'Works alongside third-party endpoint tools — bring your existing investments.' },
    ],
  },
]

function CapabilitiesScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeTab, setActiveTab] = useState(0)

  const tab = tabs[activeTab]

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Capabilities
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What Elastic Security <span className="gradient-text">Does</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            One platform covers the full security operations lifecycle — detect, investigate, respond, and protect.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-6">
          {tabs.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeTab === i
                  ? 'border-transparent text-white'
                  : isDark
                    ? 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                    : 'bg-elastic-dev-blue/5 border-elastic-dev-blue/10 text-elastic-dev-blue/50 hover:bg-elastic-dev-blue/10'
              }`}
              style={activeTab === i ? { backgroundColor: t.color } : {}}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {t.label}
            </motion.button>
          ))}
        </div>

        {/* Capability cards */}
        <motion.div
          key={activeTab}
          className="grid md:grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {tab.capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              className={`relative p-5 rounded-xl border overflow-hidden group ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{ background: `radial-gradient(circle at 0% 50%, ${tab.color}12, transparent 60%)` }}
              />
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ backgroundColor: tab.color, opacity: 0.5 }} />
              <div className="relative flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${tab.color}20` }}
                >
                  <FontAwesomeIcon icon={cap.icon} style={{ color: tab.color }} className="text-sm" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{cap.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{cap.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={`mt-5 p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className={`text-sm font-medium ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            IDC MarketScape Leader (Worldwide SIEM, 2024) · Forrester Wave Leader (Security Analytics, Q2 2025) · AV-Comparatives Certified
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default CapabilitiesScene
