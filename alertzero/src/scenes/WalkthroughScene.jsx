import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInbox, faFolderOpen, faComments, faShieldHalved, faUsers, faArrowRight, faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

const steps = [
  {
    icon: faInbox, color: '#48EFCF', label: 'Proposed Actions',
    title: 'The work is already waiting',
    body: 'Items are grouped by the input they need: Respond, Investigate, or Configure. Under Respond sits an impossible-travel finding for an executive account, with endpoint isolation awaiting review. Triage and Forensics had already collected the evidence.',
  },
  {
    icon: faFolderOpen, color: '#0B64DD', label: 'Investigation',
    title: 'Open the evidence',
    body: 'The account was active in Boston, then 39 minutes later from a distant hosting network. The same session identifier was used, with no new MFA event. An unsigned process accessed browser session material. The pattern points to session replay. VPNs, proxies, and bad geolocation still need ruling out.',
  },
  {
    icon: faComments, color: '#F04E98', label: 'Ask follow-ups',
    title: 'Question the agent in context',
    body: 'Ask what the account accessed after the suspicious sign-in, or what isolating the endpoint would interrupt. Existing findings are the context, so you do not start from zero.',
  },
  {
    icon: faShieldHalved, color: '#FF957D', label: 'Decide',
    title: 'Approve or decline isolation',
    body: 'Endpoint response is set to manual. After reviewing the target, rationale, and likely impact, the analyst approves or declines. Approval isolates the host through Elastic Defend. The decision and the execution outcome are recorded separately for auditability.',
  },
  {
    icon: faUsers, color: '#FEC514', label: 'Escalate',
    title: 'Coordinate the response',
    body: 'For a constrained, team-wide response, open an Escalation and link Investigations. Teammates discuss the evidence and can query an agent in the same thread, or choose never to invoke an agent for sensitive cases.',
  },
]

function WalkthroughScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [idx, setIdx] = useState(0)
  const s = steps[idx]

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>Walkthrough</span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            A Suspicious <span className="gradient-text">Login Session</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Triage and Forensics work together. The analyst stays in the decision seat.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {steps.map((st, i) => (
            <div key={st.label} className="flex items-center gap-2">
              <button
                onClick={() => setIdx(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold border transition-all ${
                  i === idx
                    ? isDark ? 'bg-white/10 text-white' : 'bg-white text-elastic-dark-ink shadow'
                    : isDark ? 'bg-white/[0.03] border-white/10 text-white/50 hover:text-white/80' : 'bg-white/60 border-elastic-dev-blue/10 text-elastic-ink/60 hover:text-elastic-ink'
                }`}
                style={i === idx ? { borderColor: st.color } : undefined}
              >
                <span className="text-code text-xs" style={{ color: st.color }}>{i + 1}</span>
                {st.label}
              </button>
              {i < steps.length - 1 && <FontAwesomeIcon icon={faArrowRight} className={`text-xs ${isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className={`relative p-6 rounded-xl border overflow-hidden ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: s.color }} />
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}20` }}>
                <FontAwesomeIcon icon={s.icon} className="text-2xl" style={{ color: s.color }} />
              </div>
              <div>
                <h3 className={`text-headline text-2xl font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{s.title}</h3>
                <p className={`text-paragraph text-lg mt-3 leading-relaxed ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{s.body}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setIdx(Math.max(0, idx - 1))}
            disabled={idx === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-30 ${isDark ? 'bg-white/10 text-white/70' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/70'}`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> Previous step
          </button>
          <button
            onClick={() => setIdx(Math.min(steps.length - 1, idx + 1))}
            disabled={idx === steps.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-30 ${isDark ? 'bg-white/10 text-white/70' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/70'}`}
          >
            Next step <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WalkthroughScene
