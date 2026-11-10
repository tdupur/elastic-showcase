import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBug, faLock, faMemory, faPersonRunning, faKey, faHardDrive, faListCheck
} from '@fortawesome/free-solid-svg-icons'

const protections = [
  {
    id: 'malware',
    icon: faBug,
    color: '#FF957D',
    name: 'Malware',
    stage: 'Before execution',
    what: 'A machine learning model looks at the static attributes of a file to decide whether it is malicious or benign, as soon as the file lands on disk.',
    platforms: 'Windows · macOS · Linux',
    detect: 'Raises an alert. Does not block the file.',
    prevent: 'Blocks the file from running, quarantines it, and raises an alert. This is the default.',
    note: 'Also offers a blocklist and an option to scan files only when they run, which helps busy servers.',
  },
  {
    id: 'ransomware',
    icon: faLock,
    color: '#F04E98',
    name: 'Ransomware',
    stage: 'Behavioral',
    what: 'Analyzes low-level system activity to catch ransomware, including families that target the master boot record. Canary files act as an early warning system.',
    platforms: 'Windows',
    detect: 'Raises an alert when a canary file is modified. Does not block.',
    prevent: 'Terminates the process that modified the canary file, and raises an alert. This is the default.',
    note: 'In Elastic Stack, on by default with a Platinum or Enterprise license.',
  },
  {
    id: 'memory',
    icon: faMemory,
    color: '#FEC514',
    name: 'Memory threat',
    stage: 'After execution',
    what: 'Finds and stops in-memory threats such as shellcode injection, which are used to slip past file-based detection.',
    platforms: 'Windows · macOS · Linux',
    detect: 'Raises an alert. Does not block the in-memory activity.',
    prevent: 'Forces the process or thread to stop, and raises an alert. This is the default.',
    note: 'In Elastic Stack, on by default with a Platinum or Enterprise license.',
  },
  {
    id: 'behavior',
    icon: faPersonRunning,
    color: '#48EFCF',
    name: 'Malicious behavior',
    stage: 'After execution',
    what: 'Watches what processes actually do. Behavior is much harder for adversaries to disguise than a file.',
    platforms: 'Windows · macOS · Linux',
    detect: 'Raises an alert. Does not block the behavior.',
    prevent: 'Forces the process to stop, and raises an alert. This is the default.',
    note: 'Optional reputation service adds Elastic threat intelligence. In Elastic Stack it needs a Platinum or Enterprise subscription and a cloud deployment.',
  },
  {
    id: 'asr',
    icon: faKey,
    color: '#0B64DD',
    name: 'Attack surface reduction',
    stage: 'Hardening',
    what: 'Credential hardening removes overly permissive access to the Windows LSASS process, so attackers cannot steal credentials from memory. It does not interfere with normal system activity.',
    platforms: 'Windows',
    note: 'Registry credential hardening, which blocks saving the SAM, SECURITY, and SYSTEM hives, is shown as Planned for Elastic Stack and generally available in Serverless.',
  },
  {
    id: 'device',
    icon: faHardDrive,
    color: '#FF957D',
    name: 'Device control',
    stage: 'Hardening',
    what: 'Restricts which external USB storage devices can connect to protected hosts. Webcams, keyboards, and Yubikeys are not affected.',
    platforms: 'Windows · macOS',
    note: 'Generally available since 9.2 in Elastic Stack. Windows access levels (Allow all, Read only, Block execute, Block all) are available since 9.4.',
  },
  {
    id: 'events',
    icon: faListCheck,
    color: '#F04E98',
    name: 'Event collection',
    stage: 'Visibility',
    what: 'Records activity on each host so analysts can investigate: process, network, file, DNS, registry, security, API, and DLL and driver load events. Which ones exist depends on the operating system.',
    platforms: 'Varies by OS',
    note: 'Windows has every category. macOS covers DNS, file, network, process, and security. Linux covers file, network, process, and DNS (with eBPF; since 9.3 in Elastic Stack).',
  },
]

function ProtectionsScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [selected, setSelected] = useState(0)
  const [level, setLevel] = useState('prevent')
  const p = protections[selected]

  const pick = (i) => {
    setSelected(i)
    setLevel('prevent')
  }

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            What It Does
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Layers that <span className="gradient-text">work in tandem</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Some layers act before a threat runs, most act after it launches. If a threat gets past one layer, another can still stop it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
          <div className="flex flex-col gap-2">
            {protections.map((item, i) => {
              const isActive = selected === i
              return (
                <motion.button
                  key={item.id}
                  onClick={() => pick(i)}
                  className={`text-left px-4 py-2.5 rounded-lg border flex items-center gap-3 transition-all ${
                    isDark ? 'bg-white/[0.04]' : 'bg-white'
                  }`}
                  style={{
                    borderColor: isActive ? item.color : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,28,63,0.1)',
                    boxShadow: isActive ? `0 0 20px ${item.color}33` : 'none',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <FontAwesomeIcon icon={item.icon} style={{ color: item.color }} className="text-base w-5" />
                  <div>
                    <div className={`text-headline text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{item.name}</div>
                    <div className="text-code text-[10px]" style={{ color: isDark ? item.color : 'rgba(16,28,63,0.65)' }}>{item.stage}</div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              className={`p-6 rounded-xl border-2 flex flex-col ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`}
              style={{ borderColor: p.color }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${p.color}22` }}>
                  <FontAwesomeIcon icon={p.icon} style={{ color: p.color }} className="text-xl" />
                </div>
                <div>
                  <h3 className={`text-headline text-2xl font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{p.name}</h3>
                  <span className="text-code text-xs" style={{ color: isDark ? p.color : 'rgba(16,28,63,0.65)' }}>{p.platforms}</span>
                </div>
              </div>

              <p className={`text-paragraph text-base leading-relaxed ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{p.what}</p>

              {p.detect && (
                <div className="mt-4">
                  <span className="text-eyebrow text-xs" style={{ color: isDark ? p.color : 'rgba(16,28,63,0.75)' }}>Choose a protection level</span>
                  <div className="flex gap-2 mt-2">
                    {['detect', 'prevent'].map(l => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className="px-5 py-1.5 rounded-full text-sm font-semibold border transition-all capitalize"
                        style={{
                          backgroundColor: level === l ? p.color : 'transparent',
                          borderColor: p.color,
                          color: level === l ? '#101C3F' : p.color,
                        }}
                      >
                        {l}{l === 'prevent' ? ' (default)' : ''}
                      </button>
                    ))}
                  </div>
                  <p className={`text-paragraph text-base mt-3 p-3 rounded-lg ${isDark ? 'bg-white/5 text-elastic-light-grey' : 'bg-elastic-dev-blue/5 text-elastic-ink'}`}>
                    {level === 'detect' ? p.detect : p.prevent}
                  </p>
                </div>
              )}

              <p className={`text-paragraph text-sm mt-4 ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                <strong style={{ color: isDark ? p.color : '#101C3F' }}>Good to know:</strong> {p.note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ProtectionsScene
