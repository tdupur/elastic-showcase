import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileShield, faMemory, faLock, faKey, faEyeSlash, faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

const problems = [
  {
    icon: faFileShield,
    color: '#FF957D',
    title: 'Old-school antivirus looks at files once',
    body: 'Traditional antivirus typically relies on a single layer of pre-execution file scanning. If a threat gets past that one check, there is nothing left to stop it.',
  },
  {
    icon: faMemory,
    color: '#F04E98',
    title: 'Some attacks never touch a file',
    body: 'In-memory threats such as shellcode injection are built to evade file-based detection. A scanner that only reads files cannot see them.',
  },
  {
    icon: faLock,
    color: '#FEC514',
    title: 'Ransomware moves fast',
    body: 'Ransomware encrypts data and can even target a machine’s master boot record. By the time you notice, the damage is already done.',
  },
  {
    icon: faKey,
    color: '#48EFCF',
    title: 'Attackers go after credentials',
    body: 'Stealing passwords from Windows system process memory, or saving registry hives, lets an attacker spread from one host to the next.',
  },
]

function ChallengeScene() {
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
            The Problem
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Endpoints are where attacks <span className="gradient-text">actually land</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            An endpoint is any laptop, desktop, or server your people and apps run on. One check at the front door is not enough to protect it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              className={`p-5 rounded-xl border flex gap-4 ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${p.color}22` }}
              >
                <FontAwesomeIcon icon={p.icon} style={{ color: p.color }} className="text-xl" />
              </div>
              <div>
                <h3 className={`text-headline text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {p.title}
                </h3>
                <p className={`text-paragraph text-sm leading-relaxed ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`mt-5 p-5 rounded-xl border flex items-center gap-5 ${
            isDark ? 'bg-elastic-teal/10 border-elastic-teal/30' : 'bg-elastic-blue/5 border-elastic-blue/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <div className="flex items-center gap-3 flex-shrink-0">
            <FontAwesomeIcon icon={faEyeSlash} className={`text-2xl ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
            <FontAwesomeIcon icon={faLayerGroup} className={`text-2xl ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
          </div>
          <p className={`text-paragraph text-base ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            <strong>What defenders need:</strong> several layers of protection that work together, so a threat that slips past one layer can still be caught by the next, plus a way to <span className="gradient-text font-bold">respond</span> when something gets through.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
