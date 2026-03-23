import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

const rows = [
  {
    option: 'Cluster Management',
    serverless: 'Fully managed by Elastic',
    hosted: 'You provision and manage. Shared responsibility with Elastic.',
    serverlessHighlight: true,
  },
  {
    option: 'Scaling',
    serverless: 'Autoscales out of the box',
    hosted: 'Manual scaling or autoscaling available for you to enable.',
    serverlessHighlight: true,
  },
  {
    option: 'Upgrades',
    serverless: 'Automatically performed by Elastic',
    hosted: 'You choose when to upgrade.',
    serverlessHighlight: true,
  },
  {
    option: 'Pricing',
    serverless: 'Per project type, based on usage',
    hosted: 'Based on deployment size and subscription level.',
    serverlessHighlight: false,
  },
  {
    option: 'Solutions',
    serverless: 'Single solution per project',
    hosted: 'Full Elastic Stack per deployment.',
    serverlessHighlight: false,
  },
  {
    option: 'User Management',
    serverless: 'Elastic Cloud-managed users',
    hosted: 'Elastic Cloud-managed + native Kibana users.',
    serverlessHighlight: false,
  },
  {
    option: 'API Support',
    serverless: 'Subset of Elastic APIs',
    hosted: 'All Elastic APIs.',
    serverlessHighlight: false,
  },
  {
    option: 'Backups',
    serverless: 'Automatically backed up by Elastic',
    hosted: 'Your responsibility with Snapshot & Restore.',
    serverlessHighlight: true,
  },
  {
    option: 'Data Retention',
    serverless: 'Editable on data streams',
    hosted: 'Index Lifecycle Management.',
    serverlessHighlight: false,
  },
]

function ComparisonScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredRow, setHoveredRow] = useState(null)

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Deployment Comparison
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Serverless vs <span className="gradient-text">Cloud Hosted</span>
          </h2>
          <p className={`text-paragraph text-sm mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            Both deployment options are available in the same Elastic Cloud organization. Here's how they compare.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          className={`rounded-xl border overflow-hidden ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Header row */}
          <div className={`grid grid-cols-3 text-sm font-bold px-4 py-3 ${isDark ? 'bg-white/[0.06]' : 'bg-elastic-dev-blue/5'}`}>
            <div className={`${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Feature</div>
            <div className="text-elastic-teal flex items-center gap-1.5">
              <FontAwesomeIcon icon={faCheck} className="text-xs" />
              Serverless
            </div>
            <div className={`${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>Cloud Hosted</div>
          </div>

          {/* Data rows */}
          {rows.map((row, index) => (
            <motion.div
              key={row.option}
              className={`grid grid-cols-3 text-sm px-4 py-3 border-t transition-colors cursor-default ${
                isDark
                  ? `border-white/5 ${hoveredRow === index ? 'bg-white/[0.04]' : ''}`
                  : `border-elastic-dev-blue/5 ${hoveredRow === index ? 'bg-elastic-blue/5' : ''}`
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.04 }}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div className={`font-semibold text-xs flex items-center ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/70'}`}>
                {row.option}
              </div>
              <div className={`text-xs flex items-start gap-1.5 pr-4 ${row.serverlessHighlight ? 'text-elastic-teal font-semibold' : isDark ? 'text-white/80' : 'text-elastic-dark-ink'}`}>
                {row.serverlessHighlight && <FontAwesomeIcon icon={faCheck} className="text-elastic-teal mt-0.5 flex-shrink-0" />}
                {row.serverless}
              </div>
              <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
                {row.hosted}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={`mt-3 flex items-start gap-2 p-3 rounded-lg text-xs ${isDark ? 'bg-white/[0.03] text-white/40' : 'bg-elastic-blue/5 text-elastic-dev-blue/50'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <FontAwesomeIcon icon={faCircleInfo} className="mt-0.5 flex-shrink-0" />
          <span>You can run both hosted deployments and serverless projects within the same Elastic Cloud organization. Projects and deployments cannot be converted between types.</span>
        </motion.div>
      </div>
    </div>
  )
}

export default ComparisonScene
