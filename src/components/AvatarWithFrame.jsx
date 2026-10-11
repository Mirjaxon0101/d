import React from 'react';

// Rank color & SVG frame definitions inspired by futuristic cyber frames
export const getRankTheme = (title = 'Newbie') => {
  switch (title) {
    case 'Hacker Programmer':
      return {
        strokePrimary: '#ef4444', // Red-500
        strokeSecondary: '#f59e0b', // Amber-500
        glow: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.7))',
        bgGradient: 'from-red-500/20 via-amber-500/10 to-transparent',
        badgeBg: 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-500/30'
      };
    case 'Grandmaster':
      return {
        strokePrimary: '#f97316', // Orange-500
        strokeSecondary: '#eab308', // Yellow-500
        glow: 'drop-shadow(0 0 5px rgba(249, 115, 22, 0.6))',
        bgGradient: 'from-orange-500/20 via-yellow-500/10 to-transparent',
        badgeBg: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
      };
    case 'High Master':
    case 'Master':
      return {
        strokePrimary: '#a855f7', // Purple-500
        strokeSecondary: '#ec4899', // Pink-500
        glow: 'drop-shadow(0 0 5px rgba(168, 85, 247, 0.6))',
        bgGradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
        badgeBg: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20'
      };
    case 'Specialist':
      return {
        strokePrimary: '#06b6d4', // Cyan-500
        strokeSecondary: '#3b82f6', // Blue-500
        glow: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.5))',
        bgGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
        badgeBg: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
      };
    case 'Pupil':
      return {
        strokePrimary: '#10b981', // Emerald-500
        strokeSecondary: '#06b6d4', // Cyan-500
        glow: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))',
        bgGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
      };
    case 'Newbie':
    default:
      return {
        strokePrimary: '#64748b', // Slate-500
        strokeSecondary: '#38bdf8', // Sky-400
        glow: 'drop-shadow(0 0 3px rgba(56, 189, 248, 0.3))',
        bgGradient: 'from-slate-500/10 via-sky-500/10 to-transparent',
        badgeBg: 'bg-slate-700 text-slate-200'
      };
  }
};

export default function AvatarWithFrame({
  avatar = '👨‍💻',
  title = 'Newbie',
  size = 'md', // 'sm' (32px), 'md' (48px), 'lg' (72px), 'xl' (96px)
  showTitleBadge = false,
  className = ''
}) {
  const theme = getRankTheme(title);

  // Size configurations
  const sizeMap = {
    sm: { box: 44, avatarSize: 'w-7 h-7 text-sm', svgSize: 44, strokeWidth: 1.5 },
    md: { box: 64, avatarSize: 'w-10 h-10 text-xl', svgSize: 64, strokeWidth: 2 },
    lg: { box: 92, avatarSize: 'w-16 h-16 text-3xl', svgSize: 92, strokeWidth: 2.5 },
    xl: { box: 120, avatarSize: 'w-20 h-20 text-4xl', svgSize: 120, strokeWidth: 3 }
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const isImage = avatar && (avatar.startsWith('http') || avatar.startsWith('data:image'));

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* SVG Futuristic Frame overlay */}
      <svg
        width={currentSize.svgSize}
        height={currentSize.svgSize}
        viewBox="0 0 100 100"
        className="absolute inset-0 pointer-events-none transition-transform duration-300 hover:scale-105"
        style={{ filter: theme.glow }}
      >
        {/* Outer Tech Ring Base */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={theme.strokePrimary}
          strokeWidth="1.5"
          strokeDasharray="8 3 3 3"
          className="opacity-70"
        />

        {/* Secondary Tech Accents */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={theme.strokeSecondary}
          strokeWidth="1"
          strokeDasharray="18 6 4 6"
          className="opacity-80"
        />

        {/* Inner Border Ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke={theme.strokePrimary}
          strokeWidth="2"
        />

        {/* Cyber Notch Accents at 0, 90, 180, 270 degrees */}
        <path d="M 50,2 L 50,8 M 50,92 L 50,98 M 2,50 L 8,50 M 92,50 L 98,50" stroke={theme.strokeSecondary} strokeWidth="2.5" strokeLinecap="round" />

        {/* Dynamic Cyber Details based on Rank */}
        {title === 'Hacker Programmer' && (
          <>
            <circle cx="50" cy="50" r="48" fill="none" stroke={theme.strokePrimary} strokeWidth="1" strokeDasharray="2 4" className="animate-spin" style={{ animationDuration: '12s' }} />
            <path d="M 20,20 L 26,26 M 80,20 L 74,26 M 20,80 L 26,74 M 80,80 L 74,74" stroke={theme.strokeSecondary} strokeWidth="2" />
          </>
        )}

        {title === 'Grandmaster' && (
          <path d="M 15,35 L 20,30 M 85,35 L 80,30 M 15,65 L 20,70 M 85,65 L 80,70" stroke={theme.strokePrimary} strokeWidth="2" />
        )}

        {title === 'Master' && (
          <circle cx="50" cy="50" r="44" fill="none" stroke={theme.strokeSecondary} strokeWidth="1.5" strokeDasharray="12 12" />
        )}
      </svg>

      {/* Avatar Container */}
      <div className={`${currentSize.avatarSize} rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700 shadow-inner z-10`}>
        {isImage ? (
          <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="select-none">{avatar}</span>
        )}
      </div>

      {/* Optional Title Badge below avatar */}
      {showTitleBadge && (
        <span className={`absolute -bottom-2 text-[10px] font-semibold px-2 py-0.5 rounded-full z-20 whitespace-nowrap ${theme.badgeBg}`}>
          {title}
        </span>
      )}
    </div>
  );
}
