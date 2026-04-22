import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShieldHalved, faBrain, faRobot, faChartLine, faBolt, faGlobe
} from '@fortawesome/free-solid-svg-icons'

const pillars = [
  {
    icon: faShieldHalved,
    color: '#0B64DD',
    title: 'Unified SIEM',
    description: 'Petabyte-scale threat detection and investigation built on Elasticsearch. One platform replaces fragmented point solutions.',
  },
  {
    icon: faGlobe,
    color: '#48EFCF',
    title: 'XDR Across Everything',
    description: 'Extended detection and response across endpoints, cloud workloads, containers, and identity — no siloed tools.',
  },
  {
    icon: faRobot,
    color: '#F04E98',
    title: 'Native Agentic Automation',
    description: 'Built-in Elastic Workflows replaces separate SOAR. AI agents run playbooks, neutralize threats, and take action automatically.',
  },
  {
    icon: faBrain,
    color: '#FF957D',
    title: 'Transparent AI',
    description: 'Open detection rules on GitHub (2.3K+ stars). Attack Discovery uses RAG to correlate alerts into attack narratives you can inspect.',
  },
  {
    icon: faBolt,
    color: '#FEC514',
    title: 'ES|QL-Powered Analytics',
    description: 'Query security data at scale with ES|QL. Real-time and historical ML analysis for anomaly detection and UEBA.',
  },
  {
    icon: faChartLine,
    color: '#48EFCF',
    title: 'Open Architecture',
    description: 'Cross-cluster search and searchable snapshots let you query data anywhere — no forced centralization, no rehydration penalties.',
  },
]

function WhatIsElasticSecurityScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            The Platform
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What Is <span className="gradient-text">Elastic Security?</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            An agentic security operations platform combining SIEM, XDR, native automation, and integrated AI — built on open-source Elasticsearch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className={`relative p-4 rounded-xl border overflow-hidden cursor-default ${
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
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${pillar.color}20` }}
                >
                  <FontAwesomeIcon icon={pillar.icon} style={{ color: pillar.color }} className="text-xl" />
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

        <motion.div
          className={`mt-4 p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`text-sm font-medium ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Security is a data problem — Elastic brings unified analytics and AI to all your data without moving or duplicating it.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default WhatIsElasticSecurityScene
