import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell, faPuzzlePiece, faPersonRunning, faWrench
} from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faBell,
    color: '#F04E98',
    title: 'Alert Fatigue',
    description: 'Too many alerts, too little time. Critical events get lost in noise while manual triage slows everything down.',
  },
  {
    icon: faPuzzlePiece,
    color: '#FF957D',
    title: 'Tool Fragmentation',
    description: 'Your operational data lives in Elastic — but acting on it requires bolting on external automation platforms.',
  },
  {
    icon: faPersonRunning,
    color: '#FEC514',
    title: 'Understaffed Teams',
    description: 'Teams are expected to do more with fewer people. Manual, repetitive tasks consume time that should go to real work.',
  },
  {
    icon: faWrench,
    color: '#0B64DD',
    title: 'Manual Repetitive Work',
    description: 'Routine ops tasks — triage, enrichment, reporting, cleanup — get done inconsistently or not at all.',
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
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-pink' : 'text-elastic-blue'}`}>
            The Problem
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Insight Without Action{' '}
            <span className="gradient-text">Is Incomplete</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Your data tells a story. But acting on it still requires manual effort, external tools, and stretched teams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              className={`relative p-5 rounded-xl border overflow-hidden group ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white/80 border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{ background: `radial-gradient(circle at 0% 0%, ${problem.color}15, transparent 60%)` }}
              />
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: problem.color, opacity: 0.6 }} />
              <div className="relative flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${problem.color}20` }}>
                  <FontAwesomeIcon icon={problem.icon} style={{ color: problem.color }} className="text-lg" />
                </div>
                <div>
                  <h3 className={`text-headline text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                    {problem.title}
                  </h3>
                  <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`mt-6 p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/20'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className={`text-paragraph text-base ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            <span className="font-semibold">Platform Workflows</span> closes the loop — automating end-to-end processes directly where your data lives, with no external tools needed.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
