import { groups } from '../data/worldCupData'

const GroupsView = ({ onGroupClick }) => {
  // Get groups in alphabetical order
  const groupsList = Object.values(groups).sort((a, b) => a.id.localeCompare(b.id))

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Tournament Groups</h2>
          <p className="text-sm text-slate-600 mt-1">
            Draw scheduled for December 5, 2025 • Most teams TBD
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {groupsList.map((group) => (
            <div
              key={group.id}
              className="bg-white border-2 border-slate-200 hover:border-amber-400 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              onClick={() => onGroupClick && onGroupClick(group.id)}
            >
              {/* Group Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 border-b-2 border-amber-500">
                <h3 className="text-xl font-bold text-white">Group {group.id}</h3>
              </div>
              
              {/* Teams List */}
              <div className="p-4 space-y-2">
                {group.teams.map((team, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-2 px-3 ${
                      team.name === 'TBD' 
                        ? 'bg-slate-50 text-slate-400' 
                        : 'bg-gradient-to-r from-amber-50 to-white border border-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{team.flag}</span>
                      <span className={`font-medium ${
                        team.name === 'TBD' ? 'text-slate-400' : 'text-slate-900'
                      }`}>
                        {team.name}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">Pot {team.pot}</span>
                  </div>
                ))}
              </div>
              
              {/* Group Stats Placeholder */}
              <div className="px-4 pb-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="text-slate-400">
                    <div className="font-medium">MP</div>
                    <div>-</div>
                  </div>
                  <div className="text-slate-400">
                    <div className="font-medium">W</div>
                    <div>-</div>
                  </div>
                  <div className="text-slate-400">
                    <div className="font-medium">Pts</div>
                    <div>-</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Info Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Click on a group to view its matches and details</p>
        </div>
      </div>
    </div>
  )
}

export default GroupsView
