import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faServer, faSitemap, faBrain,
  faMagnifyingGlass, faFileCirclePlus, faFolder, faShieldHalved, faChartLine, faPlug,
  faCodeBranch, faClock, faCircleStop,
  faRobot, faComments, faKey, faArrowRight
} from '@fortawesome/free-solid-svg-icons'

const tabs = [
  {
    id: 'action',
    label: 'Action Steps',
    icon: faServer,
    color: '#48EFCF',
    description: 'Pre-built operations — no API setup, no auth config needed.',
    items: [
      { icon: faMagnifyingGlass, label: 'elasticsearch.search', desc: 'Query Elasticsearch indices and data streams' },
      { icon: faFileCirclePlus, label: 'elasticsearch.index', desc: 'Index new documents or update existing fields' },
      { icon: faFolder, label: 'cases.update', desc: 'Close, update, or assign security/observability cases' },
      { icon: faShieldHalved, label: 'alerts.enrich', desc: 'Add context to alerts from other data sources' },
      { icon: faChartLine, label: 'dashboards.modify', desc: 'Update saved objects and visualizations' },
      { icon: faPlug, label: 'connectors.*', desc: 'Slack, email, and any registered service connector' },
    ],
  },
  {
    id: 'flow',
    label: 'Flow Control',
    icon: faSitemap,
    color: '#FF957D',
    description: 'Make workflows dynamic — branch, pause, and adapt to real-time data.',
    items: [
      { icon: faCodeBranch, label: 'Conditional Logic', desc: 'Execute steps only when conditions are met' },
      { icon: faClock, label: 'Pauses & Waits', desc: 'Introduce time-based delays between steps' },
      { icon: faCircleStop, label: 'Early Exits', desc: 'Skip or halt execution based on step output' },
      { icon: faArrowRight, label: 'Invoke Workflows', desc: 'Trigger another workflow as a step' },
    ],
  },
  {
    id: 'ai',
    label: 'AI Steps',
    icon: faBrain,
    color: '#F04E98',
    description: 'Combine deterministic automation with AI reasoning and language understanding.',
    items: [
      { icon: faComments, label: 'ai.prompt', desc: 'Send prompts to an LLM connector — summarize, extract, decide' },
      { icon: faRobot, label: 'ai.agent', desc: 'Call a built-in or custom Elastic Agent Builder agent' },
      { icon: faKey, label: 'OpenAI / Gemini', desc: 'Integrate any registered LLM provider via connector' },
      { icon: faArrowRight, label: 'Agent ↔ Workflow', desc: 'Agent Builder agents can also trigger workflows as tools' },
    ],
  },
]

function CapabilitiesScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeTab, setActiveTab] = useState('action')

  const tab = tabs.find(t => t.id === activeTab)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Step Types
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What Workflows <span className="gradient-text">Can Do</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Three categories of steps handle everything from data operations to AI reasoning.
          </p>
        </motion.div>

        {/* Tab row */}
        <div className="flex gap-3 mb-5 justify-center">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                activeTab === t.id
                  ? 'text-white border-transparent'
                  : isDark
                    ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    : 'bg-white border-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-elastic-dev-blue/5'
              }`}
              style={activeTab === t.id ? { backgroundColor: t.color } : {}}
            >
              <FontAwesomeIcon icon={t.icon} className="text-xs" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`mb-4 p-3 rounded-xl border text-sm text-center ${
            isDark ? 'bg-white/[0.03] border-white/10 text-elastic-light-grey' : 'bg-white border-elastic-dev-blue/10 text-elastic-ink'
          }`}>
            {tab.description}
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {tab.items.map((item, i) => (
              <motion.div
                key={item.label}
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  isDark ? 'bg-white/[0.03] border-white/10 hover:border-white/20' : 'bg-white border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${tab.color}20` }}>
                  <FontAwesomeIcon icon={item.icon} style={{ color: tab.color }} className="text-sm" />
                </div>
                <div>
                  <div className={`font-mono text-sm font-semibold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{item.label}</div>
                  <div className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CapabilitiesScene
