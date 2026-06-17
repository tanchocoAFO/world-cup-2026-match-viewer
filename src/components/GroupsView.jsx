import { groups, getGroupStandings } from '../data/worldCupData'

const GROUP_COLORS = {
  A: 'border-rose-400',    B: 'border-orange-400',  C: 'border-amber-400',
  D: 'border-lime-400',    E: 'border-emerald-400',  F: 'border-teal-400',
  G: 'border-cyan-400',    H: 'border-sky-400',      I: 'border-blue-400',
  J: 'border-violet-400',  K: 'border-purple-400',   L: 'border-pink-400',
}

const GroupsView = ({ onGroupClick }) => {
  const groupsList = Object.values(groups).sort((a, b) => a.id.localeCompare(b.id))

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-light text-slate-900 tracking-wide">Tournament Groups</h2>
          </div>
          <p className="text-xs text-slate-500 ml-4 tracking-wide uppercase">
            Draw: December 5, 2025 • All 48 teams confirmed
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {groupsList.map((group) => {
            const standings = getGroupStandings(group.id)
            const hasResults = standings.some(s => s.gp > 0)

            return (
              <div
                key={group.id}
                className={`bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer group border-t-4 ${GROUP_COLORS[group.id]}`}
                onClick={() => onGroupClick && onGroupClick(group.id)}
              >
                {/* Group Header */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-3 py-2 border-b border-slate-700">
                  <h3 className="text-lg font-light text-white tracking-wide">Group {group.id}</h3>
                </div>

                {hasResults ? (
                  /* Standings table */
                  <div className="divide-y divide-slate-100">
                    {/* Header row */}
                    <div className="flex items-center px-2 py-1 bg-slate-50">
                      <span className="flex-1 text-[9px] uppercase tracking-wider text-slate-400 font-medium">Team</span>
                      <div className="flex gap-2 text-[9px] uppercase tracking-wider text-slate-400 font-medium text-right">
                        <span className="w-4">Pts</span>
                        <span className="w-4">GD</span>
                      </div>
                    </div>
                    {standings.map((row, idx) => {
                      const gd = row.gf - row.ga
                      return (
                        <div
                          key={row.team.name}
                          className={`flex items-center gap-1.5 px-2 py-1.5 transition-colors group-hover:bg-blue-50/40 ${
                            idx < 2 ? 'bg-emerald-50/60' : ''
                          }`}
                        >
                          <span className="text-[10px] text-slate-400 w-3 shrink-0">{idx + 1}</span>
                          <span className="text-sm leading-none shrink-0">{row.team.flag}</span>
                          <span className="flex-1 text-[10px] font-medium text-slate-700 truncate">{row.team.name}</span>
                          <div className="flex gap-2 text-[10px] font-semibold text-right shrink-0">
                            <span className="w-4 text-slate-900">{row.pts}</span>
                            <span className={`w-4 ${gd > 0 ? 'text-emerald-600' : gd < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                              {gd > 0 ? `+${gd}` : gd}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  /* Pre-tournament: just list teams */
                  <div className="p-3 space-y-1.5">
                    {group.teams.map((team, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 py-1.5 px-2 bg-blue-50/50 group-hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-lg leading-none">{team.flag}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate text-slate-700">{team.name}</div>
                          <div className="text-[10px] text-slate-400">Pot {team.pot}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-50 border border-emerald-200"></div>
            <span>Advance to R32</span>
          </div>
          <span>Click any group to view matches</span>
        </div>
      </div>
    </div>
  )
}

export default GroupsView
