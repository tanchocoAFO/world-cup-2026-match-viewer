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
  favoritesCount
}) => {
  const resetFilters = () => {
    setSelectedStage('all')
    setSelectedVenue('all')
    setSelectedDate('all')
    setSearchQuery('')
    setShowFavoritesOnly(false)
  }

  const hasActiveFilters = selectedStage !== 'all' || selectedVenue !== 'all' || selectedDate !== 'all' || searchQuery !== '' || showFavoritesOnly

  return (
    <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <label className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wider">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Match #, Group, City..."
              className="w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-sm"
            />
          </div>

          {/* Stage Filter */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wider">
              Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white transition-all text-sm"
            >
              {uniqueStages.map(stage => (
                <option key={stage} value={stage}>
                  {stage === 'all' ? 'All Stages' : stage}
                </option>
              ))}
            </select>
          </div>

          {/* Venue Filter */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wider">
              Venue
            </label>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white transition-all text-sm"
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
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wider">
              Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white transition-all text-sm"
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
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wider">
              Favorites
            </label>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`w-full inline-flex items-center justify-center px-3 py-2.5 transition-all duration-200 text-sm font-light tracking-wide border ${
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
  )
}

export default FilterBar
