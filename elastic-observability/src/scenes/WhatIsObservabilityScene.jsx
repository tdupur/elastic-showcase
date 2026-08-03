import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileLines, faChartLine, faCodeBranch, faBrain, faShieldHalved, faGlobe
} from '@fortawesome/free-solid-svg-icons'

const pillars = [
  {
    icon: faFileLines,
    color: '#48EFCF',
    title: 'Logs',
    subtitle: 'First Pillar',
    description: 'Timestamped records of events that provide detailed, contextual information about what happened in your system. Search and analyze petabytes of log data with ES|QL.',
  },
  {
    icon: faChartLine,
    color: '#0B64DD',
    title: 'Metrics',
    subtitle: 'Second Pillar',
    description: 'Numerical measurements of system performance and health over time. Track CPU, memory, latency, error rates, and custom business metrics from 400+ integrations.',
  },
  {
    icon: faCodeBranch,
    color: '#F04E98',
    title: 'Traces',
    subtitle: 'Third Pillar',
    description: 'End-to-end representations of requests as they travel through distributed systems. Identify bottlenecks and track errors with code-level visibility via native OpenTelemetry.',
  },
  {
    icon: faGlobe,
    color: '#FF957D',
    title: 'OpenTelemetry',
    subtitle: 'Open Standard',
    description: 'Production-grade support for OpenTelemetry via EDOT (Elastic Distribution of OpenTelemetry). Vendor-neutral instrumentation — stream native OTel data without proprietary agents.',
  },
  {
    icon: faBrain,
    color: '#FEC514',
    title: 'AIOps',
    subtitle: 'AI-Powered',
    description: 'Predictive analytics, zero-config anomaly detection, and an LLM-powered AI Assistant to reduce detection, investigation, and resolution time from hours to minutes.',
  },
  {
    icon: faShieldHalved,
    color: '#48EFCF',
    title: 'SLOs & Alerting',
    subtitle: 'Reliability',
    description: 'Define and monitor Service Level Objectives to ensure reliability targets are met. Create alerting rules that fire on complex conditions across logs, metrics, and traces.',
  },
]

function WhatIsObservabilityScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hovered, setHovered] = useState(null)

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Core Concepts
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What is{' '}
            <span className="gradient-text">Elastic Observability?</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            A unified platform combining the three pillars of observability with open standards and AI — all powered by Elasticsearch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
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
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{ opacity: hovered === index ? 1 : 0 }}
                style={{ background: `radial-gradient(circle at 10% 50%, ${pillar.color}18, transparent 65%)` }}
              />
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                style={{ backgroundColor: pillar.color }}
                animate={{ scaleX: hovered === index ? 1 : 0.3, opacity: hovered === index ? 1 : 0.4 }}
                transition={{ duration: 0.25 }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${pillar.color}20` }}
                  >
                    <FontAwesomeIcon icon={pillar.icon} style={{ color: pillar.color }} className="text-xl" />
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: pillar.color }}
                  >
                    {pillar.subtitle}
                  </span>
                </div>
                <h3 className={`text-headline text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {pillar.title}
                </h3>
                <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhatIsObservabilityScene
