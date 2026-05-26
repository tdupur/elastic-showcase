import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLayerGroup, faChartLine, faShieldHalved, faMagnifyingGlassChart, faCircleCheck
} from '@fortawesome/free-solid-svg-icons'

const domains = [
  {
    id: 'platform',
    label: 'Platform',
    icon: faLayerGroup,
    color: '#48EFCF',
    description: 'Available across all deployment types',
    skills: [
      { name: 'visualization-creation', badge: 'GA', desc: 'Creates standalone Lens visualizations from index and field context — charts, metrics, trends, breakdowns.' },
      { name: 'graph-creation', badge: 'GA', desc: 'Builds graph attachments showing topology, dependency, and entity-link visualizations as nodes and edges.' },
      { name: 'dashboard-management', badge: 'Preview', desc: 'Composes and updates in-memory Kibana dashboards — add, remove, or edit panels on demand.' },
      { name: 'streams-exploration', badge: 'GA', desc: 'Discovers, inspects, and queries Elasticsearch streams. Read-only — lists, schema, data quality, sampling.' },
      { name: 'workflow-authoring', badge: 'Preview', desc: 'Drafts and edits Elastic Workflows YAML from natural language. Validates before proposing changes.' },
    ],
  },
  {
    id: 'observability',
    label: 'Observability',
    icon: faChartLine,
    color: '#0B64DD',
    description: 'Observability Serverless projects & solution views',
    skills: [
      { name: 'observability.investigation', badge: 'GA', desc: 'Answers observability questions and diagnoses issues across APM services and infrastructure — latency, errors, SLO breaches.' },
      { name: 'observability.rca', badge: 'Preview', desc: 'Performs structured root cause analysis for incidents, outages, and service degradations. Traces cascading failures.' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: faShieldHalved,
    color: '#F04E98',
    description: 'Security Serverless projects & solution views',
    skills: [
      { name: 'alert-analysis', badge: 'GA', desc: 'Investigates Elastic Security alerts — fetches context, finds related alerts, correlates threat intel, assesses severity.' },
      { name: 'entity-analytics', badge: 'GA', desc: 'Finds and profiles security entities by risk score, asset criticality, and ML anomaly signals.' },
      { name: 'find-security-ml-jobs', badge: 'GA', desc: 'Investigates atypical behavior from ML jobs — unusual logins, lateral movement, suspicious domains, large data transfers.' },
      { name: 'threat-hunting', badge: 'GA', desc: 'Runs hypothesis-driven hunts using iterative ES|QL — IOC search, anomaly detection, baseline comparison.' },
      { name: 'detection-rule-edit', badge: 'GA', desc: 'Creates and edits ES|QL detection rules — severity, MITRE ATT&CK mappings, schedule, and query.' },
    ],
  },
  {
    id: 'search',
    label: 'Search',
    icon: faMagnifyingGlassChart,
    color: '#FF957D',
    description: 'Elasticsearch Serverless projects',
    skills: [
      { name: 'search.semantic-search', badge: 'GA', desc: 'Guides agents through building semantic and vector search solutions on Elasticsearch.' },
      { name: 'search.hybrid-search', badge: 'GA', desc: 'Guides agents through combining keyword and semantic search for best-of-both relevance.' },
      { name: 'search.rag-chatbot', badge: 'GA', desc: 'Guides agents through building retrieval-augmented generation chatbot solutions.' },
      { name: 'search.catalog-ecommerce', badge: 'GA', desc: 'Guides agents through catalog and e-commerce search solutions.' },
      { name: 'search.vector-database', badge: 'GA', desc: 'Guides agents through using Elasticsearch as a vector database.' },
    ],
  },
]

const badgeStyle = (badge, isDark) => {
  if (badge === 'GA') return isDark ? 'bg-elastic-teal/15 text-elastic-teal border-elastic-teal/30' : 'bg-elastic-blue/10 text-elastic-blue border-elastic-blue/30'
  return isDark ? 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30' : 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30'
}

function BuiltInSkillsScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeDomain, setActiveDomain] = useState(0)

  const domain = domains[activeDomain]

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Built-In Skills
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Domain Knowledge <span className="gradient-text">Out of the Box</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Pre-built skills covering platform operations, observability, security, and search — assign them to any agent instantly.
          </p>
        </motion.div>

        {/* Domain tabs */}
        <motion.div
          className="flex gap-2 mb-4 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {domains.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActiveDomain(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeDomain === i
                  ? 'text-white border-transparent'
                  : isDark
                    ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    : 'bg-white/60 border-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-white'
              }`}
              style={activeDomain === i ? { backgroundColor: d.color, borderColor: d.color } : {}}
            >
              <FontAwesomeIcon icon={d.icon} className="text-xs" />
              {d.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`p-3 rounded-xl border mb-4 flex items-center gap-2 ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}>
              <FontAwesomeIcon icon={domain.icon} style={{ color: domain.color }} className="text-sm" />
              <p className={`text-sm ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
                {domain.description}
              </p>
            </div>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {domain.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${domain.color}20` }}>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: domain.color }} className="text-xs" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className={`text-code text-sm font-semibold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                        {skill.name}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${badgeStyle(skill.badge, isDark)}`}>
                        {skill.badge}
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                      {skill.desc}
                    </p>
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

export default BuiltInSkillsScene
