import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassChart, faBell, faShieldHalved, faArrowRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const projects = [
  {
    icon: faMagnifyingGlassChart,
    color: '#48EFCF',
    name: 'Elasticsearch Serverless',
    tagline: 'Search & AI Applications',
    description: 'Build powerful search experiences and AI applications using vector search, semantic search, ELSER, and a rich ecosystem of APIs and client libraries.',
    useCases: ['Vector & semantic search', 'RAG and AI assistants', 'E-commerce search', 'Enterprise knowledge search'],
    url: 'https://www.elastic.co/docs/solutions/search/get-started',
  },
  {
    icon: faBell,
    color: '#0B64DD',
    name: 'Elastic Observability Serverless',
    tagline: 'Logs, Metrics & Traces',
    description: 'Monitor your platforms and services using powerful machine learning and analytics with logs, metrics, traces, and APM data — all in one place.',
    useCases: ['Application performance monitoring', 'Log analytics', 'Infrastructure monitoring', 'Distributed tracing'],
    url: 'https://www.elastic.co/docs/solutions/observability/get-started',
  },
  {
    icon: faShieldHalved,
    color: '#F04E98',
    name: 'Elastic Security Serverless',
    tagline: 'SIEM, EDR & Threat Intelligence',
    description: 'Detect, investigate, and respond to threats with SIEM, endpoint protection, and AI-powered analytics capabilities — without managing the backend.',
    useCases: ['SIEM & threat detection', 'Endpoint protection (EDR)', 'Cloud security posture', 'AI-driven investigations'],
    url: 'https://www.elastic.co/docs/solutions/security/get-started',
  },
]

function ProjectTypesScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Get Started
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Three <span className="gradient-text">Serverless Projects</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Choose the serverless project that matches your use case. Each is purpose-built with a dedicated experience on top of the Elastic Stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              className={`flex flex-col p-5 rounded-xl border ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.12 }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${project.color}20` }}>
                  <FontAwesomeIcon icon={project.icon} style={{ color: project.color }} className="text-lg" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{project.name}</h3>
                  <p className="text-xs font-medium mt-0.5" style={{ color: project.color }}>{project.tagline}</p>
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm mb-4 flex-1 ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                {project.description}
              </p>

              {/* Use cases */}
              <ul className="space-y-1.5 mb-4">
                {project.useCases.map((uc) => (
                  <li key={uc} className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-xs flex-shrink-0" style={{ color: project.color }} />
                    <span className={`text-xs ${isDark ? 'text-elastic-light-grey/60' : 'text-elastic-ink/70'}`}>{uc}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-all"
                style={{ backgroundColor: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
              >
                Get Started <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectTypesScene
