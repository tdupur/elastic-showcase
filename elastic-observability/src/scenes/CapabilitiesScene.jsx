import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRocket, faFileLines, faServer, faGlobe, faRobot, faCrosshairs
} from '@fortawesome/free-solid-svg-icons'

const capabilities = [
  {
    id: 'apm',
    icon: faRocket,
    color: '#F04E98',
    title: 'Application Performance Monitoring',
    shortTitle: 'APM',
    description: 'Code-level visibility into application performance. Collect and analyze traces with native OpenTelemetry support to identify bottlenecks, track errors, and optimize end-user experience.',
    highlights: ['Distributed tracing', 'Service maps', 'Error tracking', 'Code profiling', 'OTel native'],
  },
  {
    id: 'logs',
    icon: faFileLines,
    color: '#48EFCF',
    title: 'Log Monitoring & Analytics',
    shortTitle: 'Logs',
    description: 'Centralize and analyze petabytes of log data from any source. AI-powered Streams ingests raw logs in any format without manual parsing pipelines. ES|QL enables instant ad-hoc queries.',
    highlights: ['AI log parsing (Streams)', 'ES|QL queries', 'Pre-built dashboards', 'Any log format', 'Petabyte scale'],
  },
  {
    id: 'infra',
    icon: faServer,
    color: '#0B64DD',
    title: 'Infrastructure Monitoring',
    shortTitle: 'Infrastructure',
    description: 'Monitor metrics from servers, VMs, containers, and Kubernetes with 400+ out-of-the-box integrations including OpenTelemetry. Deep insights into resource utilization and system health.',
    highlights: ['400+ integrations', 'Kubernetes monitoring', 'Container visibility', 'Resource utilization', 'Health dashboards'],
  },
  {
    id: 'digital',
    icon: faGlobe,
    color: '#FF957D',
    title: 'Digital Experience Monitoring',
    shortTitle: 'Digital Experience',
    description: 'Proactively understand user experience. Real User Monitoring (RUM) captures real interaction data, Synthetic Monitoring simulates user journeys, and Uptime Monitoring checks service availability.',
    highlights: ['Real User Monitoring', 'Synthetic monitoring', 'Uptime checks', 'Core Web Vitals', 'API testing'],
  },
  {
    id: 'llm',
    icon: faRobot,
    color: '#FEC514',
    title: 'LLM Observability',
    shortTitle: 'LLM Obs',
    description: 'Gain deep insights into the performance, usage, and costs of Large Language Model prompts and responses. Track latency, token usage, and model behavior across your AI-powered applications.',
    highlights: ['Prompt/response tracking', 'Token cost analysis', 'Latency monitoring', 'Model comparisons', 'Error rates'],
  },
  {
    id: 'profiling',
    icon: faCrosshairs,
    color: '#48EFCF',
    title: 'Universal Profiling',
    shortTitle: 'Profiling',
    description: 'Gain visibility into system performance and identify expensive lines of code without application instrumentation. Increase CPU efficiency and reduce cloud spend across your entire fleet.',
    highlights: ['Zero instrumentation', 'CPU flame graphs', 'Memory profiling', 'Cloud cost reduction', 'Any language'],
  },
]

function CapabilitiesScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState(0)

  const cap = capabilities[active]

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Use Cases
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Built for Every{' '}
            <span className="gradient-text">Observability Need</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[auto_1fr] gap-4">
          {/* Tab list */}
          <motion.div
            className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {capabilities.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all text-left whitespace-nowrap md:whitespace-normal min-w-max md:min-w-0 ${
                  active === i
                    ? isDark
                      ? 'bg-white/[0.08] border-white/25 text-white'
                      : 'bg-white border-elastic-dev-blue/25 text-elastic-dark-ink shadow-sm'
                    : isDark
                      ? 'bg-transparent border-white/5 text-white/50 hover:border-white/15 hover:text-white/70'
                      : 'bg-transparent border-elastic-dev-blue/5 text-elastic-dev-blue/50 hover:border-elastic-dev-blue/15'
                }`}
                style={active === i ? { borderColor: c.color } : {}}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${c.color}${active === i ? '25' : '15'}` }}
                >
                  <FontAwesomeIcon icon={c.icon} style={{ color: c.color }} className="text-sm" />
                </div>
                <span className="text-sm font-semibold">{c.shortTitle}</span>
              </button>
            ))}
          </motion.div>

          {/* Detail panel */}
          <motion.div
            key={active}
            className={`p-6 rounded-2xl border ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${cap.color}20` }}
              >
                <FontAwesomeIcon icon={cap.icon} style={{ color: cap.color }} className="text-2xl" />
              </div>
              <div>
                <h3 className={`text-headline text-xl font-extrabold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                  {cap.title}
                </h3>
              </div>
            </div>

            <p className={`text-paragraph text-base mb-5 ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
              {cap.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {cap.highlights.map(h => (
                <span
                  key={h}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: `${cap.color}18`, color: cap.color }}
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CapabilitiesScene
