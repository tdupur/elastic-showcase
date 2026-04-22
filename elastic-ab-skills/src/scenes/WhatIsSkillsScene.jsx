import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faWrench, faBolt, faLayerGroup, faCheck } from '@fortawesome/free-solid-svg-icons'

const concepts = [
  {
    icon: faBook,
    color: '#48EFCF',
    label: 'Knowledge Content',
    description: 'Domain-specific instructions written in Markdown — trigger conditions, step-by-step procedures, examples, and edge cases.',
  },
  {
    icon: faWrench,
    color: '#0B64DD',
    label: 'Associated Tools',
    description: 'Built-in or custom tools bundled with the skill — scoped so the agent only accesses relevant tools for the task at hand.',
  },
  {
    icon: faBolt,
    color: '#F04E98',
    label: 'On-Demand Loading',
    description: 'Skills are NOT always in context. An agent evaluates query relevance against skill names and descriptions, then loads only what\'s needed.',
  },
  {
    icon: faLayerGroup,
    color: '#FEC514',
    label: 'Reusable Across Agents',
    description: 'Author a skill once in your library and assign it to any agent. Changes propagate everywhere — no copying, no drift.',
  },
]

const comparisons = [
  { aspect: 'Always in context?', systemPrompt: 'Yes — every query', skill: 'No — loaded on demand' },
  { aspect: 'Scope', systemPrompt: 'Agent identity & defaults', skill: 'Specific task domain' },
  { aspect: 'Reusable?', systemPrompt: 'Per-agent only', skill: 'Shared across agents' },
  { aspect: 'Tool scoping', systemPrompt: 'All agent tools', skill: 'Task-relevant tools only' },
]

function WhatIsSkillsScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Core Concept
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What is a <span className="gradient-text">Skill?</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            A skill is a reusable instruction set that gives an agent specialized expertise for a particular task domain — bundling knowledge, tools, and context into a single assignable unit.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          {concepts.map((c, i) => (
            <motion.div
              key={c.label}
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${c.color}20` }}
              >
                <FontAwesomeIcon icon={c.icon} style={{ color: c.color }} className="text-sm" />
              </div>
              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{c.label}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/65'}`}>{c.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills vs System Prompt comparison */}
        <motion.div
          className={`rounded-xl border overflow-hidden ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className={`grid grid-cols-3 text-xs font-semibold uppercase tracking-wider px-4 py-2 ${
            isDark ? 'bg-white/[0.06] text-white/50' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/50'
          }`}>
            <span></span>
            <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>System Prompt</span>
            <span className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'}>Skill</span>
          </div>
          {comparisons.map((row, i) => (
            <div
              key={row.aspect}
              className={`grid grid-cols-3 items-center px-4 py-2.5 text-sm border-t ${
                isDark ? 'border-white/5' : 'border-elastic-dev-blue/5'
              }`}
            >
              <span className={`font-medium text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>{row.aspect}</span>
              <span className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>{row.systemPrompt}</span>
              <span className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                {row.skill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default WhatIsSkillsScene
