import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faCrosshairs, faPenRuler, faMicroscope } from '@fortawesome/free-solid-svg-icons'

const watches = [
  {
    id: 'triage', icon: faFilter, color: '#48EFCF', name: 'Triage',
    job: 'Assesses alerts, connects related activity, and flags findings that need attention.',
    workers: ['Triage Worker: runs Attack Discovery to link alerts into attack narratives'],
    trigger: 'New alerts',
  },
  {
    id: 'hunt', icon: faCrosshairs, color: '#0B64DD', name: 'Hunt',
    job: 'Uses threat research to look for evidence of attacks in the telemetry you already have.',
    workers: ['Maps your technologies and exposures to relevant threats', 'Reports what was searched and what was found'],
    trigger: 'New research or schedule',
  },
  {
    id: 'detection', icon: faPenRuler, color: '#F04E98', name: 'Detection',
    job: 'Investigates noisy rules and coverage gaps, then prepares detection changes for review.',
    workers: ['Rule Tuning Worker: proposes exceptions with a diagnosis and backtest'],
    trigger: 'Recurring false positives',
  },
  {
    id: 'forensics', icon: faMicroscope, color: '#FF957D', name: 'Forensics',
    job: 'Examines endpoint activity to establish what happened and identify supported response actions.',
    workers: ['Forensics Worker: inspects endpoint activity', 'Response actions run through Elastic Defend'],
    trigger: 'A finding',
  },
]

function WatchesScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState('triage')
  const current = watches.find(w => w.id === active)

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>The Four Watches</span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Each Watch Stays <span className="gradient-text">in Its Lane</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Each Watch maps to a SOC responsibility. They are not a mandatory pipeline, and any of them can start on its own.
          </p>
        </motion.div>

        {/* Org chart */}
        <div className="flex flex-col items-center">
          <motion.div
            className={`px-6 py-2 rounded-full border font-bold text-sm ${
              isDark ? 'bg-elastic-teal/10 border-elastic-teal/40 text-elastic-teal' : 'bg-elastic-blue/10 border-elastic-blue/40 text-elastic-blue'
            }`}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          >
            AlertZero
          </motion.div>
          <div className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/20'}`} />
          <div className={`h-px w-[75%] ${isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/20'}`} />
        </div>

        <div className="grid grid-cols-4 gap-3 mt-0">
          {watches.map((w, i) => {
            const selected = w.id === active
            return (
              <motion.button
                key={w.id}
                onClick={() => setActive(w.id)}
                className={`relative text-left p-4 rounded-xl border transition-all ${
                  selected
                    ? isDark ? 'bg-white/[0.07] border-white/30' : 'bg-white border-elastic-dev-blue/30 shadow-md'
                    : isDark ? 'bg-white/[0.03] border-white/10 hover:border-white/20' : 'bg-white/70 border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
                }`}
                style={selected ? { boxShadow: `0 0 0 1px ${w.color}80` } : undefined}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: `${w.color}20` }}>
                  <FontAwesomeIcon icon={w.icon} style={{ color: w.color }} />
                </div>
                <div className={`text-headline text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{w.name} Watch</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-elastic-ink/70'}`}>Starts on: {w.trigger}</div>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className={`mt-4 p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className={`text-paragraph text-base font-semibold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
              <span style={{ color: current.color }}>{current.name}:</span> {current.job}
            </p>
            <ul className="mt-3 space-y-1.5">
              {current.workers.map(w => (
                <li key={w} className={`text-paragraph text-sm flex gap-2 ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
                  <span style={{ color: current.color }}>▸</span> {w}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default WatchesScene
