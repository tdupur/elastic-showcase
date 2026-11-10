import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal, faClockRotateLeft, faBolt } from '@fortawesome/free-solid-svg-icons'

// Example commands and privileges are taken from the Elastic endpoint response actions docs.
const commands = [
  {
    cmd: 'isolate',
    color: '#F04E98',
    what: 'Cut the host off from the rest of the network. It can still send data to Elastic Security, and you can allow specific IPs with host isolation exceptions.',
    example: 'isolate --comment "Isolate host related to detection alerts"',
    privilege: 'Host Isolation',
  },
  {
    cmd: 'release',
    color: '#48EFCF',
    what: 'Let an isolated host talk to the network again.',
    example: 'release --comment "Release host, everything looks OK"',
    privilege: 'Host Isolation',
  },
  {
    cmd: 'processes',
    color: '#0B64DD',
    what: 'List every process running on the host. Use it to find the PID or entity ID needed by other commands. Entity IDs are more reliable because PIDs can be reused.',
    example: 'processes',
    privilege: 'Process Operations',
  },
  {
    cmd: 'kill-process',
    color: '#F04E98',
    what: 'Terminate a process by PID or entity ID.',
    example: 'kill-process --pid 123 --comment "Terminate suspicious process"',
    privilege: 'Process Operations',
  },
  {
    cmd: 'suspend-process',
    color: '#FEC514',
    what: 'Pause a process without terminating it.',
    example: 'suspend-process --pid 123 --comment "Suspend suspicious process"',
    privilege: 'Process Operations',
  },
  {
    cmd: 'get-file',
    color: '#FF957D',
    what: 'Download a file from the host as a password-protected .zip so it cannot run. Also retrieves files Elastic Defend has quarantined.',
    example: 'get-file --path "/full/path/to/file.txt" --comment "Possible malware"',
    privilege: 'File Operations',
  },
  {
    cmd: 'scan',
    color: '#48EFCF',
    what: 'Scan a file or directory for malware, using the malware protection settings from the host’s policy.',
    example: 'scan --path "/Users/username/Downloads" --comment "Scan Downloads folder for malware"',
    privilege: 'Scan Operations',
  },
  {
    cmd: 'execute',
    color: '#FEC514',
    what: 'Run a shell command on the host. It runs as the account that runs Elastic Defend, which normally has full control of the system, so be careful.',
    example: 'execute --command "ls -al" --timeout 2s --comment "Get list of all files"',
    privilege: 'Execute Operations',
  },
  {
    cmd: 'upload',
    color: '#0B64DD',
    what: 'Send a file to the host, for example a remediation script. Follow it with execute to run it.',
    example: 'upload --file --comment "Upload remediation script"',
    privilege: 'File Operations',
  },
  {
    cmd: 'memory-dump',
    color: '#F04E98',
    what: 'Capture volatile memory for forensics, such as in-memory malware or injected payloads. Download the dump afterward with get-file.',
    example: 'memory-dump --kernel --comment "Dumping kernel memory for investigation"',
    privilege: 'Execute Operations',
    caveat: 'Windows only in 9.3. Windows and Linux endpoints since 9.4.',
  },
]

function ResponseScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [selected, setSelected] = useState(0)
  const c = commands[selected]

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Respond &amp; Contain
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Act on a host <span className="gradient-text">without leaving Elastic Security</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            The response console is a terminal-like window for any protected endpoint. Pick a command to see what it does.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
          <div className="grid grid-cols-2 gap-2 content-start">
            {commands.map((item, i) => {
              const isActive = selected === i
              return (
                <motion.button
                  key={item.cmd}
                  onClick={() => setSelected(i)}
                  className="text-code text-xs font-bold px-2 py-3 rounded-lg border-2 transition-all"
                  style={{
                    borderColor: isActive ? item.color : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(16,28,63,0.12)',
                    color: isActive ? item.color : isDark ? '#fff' : '#101C3F',
                    backgroundColor: isActive ? `${item.color}1a` : 'transparent',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                >
                  {item.cmd}
                </motion.button>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0b1226]">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white/60 text-xs text-code">
                <FontAwesomeIcon icon={faTerminal} /> Response console
              </div>
              <div className="px-4 py-4 min-h-[64px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={c.cmd}
                    className="text-code text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="text-elastic-teal">&gt; </span>
                    <span className="text-white break-words">{c.example}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={c.cmd}
                className={`p-5 rounded-xl border-2 ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`}
                style={{ borderColor: c.color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-code text-xl font-bold" style={{ color: c.color }}>{c.cmd}</h3>
                <p className={`text-paragraph text-base mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{c.what}</p>
                <p className={`text-sm mt-3 ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                  <strong>Privilege needed:</strong> {c.privilege}
                  {c.caveat && <> · <strong>Availability:</strong> {c.caveat}</>}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { icon: faBolt, title: 'Open it anywhere', text: 'From the Endpoints page, an alert, an event, or the host details page, using Respond.' },
            { icon: faClockRotateLeft, title: 'Works for offline hosts', text: 'Pending actions run when the host comes back online and expire after two weeks. Every action is logged in the response actions history.' },
            { icon: faTerminal, title: 'Can be automated', text: 'A custom query rule can run an Elastic Defend response action, such as isolate, whenever it matches. Be careful: automatic isolation can disrupt legitimate work.' },
          ].map(t => (
            <div key={t.title} className={`p-4 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={t.icon} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
                <h4 className={`text-headline text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{t.title}</h4>
              </div>
              <p className={`text-paragraph text-xs ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{t.text}</p>
            </div>
          ))}
        </motion.div>

        <p className={`text-center text-xs mt-3 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
          Requires Elastic Agent 8.4+ with Elastic Defend, and an Enterprise subscription (Elastic Stack) or the Endpoint Protection Complete tier (Serverless).
        </p>
      </div>
    </div>
  )
}

export default ResponseScene
