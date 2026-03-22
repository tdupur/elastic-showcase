import { useState, useEffect, useCallback } from 'react'
import { Analytics } from "@vercel/analytics/react"
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from './context/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'
import HeroScene from './scenes/HeroScene'
import AgendaScene from './scenes/AgendaScene'
import NextStepsScene from './scenes/NextStepsScene'
// TODO: Import your feature scenes here
// import MyFeatureScene from './scenes/MyFeatureScene'
import Navigation from './components/Navigation'
import ProgressBar from './components/ProgressBar'
import SceneSettings, { useEnabledScenes } from './components/SceneSettings'

// TODO: Add your scenes to this array.
// - id: unique string key
// - component: the imported scene component
// - title: shown in nav dots tooltip and agenda
// - description: shown in agenda (optional)
// - duration: shown in agenda (optional)
// - hideFromAgenda: true to hide from the agenda slide
const scenes = [
  { id: 'hero', component: HeroScene, title: 'Introduction', hideFromAgenda: true },
  { id: 'agenda', component: AgendaScene, title: 'Agenda', hideFromAgenda: true },
  // { id: 'my-feature', component: MyFeatureScene, title: 'My Feature', description: 'What it does', duration: '5 min' },
  { id: 'next-steps', component: NextStepsScene, title: 'Next Steps', description: 'Your path forward' },
]

const allScenes = scenes

function App() {
  const { theme, toggleTheme } = useTheme()
  const [currentScene, setCurrentScene] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const {
    enabledSceneIds, enabledScenes, orderedScenes,
    customDurations, toggleScene, updateOrder, updateDuration, resetToDefault
  } = useEnabledScenes(allScenes)
  const activeScenes = enabledScenes

  useEffect(() => { setIsReady(true) }, [])

  useEffect(() => {
    if (currentScene >= activeScenes.length) {
      setCurrentScene(Math.max(0, activeScenes.length - 1))
    }
  }, [activeScenes.length, currentScene])

  const navigateToScene = useCallback((index) => {
    if (index >= 0 && index < activeScenes.length) setCurrentScene(index)
  }, [activeScenes.length])

  const nextScene = useCallback(() => {
    if (currentScene < activeScenes.length - 1) setCurrentScene(prev => prev + 1)
  }, [currentScene, activeScenes.length])

  const prevScene = useCallback(() => {
    if (currentScene > 0) setCurrentScene(prev => prev - 1)
  }, [currentScene])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement
      const isTyping = activeElement && (
        activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable
      )
      if (isTyping) { if (e.key === 'Escape') activeElement.blur(); return }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); nextScene() }
      else if (e.key === 'ArrowLeft' || e.key === 'Backspace') { e.preventDefault(); prevScene() }
      else if (e.key >= '1' && e.key <= '9') navigateToScene(parseInt(e.key) - 1)
      else if (e.key === '0') navigateToScene(9)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextScene, prevScene, navigateToScene])

  const CurrentSceneComponent = activeScenes[currentScene]?.component || activeScenes[0]?.component

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-elastic-dev-blue' : 'bg-elastic-light-grey'
    }`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          animate={{ backgroundColor: theme === 'dark' ? 'rgba(72, 239, 207, 0.08)' : 'rgba(11, 100, 221, 0.12)' }}
          transition={{ duration: 0.5 }} />
        <motion.div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          animate={{ backgroundColor: theme === 'dark' ? 'rgba(240, 78, 152, 0.08)' : 'rgba(240, 78, 152, 0.1)' }}
          transition={{ duration: 0.5 }} />
      </div>
      <div className={`fixed inset-0 grid-bg pointer-events-none ${theme === 'dark' ? 'opacity-50' : 'opacity-30'}`} />
      <ProgressBar current={currentScene} total={activeScenes.length} />
      <Navigation scenes={activeScenes} currentScene={currentScene} onNavigate={navigateToScene} onNext={nextScene} onPrev={prevScene} />
      <button onClick={toggleTheme}
        className={`fixed bottom-4 left-4 z-40 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${
          theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white' : 'bg-elastic-dev-blue/10 hover:bg-elastic-dev-blue/20 text-elastic-dev-blue/70 hover:text-elastic-dev-blue'
        }`}>
        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-sm" />
      </button>
      <SceneSettings scenes={allScenes} enabledSceneIds={enabledSceneIds} orderedScenes={orderedScenes}
        customDurations={customDurations} onToggle={toggleScene} onUpdateOrder={updateOrder}
        onUpdateDuration={updateDuration} onReset={resetToDefault} />
      {isReady && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={currentScene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }} className="absolute inset-0 overflow-y-auto">
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
