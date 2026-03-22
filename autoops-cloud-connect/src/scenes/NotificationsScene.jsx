import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell, faSliders, faLink, faEnvelope,
  faTriangleExclamation, faCircleInfo, faFire, faCheck,
  faBolt, faCircleExclamation, faHashtag, faUsers
} from '@fortawesome/free-solid-svg-icons'

const channels = [
  {
    id: 'email',
    label: 'Email',
    color: '#FF957D',
    icon: faEnvelope,
    description: 'Send alerts to up to 40 addresses per connector. Opt in for close-event notifications too.',
  },
  {
    id: 'pagerduty',
    label: 'PagerDuty',
    color: '#F04E98',
    icon: faBell,
    description: 'Route critical cluster events directly into your on-call workflow with full context attached.',
  },
  {
    id: 'slack',
    label: 'Slack',
    color: '#48EFCF',
    icon: faHashtag,
    description: 'Post event notifications to any Slack channel via incoming webhook.',
  },
  {
    id: 'victorops',
    label: 'VictorOps',
    color: '#FEC514',
    icon: faBolt,
    description: 'Integrate via the REST Endpoint to route AutoOps alerts into VictorOps on-call schedules.',
  },
  {
    id: 'opsgenie',
    label: 'Opsgenie',
    color: '#0B64DD',
    icon: faCircleExclamation,
    description: 'Connect via the Opsgenie API key to trigger alerts and route them to your team integrations.',
  },
  {
    id: 'teams',
    label: 'MS Teams',
    color: '#48EFCF',
    icon: faUsers,
    description: 'Send AutoOps events as adaptive cards to Microsoft Teams channels for ops and SRE teams.',
  },
  {
    id: 'webhook',
    label: 'Webhook',
    color: '#FEC514',
    icon: faLink,
    description: 'Generic HTTP POST webhook — integrate AutoOps events with any SIEM, ITSM, or custom tooling.',
  },
]

const eventTypes = [
  { severity: 'critical', icon: faFire, color: '#F04E98', label: 'Critical', examples: ['Red cluster status', 'Node down', 'Disk watermark breach', 'Heap OOM risk'] },
  { severity: 'warning', icon: faTriangleExclamation, color: '#FEC514', label: 'Warning', examples: ['High CPU sustained', 'Shard imbalance', 'Slow queries spike', 'ILM policy stuck'] },
  { severity: 'info', icon: faCircleInfo, color: '#48EFCF', label: 'Informational', examples: ['Node joined cluster', 'Index rollover', 'Snapshot completed', 'ILM phase transition'] },
]

function NotificationsScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeChannel, setActiveChannel] = useState(0)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Alerting
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Events &{' '}
            <span className="gradient-text">Notifications</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            AutoOps fires notifications to your existing tools when cluster events require attention.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Left: notification channels */}
          <div>
            <p className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
              <FontAwesomeIcon icon={faBell} className="mr-1.5" />
              7 Built-in Connectors
            </p>

            {/* 2-column compact grid */}
            <div className="grid grid-cols-2 gap-2">
              {channels.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  onClick={() => setActiveChannel(i)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    activeChannel === i
                      ? isDark ? 'bg-white/[0.07] border-opacity-70' : 'bg-white border-opacity-70'
                      : isDark ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' : 'bg-white/40 border-elastic-dev-blue/10 hover:bg-white/80'
                  }`}
                  style={{ borderColor: activeChannel === i ? ch.color : undefined }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${ch.color}20` }}
                    >
                      <FontAwesomeIcon icon={ch.icon} style={{ color: ch.color }} className="text-xs" />
                    </div>
                    <span className={`font-semibold text-xs flex-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                      {ch.label}
                    </span>
                    {activeChannel === i && (
                      <FontAwesomeIcon icon={faCheck} style={{ color: ch.color }} className="text-[10px] flex-shrink-0" />
                    )}
                  </div>
                  <p className={`text-[10px] leading-snug line-clamp-2 pl-9 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>
                    {ch.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: event types + config */}
          <div className="space-y-3">
            {/* Event severity types */}
            <div className={`p-4 rounded-xl border ${
              isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}>
              <p className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                <FontAwesomeIcon icon={faTriangleExclamation} className="mr-1.5" />
                Event Severities
              </p>
              <div className="space-y-3">
                {eventTypes.map((ev, i) => (
                  <motion.div
                    key={ev.severity}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <FontAwesomeIcon icon={ev.icon} style={{ color: ev.color }} className="text-sm" />
                      <span className="text-sm font-semibold" style={{ color: ev.color }}>{ev.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-5">
                      {ev.examples.map((ex) => (
                        <span
                          key={ex}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isDark ? 'bg-white/5 text-white/60' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/60'
                          }`}
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Config note */}
            <div className={`p-4 rounded-xl border ${
              isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/15'
            }`}>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faSliders} className={`mt-0.5 flex-shrink-0 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                <div>
                  <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                    Configurable per event type
                  </p>
                  <p className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                    Choose which event types trigger notifications, configure thresholds, and assign different channels per severity level — all from the AutoOps UI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsScene
