import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComments, faWrench, faBookOpen, faPlug, faGear, faChartBar
} from '@fortawesome/free-solid-svg-icons'

const features = [
  {
    icon: faComments,
    color: '#48EFCF',
    title: 'Built-In Conversational Agent',
    description: 'A natural language chat interface that lets users query, analyze, and explore Elasticsearch data without writing a single line of code.',
  },
  {
    icon: faWrench,
    color: '#0B64DD',
    title: 'Custom Tools via ES|QL',
    description: 'Register reusable tools backed by ES|QL queries. Give agents precise, schema-aware access to your data with full control over relevance and security.',
  },
  {
    icon: faBookOpen,
    color: '#FEC514',
    title: 'Reusable Skills',
    description: 'Domain-specific instruction sets — for observability investigation, threat hunting, semantic search, and more — that snap into any agent without re-engineering.',
  },
  {
    icon: faPlug,
    color: '#F04E98',
    title: 'MCP & A2A Integration',
    description: 'Connect external tools, data sources, and multi-agent workflows using the Model Context Protocol and Agent-to-Agent standards.',
  },
  {
    icon: faGear,
    color: '#FF957D',
    title: 'Elastic Workflows',
    description: 'Orchestrate complex, multi-step processes — internal and external — with YAML-defined, event-driven workflows that agents can trigger and manage.',
  },
  {
    icon: faChartBar,
    color: '#48EFCF',
    title: 'Prompt-to-Dashboard',
    description: 'Ask for a dashboard and get one. Agents compose Kibana dashboards grounded in ES|QL — shareable, refinable, and ready to present.',
  },
]

function WhatIsAgentBuilderScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            The Solution
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What is <span className="gradient-text">Agent Builder?</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            A platform built into Kibana that lets you compose, deploy, and refine AI agents grounded in your Elasticsearch data — no ML ops required.
          </p>
        </motion.div>

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
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{ opacity: hovered === index ? 1 : 0 }}
                style={{ background: `radial-gradient(circle at 10% 50%, ${feature.color}18, transparent 65%)` }}
              />
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

export default WhatIsAgentBuilderScene
