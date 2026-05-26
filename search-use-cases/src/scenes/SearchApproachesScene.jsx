import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFont,
  faBrain,
  faLayerGroup,
  faMapLocationDot,
  faArrowRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons'

const approaches = [
  {
    id: 'fulltext',
    icon: faFont,
    color: '#48EFCF',
    title: 'Full-Text Search',
    tagline: 'Classic lexical keyword matching',
    description: 'Traditional search using analyzers, tokenizers, and BM25 relevance scoring. Essential foundation — works out of the box, highly tunable.',
    strengths: ['Keyword precision', 'Phrase matching', 'Fuzzy & wildcard', 'Relevance tuning'],
    bestFor: 'Log search, document libraries, legacy apps',
    complexity: 1,
  },
  {
    id: 'vector',
    icon: faBrain,
    color: '#0B64DD',
    title: 'AI-Powered / Vector Search',
    tagline: 'Machine learning & natural language understanding',
    description: 'Uses dense vector embeddings from ML models to find semantically similar content — even when exact keywords don\'t match.',
    strengths: ['Semantic similarity', 'Natural language queries', 'Cross-language search', 'Image & multimodal'],
    bestFor: 'Q&A systems, recommendation engines, RAG',
    complexity: 3,
  },
  {
    id: 'hybrid',
    icon: faLayerGroup,
    color: '#F04E98',
    title: 'Hybrid Search',
    tagline: 'Best of keyword + semantic',
    description: 'Combines lexical and vector/semantic search approaches using Reciprocal Rank Fusion (RRF) — balances precision with semantic understanding.',
    strengths: ['Keyword + semantic', 'RRF ranking', 'Configurable weighting', 'Production-proven'],
    bestFor: 'Ecommerce, enterprise search, most use cases',
    complexity: 2,
  },
  {
    id: 'geo',
    icon: faMapLocationDot,
    color: '#FF957D',
    title: 'Geospatial Search',
    tagline: 'Location-aware queries',
    description: 'Search by distance, bounding box, or shape queries. Combine with any other search type for location-filtered results.',
    strengths: ['Distance filters', 'Bounding boxes', 'Shape queries', 'Geo aggregations'],
    bestFor: 'Store locators, delivery zones, asset tracking',
    complexity: 2,
  },
]

function ComplexityDots({ level }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${i <= level
            ? isDark ? 'bg-elastic-teal' : 'bg-elastic-blue'
            : isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/20'
          }`}
        />
      ))}
    </div>
  )
}

function SearchApproachesScene({ onNext, scenes, allScenes, onNavigate, demoUrl }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState('hybrid')

  const selected = approaches.find(a => a.id === active)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Search Techniques
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Choose Your <span className="gradient-text">Search Approach</span>
          </h2>
          <p className={`text-paragraph text-base mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Elasticsearch supports every modern search technique. Start with full-text and progressively add AI capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {approaches.map((approach, i) => (
            <motion.button
              key={approach.id}
              onClick={() => setActive(approach.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                active === approach.id
                  ? isDark
                    ? 'border-elastic-teal/60 bg-elastic-teal/10'
                    : 'border-elastic-blue/60 bg-elastic-blue/10'
                  : isDark
                    ? 'border-white/10 bg-white/[0.03] hover:border-white/25'
                    : 'border-elastic-dev-blue/10 bg-white hover:border-elastic-dev-blue/25'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                style={{ backgroundColor: `${approach.color}20` }}
              >
                <FontAwesomeIcon icon={approach.icon} style={{ color: approach.color }} className="text-sm" />
              </div>
              <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{approach.title}</p>
              <p className={`text-[10px] mt-0.5 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>{approach.tagline}</p>
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.div
            key={selected.id}
            className={`p-5 rounded-xl border grid grid-cols-3 gap-5 ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${selected.color}20` }}
                >
                  <FontAwesomeIcon icon={selected.icon} style={{ color: selected.color }} />
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>{selected.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>Complexity:</span>
                    <ComplexityDots level={selected.complexity} />
                  </div>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/80'}`}>
                {selected.description}
              </p>
              <div className={`mt-3 flex items-start gap-2 text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
                <FontAwesomeIcon icon={faArrowRight} className="mt-0.5 flex-shrink-0" style={{ color: selected.color }} />
                <span><strong>Best for:</strong> {selected.bestFor}</span>
              </div>
            </div>
            <div>
              <p className={`text-xs font-bold mb-2 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>Key Strengths</p>
              <div className="space-y-2">
                {selected.strengths.map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faStar} className="text-[10px]" style={{ color: selected.color }} />
                    <span className={`text-xs ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/80'}`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SearchApproachesScene
