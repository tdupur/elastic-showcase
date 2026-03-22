import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBrain, faBolt, faShieldHalved, faChartBar, faLightbulb, faClockRotateLeft
} from '@fortawesome/free-solid-svg-icons'

const features = [
  {
    icon: faBrain,
    color: '#48EFCF',
    title: 'Real-Time Root-Cause Analysis',
    description: 'AutoOps continuously monitors hundreds of metrics and automatically surfaces the root cause of performance degradation — no manual correlation required.',
  },
  {
    icon: faBolt,
    color: '#0B64DD',
    title: 'Instant Issue Detection',
    description: 'Proactive alerts fire before users notice. AutoOps detects anomalies in CPU, memory, disk, shard health, indexing latency, and query performance.',
  },
  {
    icon: faLightbulb,
    color: '#FEC514',
    title: 'Actionable Recommendations',
    description: 'Not just alerts — AutoOps tells you exactly what to do: rebalance shards, adjust heap, add nodes, or update ILM policies.',
  },
  {
    icon: faChartBar,
    color: '#F04E98',
    title: '10-Day Metric Retention',
    description: 'Historical context lets you correlate incidents with past events, understand trends, and prove the impact of changes over time.',
  },
  {
    icon: faShieldHalved,
    color: '#FF957D',
    title: 'Free Across All License Types',
    description: 'AutoOps for ECE, ECK, and self-managed clusters is available at no additional cost across all self-managed Elasticsearch license types.',
  },
  {
    icon: faClockRotateLeft,
    color: '#48EFCF',
    title: 'Works with ES 7.17+',
    description: 'Compatible with Elasticsearch 7.17.x and above. No cluster upgrade required to start gaining operational visibility.',
  },
]

function WhatIsAutoOpsScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hovered, setHovered] = useState(null)

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Capabilities
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What is{' '}
            <span className="gradient-text">AutoOps?</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            An automated operations intelligence layer that monitors, diagnoses, and guides resolution for Elasticsearch clusters — in real time.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`relative p-4 rounded-xl border overflow-hidden cursor-default group ${
                isDark
                  ? 'bg-white/[0.03] border-white/10'
                  : 'bg-white/80 border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{ opacity: hovered === index ? 1 : 0 }}
                style={{
                  background: `radial-gradient(circle at 10% 50%, ${feature.color}18, transparent 65%)`,
                }}
              />

              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                style={{ backgroundColor: feature.color }}
                animate={{ scaleX: hovered === index ? 1 : 0.3, opacity: hovered === index ? 1 : 0.4 }}
                transition={{ duration: 0.25 }}
              />

              <div className="relative">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <FontAwesomeIcon icon={feature.icon} style={{ color: feature.color }} className="text-xl" />
                </div>
                <h3 className={`text-headline text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {feature.title}
                </h3>
                <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhatIsAutoOpsScene
