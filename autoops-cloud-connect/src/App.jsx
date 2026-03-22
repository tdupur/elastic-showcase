import { useState, useEffect, useCallback } from 'react'
import { Analytics } from "@vercel/analytics/react"
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import HeroScene from './scenes/HeroScene'
import AgendaScene from './scenes/AgendaScene'
import ChallengeScene from './scenes/ChallengeScene'
import WhatIsAutoOpsScene from './scenes/WhatIsAutoOpsScene'
import CloudConnectScene from './scenes/CloudConnectScene'
import ArchitectureScene from './scenes/ArchitectureScene'
import InstallationScene from './scenes/InstallationScene'
import MonitoringScene from './scenes/MonitoringScene'
import NotificationsScene from './scenes/NotificationsScene'
import NextStepsScene from './scenes/NextStepsScene'
import Navigation from './components/Navigation'
import ProgressBar from './components/ProgressBar'
import SceneSettings, { useEnabledScenes } from './components/SceneSettings'

const scenes = [
  { id: 'hero', component: HeroScene, title: 'Introduction', hideFromAgenda: true },
  { id: 'agenda', component: AgendaScene, title: 'Agenda', hideFromAgenda: true },
  { id: 'challenge', component: ChallengeScene, title: 'The Problem', description: 'Reactive ops & alert fatigue', duration: '3 min' },
  { id: 'what-is-autoops', component: WhatIsAutoOpsScene, title: 'What is AutoOps?', description: 'Automated cluster intelligence', duration: '5 min' },
  { id: 'cloud-connect', component: CloudConnectScene, title: 'Cloud Connect', description: 'The bridge to Elastic Cloud services', duration: '3 min' },
  { id: 'architecture', component: ArchitectureScene, title: 'Architecture & Flow', description: 'How Agent, Cloud Connect & AutoOps connect', duration: '5 min' },
  { id: 'installation', component: InstallationScene, title: 'Installation Methods', description: 'K8s, Docker, Linux, ECK', duration: '5 min' },
  { id: 'monitoring', component: MonitoringScene, title: 'What AutoOps Monitors', description: 'Metrics, health & performance', duration: '3 min' },
  { id: 'notifications', component: NotificationsScene, title: 'Events & Notifications', description: 'PagerDuty, Slack, Teams & more', duration: '3 min' },
  { id: 'next-steps', component: NextStepsScene, title: 'Next Steps', description: 'Get started today' },
]

const allScenes = scenes

function App() {
  const { theme, toggleTheme } = useTheme()
  const [currentScene, setCurrentScene] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const {
    enabledSceneIds,
    enabledScenes,
    orderedScenes,
    customDurations,
    toggleScene,
    updateOrder,
    updateDuration,
    resetToDefault
  } = useEnabledScenes(allScenes)
  const activeScenes = enabledScenes

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (currentScene >= activeScenes.length) {
      setCurrentScene(Math.max(0, activeScenes.length - 1))
    }
  }, [activeScenes.length, currentScene])

  const navigateToScene = useCallback((index) => {
    if (index >= 0 && index < activeScenes.length) {
      setCurrentScene(index)
    }
  }, [activeScenes.length])

  const nextScene = useCallback(() => {
    if (currentScene < activeScenes.length - 1) {
      setCurrentScene(prev => prev + 1)
    }
  }, [currentScene, activeScenes.length])

  const prevScene = useCallback(() => {
    if (currentScene > 0) {
      setCurrentScene(prev => prev - 1)
    }
  }, [currentScene])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement
      const isTyping = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable
      )
      if (isTyping) {
        if (e.key === 'Escape') activeElement.blur()
        return
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        nextScene()
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        prevScene()
      } else if (e.key >= '1' && e.key <= '9') {
        navigateToScene(parseInt(e.key) - 1)
      } else if (e.key === '0') {
        navigateToScene(9)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextScene, prevScene, navigateToScene])

  const CurrentSceneComponent = activeScenes[currentScene]?.component || activeScenes[0]?.component

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-elastic-dev-blue' : 'bg-elastic-light-grey'
    }`}>
      {/* Background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          animate={{
            backgroundColor: theme === 'dark' ? 'rgba(72, 239, 207, 0.08)' : 'rgba(11, 100, 221, 0.12)'
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          animate={{
            backgroundColor: theme === 'dark' ? 'rgba(240, 78, 152, 0.08)' : 'rgba(240, 78, 152, 0.1)'
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
          animate={{
            backgroundColor: theme === 'dark' ? 'rgba(11, 100, 221, 0.05)' : 'rgba(72, 239, 207, 0.08)'
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className={`fixed inset-0 grid-bg pointer-events-none ${theme === 'dark' ? 'opacity-50' : 'opacity-30'}`} />

      {/* Progress bar */}
      <ProgressBar current={currentScene} total={activeScenes.length} />

      {/* Navigation */}
      <Navigation
        scenes={activeScenes}
        currentScene={currentScene}
        onNavigate={navigateToScene}
        onNext={nextScene}
        onPrev={prevScene}
      />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-4 left-4 z-40 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${
          theme === 'dark'
            ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
            : 'bg-elastic-dev-blue/10 hover:bg-elastic-dev-blue/20 text-elastic-dev-blue/70 hover:text-elastic-dev-blue'
        }`}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-sm" />
      </button>

      {/* Scene Settings */}
      <SceneSettings
        scenes={allScenes}
        enabledSceneIds={enabledSceneIds}
        orderedScenes={orderedScenes}
        customDurations={customDurations}
        onToggle={toggleScene}
        onUpdateOrder={updateOrder}
        onUpdateDuration={updateDuration}
        onReset={resetToDefault}
      />

      {/* Scene content */}
      {isReady && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentScene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-hidden"
          >
            <ErrorBoundary key={`error-${currentScene}`} onRetry={() => setCurrentScene(currentScene)}>
              <CurrentSceneComponent onNext={nextScene} scenes={activeScenes} allScenes={orderedScenes} onNavigate={navigateToScene} />
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      )}
      <Analytics />
    </div>
  )
}

export default App
