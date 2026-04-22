import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faKey, faTag, faAlignLeft, faWrench, faCircleCheck, faTerminal, faPlug } from '@fortawesome/free-solid-svg-icons'

const tabs = ['Fields', 'Workflow', 'Best Practices']

const fields = [
  { icon: faKey, color: '#48EFCF', name: 'ID', required: true, description: 'A unique identifier for the skill — used to reference it in the API.' },
  { icon: faTag, color: '#0B64DD', name: 'Name', required: true, description: 'Human-readable name (64-character limit). Shown in the skills library and agent configuration.' },
  { icon: faAlignLeft, color: '#F04E98', name: 'Description', required: true, description: 'When the agent should use this skill (1024-char limit). Always in context — write it for routing, not explanation.' },
  { icon: faGear, color: '#FEC514', name: 'Instructions', required: true, description: 'The skill content in Markdown. Include trigger conditions, step-by-step instructions, examples, and edge cases.' },
  { icon: faWrench, color: '#FF957D', name: 'Associated Tools', required: false, description: 'Up to 100 tools the skill can call. Scope to only the tools relevant to this task — never over-provision.' },
  { icon: faPlug, color: '#48EFCF', name: 'Referenced Content', required: false, description: 'API-only: named content blocks the agent reads selectively. Use for large lookup tables, OS-specific guidance, or example queries.' },
]

const workflowSteps = [
  { step: '01', title: 'Open Skill Library', description: 'Navigate to Manage components → Skills in Kibana, then select Create a skill.' },
  { step: '02', title: 'Fill in the Fields', description: 'Set ID, Name, Description, and Instructions. Add associated tools under Advanced options.' },
  { step: '03', title: 'Save to Library', description: 'The skill is saved to your shared library but not yet available to any agent.' },
  { step: '04', title: 'Assign to Agent', description: 'Go to an agent → Customize → Skills → Add skills. Import from library or create inline.' },
  { step: '05', title: 'Test with Real Queries', description: 'Send queries that should trigger the skill. Verify selection, steps, and edge case handling. Iterate.' },
]

const bestPractices = [
  { icon: faCircleCheck, color: '#48EFCF', tip: 'Write descriptions for routing, not marketing — state explicitly when to use this skill.' },
  { icon: faCircleCheck, color: '#48EFCF', tip: 'Open instructions with trigger conditions so the agent confirms it\'s in the right skill.' },
  { icon: faCircleCheck, color: '#48EFCF', tip: 'Use step-by-step Markdown for procedural tasks — vague instructions produce inconsistent results.' },
  { icon: faCircleCheck, color: '#48EFCF', tip: 'Scope each skill to one task. If two workflows appear, split into two skills with distinct descriptions.' },
  { icon: faCircleCheck, color: '#48EFCF', tip: 'Assign only relevant tools — over-provisioning increases the chance the agent calls the wrong one.' },
  { icon: faCircleCheck, color: '#48EFCF', tip: 'Document edge cases explicitly: no data found, too many results, ambiguous relationships.' },
]

function CustomSkillsScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Extend the Catalog
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Custom <span className="gradient-text">skills</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            When built-in skills don't cover your domain, build your own. Custom skills live in a shared library and can be assigned to any agent.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex gap-2 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeTab === i
                  ? isDark
                    ? 'bg-elastic-teal/20 border-elastic-teal/40 text-elastic-teal'
                    : 'bg-elastic-blue/15 border-elastic-blue/30 text-elastic-blue'
                  : isDark
                    ? 'bg-white/[0.04] border-white/10 text-white/50 hover:text-white/80'
                    : 'bg-white border-elastic-dev-blue/10 text-elastic-dev-blue/50 hover:text-elastic-dev-blue'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {fields.map((field, i) => (
                <div
                  key={field.name}
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${field.color}20` }}
                  >
                    <FontAwesomeIcon icon={field.icon} style={{ color: field.color }} className="text-xs" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <code className={`text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{field.name}</code>
                      {field.required
                        ? <span className="text-xs px-1.5 py-0.5 rounded-full bg-elastic-pink/20 text-elastic-pink font-semibold">required</span>
                        : <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${isDark ? 'bg-white/10 text-white/40' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/40'}`}>optional</span>
                      }
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/65'}`}>{field.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-3">
              {workflowSteps.map((step, i) => (
                <div
                  key={step.step}
                  className={`flex items-start gap-4 p-4 rounded-xl border ${
                    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm ${
                    isDark ? 'bg-elastic-teal/20 text-elastic-teal' : 'bg-elastic-blue/15 text-elastic-blue'
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm mb-0.5 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{step.title}</h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/60'}`}>{step.description}</p>
                  </div>
                </div>
              ))}
              <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
              }`}>
                <FontAwesomeIcon icon={faTerminal} className={isDark ? 'text-elastic-teal text-sm' : 'text-elastic-blue text-sm'} />
                <code className={`text-xs ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                  POST /api/agent_builder/skills — also fully manageable via Kibana REST API
                </code>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {bestPractices.map((practice, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${
                    isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
                  }`}
                >
                  <FontAwesomeIcon icon={practice.icon} style={{ color: practice.color }} className="mt-0.5 flex-shrink-0" />
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-white/65' : 'text-elastic-dev-blue/70'}`}>
                    {practice.tip}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CustomSkillsScene
