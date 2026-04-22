import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faCopy, faExpand, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faCopy,
    color: '#F04E98',
    title: 'Copy-Paste Expertise',
    description: 'The same domain-specific instructions get duplicated into every agent that needs them — a maintenance nightmare when procedures change.',
  },
  {
    icon: faExpand,
    color: '#FEC514',
    title: 'Bloated System Prompts',
    description: 'Stuffing every piece of domain knowledge into an agent\'s base prompt inflates context for every single query, even when that knowledge is irrelevant.',
  },
  {
    icon: faCodeBranch,
    color: '#FF957D',
    title: 'Inconsistent Agent Behavior',
    description: 'When the same runbook is hand-written into multiple agents, small differences creep in. Agents end up behaving differently for the same task.',
  },
  {
    icon: faTriangleExclamation,
    color: '#48EFCF',
    title: 'Hard to Share Expertise',
    description: 'A security analyst\'s triage procedure or a devops team\'s runbook lives in one agent. Other teams can\'t reuse it without copying it again.',
  },
]

function ChallengeScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            The Problem
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            AI agents without <span className="gradient-text">shared expertise</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Building specialized AI agents means repeating the same knowledge in every agent that needs it — and paying the price every time.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              className={`p-5 rounded-xl border ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${problem.color}20` }}
                >
                  <FontAwesomeIcon icon={problem.icon} style={{ color: problem.color }} />
                </div>
                <div>
                  <h3 className={`font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                    {problem.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/65'}`}>
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`mt-6 p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
          }`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className={`text-sm font-semibold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            There's a better way — author expertise once, share it everywhere, load it only when needed.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
