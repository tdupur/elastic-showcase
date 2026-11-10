import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHandshake, faFilter, faBan, faCircleXmark, faShieldHalved, faGauge
} from '@fortawesome/free-solid-svg-icons'

const artifacts = [
  {
    id: 'trusted',
    icon: faHandshake,
    color: '#0B64DD',
    name: 'Trusted application',
    use: 'Stop Elastic Endpoint from monitoring a process, usually to avoid conflicts with other antivirus or endpoint security software.',
    watch: 'Creates an intentional blind spot. Use sparingly.',
  },
  {
    id: 'filter',
    icon: faFilter,
    color: '#FEC514',
    name: 'Event filter',
    use: 'Stop event documents from being written to Elasticsearch, to reduce storage.',
    watch: 'Does not lower CPU use. Endpoint still watches the events for threats.',
  },
  {
    id: 'blocklist',
    icon: faBan,
    color: '#F04E98',
    name: 'Blocklist',
    use: 'Prevent known malware from running, extending the list of processes Elastic Defend treats as malicious.',
    watch: 'Not meant for broadly blocking harmless apps for non-security reasons.',
  },
  {
    id: 'exception',
    icon: faCircleXmark,
    color: '#48EFCF',
    name: 'Endpoint alert exception',
    use: 'Stop false positive alerts, and keep Endpoint from preventing a process you want to allow.',
    watch: 'Can also improve performance, since Endpoint stops monitoring a process an exception allows.',
  },
]

function TuningScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [selected, setSelected] = useState(0)
  const a = artifacts[selected]

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Tune &amp; Trust
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Fit it to your environment, <span className="gradient-text">keep it tamper-proof</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Too many false positives? Conflicts with other security software? Storage or CPU creeping up? Four tools let you adjust how Elastic Endpoint behaves.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {artifacts.map((item, i) => {
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
                <div className={`text-headline text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{item.name}</div>
              </motion.button>
            )
          })}
        </div>

        <motion.div
          key={a.id}
          className={`mt-3 p-5 rounded-xl border-2 grid grid-cols-1 md:grid-cols-2 gap-5 ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`}
          style={{ borderColor: a.color }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div>
            <span className="text-eyebrow text-xs" style={{ color: a.color }}>Use it to</span>
            <p className={`text-paragraph text-base mt-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{a.use}</p>
          </div>
          <div>
            <span className="text-eyebrow text-xs" style={{ color: a.color }}>Keep in mind</span>
            <p className={`text-paragraph text-base mt-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{a.watch}</p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faShieldHalved} className="text-elastic-pink" />
              <h4 className={`text-headline text-base font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>Self-protection</h4>
            </div>
            <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
              Elastic Endpoint defends itself. Even Administrator or root users cannot delete its files or terminate its program or service. They can still read its files and stop the Elastic Agent service.
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
              On by default for supported 64-bit Windows and macOS versions. Linux has no self-protection.
            </p>
          </div>
          <div className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faGauge} className="text-elastic-teal" />
              <h4 className={`text-headline text-base font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>Light footprint</h4>
            </div>
            <div className="flex gap-3">
              {[
                ['< 2%', 'CPU'],
                ['1 GB', 'Disk space'],
                ['500 MB', 'RSS memory'],
              ].map(([v, l]) => (
                <div key={l} className={`flex-1 text-center py-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
                  <div className="text-code text-lg font-bold gradient-text">{v}</div>
                  <div className={`text-xs ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{l}</div>
                </div>
              ))}
            </div>
            <p className={`text-xs mt-2 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
              Documented minimum system requirements. Endpoint logs rotate on their own: up to 4 files of 25 MB each.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TuningScene
