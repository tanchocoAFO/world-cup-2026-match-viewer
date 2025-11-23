import { getVenue } from '../data/worldCupData'

const MatchCard = ({ match, onClick, isFavorite, onToggleFavorite }) => {
  const venue = getVenue(match.venue)
  
  // Get stage styling
  const getStageStyle = (stage) => {
    if (stage.includes('Final')) return { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-900' }
    if (stage.includes('Semi')) return { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-900' }
    if (stage.includes('Quarter')) return { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-900' }
    if (stage.includes('16') || stage.includes('32')) return { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-900' }
    return { bg: 'bg-slate-50', border: 'border-slate-400', text: 'text-slate-900' }
  }

  // Get country flag emoji
  const getFlag = (country) => {
    const flags = {
      'USA': '🇺🇸',
      'Mexico': '🇲🇽',
      'Canada': '🇨🇦'
    }
    return flags[country] || '⚽'
  }

  const stageStyle = getStageStyle(match.stage)

  const handleFavoriteClick = (e) => {
    e.stopPropagation() // Prevent card click from firing
    onToggleFavorite(match.id)
  }

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer relative"
    >
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 hover:border-rose-400 hover:bg-rose-50 transition-all duration-200 hover:scale-110"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </button>

      {/* Stage Badge */}
      <div className={`${stageStyle.bg} border-l-4 ${stageStyle.border} py-2 px-4`}>
        <div className={`text-xs uppercase tracking-wider font-medium ${stageStyle.text}`}>
          {match.stage}
          {match.group && ` • Group ${match.group}`}
        </div>
      </div>

      {/* Match Info */}
      <div className="p-5">
        {/* Match Number and Description */}
        <div className="mb-4">
          <div className="text-2xl font-light text-slate-900 mb-2">
            #{match.matchNumber}
          </div>
          {match.description && (
            <div className="text-slate-600 text-xs font-light leading-relaxed">
              {match.description}
            </div>
          )}
        </div>

        {/* Venue */}
        <div className="flex items-center pt-3 border-t border-slate-100">
          <span className="text-lg mr-2">{getFlag(venue.country)}</span>
          <div className="flex-1 min-w-0">
            <div className="font-normal text-slate-900 text-sm truncate">{venue.name}</div>
            <div className="text-xs text-slate-500">{venue.city}</div>
          </div>
          <svg className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default MatchCard
