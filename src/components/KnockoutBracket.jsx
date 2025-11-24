import { getMatchesByStage, getVenue, stages } from '../data/worldCupData'

const KnockoutBracket = ({ onMatchClick }) => {
  const r32MatchesRaw = getMatchesByStage(stages.R32)
  const r16MatchesRaw = getMatchesByStage(stages.R16)
  const qfMatchesRaw = getMatchesByStage(stages.QF)
  const sfMatches = getMatchesByStage(stages.SF)
  const tpoMatches = getMatchesByStage(stages.TPO)
  const finalMatches = getMatchesByStage(stages.FINAL)

  // Reorder matches by bracket position (top to bottom)
  // R32: Reorder by which pairs feed into R16 matches
  const findR32Match = (num) => r32MatchesRaw.find(m => m.matchNumber === num)
  const r32Matches = [
    findR32Match(74), findR32Match(77), // Feed M89
    findR32Match(73), findR32Match(75), // Feed M90
    findR32Match(76), findR32Match(78), // Feed M91
    findR32Match(79), findR32Match(80), // Feed M92
    findR32Match(83), findR32Match(84), // Feed M93
    findR32Match(81), findR32Match(82), // Feed M94
    findR32Match(86), findR32Match(88), // Feed M95
    findR32Match(85), findR32Match(87), // Feed M96
  ]

  // R16: Already in correct order (M89-M96)
  const r16Matches = r16MatchesRaw

  // QF: Reorder by bracket position
  // M97 <- M89, M90 (top)
  // M99 <- M91, M92
  // M98 <- M93, M94
  // M100 <- M95, M96 (bottom)
  const findQFMatch = (num) => qfMatchesRaw.find(m => m.matchNumber === num)
  const qfMatches = [
    findQFMatch(97),  // M89 + M90
    findQFMatch(99),  // M91 + M92
    findQFMatch(98),  // M93 + M94
    findQFMatch(100), // M95 + M96
  ]

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T12:00:00')
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const BracketMatch = ({ match, isHighlight = false }) => {
    const venue = getVenue(match.venue)
    
    return (
      <button
        onClick={() => onMatchClick(match)}
        className={`
          relative group w-full text-left
          bg-white border border-slate-300 rounded
          hover:border-amber-400 hover:shadow-lg hover:scale-[1.02]
          transition-all duration-200
          ${isHighlight ? 'ring-2 ring-amber-400 border-amber-400 shadow-lg' : ''}
        `}
        style={{ width: '180px', height: '80px' }}
      >
        <div className="p-2.5 h-full flex flex-col justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-[9px] uppercase tracking-wider text-slate-500 mb-1">
              M{match.matchNumber}
            </div>
            <div className="text-[11px] text-slate-900 leading-tight line-clamp-2">
              {match.description || 'TBD vs TBD'}
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1.5 border-t border-slate-200">
            <span>{formatDate(match.date)}</span>
            <span className="truncate ml-1.5">{venue?.city}</span>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 border-t border-slate-200">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 font-light">
              Knockout Stage
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          <h2 className="text-3xl font-light text-slate-900">
            Tournament <span className="text-amber-400">Bracket</span>
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-light">
            From Round of 32 to the Final • MetLife Stadium, July 19
          </p>
        </div>

        {/* Desktop bracket - Clean grid-based layout */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="inline-flex gap-12 min-w-max px-8">
            
            {/* Round of 32 
                Match height: 80px
                Gap within pair: 12px (gap-3)
                Gap between pairs: 24px (gap-6)
                Each pair total: 80 + 12 + 80 = 172px
                Spacing between pair starts: 172 + 24 = 196px
                Pair center: 86px from pair start
            */}
            <div className="flex flex-col items-center">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-6 font-medium">
                Round of 32
              </div>
              <div className="flex flex-col gap-6">
                {[0, 2, 4, 6, 8, 10, 12, 14].map(idx => (
                  <div key={idx} className="flex flex-col gap-3">
                    <BracketMatch match={r32Matches[idx]} />
                    <BracketMatch match={r32Matches[idx + 1]} />
                  </div>
                ))}
              </div>
            </div>

            {/* Round of 16 
                Should center on each R32 pair
                R32 pair 0 center: 86px
                R16 match 0 top: 86 - 40 = 46px
                Gap between R16 matches: 196 - 80 = 116px
            */}
            <div className="flex flex-col items-center">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-6 font-medium">
                Round of 16
              </div>
              <div className="flex flex-col gap-[116px]" style={{ marginTop: '46px' }}>
                {r16Matches.map(match => (
                  <BracketMatch key={match.id} match={match} />
                ))}
              </div>
            </div>

            {/* Quarter-Finals 
                Should center on each R16 pair
                R16 match 0 top: 46, center: 86
                R16 match 1 top: 46+80+116 = 242, center: 282
                QF match 0 should center between 86 and 282: (86+282)/2 = 184
                QF match 0 top: 184 - 40 = 144
                Spacing between R16 pair centers: 196 * 2 = 392
                Gap between QF matches: 392 - 80 = 312px
            */}
            <div className="flex flex-col items-center">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-6 font-medium">
                Quarter-Finals
              </div>
              <div className="flex flex-col gap-[312px]" style={{ marginTop: '144px' }}>
                {qfMatches.map(match => (
                  <BracketMatch key={match.id} match={match} />
                ))}
              </div>
            </div>

            {/* Semi-Finals 
                Should center on each QF pair
                QF match 0 center: 184
                QF match 1 center: 184 + 392 = 576
                SF match 0 should center between: (184+576)/2 = 380
                SF match 0 top: 380 - 40 = 340
                Spacing between QF pair centers: 392 * 2 = 784
                Gap between SF matches: 784 - 80 = 704px
            */}
            <div className="flex flex-col items-center">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-6 font-medium">
                Semi-Finals
              </div>
              <div className="flex flex-col gap-[704px]" style={{ marginTop: '340px' }}>
                {sfMatches.map(match => (
                  <BracketMatch key={match.id} match={match} />
                ))}
              </div>
            </div>

            {/* Final 
                Should center on SF pair
                SF match 0 center: 380
                SF match 1 center: 380 + 784 = 1164
                Final should center between: (380+1164)/2 = 772
                Final top: 772 - 70 = 702 (final height is 140, so center at 70)
            */}
            <div className="flex flex-col items-center">
              <div className="text-[10px] uppercase tracking-wider text-amber-500 mb-6 font-medium">
                The Final
              </div>
              <div style={{ marginTop: '702px' }}>
                <button
                  onClick={() => onMatchClick(finalMatches[0])}
                  className="relative group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-amber-400 hover:border-amber-300 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 rounded"
                  style={{ width: '220px', height: '140px' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                  <div className="relative p-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-amber-400 mb-2">
                        M104 • July 19
                      </div>
                      <div className="text-lg font-light text-white mb-2 flex items-center gap-2">
                        <span className="text-2xl">🏆</span>
                        <span>Final</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 mb-2">
                        MetLife Stadium
                      </div>
                      <div className="pt-2 border-t border-slate-700">
                        <div className="text-[8px] uppercase tracking-wider text-amber-400/80 leading-tight">
                          Winner M101 vs M102
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Third Place - Below bracket */}
          <div className="mt-16 pt-8 border-t border-slate-200 max-w-md mx-auto">
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-4 text-center font-medium">
              Third Place Playoff
            </div>
            <div className="flex justify-center">
              {tpoMatches.map(match => (
                <BracketMatch key={match.id} match={match} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet layout - stacked by round */}
        <div className="lg:hidden space-y-12">
          {/* Round of 32 */}
          <div>
            <div className="text-sm uppercase tracking-wider text-slate-600 font-light mb-4 pb-2 border-b border-slate-200">
              Round of 32
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {r32Matches.map(match => (
                <BracketMatch key={match.id} match={match} />
              ))}
            </div>
          </div>

          {/* Round of 16 */}
          <div>
            <div className="text-sm uppercase tracking-wider text-slate-600 font-light mb-4 pb-2 border-b border-slate-200">
              Round of 16
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {r16Matches.map(match => (
                <BracketMatch key={match.id} match={match} />
              ))}
            </div>
          </div>

          {/* Quarter-Finals */}
          <div>
            <div className="text-sm uppercase tracking-wider text-slate-600 font-light mb-4 pb-2 border-b border-slate-200">
              Quarter-Finals
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {qfMatches.map(match => (
                <BracketMatch key={match.id} match={match} />
              ))}
            </div>
          </div>

          {/* Semi-Finals */}
          <div>
            <div className="text-sm uppercase tracking-wider text-slate-600 font-light mb-4 pb-2 border-b border-slate-200">
              Semi-Finals
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {sfMatches.map(match => (
                <BracketMatch key={match.id} match={match} />
              ))}
            </div>
          </div>

          {/* Third Place */}
          <div>
            <div className="text-sm uppercase tracking-wider text-slate-600 font-light mb-4 pb-2 border-b border-slate-200">
              Third Place Playoff
            </div>
            <div className="max-w-md mx-auto">
              {tpoMatches.map(match => (
                <BracketMatch key={match.id} match={match} />
              ))}
            </div>
          </div>

          {/* The Final - featured on mobile too */}
          <div>
            <div className="text-sm uppercase tracking-wider text-amber-500 font-medium mb-4 pb-2 border-b-2 border-amber-400">
              The Final
            </div>
            <button
              onClick={() => onMatchClick(finalMatches[0])}
              className="w-full relative group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-amber-400 hover:border-amber-300 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6">
                <div className="text-xs uppercase tracking-wider text-amber-400 mb-3">
                  M104 • July 19, 2026
                </div>
                <div className="text-xl font-light text-white mb-3">
                  🏆 FIFA World Cup Final
                </div>
                <div className="text-sm text-slate-300 mb-4">
                  MetLife Stadium, New York/New Jersey
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <div className="text-xs uppercase tracking-wider text-amber-400/80">
                    Winner M101 vs Winner M102
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Legend/Info */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-slate-300 bg-white rounded" />
              <span>Click any match for details</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Teams TBD after group stage draw</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KnockoutBracket
