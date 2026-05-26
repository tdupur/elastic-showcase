import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTriangleExclamation,
  faMagnifyingGlassChart,
  faBrain,
  faLayerGroup,
  faGaugeHigh,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons'

const challenges = [
  {
    icon: faMagnifyingGlassChart,
    color: '#F04E98',
    title: 'Keyword Mismatch',
    description: 'Users search one way, data is stored another — exact-match search misses what people actually mean.',
  },
  {
    icon: faBrain,
    color: '#FF957D',
    title: 'No AI Understanding',
    description: 'Traditional search cannot understand context, intent, or language nuance — only exact keywords.',
  },
  {
    icon: faLayerGroup,
    color: '#FEC514',
    title: 'Siloed Approaches',
    description: 'Teams patch together separate search, vector DBs, and AI APIs, creating brittle and costly architectures.',
  },
  {
    icon: faGaugeHigh,
    color: '#48EFCF',
    title: 'Scale & Latency',
    description: 'As data grows, relevance degrades and query times spike — search that worked at 100K docs fails at 100M.',
  },
  {
    icon: faShieldHalved,
    color: '#0B64DD',
    title: 'Security Complexity',
    description: 'Controlling who can see what in a search result requires complex custom logic on top of every data store.',
  },
  {
    icon: faTriangleExclamation,
    color: '#F04E98',
    title: 'LLM Hallucination',
    description: 'AI assistants make up answers when they lack grounding in your real, authoritative data.',
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
            Why Search Is <span className="gradient-text">Harder Than It Looks</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Building great search experiences means overcoming a stack of compounding challenges — across relevance, AI, scale, and security.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {challenges.map((item, i) => (
            <motion.div
              key={item.title}
              className={`p-5 rounded-xl border ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <FontAwesomeIcon icon={item.icon} style={{ color: item.color }} />
              </div>
              <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`mt-6 p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-teal/10 border-elastic-teal/30' : 'bg-elastic-blue/5 border-elastic-blue/20'
          }`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className={`text-sm font-semibold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Elasticsearch provides a single platform for every search technique — from keyword to AI — with built-in scale and security.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengeScene
