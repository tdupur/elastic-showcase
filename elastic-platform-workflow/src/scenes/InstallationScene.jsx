import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUserShield, faCircleCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const steps = [
  {
    num: '1',
    title: 'Open Advanced Settings',
    desc: 'In Kibana, go to Stack Management → Advanced Settings (or use the global search bar).',
    code: null,
  },
  {
    num: '2',
    title: 'Enable Workflows',
    desc: 'Search for the setting and toggle it on. Click Save, then reload the page.',
    code: 'workflows:ui:enabled',
  },
  {
    num: '3',
    title: 'Configure Kibana Privileges',
    desc: 'Grant team members access via Analytics → Workflows with All or Read privileges.',
    code: null,
  },
]

const privileges = [
  { action: 'Access the Workflows page', privilege: 'All or Read — Analytics > Workflows' },
  { action: 'Create, edit, run, manage workflows', privilege: 'All — Analytics > Workflows' },
  { action: 'Specific workflow actions (create/edit/run)', privilege: 'Sub-feature privileges' },
]

function InstallationScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            Getting Started
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Set Up <span className="gradient-text">Workflows</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Workflows are disabled by default. Enable the feature and configure role-based access — no additional infrastructure required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Setup steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`flex items-center gap-2 mb-3 text-sm font-semibold ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
              <FontAwesomeIcon icon={faGear} />
              Enable
            </div>
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  className={`relative p-4 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      isDark ? 'bg-elastic-teal/20 text-elastic-teal' : 'bg-elastic-blue/10 text-elastic-blue'
                    }`}>
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{step.title}</div>
                      <div className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-elastic-ink/60'}`}>{step.desc}</div>
                      {step.code && (
                        <code className={`inline-block mt-2 px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-white/10 text-elastic-teal' : 'bg-elastic-dev-blue/10 text-elastic-blue'}`}>
                          {step.code}
                        </code>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Privilege table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className={`flex items-center gap-2 mb-3 text-sm font-semibold ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
              <FontAwesomeIcon icon={faUserShield} />
              Manage Access
            </div>
            <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}>
              <div className={`px-4 py-2 text-xs font-semibold grid grid-cols-2 gap-2 border-b ${isDark ? 'bg-white/[0.04] border-white/10 text-white/50' : 'bg-elastic-dev-blue/5 border-elastic-dev-blue/10 text-elastic-dev-blue/50'}`}>
                <span>Action</span>
                <span>Required Privilege</span>
              </div>
              {privileges.map((p, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 grid grid-cols-2 gap-2 text-xs border-b last:border-b-0 ${
                    isDark ? 'border-white/[0.06] text-white/60 hover:bg-white/[0.02]' : 'border-elastic-dev-blue/[0.06] text-elastic-ink hover:bg-elastic-dev-blue/[0.02]'
                  }`}
                >
                  <span>{p.action}</span>
                  <span className={`font-mono ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>{p.privilege}</span>
                </div>
              ))}
            </div>

            <motion.div
              className={`mt-4 p-4 rounded-xl border ${isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/20'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className={`flex items-start gap-2 text-xs ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 flex-shrink-0" />
                <span>Available on Elastic Cloud (Hosted & Serverless) and self-managed Elastic Stack. Check your subscription tier for availability.</span>
              </div>
              <a
                href="https://www.elastic.co/docs/explore-analyze/workflows/get-started/setup"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}
              >
                Full setup guide <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default InstallationScene
