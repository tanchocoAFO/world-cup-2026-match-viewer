import { groups } from '../data/worldCupData'

const GroupModal = ({ groupId, onClose }) => {
  if (!groupId) return null
  
  const group = groups[groupId]
  if (!group) return null

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

        {/* Teams List */}
        <div className="p-6">
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
                    <div className={`text-base font-medium ${
                      team.name === 'TBD' ? 'text-slate-400' : 'text-slate-900'
                    }`}>
                      {team.name}
                    </div>
                    <div className="text-xs text-slate-500">Pot {team.pot}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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

          {/* Draw Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              Teams assigned after draw on <span className="font-medium">December 5, 2025</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupModal
