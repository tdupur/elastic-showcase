import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute, faCopy, faCode, faShieldHalved } from '@fortawesome/free-solid-svg-icons'

const artifactActions = ['Expand to view', 'View full details', 'Remove from policy', 'Assign to policy']

const tabs = [
  {
    id: 'settings',
    label: 'Policy settings',
    color: '#0B64DD',
    what: 'The main tab. This is where you decide what Elastic Defend does on every host that uses the policy.',
    items: [
      'Protections: malware, ransomware, memory threat, malicious behavior',
      'Attack surface reduction and device control',
      'Event collection per operating system',
      'Register as antivirus, and advanced settings',
    ],
    tail: 'Click Save when you are done.',
  },
  {
    id: 'trusted-apps',
    label: 'Trusted applications',
    color: '#48EFCF',
    what: 'Applications that Elastic Defend should not monitor, for example to avoid conflicts with other security software.',
    artifact: true,
  },
  {
    id: 'trusted-devices',
    label: 'Trusted devices',
    color: '#FEC514',
    what: 'Exceptions to your device control settings for specific USB devices you want to allow.',
    artifact: true,
    note: 'Generally available since 9.2 in Elastic Stack.',
  },
  {
    id: 'event-filters',
    label: 'Event filters',
    color: '#FF957D',
    what: 'Rules that stop matching events from being written to Elasticsearch, to save storage.',
    artifact: true,
  },
  {
    id: 'isolation',
    label: 'Host isolation exceptions',
    color: '#F04E98',
    what: 'IP addresses that an isolated host is still allowed to talk to, even though it is cut off from the rest of the network.',
    artifact: true,
  },
  {
    id: 'blocklist',
    label: 'Blocklist',
    color: '#F04E98',
    what: 'Applications that must never run on hosts with this policy. It extends the list of processes Elastic Defend treats as malicious.',
    artifact: true,
  },
  {
    id: 'exceptions',
    label: 'Endpoint exceptions',
    color: '#0B64DD',
    what: 'Exceptions that suppress false positive alerts from Elastic Endpoint.',
    artifact: true,
  },
  {
    id: 'updates',
    label: 'Protection updates',
    color: '#48EFCF',
    what: 'Controls how Elastic Defend receives the latest threat detections, malware models, and other protection artifacts from Elastic.',
  },
]

function PolicyScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [selected, setSelected] = useState(0)
  const t = tabs[selected]

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Configure the Policy
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            One policy, <span className="gradient-text">many dials</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Once the agent is installed, protections are switched on automatically. The integration policy is where you adjust them to fit your organization. Click each tab to see what lives there.
          </p>
        </motion.div>

        {/* Mock policy page */}
        <motion.div
          className={`rounded-xl border overflow-hidden ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={`flex flex-wrap gap-1 px-3 pt-3 border-b ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}>
            {tabs.map((tab, i) => {
              const isActive = selected === i
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelected(i)}
                  className="px-2.5 py-2 text-[13px] font-semibold rounded-t-lg transition-all"
                  style={{
                    color: isActive ? tab.color : isDark ? 'rgba(255,255,255,0.65)' : 'rgba(16,28,63,0.65)',
                    borderBottom: `3px solid ${isActive ? tab.color : 'transparent'}`,
                    backgroundColor: isActive ? `${tab.color}14` : 'transparent',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="p-5 min-h-[190px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <h3 className="text-headline text-xl font-bold" style={{ color: t.color }}>{t.label}</h3>
                <p className={`text-paragraph text-base mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{t.what}</p>

                {t.items && (
                  <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                    {t.items.map(it => (
                      <li key={it} className={`text-sm flex gap-2 ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                        <span style={{ color: t.color }}>&#9656;</span> {it}
                      </li>
                    ))}
                  </ul>
                )}
                {t.tail && <p className={`text-sm mt-2 font-semibold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{t.tail}</p>}

                {t.artifact && (
                  <div className="mt-3">
                    <span className="text-eyebrow text-xs" style={{ color: t.color }}>On this tab you can</span>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {artifactActions.map(a => (
                        <span
                          key={a}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            isDark ? 'border-white/20 text-white/80' : 'border-elastic-dev-blue/20 text-elastic-dev-blue/80'
                          }`}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {t.note && <p className={`text-xs mt-3 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>{t.note}</p>}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          {[
            { icon: faRoute, title: 'Where to find it', text: 'Search for Policies in Elastic Security, then select the integration policy to configure.' },
            { icon: faCopy, title: 'Assign, don’t create', text: 'You can assign or unassign existing artifacts here. Unassigning does not delete one. To create a new one, use the Artifacts page.' },
            { icon: faShieldHalved, title: 'More than one policy', text: 'Add the Elastic Defend integration again to create another policy, for example one for servers and one for laptops.' },
            { icon: faCode, title: 'Prefer code?', text: 'You can also create and customize an Elastic Defend policy through the API.' },
          ].map(c => (
            <div key={c.title} className={`p-4 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={c.icon} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
                <h4 className={`text-headline text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{c.title}</h4>
              </div>
              <p className={`text-paragraph text-xs ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{c.text}</p>
            </div>
          ))}
        </motion.div>

        <p className={`text-center text-xs mt-3 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
          Needs the Elastic Defend Policy Management: All privilege in Elastic Stack, or the appropriate user role in Serverless.
        </p>
      </div>
    </div>
  )
}

export default PolicyScene
