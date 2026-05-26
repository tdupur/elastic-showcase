import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComments, faWrench, faBookOpen, faSitemap, faChartBar,
  faCircleCheck, faTerminal, faBolt, faGlobe, faArrowRight
} from '@fortawesome/free-solid-svg-icons'

const tabs = [
  {
    id: 'chat',
    label: 'Chat Interface',
    icon: faComments,
    color: '#48EFCF',
    tagline: 'Natural language access to your data',
    items: [
      { icon: faComments, title: 'Conversational Queries', description: 'Ask questions in plain English. The agent translates intent into ES|QL queries and returns accurate, grounded answers.' },
      { icon: faBolt, title: 'Real-Time Results', description: 'Responses are generated from live Elasticsearch data — no stale caches, no hallucinated facts.' },
      { icon: faChartBar, title: 'Inline Visualizations', description: 'Agents can render charts, graphs, and Kibana dashboards directly inside the conversation.' },
      { icon: faGlobe, title: 'Kibana-Native', description: 'The chat interface lives inside Kibana, respecting existing spaces, roles, and saved objects.' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: faWrench,
    color: '#0B64DD',
    tagline: 'ES|QL-backed agent functions',
    items: [
      { icon: faTerminal, title: 'Register via API', description: 'POST to /api/agent_builder/tools with an ES|QL query, parameter schema, and description. Done.' },
      { icon: faWrench, title: 'Fine-Grained Control', description: 'Each tool targets a specific index with explicit fields. Agents only see what you expose — nothing more.' },
      { icon: faCircleCheck, title: 'Typed Parameters', description: 'Parameters are schema-validated at call time. Agents pass structured arguments; tools return structured results.' },
      { icon: faBolt, title: 'Reusable Across Agents', description: 'Register a tool once, assign it to any number of agents. Update the query centrally without touching agent config.' },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: faBookOpen,
    color: '#FEC514',
    tagline: 'Domain-specific instruction sets',
    items: [
      { icon: faBookOpen, title: 'Built-In by Domain', description: 'Platform, Observability, Security, and Search skills ship ready to use. Assign them to any agent in one click.' },
      { icon: faCircleCheck, title: 'Custom Skills', description: 'Build your own reusable skills with custom instructions, tools, and prompts — then share them across your team.' },
      { icon: faBolt, title: 'Auto-Invoked', description: 'Skills are activated automatically by user intent or explicit trigger, keeping conversations focused and efficient.' },
      { icon: faArrowRight, title: 'Solution-Scoped', description: 'Skills are scoped to your deployment type — Serverless Observability, Security, or Elasticsearch projects.' },
    ],
  },
  {
    id: 'workflows',
    label: 'Workflows',
    icon: faSitemap,
    color: '#F04E98',
    tagline: 'Orchestrate multi-step automation',
    items: [
      { icon: faSitemap, title: 'YAML-Defined', description: 'Define event-driven, composable workflows in YAML. Agents can author and modify them through natural language.' },
      { icon: faGlobe, title: 'External Integrations', description: 'Workflows call external connectors — Slack, PagerDuty, Jira, webhooks — as part of any automated process.' },
      { icon: faWrench, title: 'MCP-Exposed', description: 'Workflows are exposed via Model Context Protocol, making them callable from any MCP-compatible agent or client.' },
      { icon: faBolt, title: 'Human-in-the-Loop', description: 'Workflows can pause and wait for human approval before continuing — critical for high-stakes automation.' },
    ],
  },
]

function CapabilitiesScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeTab, setActiveTab] = useState(0)

  const tab = tabs[activeTab]

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Capabilities
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Everything You <span className="gradient-text">Need to Ship</span>
          </h2>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          className="flex gap-2 mb-5 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeTab === i
                  ? 'text-white border-transparent'
                  : isDark
                    ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    : 'bg-white/60 border-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-white'
              }`}
              style={activeTab === i ? { backgroundColor: t.color, borderColor: t.color } : {}}
            >
              <FontAwesomeIcon icon={t.icon} className="text-xs" />
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`p-4 rounded-xl border mb-4 flex items-center gap-3 ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${tab.color}25` }}>
                <FontAwesomeIcon icon={tab.icon} style={{ color: tab.color }} />
              </div>
              <p className={`text-sm font-medium ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                {tab.tagline}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {tab.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${tab.color}20` }}>
                      <FontAwesomeIcon icon={item.icon} style={{ color: tab.color }} className="text-sm" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{item.title}</h4>
                      <p className={`text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CapabilitiesScene
