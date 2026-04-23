import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShieldHalved, faServer, faBrain,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons'

const useCases = [
  {
    id: 'security',
    label: 'Security',
    icon: faShieldHalved,
    color: '#F04E98',
    headline: 'Automate Your SOC',
    subhead: 'Close the gap between detection and response.',
    items: [
      'Automate alert triage and enrichment with contextual data',
      'Create and assign cases automatically when rules fire',
      'Route notifications by severity, asset type, or team',
      'Run large-scale detection rule operations on a schedule',
    ],
    yaml: `triggers:
  - type: alert
steps:
  - name: enrich
    type: elasticsearch.search
    with:
      index: "users"
  - name: create_case
    type: cases.create
    with:
      title: "{{event.rule.name}}"`,
  },
  {
    id: 'observability',
    label: 'Observability',
    icon: faServer,
    color: '#48EFCF',
    headline: 'Respond to Signals Automatically',
    subhead: 'Correlate signals and act before users feel the impact.',
    items: [
      'Respond to anomaly detection alerts automatically',
      'Correlate signals across metrics, logs, and traces',
      'Schedule periodic data cleanup and health checks',
      'Automate daily and weekly operational reports',
    ],
    yaml: `triggers:
  - type: scheduled
    with:
      every: 1d
steps:
  - name: health_check
    type: elasticsearch.search
    with:
      index: "metrics-*"
  - name: notify
    type: slack.message`,
  },
  {
    id: 'ai',
    label: 'AI-Augmented',
    icon: faBrain,
    color: '#FF957D',
    headline: 'Combine Automation with AI Reasoning',
    subhead: 'Let deterministic steps and AI work together.',
    items: [
      'Use ai.prompt to summarize alerts and suggest next steps',
      'Call Agent Builder agents as steps within a workflow',
      'Let agents trigger workflows as custom tool actions',
      'Process unstructured data with LLM-powered extraction',
    ],
    yaml: `steps:
  - name: summarize
    type: ai.prompt
    with:
      prompt: |
        Summarize this alert:
        {{event | json:2}}
  - name: agent_triage
    type: ai.agent
    with:
      agentId: "security-triage"`,
  },
]

function UseCasesScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState('security')

  const uc = useCases.find(u => u.id === active)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Use Cases
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What You Can <span className="gradient-text">Automate</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Workflows span security, observability, and AI-augmented automation patterns.
          </p>
        </motion.div>

        {/* Tab row */}
        <div className="flex gap-3 mb-5 justify-center">
          {useCases.map((u) => (
            <button
              key={u.id}
              onClick={() => setActive(u.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                active === u.id
                  ? 'text-white border-transparent'
                  : isDark
                    ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    : 'bg-white border-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-elastic-dev-blue/5'
              }`}
              style={active === u.id ? { backgroundColor: u.color } : {}}
            >
              <FontAwesomeIcon icon={u.icon} className="text-xs" />
              {u.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={active}
          className="grid md:grid-cols-2 gap-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Left: bullets */}
          <div className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
            <h3 className={`text-xl font-extrabold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{uc.headline}</h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>{uc.subhead}</p>
            <div className="flex flex-col gap-2.5">
              {uc.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <FontAwesomeIcon icon={faCircleCheck} style={{ color: uc.color }} className="mt-0.5 flex-shrink-0" />
                  <span className={`text-sm ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: YAML snippet */}
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
            <div className={`flex items-center gap-2 px-4 py-2 border-b ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-elastic-dev-blue/5 border-elastic-dev-blue/10'}`}>
              <div className="w-3 h-3 rounded-full bg-elastic-pink/60" />
              <div className="w-3 h-3 rounded-full bg-elastic-yellow/60" />
              <div className="w-3 h-3 rounded-full bg-elastic-teal/60" />
              <span className={`ml-2 text-xs font-mono ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>example.yaml</span>
            </div>
            <pre className={`p-4 text-xs font-mono leading-relaxed overflow-x-auto ${isDark ? 'text-elastic-teal' : 'text-elastic-dev-blue'}`}>
              {uc.yaml}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UseCasesScene
