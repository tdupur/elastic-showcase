import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function Navigation({ scenes, currentScene, onNavigate, onNext, onPrev }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <>
      {/* Bottom navigation bar - subtle and minimal */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 opacity-50 hover:opacity-90 transition-opacity duration-300">
        {/* Prev arrow */}
        <button
          onClick={onPrev}
          disabled={currentScene === 0}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isDark
              ? 'hover:bg-white/15'
              : 'hover:bg-elastic-dev-blue/10'
          } ${currentScene === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
        >
          <svg className={`w-3.5 h-3.5 ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scene dots */}
        <div className="flex items-center gap-2 px-2 py-1">
          {scenes.map((scene, index) => (
            <motion.button
              key={scene.id}
              onClick={() => onNavigate(index)}
              className="group relative flex items-center justify-center w-4 h-4"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Tooltip */}
              <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 backdrop-blur-sm rounded text-[11px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                isDark
                  ? 'bg-white/10 text-white/80'
                  : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/80'
              }`}>
                {scene.title}
              </span>

              {/* Dot */}
              <motion.div
                className={`rounded-full transition-colors ${
                  index === currentScene
                    ? isDark ? 'bg-white/85' : 'bg-elastic-dev-blue/85'
                    : isDark
                      ? 'bg-white/30 hover:bg-white/55'
                      : 'bg-elastic-dev-blue/25 hover:bg-elastic-dev-blue/50'
                }`}
                animate={{
                  width: index === currentScene ? 9 : 7,
                  height: index === currentScene ? 9 : 7,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={onNext}
          disabled={currentScene === scenes.length - 1}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isDark
              ? 'hover:bg-white/15'
              : 'hover:bg-elastic-dev-blue/10'
          } ${currentScene === scenes.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
        >
          <svg className={`w-3.5 h-3.5 ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>


    </>
  )
}

export default Navigation
