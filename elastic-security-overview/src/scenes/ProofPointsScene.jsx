import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine, faTrophy, faCircleCheck, faBuilding
} from '@fortawesome/free-solid-svg-icons'

const stats = [
  { value: '60%', label: 'Growth', customer: 'Proficio', color: '#0B64DD' },
  { value: '34%', label: 'Faster Investigation', customer: 'Proficio', color: '#48EFCF' },
  { value: '$1M', label: 'Projected 3-Year Savings', customer: 'Proficio', color: '#F04E98' },
  { value: '80%', label: 'Faster Incident Resolution', customer: 'UOL', color: '#FF957D' },
  { value: '100+', label: 'Analyst Hours Freed / Month', customer: 'Texas A&M', color: '#FEC514' },
  { value: '99%', label: 'Reduced Response Time', customer: 'Texas A&M', color: '#0B64DD' },
  { value: '30%', label: 'Reduced MTTR', customer: 'PepsiCo', color: '#48EFCF' },
  { value: '2.3K+', label: 'GitHub Stars — Detection Rules', customer: 'Open Source Community', color: '#F04E98' },
]

const recognitions = [
  { title: 'Forrester Wave Leader', detail: 'Security Analytics Platforms, Q2 2025', color: '#0B64DD' },
  { title: 'Gartner Magic Quadrant Leader', detail: 'Observability Platforms, 2025', color: '#48EFCF' },
  { title: 'IDC MarketScape Leader', detail: 'Worldwide SIEM for Enterprise, 2024', color: '#F04E98' },
  { title: 'AV-Comparatives Certified', detail: 'Endpoint Prevention and Response', color: '#FF957D' },
]

function ProofPointsScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Why Customers Choose Elastic
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Real Results, <span className="gradient-text">Proven Impact</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            From Fortune 500s to public sector — security teams worldwide trust Elastic to protect at scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Stats grid */}
          <div>
            <div className={`flex items-center gap-2 mb-3`}>
              <FontAwesomeIcon icon={faChartLine} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
              <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>Customer Outcomes</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat, i) => (
                <motion.div
                  key={`${stat.value}-${stat.customer}`}
                  className={`p-3 rounded-xl border text-center ${
                    isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <div className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-white/70' : 'text-elastic-dark-ink'}`}>{stat.label}</div>
                  <div className={`text-[10px] mt-0.5 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/40'}`}>{stat.customer}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recognition */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faTrophy} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
              <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>Industry Recognition</h3>
            </div>
            <div className="space-y-2">
              {recognitions.map((r, i) => (
                <motion.div
                  key={r.title}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${r.color}20` }}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: r.color }} className="text-sm" />
                  </div>
                  <div>
                    <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{r.title}</div>
                    <div className={`text-xs ${isDark ? 'text-white/45' : 'text-elastic-dev-blue/50'}`}>{r.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className={`mt-3 p-3 rounded-xl border ${
                isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faBuilding} className={`mt-0.5 text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                <p className={`text-xs ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
                  Trusted by global enterprises, MSSPs, universities, and government agencies — at petabyte scale.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProofPointsScene
