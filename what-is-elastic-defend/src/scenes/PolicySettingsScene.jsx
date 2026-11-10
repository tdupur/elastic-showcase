import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBoxArchive, faBell, faShieldVirus, faScrewdriverWrench, faChevronRight
} from '@fortawesome/free-solid-svg-icons'

const quarantineSteps = [
  { n: 1, title: 'Remove', text: 'The malicious file is taken out of its current location.' },
  { n: 2, title: 'Scramble', text: 'A rolling XOR is applied, using the key ELASTIC, so the file cannot run.' },
  { n: 3, title: 'Move', text: 'It is moved into a quarantine folder.' },
  { n: 4, title: 'Rename', text: 'It is renamed to a GUID, for example 318e70c2-af9b-4c3a-939d-11410b9a112c.' },
]

const quarantineFolders = [
  ['Windows', '[Drive]:\\.equarantine on the same volume as the file. Metadata is kept in C:\\Program Files\\Elastic\\Endpoint\\state.'],
  ['macOS', '/System/Volumes/Data/.equarantine'],
  ['Linux', '.equarantine at the root of the mount point of the quarantined file'],
]

const panels = [
  { id: 'quarantine', icon: faBoxArchive, color: '#FF957D', name: 'Quarantine' },
  { id: 'notify', icon: faBell, color: '#FEC514', name: 'Notify user' },
  { id: 'av', icon: faShieldVirus, color: '#48EFCF', name: 'Register as antivirus' },
  { id: 'advanced', icon: faScrewdriverWrench, color: '#F04E98', name: 'Advanced settings' },
]

function Bullets({ items, color, isDark }) {
  return (
    <ul className="mt-3 flex flex-col gap-2">
      {items.map(it => (
        <li key={it} className={`text-paragraph text-base flex gap-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
          <span style={{ color }}>&#9656;</span> {it}
        </li>
      ))}
    </ul>
  )
}

function PolicySettingsScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [selected, setSelected] = useState(0)
  const p = panels[selected]
  const muted = isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'
  const strong = isDark ? 'text-white' : 'text-elastic-dark-ink'

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Inside the Policy Settings
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${strong}`}>
            What happens when <span className="gradient-text">a threat is stopped</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${muted}`}>
            Four details in the policy decide what happens to a bad file, what the person at the keyboard sees, and how Elastic Defend sits next to other security software.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {panels.map((item, i) => {
            const isActive = selected === i
            return (
              <motion.button
                key={item.id}
                onClick={() => setSelected(i)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`}
                style={{
                  borderColor: isActive ? item.color : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,28,63,0.1)',
                  boxShadow: isActive ? `0 0 24px ${item.color}33` : 'none',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
              >
                <FontAwesomeIcon icon={item.icon} style={{ color: item.color }} className="text-2xl mb-2" />
                <div className={`text-headline text-sm font-bold ${strong}`}>{item.name}</div>
              </motion.button>
            )
          })}
        </div>

        <div className={`mt-3 p-6 rounded-xl border-2 min-h-[400px] ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`} style={{ borderColor: p.color }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {p.id === 'quarantine' && (
                <>
                  <p className={`text-paragraph text-base ${strong}`}>
                    With malware protection set to <strong>Prevent</strong>, every malicious file is quarantined, including files on the blocklist. Four things happen to it:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
                    {quarantineSteps.map((s, i) => (
                      <div key={s.n} className="relative">
                        <div className={`p-3 rounded-lg h-full ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-code text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${p.color}33`, color: p.color }}>{s.n}</span>
                            <span className={`text-headline text-sm font-bold ${strong}`}>{s.title}</span>
                          </div>
                          <p className={`text-xs ${muted}`}>{s.text}</p>
                        </div>
                        {i < quarantineSteps.length - 1 && (
                          <FontAwesomeIcon icon={faChevronRight} className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: p.color }} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    <div>
                      <span className="text-eyebrow text-xs" style={{ color: p.color }}>Where it goes</span>
                      <ul className="mt-1.5 flex flex-col gap-1.5">
                        {quarantineFolders.map(([os, path]) => (
                          <li key={os} className={`text-xs ${muted}`}>
                            <strong className={strong}>{os}:</strong> <span className="text-code">{path}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-eyebrow text-xs" style={{ color: p.color }}>Getting it back</span>
                      <ul className="mt-1.5 flex flex-col gap-1.5">
                        <li className={`text-xs ${muted}`}><strong className={strong}>Restore:</strong> add an exception to the rule that flagged the file. If the exception would have stopped the detection, Elastic Defend restores it.</li>
                        <li className={`text-xs ${muted}`}><strong className={strong}>Retrieve for analysis:</strong> run <span className="text-code">get-file</span> in the response console with the path from the alert&rsquo;s Quarantined file path field. The scrambling is reversed for you, but the file is not moved back. That needs response actions (Enterprise, or Endpoint Protection Complete in Serverless).</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {p.id === 'notify' && (
                <>
                  <h3 className="text-headline text-2xl font-bold" style={{ color: p.color }}>Tell the person at the keyboard</h3>
                  <p className={`text-paragraph text-base mt-2 ${strong}`}>
                    Each protection has a <strong>Notify user</strong> option. It sends a push notification in the host&rsquo;s operating system when activity is detected or prevented.
                  </p>
                  <Bullets color={p.color} isDark={isDark} items={[
                    'On by default whenever the protection level is Prevent.',
                    'With the right license or project feature tier, you can customize the message, using placeholders such as {action} and {filename} for malware and ransomware, or {action} and {rule} for memory threat and malicious behavior.',
                    'Host isolation shows its own notification to active users when a host is isolated or released.',
                  ]} />
                </>
              )}

              {p.id === 'av' && (
                <>
                  <h3 className="text-headline text-2xl font-bold" style={{ color: p.color }}>Be the antivirus of record</h3>
                  <p className={`text-paragraph text-base mt-2 ${strong}`}>
                    Turn on <strong>Register as antivirus</strong> to make Elastic Security the antivirus software that Windows reports for the host.
                  </p>
                  <Bullets color={p.color} isDark={isDark} items={[
                    'Default is Sync with malware protection level: registration is on only when malware protection is on and set to Prevent. In any other case it is off.',
                    'Prefer to decide yourself? Set it manually to Enabled or Disabled.',
                    'Windows Server is not supported, because it has no Windows Security Center.',
                  ]} />
                </>
              )}

              {p.id === 'advanced' && (
                <>
                  <h3 className="text-headline text-2xl font-bold" style={{ color: p.color }}>For unusual requirements</h3>
                  <p className={`text-paragraph text-base mt-2 ${strong}`}>
                    Select <strong>Show advanced settings</strong> on the policy page. Hover over any setting for a short description.
                  </p>
                  <Bullets color={p.color} isDark={isDark} items={[
                    'Turn off diagnostic data for Elastic Defend',
                    'Configure self-healing rollback for Windows endpoints',
                    'Configure Linux file system monitoring',
                    'Configure data volume',
                  ]} />
                  <p className={`text-sm mt-4 font-semibold ${strong}`}>
                    Advanced settings are not recommended for most users.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default PolicySettingsScene
