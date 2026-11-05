import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand, faUserCheck, faEye, faLock, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const workers = {
  triage: {
    label: 'Triage (Attack Discovery)',
    manual: 'For true-positive or inconclusive results, the analyst decides whether to close the Investigation or request endpoint analysis.',
    supervised: 'A true-positive result can proceed automatically to endpoint analysis. Inconclusive results still need a person.',
  },
  endpoint: {
    label: 'Endpoint analysis',
    manual: 'Supported response actions are presented for review before anything runs.',
    supervised: 'Designed to allow host isolation, process termination, and process suspension without per-action approval.',
  },
}

const levels = [
  { id: 'manual', icon: faHand, color: '#48EFCF', name: 'Manual' },
  { id: 'assisted', icon: faUserCheck, color: '#0B64DD', name: 'Assisted' },
  { id: 'supervised', icon: faEye, color: '#F04E98', name: 'Supervised' },
]

function AutonomyScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [worker, setWorker] = useState('triage')
  const [level, setLevel] = useState('manual')
  const w = workers[worker]
  const lv = levels.find(l => l.id === level)

  const text =
    level === 'assisted'
      ? 'A middle setting between manual and supervised. The blog does not detail per-action behavior for assisted mode.'
      : w[level]

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>Autonomy</span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            You Decide How Much <span className="gradient-text">to Delegate</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Teams differ (tiers, pods, no detection engineer, no night staffing) and so does task risk. Autonomy is set per Worker.
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-4">
          {Object.entries(workers).map(([id, v]) => (
            <button
              key={id}
              onClick={() => setWorker(id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                id === worker
                  ? isDark ? 'bg-white/10 text-white border-white/40' : 'bg-white text-elastic-dark-ink shadow border-elastic-dev-blue/30'
                  : isDark ? 'bg-white/[0.03] border-white/10 text-white/50' : 'bg-white/60 border-elastic-dev-blue/10 text-elastic-ink/60'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {levels.map(l => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`p-4 rounded-xl border text-center transition-all ${
                l.id === level
                  ? isDark ? 'bg-white/[0.07]' : 'bg-white shadow-md'
                  : isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/70 border-elastic-dev-blue/10'
              }`}
              style={l.id === level ? { borderColor: l.color, boxShadow: `0 0 0 1px ${l.color}80` } : undefined}
            >
              <FontAwesomeIcon icon={l.icon} className="text-2xl" style={{ color: l.color }} />
              <div className={`text-headline text-lg font-bold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{l.name}</div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${worker}-${level}`}
            className={`mt-4 p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-eyebrow text-xs mb-2" style={{ color: lv.color }}>{w.label} · {lv.name}</p>
            <p className={`text-paragraph text-lg ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {[
            { icon: faLock, text: 'Detection changes always require approval.' },
            { icon: faCircleCheck, text: 'Every consequential action is proposed to an analyst for approval.' },
          ].map(item => (
            <div
              key={item.text}
              className={`p-3 rounded-xl border flex items-center gap-3 ${
                isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/20'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
              <span className={`text-paragraph text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AutonomyScene
