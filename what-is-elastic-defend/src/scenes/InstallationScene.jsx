import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faStar, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const environments = {
  traditional: {
    label: 'Traditional Endpoints',
    blurb: 'Laptops, desktops, and servers. Every preset except Data Collection turns on malware, ransomware, memory threat, malicious behavior, and credential theft preventions.',
    presets: [
      { name: 'Data Collection', events: 'All events', prevent: 'No preventions' },
      { name: 'Next-Generation Antivirus (NGAV)', events: 'Process events', prevent: 'All preventions' },
      { name: 'Essential EDR', events: 'Process, network, and file events', prevent: 'All preventions' },
      { name: 'Complete EDR', events: 'All events', prevent: 'All preventions', recommended: true },
    ],
  },
  cloud: {
    label: 'Cloud Workloads',
    blurb: 'Cloud-based Linux hosts. Session data, which enriches process events, is on by default. All preventions are off by default.',
    presets: [
      { name: 'All events', events: 'Process, network, and file events', prevent: 'Includes automated sessions' },
      { name: 'Interactive only', events: 'Process, network, and file events', prevent: 'Filters out non-interactive sessions' },
    ],
  },
}

const steps = [
  'Open Integrations, search for Elastic Defend, and select Add Elastic Defend.',
  'Name the integration, pick Traditional Endpoints or Cloud Workloads, then choose a preset.',
  'Name a new agent policy (or pick an existing one) and select Save and continue.',
  'Select Add Elastic Agent to your hosts. Keep Enroll in Fleet selected and copy the command for your operating system.',
  'Run the command on the host. A few minutes later it appears under Assets → Endpoints in Elastic Security.',
]

function InstallationScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [env, setEnv] = useState('traditional')
  const current = environments[env]

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Getting Started
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Pick a preset, <span className="gradient-text">enroll a host</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Five steps in Kibana and one command on the host. Protections turn on automatically once the agent is enrolled.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Presets */}
          <motion.div
            className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`text-headline text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
              1. Choose what you are protecting
            </h3>
            <div className="flex gap-2 mb-3">
              {Object.entries(environments).map(([key, e]) => (
                <button
                  key={key}
                  onClick={() => setEnv(key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    env === key
                      ? isDark ? 'bg-elastic-teal text-elastic-dev-blue border-elastic-teal' : 'bg-elastic-blue text-white border-elastic-blue'
                      : isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-elastic-dev-blue/20 text-elastic-dev-blue hover:bg-elastic-dev-blue/5'
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
            <p className={`text-paragraph text-sm mb-3 ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{current.blurb}</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={env}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {current.presets.map(pr => (
                  <div
                    key={pr.name}
                    className={`px-4 py-2.5 rounded-lg border ${
                      pr.recommended
                        ? isDark ? 'border-elastic-teal bg-elastic-teal/10' : 'border-elastic-blue bg-elastic-blue/5'
                        : isDark ? 'border-white/10 bg-white/[0.03]' : 'border-elastic-dev-blue/10 bg-elastic-light-grey/50'
                    }`}
                  >
                    <div className={`text-headline text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                      {pr.name}
                      {pr.recommended && (
                        <span className={`text-code text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isDark ? 'bg-elastic-teal text-elastic-dev-blue' : 'bg-elastic-blue text-white'
                        }`}>
                          <FontAwesomeIcon icon={faStar} /> Recommended in the quickstart
                        </span>
                      )}
                    </div>
                    <div className={`text-code text-xs mt-0.5 ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                      {pr.events} · {pr.prevent}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Steps */}
          <motion.div
            className={`p-5 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={`text-headline text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
              The walkthrough
            </h3>
            <ol className="flex flex-col gap-2.5">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className={`text-code text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-elastic-teal/20 text-elastic-teal' : 'bg-elastic-blue/10 text-elastic-blue'
                  }`}>
                    {i + 1}
                  </span>
                  <span className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>{s}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* Prerequisites */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
            <span className="text-eyebrow text-xs text-elastic-teal">You need</span>
            <ul className="mt-2 flex flex-col gap-1.5">
              {[
                'Fleet, with a Fleet Server running',
                'Elastic Agent enrolled in Fleet',
                'Elastic Defend Policy Management: All, and Endpoint List privileges',
              ].map(t => (
                <li key={t} className={`text-sm flex gap-2 items-start ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                  <FontAwesomeIcon icon={faCircleCheck} className="text-elastic-teal mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
            <span className="text-eyebrow text-xs text-elastic-yellow">Watch out</span>
            <ul className="mt-2 flex flex-col gap-1.5">
              {[
                'Not supported on a standalone Elastic Agent',
                'Not supported in a Kubernetes Elastic Agent DaemonSet',
                'macOS hosts without an MDM profile need extra permissions, such as Full Disk Access',
              ].map(t => (
                <li key={t} className={`text-sm flex gap-2 items-start ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                  <FontAwesomeIcon icon={faTriangleExclamation} className="text-elastic-yellow mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InstallationScene
