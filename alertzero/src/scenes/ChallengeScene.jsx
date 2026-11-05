import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt, faLink, faUsers, faHourglassHalf, faMagnifyingGlassChart, faRobot
} from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faBolt,
    color: '#F04E98',
    title: 'Volume and Velocity',
    description: 'Alert volume keeps growing, and attackers now use AI to move faster than a manual queue can.',
  },
  {
    icon: faLink,
    color: '#FF957D',
    title: 'Signals Never Connected',
    description: 'Detecting every signal is not enough. Something has to link them into a single attack.',
  },
  {
    icon: faUsers,
    color: '#FEC514',
    title: 'Coverage Rationed by Headcount',
    description: 'Teams can only investigate what their people can reach. The queue sets the priorities.',
  },
  {
    icon: faHourglassHalf,
    color: '#0B64DD',
    title: 'Alerts Age Out Unexamined',
    description: 'Whatever does not get triaged ages out of the queue, and nobody ever looks at it.',
  },
  {
    icon: faMagnifyingGlassChart,
    color: '#48EFCF',
    title: 'No Time for Proactive Defense',
    description: 'Queue pressure crowds out hunting and detection tuning, the work that would shrink the queue.',
  },
  {
    icon: faRobot,
    color: '#F04E98',
    title: 'Attackers Use AI Too',
    description: 'Agentic attacks, such as the Hugging Face incident, make correlation across signals critical.',
  },
]

function ChallengeScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-pink' : 'text-elastic-blue'}`}>
            The Problem
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            The Alert Queue <span className="gradient-text">Sets the Agenda</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            SOC teams ration coverage by headcount. What does not get triaged ages out unexamined, and that crowds out proactive defense.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              className={`relative p-4 rounded-xl border overflow-hidden group ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white/80 border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{ background: `radial-gradient(circle at 0% 0%, ${problem.color}15, transparent 60%)` }}
              />
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: problem.color, opacity: 0.6 }} />
              <div className="relative">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${problem.color}20` }}>
                  <FontAwesomeIcon icon={problem.icon} style={{ color: problem.color }} className="text-lg" />
                </div>
                <h3 className={`text-headline text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {problem.title}
                </h3>
                <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`mt-4 p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/20'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`text-paragraph text-base ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            <span className="font-semibold">AlertZero</span> aims for inbox zero on the alert queue: every alert gets an answer.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
