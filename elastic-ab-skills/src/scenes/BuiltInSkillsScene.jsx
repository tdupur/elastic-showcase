import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHalved, faMagnifyingGlassChart, faChartLine, faServer, faLock } from '@fortawesome/free-solid-svg-icons'

const categories = [
  {
    id: 'platform',
    label: 'Platform',
    icon: faServer,
    color: '#48EFCF',
    availability: 'All deployments',
    skills: [
      { name: 'dashboard-management', status: 'Preview', description: 'Compose and update in-memory Kibana dashboards. Create, find, or modify dashboards and their panels.' },
      { name: 'visualization-creation', status: 'Planned', description: 'Create standalone Lens visualizations from index and field context. Supports charts, metrics, trends, and breakdowns.' },
      { name: 'graph-creation', status: 'Planned', description: 'Transform relationship data into node/edge graphs rendered inline in the conversation.' },
      { name: 'streams-exploration', status: 'Planned', description: 'Discover, inspect, and query Elasticsearch streams. Read-only — cannot create or modify streams.' },
    ],
  },
  {
    id: 'observability',
    label: 'Observability',
    icon: faChartLine,
    color: '#0B64DD',
    availability: 'Serverless Observability',
    skills: [
      { name: 'observability.investigation', status: 'GA', description: 'Answers observability questions and diagnoses issues across APM services and infrastructure — latency, error rates, SLO breaches, alert investigations.' },
      { name: 'observability.rca', status: 'Planned', description: 'Structured root cause analysis for incidents, outages, errors, and service degradations across cascading failures.' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: faShieldHalved,
    color: '#F04E98',
    availability: 'Serverless Security',
    skills: [
      { name: 'entity-analytics', status: 'GA', description: 'Finds and investigates security entities: hosts, users, services. Analyzes risk scores, asset criticality, and behavioral history.' },
      { name: 'find-security-ml-jobs', status: 'Planned', description: 'Investigates anomalous behavior from ML jobs — abnormal access, lateral movement, unexpected logins, large data transfers.' },
      { name: 'threat-hunting', status: 'Planned', description: 'Hypothesis-driven threat hunts with iterative ES|QL exploration: IOC search, anomaly detection, behavioral baselines.' },
      { name: 'detection-rule-edit', status: 'Planned', description: 'Creates and edits Elastic Security detection rules from natural language — severity, MITRE ATT&CK, schedule, index patterns.' },
    ],
  },
  {
    id: 'elasticsearch',
    label: 'Elasticsearch',
    icon: faMagnifyingGlassChart,
    color: '#FEC514',
    availability: 'Serverless Elasticsearch',
    skills: [
      { name: 'search.hybrid-search', status: 'GA', description: 'Guides agents through building hybrid search solutions combining keyword and semantic search.' },
      { name: 'search.semantic-search', status: 'GA', description: 'Guides agents through building semantic and vector search solutions on Elasticsearch.' },
      { name: 'search.keyword-search', status: 'GA', description: 'Guides agents through building keyword and full-text search solutions.' },
      { name: 'search.rag-chatbot', status: 'GA', description: 'Guides agents through building retrieval-augmented generation chatbot solutions.' },
      { name: 'search.catalog-ecommerce', status: 'GA', description: 'Guides agents through building catalog and e-commerce search solutions.' },
      { name: 'search.vector-database', status: 'GA', description: 'Guides agents through using Elasticsearch as a vector database.' },
    ],
  },
]

const statusColors = {
  GA: { bg: '#48EFCF20', text: '#48EFCF', label: 'GA' },
  Preview: { bg: '#0B64DD20', text: '#0B64DD', label: 'Preview' },
  Planned: { bg: '#FEC51420', text: '#FEC514', label: 'Planned' },
}

function BuiltInSkillsScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeTab, setActiveTab] = useState('platform')

  const activeCategory = categories.find(c => c.id === activeTab)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Ready to Use
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Built-in <span className="gradient-text">skills</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Elastic ships production-ready skills across four domains. Available skills depend on your deployment type. All built-in skills are read-only.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex gap-2 mb-5 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeTab === cat.id
                  ? 'border-transparent text-white'
                  : isDark
                    ? 'bg-white/[0.04] border-white/10 text-white/60 hover:text-white/90'
                    : 'bg-white border-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:text-elastic-dev-blue'
              }`}
              style={activeTab === cat.id ? { backgroundColor: cat.color } : {}}
            >
              <FontAwesomeIcon icon={cat.icon} className="text-xs" />
              {cat.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === cat.id
                  ? 'bg-white/20'
                  : isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'
              }`}>
                {cat.skills.length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Skills list */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`rounded-xl border overflow-hidden ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}
        >
          <div className={`flex items-center gap-3 px-5 py-3 border-b ${
            isDark ? 'bg-white/[0.05] border-white/10' : 'bg-elastic-dev-blue/5 border-elastic-dev-blue/10'
          }`}>
            <FontAwesomeIcon
              icon={activeCategory.icon}
              style={{ color: activeCategory.color }}
              className="text-sm"
            />
            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
              {activeCategory.label} Skills
            </span>
            <span className={`text-xs ml-auto ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
              Available: {activeCategory.availability}
            </span>
            <FontAwesomeIcon icon={faLock} className={`text-xs ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`} title="Read-only" />
          </div>

          {activeCategory.skills.map((skill, i) => {
            const statusStyle = statusColors[skill.status] || statusColors.Planned
            return (
              <div
                key={skill.name}
                className={`px-5 py-3.5 border-b last:border-b-0 ${
                  isDark ? 'border-white/5 hover:bg-white/[0.03]' : 'border-elastic-dev-blue/5 hover:bg-elastic-blue/[0.02]'
                } transition-colors`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <code className={`text-sm font-mono font-semibold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                        {skill.name}
                      </code>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                      >
                        {statusStyle.label}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/55'}`}>
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default BuiltInSkillsScene
