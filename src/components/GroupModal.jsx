import { groups, getGroupStandings } from '../data/worldCupData'

const GroupModal = ({ groupId, onClose, onFilterByGroup, onFilterByTeam }) => {
  if (!groupId) return null
  
  const group = groups[groupId]
  if (!group) return null

  const standings = getGroupStandings(groupId)
  const hasResults = standings.some(s => s.gp > 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="relative bg-white max-w-md w-full shadow-2xl animate-slideUp" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 shadow transition-colors z-10"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-6 border-b-2 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{group.id}</span>
            </div>
            <div>
              <h2 className="text-2xl font-light text-white tracking-wide">Group {group.id}</h2>
              <p className="text-xs text-slate-400 tracking-wide uppercase mt-0.5">Tournament Group</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {hasResults ? (
            /* Standings table */
            <div className="border border-slate-200 overflow-hidden">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-[10px] uppercase tracking-wider text-slate-500">
                    <th className="w-6 px-3 py-2 text-left font-medium"></th>
                    <th className="px-2 py-2 text-left font-medium">Team</th>
                    <th className="w-8 py-2 text-center font-medium">GP</th>
                    <th className="w-8 py-2 text-center font-medium">W</th>
                    <th className="w-8 py-2 text-center font-medium">D</th>
                    <th className="w-8 py-2 text-center font-medium">L</th>
                    <th className="w-8 py-2 text-center font-medium">Pts</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row, idx) => {
                    const gd = row.gf - row.ga
                    return (
                      <tr
                        key={row.team.name}
                        className={`border-t border-slate-100 ${idx < 2 ? 'bg-emerald-50/60' : ''}`}
                      >
                        <td className="px-3 py-3 text-xs text-slate-400 font-medium">{idx + 1}</td>
                        <td className="px-2 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl leading-none shrink-0">{row.team.flag}</span>
                            <div>
                              <div className="text-sm font-medium text-slate-800 whitespace-nowrap">{row.team.name}</div>
                              <div className={`text-[10px] font-medium whitespace-nowrap ${gd > 0 ? 'text-emerald-600' : gd < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                                GD {gd > 0 ? `+${gd}` : gd} · {row.gf} GF
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-center text-xs text-slate-500">{row.gp}</td>
                        <td className="py-3 text-center text-xs text-slate-700">{row.w}</td>
                        <td className="py-3 text-center text-xs text-slate-700">{row.d}</td>
                        <td className="py-3 text-center text-xs text-slate-700">{row.l}</td>
                        <td className="py-3 text-center text-sm font-bold text-slate-900">{row.pts}</td>
                        <td className="px-3 py-3">
                          {onFilterByTeam && (
                            <button
                              onClick={() => onFilterByTeam(row.team.name)}
                              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-medium transition-colors whitespace-nowrap"
                            >
                              Matches
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-300"></div>
                <span className="text-[10px] text-slate-400">Top 2 advance · Best 8 third-place teams also qualify</span>
              </div>
            </div>
          ) : (
            /* Pre-results: team list with pot info */
            <div className="space-y-3">
              {group.teams.map((team, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between py-3 px-4 transition-all ${
                    team.name === 'TBD' 
                      ? 'bg-slate-50 border border-slate-200' 
                      : 'bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">
                      {idx + 1}
                    </div>
                    <span className="text-3xl">{team.flag}</span>
                    <div>
                      <div className="font-medium text-slate-900">{team.name}</div>
                      <div className="text-xs text-slate-500">Pot {team.pot}</div>
                    </div>
                  </div>
                  {team.name !== 'TBD' && onFilterByTeam && (
                    <button
                      onClick={() => onFilterByTeam(team.name)}
                      className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
                      title={`View ${team.name} matches`}
                    >
                      Matches
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Group Stage Info */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="bg-slate-50 px-4 py-3 rounded">
              <h3 className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-2">Group Stage</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-slate-500">Matches</div>
                  <div className="text-lg font-medium text-slate-900">6</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Advance</div>
                  <div className="text-lg font-medium text-blue-600">Top 2</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">3rd Place</div>
                  <div className="text-lg font-medium text-slate-600">Maybe</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Button */}
          {onFilterByGroup && (
            <div className="mt-6">
              <button
                onClick={() => onFilterByGroup(groupId)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium tracking-wide transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                View Group {groupId} Matches
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GroupModal
