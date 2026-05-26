import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDatabase, faWrench, faBookOpen, faBrain, faComments,
  faCircleCheck, faPlay, faRotateRight, faChevronRight
} from '@fortawesome/free-solid-svg-icons'

const steps = [
  {
    id: 'data',
    icon: faDatabase,
    color: '#FF957D',
    label: 'Your Data',
    sublabel: 'Elasticsearch indices',
    detail: 'Your enterprise data lives in Elasticsearch — structured documents, vectors, logs, metrics. Agent Builder accesses it directly using ES|QL queries with fine-grained, role-based security.',
  },
  {
    id: 'tools',
    icon: faWrench,
    color: '#0B64DD',
    label: 'Tools',
    sublabel: 'ES|QL-backed functions',
    detail: 'Tools are registered via API — each backed by an ES|QL query with typed parameters. The agent calls tools at runtime to fetch precise, live data. You control exactly what data is exposed.',
  },
  {
    id: 'skills',
    icon: faBookOpen,
    color: '#FEC514',
    label: 'Skills',
    sublabel: 'Domain instruction sets',
    detail: 'Skills are reusable instruction packages that give agents domain-specific knowledge — threat hunting, observability investigation, semantic search, and more. Built-in or custom.',
  },
  {
    id: 'agent',
    icon: faBrain,
    color: '#48EFCF',
    label: 'AI Agent',
    sublabel: 'Orchestrates everything',
    detail: 'The agent orchestrates tools, skills, and an LLM to reason over your data, plan multi-step actions, and generate grounded responses. Compose custom agents or use built-in ones.',
  },
  {
    id: 'chat',
    icon: faComments,
    color: '#F04E98',
    label: 'Chat Interface',
    sublabel: 'Natural language queries',
    detail: 'Users interact in plain language. The agent interprets intent, selects the right tools and skills, queries Elasticsearch, and returns accurate, context-aware answers — all in seconds.',
  },
]

function FlowArrow({ active, isDark }) {
  return (
    <div className="flex items-center justify-center w-8 flex-shrink-0">
      <motion.div
        animate={{ opacity: active ? 1 : 0.25 }}
        transition={{ duration: 0.4 }}
        className="relative w-full"
      >
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
            active
              ? isDark ? 'text-elastic-teal' : 'text-elastic-blue'
              : isDark ? 'text-white/20' : 'text-elastic-dev-blue/15'
          }`}
          style={{ marginRight: '-6px' }}
        />
      </motion.div>
    </div>
  )
}

function ArchitectureScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Architecture & Flow
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            How It <span className="gradient-text">All Connects</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            From raw Elasticsearch data to a conversational AI agent. Click any component or press Play.
          </p>
        </motion.div>

        <motion.div
          className="flex items-center justify-between mb-6 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <motion.button
                onClick={() => {
                  setSelectedStep(selectedStep === index ? null : index)
                  setIsPlaying(false)
                }}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all flex-shrink-0 w-28 ${
                  activeStep >= index || selectedStep === index
                    ? isDark ? 'border-opacity-80 bg-white/[0.06]' : 'border-opacity-80 bg-white'
                    : isDark ? 'border-white/10 bg-white/[0.02]' : 'border-elastic-dev-blue/10 bg-white/40'
                }`}
                style={{
                  borderColor: activeStep >= index || selectedStep === index ? step.color : undefined,
                  boxShadow: activeStep === index || selectedStep === index ? `0 0 20px ${step.color}40` : 'none',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${step.color}${activeStep >= index || selectedStep === index ? '25' : '12'}` }}
                  animate={{ scale: activeStep === index ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FontAwesomeIcon
                    icon={step.icon}
                    style={{ color: step.color, opacity: activeStep >= index || selectedStep === index ? 1 : 0.4 }}
                    className="text-lg"
                  />
                </motion.div>
                <div className="text-center">
                  <div className={`text-xs font-bold leading-tight ${
                    activeStep >= index || selectedStep === index
                      ? isDark ? 'text-white' : 'text-elastic-dark-ink'
                      : isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'
                  }`}>
                    {step.label}
                  </div>
                  <div className={`text-[9px] mt-0.5 leading-tight ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
                    {step.sublabel}
                  </div>
                </div>
                <AnimatePresence>
                  {activeStep > index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-2 -right-2"
                    >
                      <FontAwesomeIcon icon={faCircleCheck} style={{ color: step.color }} className="text-sm" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              {index < steps.length - 1 && <FlowArrow active={activeStep > index} isDark={isDark} />}
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {displayStep >= 0 ? (
            <motion.div
              key={displayStep}
              className={`p-5 rounded-xl border mb-4 ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${steps[displayStep].color}20` }}
                >
                  <FontAwesomeIcon icon={steps[displayStep].icon} style={{ color: steps[displayStep].color }} className="text-lg" />
                </div>
                <div>
                  <h3 className="text-headline text-lg font-bold mb-1" style={{ color: steps[displayStep].color }}>
                    {steps[displayStep].label}
                  </h3>
                  <p className={`text-paragraph text-base ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
                    {steps[displayStep].detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              className={`p-5 rounded-xl border mb-4 text-center ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-white/40 border-elastic-dev-blue/5'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className={`text-sm ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
                Press Play to animate the flow, or click any component above to learn more.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              isPlaying
                ? isDark ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/40 cursor-not-allowed'
                : isDark
                  ? 'bg-elastic-teal text-elastic-dev-blue hover:bg-elastic-teal/90'
                  : 'bg-elastic-blue text-white hover:bg-elastic-blue/90'
            }`}
          >
            <FontAwesomeIcon icon={faPlay} className="text-xs" />
            {isPlaying ? 'Playing...' : activeStep >= 0 ? 'Replay' : 'Play Flow'}
          </button>
          {activeStep >= 0 && (
            <motion.button
              onClick={handleReset}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all ${
                isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-elastic-dev-blue/20'
              }`}
            >
              <FontAwesomeIcon icon={faRotateRight} className="text-xs" />
              Reset
            </motion.button>
          )}
        </motion.div>

        <motion.div
          className={`mt-4 p-3 rounded-xl border text-center ${isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className={`text-sm font-medium ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Your data never leaves Elasticsearch — agents query it in place, with the same security and access controls as any other Kibana user.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ArchitectureScene
