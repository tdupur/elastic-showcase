import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlay } from '@fortawesome/free-solid-svg-icons'

// TODO: Set the topic that types into the search bar (shown before the reveal)
const SHOWCASE_SEARCH_TEXT = 'Agent Builder Skills'

// TODO: Set the revealed title (shown after the search bar interaction)
const SHOWCASE_TITLE_LINE1 = 'Agent Builder'
const SHOWCASE_TITLE_LINE2 = 'Skills'
const SHOWCASE_SUBTITLE = 'Reusable instruction sets that give your AI agents specialized, domain-specific expertise — loaded on demand.'
const SHOWCASE_BADGES = ['Elastic Agent Builder', 'Serverless', 'AI-Powered', 'Generally Available']

function HeroSearchBar({ text, isTyping, onShowAnswer, searchComplete, showCursor = true }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.div
      className={`relative flex items-center mx-auto px-8 py-5 rounded-full border-2 ${
        isDark
          ? 'bg-white/[0.03] border-white/20'
          : 'bg-white border-elastic-dev-blue/20'
      }`}
      style={{ width: '800px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' }}
    >
      <div className="flex-1 min-h-[40px] flex items-center">
        <span className={`text-2xl md:text-3xl font-light ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
          {text}
        </span>
        {showCursor && (
          <motion.span
            className={`inline-block w-0.5 h-8 ml-1 ${isDark ? 'bg-white' : 'bg-elastic-dev-blue'}`}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
      </div>
      <motion.button
        onClick={onShowAnswer}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isTyping
            ? isDark ? 'bg-elastic-teal/20 text-elastic-teal cursor-not-allowed' : 'bg-elastic-blue/20 text-elastic-blue cursor-not-allowed'
            : searchComplete
              ? isDark ? 'bg-elastic-teal/30 text-elastic-teal hover:bg-elastic-teal hover:text-white' : 'bg-elastic-blue/20 text-elastic-blue hover:bg-elastic-blue hover:text-white'
              : isDark ? 'bg-white/10 text-white/60 hover:bg-elastic-teal hover:text-white' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-elastic-blue hover:text-white'
        }`}
        whileHover={!isTyping ? { scale: 1.1 } : {}}
        whileTap={!isTyping ? { scale: 0.95 } : {}}
        disabled={isTyping}
        title="Show answer"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
      </motion.button>
    </motion.div>
  )
}

function HeroScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [searchText, setSearchText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [searchComplete, setSearchComplete] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      xOffset: Math.random() * 50 - 25,
    })), []
  )

  const startTyping = useCallback(() => {
    if (isTyping || searchComplete) return
    setIsTyping(true)
    setSearchText('')
    let index = 0
    const typeInterval = setInterval(() => {
      if (index < SHOWCASE_SEARCH_TEXT.length) {
        setSearchText(SHOWCASE_SEARCH_TEXT.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        setSearchComplete(true)
      }
    }, 80)
    return () => clearInterval(typeInterval)
  }, [isTyping, searchComplete])

  return (
    <div className="scene relative overflow-hidden">
      {/* Animated data particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${isDark ? 'bg-elastic-teal/30' : 'bg-elastic-blue/20'}`}
            style={{ width: particle.size, height: particle.size, left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{ y: [0, -100, 0], x: [0, particle.xOffset, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Animated connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.path
          d="M0,50 Q25,30 50,50 T100,50"
          fill="none"
          stroke="url(#hero-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <defs>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#48EFCF" />
            <stop offset="50%" stopColor="#0B64DD" />
            <stop offset="100%" stopColor="#F04E98" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[500px]">
        <AnimatePresence mode="wait">
          {!showAnswer ? (
            <motion.div
              key="search"
              className="w-full text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <HeroSearchBar
                text={searchText}
                isTyping={isTyping}
                searchComplete={searchComplete}
                onShowAnswer={() => {
                  if (!showAnswer) {
                    if (!searchComplete) {
                      setSearchText(SHOWCASE_SEARCH_TEXT)
                      setSearchComplete(true)
                    }
                    setShowAnswer(true)
                  }
                }}
                showCursor={!searchComplete}
              />
              {!searchText && !isTyping && (
                <motion.p
                  className={`text-center mt-6 text-sm ${isDark ? 'text-white/40' : 'text-elastic-blue/60'}`}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click search to discover...
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              className="w-full text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Elastic Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-8"
              >
                <img
                  src={isDark ? "/Elastic-Logo-tagline-secondary-white.svg" : "/Elastic-Logo-tagline-secondary-black.png"}
                  alt="Elastic"
                  className="h-14 w-auto mx-auto object-contain"
                />
              </motion.div>

              {/* Main title */}
              <motion.h1
                className="text-headline text-5xl md:text-7xl font-extrabold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className={isDark ? 'text-white' : 'text-elastic-dark-ink'}>{SHOWCASE_TITLE_LINE1}</span>
                <br />
                <motion.span
                  className="gradient-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {SHOWCASE_TITLE_LINE2}
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className={`text-paragraph text-xl md:text-2xl max-w-3xl mx-auto mb-10 ${
                  isDark ? 'text-elastic-light-grey' : 'text-elastic-blue'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {SHOWCASE_SUBTITLE}
              </motion.p>

              {/* Badges */}
              <motion.div
                className="flex items-center justify-center gap-4 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                {SHOWCASE_BADGES.map((badge, i) => (
                  <motion.span
                    key={badge}
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${
                      isDark
                        ? 'bg-elastic-teal/10 border-elastic-teal/30 text-elastic-teal'
                        : 'bg-elastic-blue/10 border-elastic-blue/30 text-elastic-blue'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + i * 0.15 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          isDark ? 'via-elastic-teal/50' : 'via-elastic-blue/30'
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />

      {/* Play button — subtle, bottom-right, starts the typing animation */}
      <AnimatePresence>
        {!searchComplete && !isTyping && (
          <motion.button
            onClick={startTyping}
            className={`fixed bottom-4 right-14 z-40 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              isDark
                ? 'bg-white/5 hover:bg-white/15 text-white/30 hover:text-white/60'
                : 'bg-elastic-dev-blue/5 hover:bg-elastic-dev-blue/15 text-elastic-dev-blue/30 hover:text-elastic-dev-blue/60'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Start typing animation"
          >
            <FontAwesomeIcon icon={faPlay} className="text-[10px] ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroScene
