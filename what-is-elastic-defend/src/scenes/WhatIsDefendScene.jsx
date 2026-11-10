import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShieldHalved, faPlug, faMicrochip, faWindowMaximize
} from '@fortawesome/free-solid-svg-icons'

const parts = [
  {
    id: 'defend',
    icon: faShieldHalved,
    color: '#0B64DD',
    name: 'Elastic Defend',
    kind: 'The integration (the rulebook)',
    role: 'Defines your protection policy: which threat protections are active, which events to collect, and which exceptions apply.',
    where: 'You add it from the Integrations page and configure it in the Elastic Security UI or through the API.',
  },
  {
    id: 'agent',
    icon: faPlug,
    color: '#48EFCF',
    name: 'Elastic Agent',
    kind: 'The unified agent (the delivery truck)',
    role: 'Installed on each host. Manages integrations, enrolls and talks to Fleet, and ships collected data to Elasticsearch.',
    where: 'You install it with a command copied from Fleet. Elastic Defend runs as part of it.',
  },
  {
    id: 'endpoint',
    icon: faMicrochip,
    color: '#F04E98',
    name: 'Elastic Endpoint',
    kind: 'The on-host component (the guard)',
    role: 'Does the real work at the operating system level: threat monitoring, prevention, and response actions.',
    where: 'Elastic Agent installs it automatically when the Elastic Defend integration is added to its policy.',
  },
]

function WhatIsDefendScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [selected, setSelected] = useState(0)
  const active = parts[selected]

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            The Core Idea
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Elastic Defend is <span className="gradient-text">endpoint protection</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            It prevents and detects malware, ransomware, memory threats, and malicious behavior on Windows, macOS, and Linux hosts. When it spots a threat, it can raise an alert or block the activity outright, depending on your settings.
          </p>
        </motion.div>

        <motion.p
          className={`text-center text-sm font-semibold mb-3 ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Three names you will hear. Click each one.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {parts.map((p, i) => {
            const isActive = selected === i
            return (
              <motion.button
                key={p.id}
                onClick={() => setSelected(i)}
                className={`text-left p-5 rounded-xl border-2 transition-all ${
                  isDark ? 'bg-white/[0.04]' : 'bg-white'
                }`}
                style={{
                  borderColor: isActive ? p.color : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,28,63,0.1)',
                  boxShadow: isActive ? `0 0 28px ${p.color}33` : 'none',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${p.color}22` }}
                >
                  <FontAwesomeIcon icon={p.icon} style={{ color: p.color }} className="text-xl" />
                </div>
                <h3 className={`text-headline text-xl font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {p.name}
                </h3>
                <p className="text-code text-xs mt-1" style={{ color: p.color }}>{p.kind}</p>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className={`mt-4 p-5 rounded-xl border grid grid-cols-1 md:grid-cols-2 gap-5 ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <span className="text-eyebrow text-xs" style={{ color: active.color }}>What it does</span>
              <p className={`text-paragraph text-base mt-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{active.role}</p>
            </div>
            <div>
              <span className="text-eyebrow text-xs" style={{ color: active.color }}>How you meet it</span>
              <p className={`text-paragraph text-base mt-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{active.where}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-4 flex items-center justify-center gap-3 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <FontAwesomeIcon icon={faWindowMaximize} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
          {['Windows', 'macOS', 'Linux'].map(os => (
            <span
              key={os}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                isDark ? 'bg-elastic-teal/10 border-elastic-teal/30 text-elastic-teal' : 'bg-elastic-blue/10 border-elastic-blue/30 text-elastic-blue'
              }`}
            >
              {os}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default WhatIsDefendScene
