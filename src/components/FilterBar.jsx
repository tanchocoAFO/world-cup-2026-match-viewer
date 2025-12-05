import { useState } from 'react'

const FilterBar = ({
  selectedStage,
  setSelectedStage,
  selectedVenue,
  setSelectedVenue,
  selectedDate,
  setSelectedDate,
  searchQuery,
  setSearchQuery,
  uniqueStages,
  uniqueVenues,
  uniqueDates,
  showFavoritesOnly,
  setShowFavoritesOnly,
  favoritesCount,
  showGroups,
  setShowGroups,
  selectedGroup,
  setSelectedGroup,
  selectedTeam,
  setSelectedTeam
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const resetFilters = () => {
    setSelectedStage('all')
    setSelectedGroup('all')
    setSelectedTeam('all')
    setSelectedVenue('all')
    setSelectedDate('all')
    setSearchQuery('')
    setShowFavoritesOnly(false)
  }

  const hasActiveFilters = selectedStage !== 'all' || selectedGroup !== 'all' || selectedTeam !== 'all' || selectedVenue !== 'all' || selectedDate !== 'all' || searchQuery !== '' || showFavoritesOnly

  return (
    <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4">
        {/* Mobile: Collapsible Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors rounded"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="font-medium text-slate-700">Filters</span>
            {hasActiveFilters && (
              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                Active
              </span>
            )}
          </div>
          <svg 
            className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Filters Container - Hidden on mobile unless expanded, always visible on desktop */}
        <div className={`${isExpanded ? 'block' : 'hidden'} lg:block mt-4 lg:mt-0`}>
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-3 lg:gap-4">
          {/* Search */}
          <div className="flex items-center gap-3 lg:block">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wider lg:block lg:mb-2 whitespace-nowrap">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Match #, Group, City..."
              className="flex-1 lg:w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-sm"
            />
          </div>

          {/* Stage Filter */}
          <div className="flex items-center gap-3 lg:block">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wider lg:block lg:mb-2 whitespace-nowrap">
              Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="flex-1 lg:w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white transition-all text-sm"
            >
              {uniqueStages.map(stage => (
                <option key={stage} value={stage}>
                  {stage === 'all' ? 'All Stages' : stage}
                </option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div className="flex items-center gap-3 lg:block">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wider lg:block lg:mb-2 whitespace-nowrap">
              Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="flex-1 lg:w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white transition-all text-sm"
            >
              <option value="all">All Groups</option>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(group => (
                <option key={group} value={group}>
                  Group {group}
                </option>
              ))}
            </select>
          </div>

          {/* Team Filter */}
          <div className="flex items-center gap-3 lg:block">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wider lg:block lg:mb-2 whitespace-nowrap">
              Team
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="flex-1 lg:w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white transition-all text-sm"
            >
              <option value="all">All Teams</option>
              <option value="Australia">Australia</option>
              <option value="Canada">Canada</option>
              <option value="Euro. Playoff A">Euro. Playoff A</option>
              <option value="Euro. Playoff C">Euro. Playoff C</option>
              <option value="Euro. Playoff D">Euro. Playoff D</option>
              <option value="Mexico">Mexico</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Qatar">Qatar</option>
              <option value="South Africa">South Africa</option>
              <option value="South Korea">South Korea</option>
              <option value="Switzerland">Switzerland</option>
              <option value="USA">USA</option>
            </select>
          </div>

          {/* Venue Filter */}
          <div className="flex items-center gap-3 lg:block">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wider lg:block lg:mb-2 whitespace-nowrap">
              Venue
            </label>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="flex-1 lg:w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white transition-all text-sm"
            >
              <option value="all">All Venues</option>
              {uniqueVenues.slice(1).map(venue => (
                <option key={venue.id} value={venue.id}>
                  {venue.city}, {venue.country}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-3 lg:block">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wider lg:block lg:mb-2 whitespace-nowrap">
              Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 lg:w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white transition-all text-sm"
            >
              <option value="all">All Dates</option>
              {uniqueDates.slice(1).map(date => (
                <option key={date} value={date}>
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Favorites Toggle */}
          <div className="flex items-center gap-3 lg:block">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wider lg:block lg:mb-2 whitespace-nowrap">
              Favorites
            </label>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex-1 lg:w-full inline-flex items-center justify-center px-3 py-2.5 transition-all duration-200 text-sm font-light tracking-wide border ${
                showFavoritesOnly 
                  ? 'bg-rose-500 text-white border-rose-500 hover:bg-rose-600' 
                  : 'bg-white text-slate-700 border-slate-300 hover:border-rose-400 hover:text-rose-600'
              }`}
            >
              <svg className="w-4 h-4 mr-1.5" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {showFavoritesOnly ? 'Showing' : 'Show'}
              {favoritesCount > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                  showFavoritesOnly ? 'bg-rose-600' : 'bg-slate-200 text-slate-700'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          {/* Groups Toggle */}
          <div className="flex items-center gap-3 lg:block">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wider lg:block lg:mb-2 whitespace-nowrap">
              Groups
            </label>
            <button
              onClick={() => setShowGroups(!showGroups)}
              className={`flex-1 lg:w-full inline-flex items-center justify-center px-3 py-2.5 transition-all duration-200 text-sm font-light tracking-wide border ${
                showGroups 
                  ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                  : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
              }`}
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {showGroups ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <div className="mt-4 text-center">
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-6 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-200 text-sm font-light tracking-wide border-b-2 border-amber-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterBar
