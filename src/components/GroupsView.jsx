import { groups } from '../data/worldCupData'

const GroupsView = ({ onGroupClick }) => {
  // Get groups in alphabetical order
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
            Draw: December 5, 2025 • Most teams TBD
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {groupsList.map((group) => (
            <div
              key={group.id}
              className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => onGroupClick && onGroupClick(group.id)}
            >
              {/* Group Header */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-3 py-2 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-light text-white tracking-wide">Group {group.id}</h3>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs text-white/70 font-medium">{group.teams.length}</span>
                  </div>
                </div>
              </div>
              
              {/* Teams List */}
              <div className="p-3 space-y-1.5">
                {group.teams.map((team, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 py-1.5 px-2 transition-colors ${
                      team.name === 'TBD' 
                        ? 'text-slate-400' 
                        : 'bg-blue-50/50 group-hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-lg leading-none">{team.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-medium truncate ${
                        team.name === 'TBD' ? 'text-slate-400' : 'text-slate-700'
                      }`}>
                        {team.name}
                      </div>
                      <div className="text-[10px] text-slate-400">Pot {team.pot}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400 tracking-wide">Click any group to view matches and standings</p>
        </div>
      </div>
    </div>
  )
}

export default GroupsView
