import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlobe,
  faCartShopping,
  faRobot,
  faMapLocationDot,
  faComments,
  faChartLine,
  faShieldHalved,
  faBinoculars,
} from '@fortawesome/free-solid-svg-icons'

const useCases = [
  {
    icon: faGlobe,
    color: '#48EFCF',
    title: 'Website & Docs Search',
    description: 'Fast, relevant search across your website, knowledge base, or documentation portal.',
    techniques: ['Full-text', 'Semantic'],
  },
  {
    icon: faCartShopping,
    color: '#0B64DD',
    title: 'Ecommerce Catalogs',
    description: 'Product search with filters, facets, ranking by relevance, and personalized results.',
    techniques: ['Hybrid', 'Ranking'],
  },
  {
    icon: faRobot,
    color: '#F04E98',
    title: 'RAG / AI Assistants',
    description: 'Ground LLM responses in your own data — accurate, citeable, and hallucination-free.',
    techniques: ['Vector', 'Hybrid', 'RAG'],
  },
  {
    icon: faComments,
    color: '#FF957D',
    title: 'Question Answering',
    description: 'Natural language questions answered from your data — support bots, copilots, and more.',
    techniques: ['Semantic', 'RAG'],
  },
  {
    icon: faMapLocationDot,
    color: '#FEC514',
    title: 'Geospatial Applications',
    description: 'Store locators, delivery zone search, asset tracking, and location-filtered queries.',
    techniques: ['Geo', 'Full-text'],
  },
  {
    icon: faBinoculars,
    color: '#48EFCF',
    title: 'Content Recommendations',
    description: 'Surface related articles, products, or documents based on semantic similarity.',
    techniques: ['Vector', 'Hybrid'],
  },
  {
    icon: faChartLine,
    color: '#0B64DD',
    title: 'Analytics Dashboards',
    description: 'Explore and aggregate data with full-text search layered on analytics queries.',
    techniques: ['Full-text', 'Aggregations'],
  },
  {
    icon: faShieldHalved,
    color: '#F04E98',
    title: 'Security & Observability Search',
    description: 'Custom search tools for log analysis, threat hunting, and incident investigation.',
    techniques: ['Full-text', 'Geo', 'Ranking'],
  },
]

function UseCasesScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Use Cases
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            What You Can <span className="gradient-text">Build</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Elasticsearch search capabilities power an enormous range of applications — across industries and scales.
          </p>
        </motion.div>

        <div className="grid grid-cols-4 gap-3">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 + i * 0.06 }}
              whileHover={{ scale: 1.03 }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${uc.color}20` }}
              >
                <FontAwesomeIcon icon={uc.icon} style={{ color: uc.color }} className="text-sm" />
              </div>
              <h3 className={`font-bold text-xs mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                {uc.title}
              </h3>
              <p className={`text-[11px] leading-relaxed mb-2 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
                {uc.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {uc.techniques.map(t => (
                  <span
                    key={t}
                    className={`text-[9px] px-2 py-0.5 rounded-full font-medium border ${
                      isDark ? 'bg-white/5 border-white/15 text-white/50' : 'bg-elastic-dev-blue/5 border-elastic-dev-blue/15 text-elastic-dev-blue/60'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UseCasesScene
