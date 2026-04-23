import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faRecycle, faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const yamlExample = `name: Enrich Security Alert
triggers:
  - type: alert
steps:
  - name: lookup_user
    type: elasticsearch.search
    with:
      index: "users"
      query:
        match:
          username: "{{event.user}}"
  - name: notify
    type: slack.message
    with:
      message: |
        Alert: {{event.rule.name}}
        User: {{steps.lookup_user.output.hits.hits[0]._source.fullName}}`

const concepts = [
  {
    icon: faCode,
    color: '#48EFCF',
    title: 'YAML-Defined',
    description: 'Describe what the workflow should do. Elastic handles execution.',
  },
  {
    icon: faRecycle,
    color: '#0B64DD',
    title: 'Reusable Recipes',
    description: 'Version, share, and adapt workflows across teams and use cases.',
  },
  {
    icon: faPlay,
    color: '#F04E98',
    title: 'Triggered Automatically',
    description: 'Kick off on alerts, schedules, or manual invocation — no polling needed.',
  },
]

function WhatIsWorkflowsScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            What Are Workflows
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Automation That Lives{' '}
            <span className="gradient-text">Where Your Data Lives</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            A workflow is a reusable, versionable YAML recipe that transforms data insights into automated outcomes — all within Kibana.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 items-start">
          {/* Left: YAML example */}
          <motion.div
            className={`rounded-xl border overflow-hidden ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`flex items-center gap-2 px-4 py-2 border-b ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-elastic-dev-blue/5 border-elastic-dev-blue/10'}`}>
              <div className="w-3 h-3 rounded-full bg-elastic-pink/60" />
              <div className="w-3 h-3 rounded-full bg-elastic-yellow/60" />
              <div className="w-3 h-3 rounded-full bg-elastic-teal/60" />
              <span className={`ml-2 text-xs font-mono ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>workflow.yaml</span>
            </div>
            <pre className={`p-4 text-xs font-mono overflow-x-auto leading-relaxed ${isDark ? 'text-elastic-teal' : 'text-elastic-dev-blue'}`}>
              {yamlExample}
            </pre>
          </motion.div>

          {/* Right: concept cards + definition */}
          <div className="flex flex-col gap-4">
            {concepts.map((c, i) => (
              <motion.div
                key={c.title}
                className={`flex items-start gap-4 p-4 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c.color}20` }}>
                  <FontAwesomeIcon icon={c.icon} style={{ color: c.color }} />
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{c.title}</h3>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{c.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className={`p-4 rounded-xl border ${isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/20'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className={`text-xs ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                Your cluster data — security events, metrics, logs, business context — is already in Elastic. Workflows act on it directly, eliminating the need for external automation tools.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatIsWorkflowsScene
