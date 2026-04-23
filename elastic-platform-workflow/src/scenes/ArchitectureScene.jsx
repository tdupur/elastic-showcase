import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt, faCalendarDays, faBell,
  faServer, faSitemap, faBrain,
  faDatabase, faEnvelope, faShieldHalved, faArrowRight
} from '@fortawesome/free-solid-svg-icons'

const triggerTypes = [
  { icon: faBolt, label: 'Manual', desc: 'On-demand via UI or API', color: '#48EFCF' },
  { icon: faCalendarDays, label: 'Scheduled', desc: 'Interval or RRule (e.g. every 5m, daily at 2AM)', color: '#0B64DD' },
  { icon: faBell, label: 'Alert', desc: 'Fired by detection or alerting rules', color: '#F04E98' },
]

const stepTypes = [
  { icon: faServer, label: 'Action Steps', desc: 'Query ES, index docs, update cases, send notifications', color: '#48EFCF' },
  { icon: faSitemap, label: 'Flow Control', desc: 'Conditionals, pauses, waits, early exits', color: '#FF957D' },
  { icon: faBrain, label: 'AI Steps', desc: 'ai.prompt, ai.agent — call LLMs and Agent Builder agents', color: '#F04E98' },
]

const outcomes = [
  { icon: faDatabase, label: 'Elasticsearch', desc: 'Index, update, search data', color: '#48EFCF' },
  { icon: faShieldHalved, label: 'Cases & Alerts', desc: 'Create, enrich, close', color: '#0B64DD' },
  { icon: faEnvelope, label: 'External Systems', desc: 'Slack, email, service connectors', color: '#FF957D' },
]

function ArchitectureScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const cardClass = `p-4 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            How It Works
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Workflow <span className="gradient-text">Architecture</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Triggers initiate execution. Steps define logic. Data flows between them. Outcomes drive action.
          </p>
        </motion.div>

        {/* Three columns: Triggers → Steps → Outcomes */}
        <div className="grid md:grid-cols-3 gap-4 items-start">

          {/* Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className={`text-center text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
              Triggers
            </div>
            <div className="flex flex-col gap-2">
              {triggerTypes.map((t) => (
                <div key={t.label} className={cardClass}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${t.color}20` }}>
                      <FontAwesomeIcon icon={t.icon} style={{ color: t.color }} className="text-sm" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{t.label}</div>
                      <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>{t.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Steps + data flow arrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`text-center text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? 'text-elastic-pink' : 'text-elastic-blue'}`}>
              Steps
            </div>
            <div className="flex flex-col gap-2">
              {stepTypes.map((s) => (
                <div key={s.label} className={cardClass}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}20` }}>
                      <FontAwesomeIcon icon={s.icon} style={{ color: s.color }} className="text-sm" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{s.label}</div>
                      <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>{s.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Data flow note */}
            <div className={`mt-3 p-3 rounded-xl border text-xs ${isDark ? 'bg-white/[0.02] border-white/10 text-white/50' : 'bg-elastic-dev-blue/5 border-elastic-dev-blue/10 text-elastic-ink/60'}`}>
              <span className="font-semibold">Data Flow:</span> consts, inputs, <code className="font-mono">{'{{steps.name.output}}'}</code> — Liquid templating connects steps.
            </div>
          </motion.div>

          {/* Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <div className={`text-center text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
              Outcomes
            </div>
            <div className="flex flex-col gap-2">
              {outcomes.map((o) => (
                <div key={o.label} className={cardClass}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${o.color}20` }}>
                      <FontAwesomeIcon icon={o.icon} style={{ color: o.color }} className="text-sm" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{o.label}</div>
                      <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>{o.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Flow arrows between columns */}
        <motion.div
          className="flex justify-center items-center gap-8 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {['Triggered by event', 'Steps execute in order', 'Outcomes delivered'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <FontAwesomeIcon icon={faArrowRight} className={`${isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'}`} />}
              <span className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-ink/50'}`}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default ArchitectureScene
