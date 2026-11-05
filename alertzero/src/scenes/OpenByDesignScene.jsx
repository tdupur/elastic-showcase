import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBrain, faCloud, faServer, faPlaneUp, faRobot, faDiagramProject, faShieldHalved, faMagnifyingGlassChart, faTerminal
} from '@fortawesome/free-solid-svg-icons'

const models = [
  { icon: faBrain, color: '#48EFCF', title: 'Any model', text: 'Proprietary or open source. You pick the model that fits your policy.' },
]
const deployments = [
  { icon: faCloud, color: '#0B64DD', title: 'Elastic Cloud' },
  { icon: faServer, color: '#F04E98', title: 'Self-managed' },
  { icon: faPlaneUp, color: '#FF957D', title: 'Fully air-gapped' },
]
const blocks = [
  { icon: faRobot, color: '#48EFCF', title: 'Agent Builder', text: 'Agents, tools, and security skills do the analysis.' },
  { icon: faDiagramProject, color: '#0B64DD', title: 'Elastic Workflows', text: 'Each Worker runs as a workflow for repeatable execution.' },
  { icon: faMagnifyingGlassChart, color: '#F04E98', title: 'Attack Discovery', text: 'Links related alerts into attack narratives.' },
  { icon: faShieldHalved, color: '#FF957D', title: 'Elastic Defend', text: 'Provides the supported endpoint response actions.' },
  { icon: faTerminal, color: '#FEC514', title: 'ES|QL', text: 'Query language for investigating and tuning.' },
]

function OpenByDesignScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const card = `rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'}`

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div className="text-center mb-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>Open by Design</span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Your Models. <span className="gradient-text">Your Environment.</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Here, open means choice of model and deployment. AlertZero is built on Elastic building blocks you may already use.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3">
          <motion.div className={`${card} p-4`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className={`text-eyebrow text-xs mb-3 ${isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>Model choice</p>
            {models.map(m => (
              <div key={m.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${m.color}20` }}>
                  <FontAwesomeIcon icon={m.icon} style={{ color: m.color }} />
                </div>
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{m.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{m.text}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div className={`${card} p-4`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className={`text-eyebrow text-xs mb-3 ${isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>Same features, anywhere</p>
            <div className="grid grid-cols-3 gap-2">
              {deployments.map(d => (
                <div key={d.title} className={`p-3 rounded-lg border text-center ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-elastic-dev-blue/10 bg-white'}`}>
                  <FontAwesomeIcon icon={d.icon} className="text-xl" style={{ color: d.color }} />
                  <div className={`text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{d.title}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <p className={`text-eyebrow text-xs mt-5 mb-2 ${isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>Built on</p>
        <div className="grid grid-cols-5 gap-3">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              className={`${card} p-4`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: `${b.color}20` }}>
                <FontAwesomeIcon icon={b.icon} style={{ color: b.color }} />
              </div>
              <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{b.title}</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OpenByDesignScene
