import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloud, faServer, faShieldHalved, faUsers, faPlug, faGear,
  faNetworkWired, faKey, faBell, faTerminal
} from '@fortawesome/free-solid-svg-icons'

const categories = [
  {
    label: 'Cloud Platforms',
    color: '#0B64DD',
    items: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker'],
    icon: faCloud,
  },
  {
    label: 'Endpoint & EDR',
    color: '#F04E98',
    items: ['Elastic Defend', 'CrowdStrike', 'SentinelOne', 'Microsoft Defender', 'Jamf'],
    icon: faShieldHalved,
  },
  {
    label: 'Identity & Access',
    color: '#48EFCF',
    items: ['Okta', 'Azure AD', 'Google Workspace', 'AWS IAM', 'Active Directory'],
    icon: faKey,
  },
  {
    label: 'Network & Firewall',
    color: '#FF957D',
    items: ['Palo Alto', 'Cisco', 'Fortinet', 'Zscaler', 'Cloudflare'],
    icon: faNetworkWired,
  },
  {
    label: 'Ticketing & Alerts',
    color: '#FEC514',
    items: ['PagerDuty', 'Slack', 'Microsoft Teams', 'Jira', 'ServiceNow'],
    icon: faBell,
  },
  {
    label: 'Custom & API',
    color: '#48EFCF',
    items: ['REST API Ingest', 'Logstash pipelines', 'Custom Beat', 'AI-driven Auto Import', 'Webhook'],
    icon: faGear,
  },
]

function IntegrationsScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Integrations
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Connect <span className="gradient-text">Everything</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Hundreds of prebuilt integrations — plus AI-driven Auto Import for custom sources. Bring your existing security stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.label}
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + catIndex * 0.07 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  <FontAwesomeIcon icon={cat.icon} style={{ color: cat.color }} className="text-sm" />
                </div>
                <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{cat.label}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item, i) => (
                  <motion.span
                    key={item}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-elastic-dev-blue/5 border-elastic-dev-blue/10 text-elastic-dev-blue/70'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + catIndex * 0.07 + i * 0.04 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`mt-4 p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className={`text-sm font-medium ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            AI-driven <span className="font-bold">Automatic Import</span> generates parsers for custom log formats — no manual mapping required.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default IntegrationsScene
