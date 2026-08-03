import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useTeamConfig } from '../context/TeamContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faGear, faUsers } from '@fortawesome/free-solid-svg-icons'

function MemberAvatar({ member, size = 'lg' }) {
  const dim = size === 'lg' ? 72 : 48
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={member.name}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: dim, height: dim, border: `2px solid ${member.color}40` }}
      />
    )
  }
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 font-bold"
      style={{
        width: dim,
        height: dim,
        backgroundColor: `${member.color}20`,
        border: `2px solid ${member.color}50`,
        color: member.color,
        fontSize: size === 'lg' ? '1.4rem' : '1rem',
        fontFamily: 'Space Mono, monospace',
      }}
    >
      {member.initials || member.name?.slice(0, 2).toUpperCase() || '?'}
    </div>
  )
}

function MemberCard({ member, index, isDark }) {
  return (
    <motion.div
      className={`relative p-5 rounded-2xl border flex flex-col items-center text-center gap-3 ${
        isDark
          ? 'bg-white/[0.04] border-white/10 hover:border-white/20'
          : 'bg-white border-elastic-dev-blue/10 hover:border-elastic-dev-blue/25'
      }`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      style={{
        boxShadow: `0 0 0 0 ${member.color}00`,
      }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
        style={{ backgroundColor: `${member.color}60` }}
      />

      <MemberAvatar member={member} size="lg" />

      <div className="space-y-0.5">
        <h3 className={`font-bold text-base leading-tight ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
          {member.name || 'Name not set'}
        </h3>
        <p className="text-sm font-medium" style={{ color: member.color }}>
          {member.role || 'Role not set'}
        </p>
      </div>

      {(member.email || member.phone) && (
        <div className={`w-full pt-3 border-t space-y-1.5 ${isDark ? 'border-white/8' : 'border-elastic-dev-blue/8'}`}>
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className={`flex items-center justify-center gap-2 text-xs transition-opacity hover:opacity-100 ${
                isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'
              }`}
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-[10px]" style={{ color: member.color }} />
              {member.email}
            </a>
          )}
          {member.phone && (
            <p className={`flex items-center justify-center gap-2 text-xs ${
              isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'
            }`}>
              <FontAwesomeIcon icon={faPhone} className="text-[10px]" style={{ color: member.color }} />
              {member.phone}
            </p>
          )}
        </div>
      )}
    </motion.div>
  )
}

function EmptyState({ isDark }) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border border-dashed ${
        isDark ? 'border-white/15 text-white/40' : 'border-elastic-dev-blue/15 text-elastic-dev-blue/40'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <FontAwesomeIcon icon={faUsers} className="text-4xl opacity-30" />
      <div className="text-center">
        <p className="font-semibold text-sm mb-1">No team members configured</p>
        <p className="text-xs opacity-70">
          Open <FontAwesomeIcon icon={faGear} className="mx-1" /> Settings → Team tab to add your team.
        </p>
      </div>
    </motion.div>
  )
}

function TeamScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { teamConfig } = useTeamConfig()
  const { title, subtitle, members = [] } = teamConfig

  // Choose grid columns based on member count
  const gridCols =
    members.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
    members.length === 2 ? 'grid-cols-2 max-w-xl mx-auto' :
    members.length === 4 ? 'grid-cols-2 md:grid-cols-4' :
    'grid-cols-2 md:grid-cols-3'

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Your Team
          </span>
          <h2 className={`text-headline text-5xl md:text-6xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            {title || 'Meet Your'}{' '}
            {!title?.includes('Elastic') && <span className="gradient-text">Elastic Team</span>}
          </h2>
          {subtitle && (
            <p className={`text-paragraph text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Members grid or empty state */}
        {members.length === 0 ? (
          <EmptyState isDark={isDark} />
        ) : (
          <div className={`grid gap-5 ${gridCols}`}>
            {members.map((member, index) => (
              <MemberCard
                key={member.id || index}
                member={member}
                index={index}
                isDark={isDark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamScene
