import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye, faGears, faClipboardCheck, faFolderOpen, faComments, faSliders, faArrowRight
} from '@fortawesome/free-solid-svg-icons'

const concepts = [
  { icon: faEye, color: '#48EFCF', term: 'Watch', def: 'An agent with one job: Triage, Hunt, Detection, or Forensics. Runs on triggers and schedules.' },
  { icon: faGears, color: '#0B64DD', term: 'Worker', def: 'A defined task inside a Watch, built as an Elastic Workflow that calls Agent Builder agents and skills.' },
  { icon: faClipboardCheck, color: '#F04E98', term: 'Proposed Action', def: 'An evidence-backed recommendation. The analyst approves, modifies, escalates, or dismisses it.' },
  { icon: faFolderOpen, color: '#FF957D', term: 'Investigation', def: 'The shared record of a line of inquiry: findings, entities, evidence, and Proposed Actions.' },
  { icon: faComments, color: '#FEC514', term: 'Escalation', def: 'A team conversation that links Investigations. Agents can be queried, or switched off for sensitive cases.' },
  { icon: faSliders, color: '#48EFCF', term: 'Autonomy', def: 'Set per Worker: manual, assisted, or supervised. Consequential actions are still proposed to an analyst.' },
]

const lineage = [
  { year: '2023', name: 'Elastic AI Assistant', note: 'Conversational help' },
  { year: '2024', name: 'Attack Discovery', note: 'Links alerts into an attack narrative' },
  { year: 'Then', name: 'Agent Builder + Workflows', note: 'Security skills and repeatable execution' },
  { year: 'Next', name: 'AlertZero', note: 'Upcoming technical preview', highlight: true },
]

function WhatIsAlertZeroScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>What Is It</span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            The Agentic Layer of <span className="gradient-text">Elastic Security</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Four agents, one job each, and nothing in your environment changes without approval.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3">
          {concepts.map((c, i) => (
            <motion.div
              key={c.term}
              className={`relative p-4 rounded-xl border overflow-hidden ${
                isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: c.color, opacity: 0.6 }} />
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c.color}20` }}>
                  <FontAwesomeIcon icon={c.icon} style={{ color: c.color }} />
                </div>
                <h3 className={`text-headline text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{c.term}</h3>
              </div>
              <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{c.def}</p>
            </motion.div>
          ))}
        </div>

        {/* Lineage */}
        <motion.div
          className={`mt-4 p-4 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        >
          <p className={`text-eyebrow text-xs mb-3 ${isDark ? 'text-elastic-light-grey/60' : 'text-elastic-ink/60'}`}>
            Three years of GenAI work in Elastic Security
          </p>
          <div className="flex items-stretch gap-2">
            {lineage.map((l, i) => (
              <div key={l.name} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex-1 p-3 rounded-lg border text-center ${
                    l.highlight
                      ? isDark ? 'bg-elastic-teal/10 border-elastic-teal/40' : 'bg-elastic-blue/10 border-elastic-blue/40'
                      : isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
                  }`}
                >
                  <div className={`text-code text-xs ${l.highlight ? (isDark ? 'text-elastic-teal' : 'text-elastic-blue') : isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>{l.year}</div>
                  <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{l.name}</div>
                  <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-ink/70'}`}>{l.note}</div>
                </div>
                {i < lineage.length - 1 && (
                  <FontAwesomeIcon icon={faArrowRight} className={isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'} />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WhatIsAlertZeroScene
