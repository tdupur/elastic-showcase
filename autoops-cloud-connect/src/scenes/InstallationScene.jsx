import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faServer, faCube, faTerminal, faKey, faLink
} from '@fortawesome/free-solid-svg-icons'

// Animated SVG pipeline diagram — larger nodes for legibility
function PipelineDiagram({ nodes, color, isDark }) {
  const NW = 90    // node width
  const NH = 46    // node height
  const GAP = 26   // gap between nodes
  const PX = 6     // horizontal padding
  const PY = 8     // vertical padding
  const CY = PY + NH / 2

  const nodeXs = nodes.map((_, i) => PX + i * (NW + GAP))
  const svgW = PX * 2 + nodes.length * NW + (nodes.length - 1) * GAP
  const svgH = NH + PY * 2

  const connections = nodeXs.slice(0, -1).map((x, i) => ({
    x1: x + NW + 2,
    x2: nodeXs[i + 1] - 2,
  }))

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full"
      style={{ height: `${svgH}px`, display: 'block' }}
      aria-hidden="true"
    >
      {/* Connection lines */}
      {connections.map((conn, i) => (
        <line
          key={`line-${i}`}
          x1={conn.x1} y1={CY}
          x2={conn.x2} y2={CY}
          stroke={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(16,28,63,0.14)'}
          strokeWidth={1.5}
        />
      ))}

      {/* Arrowheads */}
      {connections.map((conn, i) => (
        <polygon
          key={`arrow-${i}`}
          points={`${conn.x2 + 2},${CY} ${conn.x2 - 5},${CY - 4} ${conn.x2 - 5},${CY + 4}`}
          fill={isDark ? 'rgba(255,255,255,0.22)' : 'rgba(16,28,63,0.22)'}
        />
      ))}

      {/* Animated flowing dots */}
      {connections.map((conn, i) => (
        <motion.circle
          key={`dot-${i}`}
          cy={CY}
          r={3.5}
          fill={color}
          initial={{ cx: conn.x1 }}
          animate={{ cx: conn.x2 - 7 }}
          transition={{
            duration: 0.45,
            delay: i * 0.18,
            repeat: Infinity,
            repeatDelay: 1.8,
            ease: 'linear',
          }}
        />
      ))}

      {/* Node boxes */}
      {nodes.map((node, i) => {
        const isLast = i === nodes.length - 1
        return (
          <g key={`node-${i}`}>
            <rect
              x={nodeXs[i]} y={PY}
              width={NW} height={NH} rx={6}
              fill={isLast
                ? `${color}22`
                : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.92)'}
              stroke={isLast
                ? color
                : isDark ? 'rgba(255,255,255,0.16)' : 'rgba(16,28,63,0.16)'}
              strokeWidth={isLast ? 1.5 : 1}
            />
            <text
              x={nodeXs[i] + NW / 2}
              y={node.sub ? CY - 7 : CY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
              fill={isLast ? color : isDark ? 'rgba(255,255,255,0.88)' : 'rgba(16,28,63,0.88)'}
            >
              {node.label}
            </text>
            {node.sub && (
              <text
                x={nodeXs[i] + NW / 2}
                y={CY + 7}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fontFamily="Inter, sans-serif"
                fill={isDark ? 'rgba(255,255,255,0.38)' : 'rgba(16,28,63,0.38)'}
              >
                {node.sub}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

const methods = [
  {
    id: 'kubernetes',
    icon: faCube,
    color: '#0B64DD',
    label: 'Kubernetes',
    badge: 'K8s',
    description: 'Deploy the Elastic Agent as a DaemonSet or Deployment in your Kubernetes cluster using the provided manifests.',
    diagram: [
      { label: 'K8s Cluster', sub: 'DaemonSet' },
      { label: 'Elastic Agent', sub: 'Pod' },
      { label: 'Cloud Connect', sub: 'API' },
      { label: 'AutoOps', sub: 'Elastic Cloud' },
    ],
    envVars: [
      { key: 'AUTOOPS_ES_URL', value: 'https://your-cluster:9200', desc: 'Elasticsearch endpoint' },
      { key: 'AUTOOPS_ES_API_KEY', value: '<api-key>', desc: 'Cluster API key' },
      { key: 'AUTOOPS_OTEL_URL', value: 'https://autoops-ingest.elastic.cloud', desc: 'AutoOps metrics endpoint' },
    ],
    steps: [
      'Download the Elastic Agent manifest from the AutoOps setup wizard',
      'Set environment variables in the manifest',
      'Apply with kubectl apply -f elastic-agent-autoops.yaml',
      'Launch AutoOps from your Elastic Cloud console',
    ],
  },
  {
    id: 'eck',
    icon: faCube,
    color: '#48EFCF',
    label: 'ECK (v3.3.0+)',
    badge: 'ECK',
    description: 'Native ECK integration via the AutoOpsAgentPolicy custom resource. ECK manages the agent lifecycle automatically.',
    diagram: [
      { label: 'ECK Operator', sub: 'v3.3.0+' },
      { label: 'Elastic Agent', sub: 'Auto-managed' },
      { label: 'Cloud Connect', sub: 'API' },
      { label: 'AutoOps', sub: 'Elastic Cloud' },
    ],
    envVars: [
      { key: 'resourceSelector', value: 'autoops: enabled', desc: 'Label to target clusters' },
      { key: 'kubectl label', value: 'elasticsearch <name> autoops=enabled', desc: 'Enable per cluster' },
    ],
    steps: [
      'Ensure ECK operator v3.3.0 or later is installed',
      'Create an AutoOpsAgentPolicy resource in your namespace',
      'Label target Elasticsearch resources with autoops=enabled',
      'ECK provisions and manages the agent automatically',
    ],
  },
  {
    id: 'docker',
    icon: faServer,
    color: '#FF957D',
    label: 'Docker',
    badge: 'Docker',
    description: 'Run the Elastic Agent as a Docker container alongside your cluster. Suitable for containerized non-K8s environments.',
    diagram: [
      { label: 'Docker Host', sub: 'Agent co-located' },
      { label: 'Cloud Connect', sub: 'API' },
      { label: 'AutoOps', sub: 'Elastic Cloud' },
    ],
    envVars: [
      { key: 'AUTOOPS_ES_URL', value: 'https://your-cluster:9200', desc: 'Elasticsearch endpoint' },
      { key: 'AUTOOPS_ES_API_KEY', value: '<api-key>', desc: 'Cluster API key' },
      { key: 'AUTOOPS_OTEL_URL', value: 'https://autoops-ingest.elastic.cloud', desc: 'AutoOps metrics endpoint' },
    ],
    steps: [
      'Pull the Elastic Agent image from the Elastic Docker registry',
      'Run with required environment variables set via -e flags',
      'Ensure network connectivity to both your cluster and Elastic Cloud',
      'Verify agent status in the AutoOps dashboard',
    ],
  },
  {
    id: 'linux',
    icon: faTerminal,
    color: '#FEC514',
    label: 'Linux',
    badge: 'Linux',
    description: 'Install the Elastic Agent directly on your Linux host using the package manager or tar.gz. Best for bare-metal or VM deployments.',
    diagram: [
      { label: 'Linux Host', sub: 'Agent co-located' },
      { label: 'Cloud Connect', sub: 'API' },
      { label: 'AutoOps', sub: 'Elastic Cloud' },
    ],
    envVars: [
      { key: 'AUTOOPS_ES_URL', value: 'https://your-cluster:9200', desc: 'Elasticsearch endpoint' },
      { key: 'AUTOOPS_ES_USERNAME', value: '<username>', desc: 'Basic auth (alt to API key)' },
      { key: 'AUTOOPS_ES_PASSWORD', value: '<password>', desc: 'Basic auth password' },
      { key: 'AUTOOPS_OTEL_URL', value: 'https://autoops-ingest.elastic.cloud', desc: 'AutoOps metrics endpoint' },
    ],
    steps: [
      'Download the Elastic Agent .rpm / .deb / .tar.gz for your distro',
      'Configure environment variables in the agent config file',
      'Install and enable the service with systemctl',
      'Confirm the agent appears in the AutoOps connected clusters list',
    ],
  },
]

const authPrivileges = [
  { type: 'Cluster privileges', values: ['monitor', 'read_ilm', 'read_slm'] },
  { type: 'Index privileges', values: ['monitor', 'view_index_metadata'] },
]

function InstallationScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeMethod, setActiveMethod] = useState(0)

  const method = methods[activeMethod]

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
            Installation
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Four Ways to <span className="gradient-text">Connect</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Choose the installation method that matches your infrastructure.
          </p>
        </motion.div>

        {/* Method tabs */}
        <motion.div
          className="flex gap-2 mb-5 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {methods.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActiveMethod(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeMethod === i
                  ? isDark ? 'text-elastic-dev-blue' : 'text-white'
                  : isDark
                    ? 'bg-white/5 border-white/15 text-white/60 hover:bg-white/10'
                    : 'bg-white/60 border-elastic-dev-blue/15 text-elastic-dev-blue/60 hover:bg-white'
              }`}
              style={activeMethod === i ? { backgroundColor: m.color, borderColor: m.color } : {}}
            >
              <FontAwesomeIcon icon={m.icon} className="text-xs" />
              {m.label}
            </button>
          ))}
        </motion.div>

        {/* Method detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMethod}
            className="grid md:grid-cols-2 gap-5 items-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left: Steps + Pipeline Diagram */}
            <div className={`p-6 rounded-xl border ${
              isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${method.color}20` }}
                >
                  <FontAwesomeIcon icon={method.icon} style={{ color: method.color }} />
                </div>
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{method.label}</h3>
                  <p className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>{method.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {method.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 text-code"
                      style={{ backgroundColor: `${method.color}20`, color: method.color }}
                    >
                      {i + 1}
                    </div>
                    <p className={`text-sm ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>{step}</p>
                  </motion.div>
                ))}
              </div>

              {/* Pipeline architecture diagram */}
              <div className={`pt-4 border-t ${isDark ? 'border-white/[0.08]' : 'border-elastic-dev-blue/[0.08]'}`}>
                <p className={`text-[10px] uppercase tracking-wider font-semibold mb-3 ${
                  isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'
                }`}>
                  Integration Flow
                </p>
                <PipelineDiagram
                  nodes={method.diagram}
                  color={method.color}
                  isDark={isDark}
                />
              </div>
            </div>

            {/* Right: Config — scrollable so it never bleeds off the viewport */}
            <div
              className="space-y-4 overflow-y-auto pr-1"
              style={{ maxHeight: 'calc(100vh - 18rem)' }}
            >
              {/* Env vars */}
              <div className={`p-5 rounded-xl border ${
                isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                  isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'
                }`}>
                  <FontAwesomeIcon icon={faKey} className="text-[10px]" />
                  Configuration
                </h4>
                <div className="space-y-2">
                  {method.envVars.map((env) => (
                    <div key={env.key} className={`p-2.5 rounded-lg ${isDark ? 'bg-black/30' : 'bg-elastic-dev-blue/5'}`}>
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <code className={`text-xs font-mono font-bold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                          {env.key}
                        </code>
                      </div>
                      <code className={`text-xs font-mono ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                        {env.value}
                      </code>
                      <p className={`text-[10px] mt-0.5 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
                        {env.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auth privileges */}
              <div className={`p-5 rounded-xl border ${
                isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                  isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'
                }`}>
                  <FontAwesomeIcon icon={faLink} className="text-[10px]" />
                  Required API Key Privileges
                </h4>
                {authPrivileges.map((priv) => (
                  <div key={priv.type} className="mb-2">
                    <p className={`text-xs mb-1.5 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>{priv.type}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {priv.values.map((v) => (
                        <span
                          key={v}
                          className={`text-xs px-2 py-0.5 rounded font-mono ${
                            isDark ? 'bg-elastic-blue/20 text-elastic-teal' : 'bg-elastic-blue/10 text-elastic-blue'
                          }`}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default InstallationScene
