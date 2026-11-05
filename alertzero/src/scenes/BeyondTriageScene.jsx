import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrosshairs, faPenRuler, faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const tabs = [
  {
    id: 'hunt', icon: faCrosshairs, color: '#0B64DD', label: 'A head start on your hunt',
    points: [
      'The Hunt Watch continuously observes your environment and maps technologies and exposures to relevant threats.',
      'It asks one question: is there evidence of this threat in my environment? You do not have to supply the intel.',
      'It works from threat research even when no alert has fired, then reports what it searched and what it found.',
      'Output: proposed hunts, findings, coverage improvements, or escalations.',
    ],
    callout: null,
  },
  {
    id: 'tuning', icon: faPenRuler, color: '#F04E98', label: 'False positives into rule changes',
    points: [
      'Hunt findings can feed the Detection Watch, which checks whether existing rules would catch the behavior.',
      'Example: a legitimate admin tool keeps tripping a rule. The Watch reviews the alerts and the rule logic, then proposes an exception.',
      'The Proposed Action bundles the diagnosis, motivating alerts, existing and proposed logic, and backtest results.',
      'Detection changes always require approval. If declined, the rule stays unchanged.',
    ],
    callout: 'A backtest where 5 sample false positives drop to 0 does not prove attack coverage is preserved. The analyst still validates against known malicious activity.',
  },
]

const esql = `FROM .alerts-security.alerts-*
| WHERE @timestamp >= NOW() - 7 days
  AND kibana.alert.workflow_reason == "false_positive"
| STATS count = COUNT(*) BY kibana.alert.rule.uuid, kibana.alert.rule.name
| SORT count DESC
| LIMIT 20`

function BeyondTriageScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState('hunt')
  const tab = tabs.find(t => t.id === active)

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>Beyond Triage</span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Work That Happens <span className="gradient-text">When Nothing Is on Fire</span>
          </h2>
        </motion.div>

        <div className="flex justify-center gap-3 mb-4">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                t.id === active
                  ? isDark ? 'bg-white/10 text-white' : 'bg-white text-elastic-dark-ink shadow'
                  : isDark ? 'bg-white/[0.03] border-white/10 text-white/50 hover:text-white/80' : 'bg-white/60 border-elastic-dev-blue/10 text-elastic-ink/60'
              }`}
              style={t.id === active ? { borderColor: t.color } : undefined}
            >
              <FontAwesomeIcon icon={t.icon} style={{ color: t.color }} /> {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            className={`grid gap-4 ${tab.id === 'tuning' ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-3xl mx-auto'}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <ul className="space-y-3">
                {tab.points.map(p => (
                  <li key={p} className={`text-paragraph text-base flex gap-3 ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-1 flex-shrink-0" style={{ color: tab.color }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {tab.id === 'tuning' && (
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-black/30 border-white/10' : 'bg-elastic-dev-blue border-elastic-dev-blue'}`}>
                  <p className="text-eyebrow text-xs text-elastic-teal mb-2">Illustrative ES|QL: noisiest rules by false positives (shape described in the post)</p>
                  <pre className="text-code text-xs text-white/90 whitespace-pre-wrap leading-relaxed">{esql}</pre>
                </div>
                <div className={`p-4 rounded-xl border flex gap-3 ${isDark ? 'bg-elastic-yellow/5 border-elastic-yellow/30' : 'bg-elastic-yellow/10 border-elastic-yellow/50'}`}>
                  <FontAwesomeIcon icon={faTriangleExclamation} className="text-elastic-yellow mt-1" />
                  <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{tab.callout}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BeyondTriageScene
