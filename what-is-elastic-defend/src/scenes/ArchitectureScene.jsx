import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSliders, faServer, faPlug, faMicrochip, faMagnifyingGlassChart,
  faPlay, faRotateRight, faChevronRight, faArrowDown, faArrowUp
} from '@fortawesome/free-solid-svg-icons'

const steps = [
  {
    id: 'policy',
    icon: faSliders,
    color: '#0B64DD',
    label: 'Elastic Defend policy',
    sublabel: 'You set the rules',
    detail: 'In Elastic Security you add the Elastic Defend integration and pick a preset. The policy says which protections are on, which events to collect, and which exceptions apply.',
  },
  {
    id: 'fleet',
    icon: faServer,
    color: '#FEC514',
    label: 'Fleet',
    sublabel: 'Central policy management',
    detail: 'Fleet hands the policy to every enrolled Elastic Agent. A Fleet Server must be running, and Elastic Defend cannot run on a standalone Elastic Agent.',
  },
  {
    id: 'agent',
    icon: faPlug,
    color: '#48EFCF',
    label: 'Elastic Agent',
    sublabel: 'On every protected host',
    detail: 'The agent enrolls in Fleet, receives the policy, and installs Elastic Endpoint on the host when the Elastic Defend integration is part of its policy.',
  },
  {
    id: 'endpoint',
    icon: faMicrochip,
    color: '#F04E98',
    label: 'Elastic Endpoint',
    sublabel: 'Enforces at the OS level',
    detail: 'Monitors process, network, and file activity, and blocks or alerts on threats according to the policy. It also carries out response actions such as isolating the host.',
  },
  {
    id: 'security',
    icon: faMagnifyingGlassChart,
    color: '#FF957D',
    label: 'Elasticsearch + Elastic Security',
    sublabel: 'Investigate and respond',
    detail: 'Events and alerts are shipped to Elasticsearch. In Elastic Security you investigate alerts, manage exceptions, and respond to threats from the Endpoints page.',
  },
]

function FlowArrow({ active, isDark }) {
  return (
    <div className="flex items-center justify-center w-8 flex-shrink-0">
      <motion.div animate={{ opacity: active ? 1 : 0.25 }} transition={{ duration: 0.4 }} className="relative w-full">
        <div className={`h-0.5 w-full ${isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/15'}`} />
        {active && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-elastic-teal"
            initial={{ left: '0%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            style={{ marginLeft: '-4px' }}
          />
        )}
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 text-xs ${
            active ? (isDark ? 'text-elastic-teal' : 'text-elastic-blue') : isDark ? 'text-white/20' : 'text-elastic-dev-blue/15'
          }`}
          style={{ marginRight: '-6px' }}
        />
      </motion.div>
    </div>
  )
}

function ArchitectureScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeStep, setActiveStep] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedStep, setSelectedStep] = useState(null)

  useEffect(() => {
    if (!isPlaying) return
    if (activeStep >= steps.length - 1) {
      setIsPlaying(false)
      return
    }
    const timer = setTimeout(() => setActiveStep(prev => prev + 1), 3500)
    return () => clearTimeout(timer)
  }, [isPlaying, activeStep])

  const handlePlay = () => {
    setActiveStep(-1)
    setSelectedStep(null)
    setTimeout(() => {
      setIsPlaying(true)
      setActiveStep(0)
    }, 100)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setActiveStep(-1)
    setSelectedStep(null)
  }

  const displayStep = selectedStep !== null ? selectedStep : activeStep

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            How It Fits Together
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            From policy to <span className="gradient-text">protected host</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Press play to follow a policy from your screen down to a laptop, then follow the alerts back up.
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-5">
          <button
            onClick={handlePlay}
            className={`px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
              isDark ? 'bg-elastic-teal text-elastic-dev-blue hover:bg-elastic-teal/80' : 'bg-elastic-blue text-white hover:bg-elastic-blue/80'
            }`}
          >
            <FontAwesomeIcon icon={faPlay} /> Play flow
          </button>
          <button
            onClick={handleReset}
            className={`px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border transition-all ${
              isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-elastic-dev-blue/20 text-elastic-dev-blue hover:bg-elastic-dev-blue/5'
            }`}
          >
            <FontAwesomeIcon icon={faRotateRight} /> Reset
          </button>
        </div>

        <div className="flex items-stretch justify-center">
          {steps.map((s, i) => {
            const reached = activeStep >= i
            const isCurrent = displayStep === i
            return (
              <div key={s.id} className="flex items-stretch flex-1 min-w-0">
                <motion.button
                  onClick={() => { setIsPlaying(false); setSelectedStep(i) }}
                  className={`w-full h-full p-4 rounded-xl border-2 text-center transition-all ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`}
                  style={{
                    borderColor: isCurrent || reached ? s.color : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,28,63,0.1)',
                    boxShadow: isCurrent ? `0 0 28px ${s.color}44` : 'none',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: activeStep === -1 || reached || selectedStep === i ? 1 : 0.55, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mx-auto mb-2"
                    style={{ backgroundColor: `${s.color}22` }}
                  >
                    <FontAwesomeIcon icon={s.icon} style={{ color: s.color }} className="text-lg" />
                  </div>
                  <div className={`text-headline text-sm font-bold leading-tight ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                    {s.label}
                  </div>
                  <div className="text-code text-[11px] mt-1" style={{ color: s.color }}>{s.sublabel}</div>
                </motion.button>
                {i < steps.length - 1 && <FlowArrow active={activeStep > i} isDark={isDark} />}
              </div>
            )
          })}
        </div>

        <div className="mt-5 min-h-[120px]">
          <AnimatePresence mode="wait">
            {displayStep >= 0 ? (
              <motion.div
                key={displayStep}
                className={`p-5 rounded-xl border-2 ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`}
                style={{ borderColor: steps[displayStep].color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-code text-sm font-bold" style={{ color: steps[displayStep].color }}>
                    {String(displayStep + 1).padStart(2, '0')}
                  </span>
                  <h3 className={`text-headline text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                    {steps[displayStep].label}
                  </h3>
                </div>
                <p className={`text-paragraph text-base ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
                  {steps[displayStep].detail}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                className={`p-5 rounded-xl border text-center text-paragraph text-base ${
                  isDark ? 'border-white/10 text-elastic-light-grey' : 'border-elastic-dev-blue/10 text-elastic-ink'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Click any box, or press Play flow.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex justify-center gap-8 flex-wrap">
          <span className={`text-sm flex items-center gap-2 ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            <FontAwesomeIcon icon={faArrowDown} className="text-elastic-blue" />
            Policy and response actions flow <strong>down</strong> to the host
          </span>
          <span className={`text-sm flex items-center gap-2 ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            <FontAwesomeIcon icon={faArrowUp} className="text-elastic-pink" />
            Events and alerts flow <strong>up</strong> to Elasticsearch
          </span>
        </div>
      </div>
    </div>
  )
}

export default ArchitectureScene
