import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRobot, faMagnifyingGlassChart, faShapes, faGauge, faBell, faUsersGear
} from '@fortawesome/free-solid-svg-icons'

const features = [
  {
    icon: faRobot,
    color: '#48EFCF',
    title: 'AI Assistant',
    description: 'An LLM-powered assistant that investigates incidents, explains anomalies in plain language, runs ES|QL queries on your behalf, and recommends fixes — directly in your Kibana workflow.',
  },
  {
    icon: faMagnifyingGlassChart,
    color: '#0B64DD',
    title: 'Anomaly Detection',
    description: 'Zero-config machine learning continuously models normal behavior across your metrics and logs. Deviations surface automatically — no threshold tuning required.',
  },
  {
    icon: faShapes,
    color: '#F04E98',
    title: 'Pattern Analysis',
    description: 'Automatically cluster and categorize log messages to identify recurring patterns. Spot new error types the moment they appear, without writing manual rules.',
  },
  {
    icon: faGauge,
    color: '#FF957D',
    title: 'Service Level Objectives',
    description: 'Define SLOs for any service using logs, metrics, or APM data. Track burn rates in real time, set multi-window alerts, and report on reliability with built-in dashboards.',
  },
  {
    icon: faBell,
    color: '#FEC514',
    title: 'Intelligent Alerting',
    description: 'Create rules that fire on complex conditions across logs, metrics, and traces. Route alerts to Slack, PagerDuty, email, or any webhook. Reduce noise with alert suppression.',
  },
  {
    icon: faUsersGear,
    color: '#48EFCF',
    title: 'Cases & Collaboration',
    description: 'Track investigation details, assign tasks, and collaborate on incident resolution with built-in case management. Integrate with Jira, ServiceNow, and other ITSM tools.',
  },
]

function AIOpsScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
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
            AI-Powered Operations
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            AIOps &{' '}
            <span className="gradient-text">AI Assistant</span>
          </h2>
          <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Reduce detection, investigation, and resolution time from hours to minutes with predictive analytics and an LLM-powered assistant built into your workflow.
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

        <motion.div
          className={`mt-4 p-4 rounded-xl border text-center ${
            isDark ? 'bg-elastic-pink/5 border-elastic-pink/20' : 'bg-elastic-pink/5 border-elastic-pink/20'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`text-paragraph text-base ${isDark ? 'text-elastic-pink' : 'text-elastic-pink'}`}>
            The AI Assistant can query your own data — ask it to investigate an incident and it runs ES|QL on your telemetry in real time.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default AIOpsScene
