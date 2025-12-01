import { useState, useMemo, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { matches, venues, stages, getVenue, getUniqueDates } from './data/worldCupData'
import MatchCard from './components/MatchCard'
import MatchModal from './components/MatchModal'
import FilterBar from './components/FilterBar'
import Countdown from './components/Countdown'
import KnockoutBracket from './components/KnockoutBracket'
import GroupsView from './components/GroupsView'

function App() {
  const [selectedStage, setSelectedStage] = useState('all')
  const [selectedVenue, setSelectedVenue] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [isViewingBracket, setIsViewingBracket] = useState(false)
  const [showGroups, setShowGroups] = useState(false)
  
  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('worldcup2026-favorites')
    return saved ? JSON.parse(saved) : []
  })

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('worldcup2026-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Toggle favorite status for a match
  const toggleFavorite = (matchId) => {
    setFavorites(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    )
  }

  // Check URL for match parameter and auto-open modal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const matchId = params.get('match')
    
    if (matchId) {
      const match = matches.find(m => m.id === parseInt(matchId))
      if (match) {
        setSelectedMatch(match)
      }
    }
  }, [])

  // Detect if user is viewing the bracket section
  useEffect(() => {
    const handleScroll = () => {
      const bracketElement = document.getElementById('knockout-bracket')
      if (bracketElement) {
        const rect = bracketElement.getBoundingClientRect()
        const windowHeight = window.innerHeight
        // Consider viewing bracket if it's in the viewport
        setIsViewingBracket(rect.top < windowHeight && rect.bottom > 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get unique stages for filtering
  const uniqueStages = useMemo(() => {
    return ['all', ...Object.values(stages)]
  }, [])

  // Get unique venues for filtering
  const uniqueVenues = useMemo(() => {
    return ['all', ...venues]
  }, [])

  // Get unique dates for filtering
  const uniqueDates = useMemo(() => {
    return ['all', ...getUniqueDates()]
  }, [])

  // Filter matches based on selected filters
  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const stageMatch = selectedStage === 'all' || match.stage === selectedStage
      const venueMatch = selectedVenue === 'all' || match.venue === selectedVenue
      const dateMatch = selectedDate === 'all' || match.date === selectedDate
      const searchMatch = searchQuery === '' || 
        match.matchNumber.toString().includes(searchQuery) ||
        (match.group && match.group.toLowerCase().includes(searchQuery.toLowerCase())) ||
        getVenue(match.venue).city.toLowerCase().includes(searchQuery.toLowerCase())
      const favoritesMatch = !showFavoritesOnly || favorites.includes(match.id)
      
      return stageMatch && venueMatch && dateMatch && searchMatch && favoritesMatch
    })
  }, [selectedStage, selectedVenue, selectedDate, searchQuery, showFavoritesOnly, favorites])

  // Group matches by date
  const matchesByDate = useMemo(() => {
    const grouped = {}
    filteredMatches.forEach(match => {
      if (!grouped[match.date]) {
        grouped[match.date] = []
      }
      grouped[match.date].push(match)
    })
    return grouped
  }, [filteredMatches])

  // Separate group stage from knockout stage
  const { groupStageByDate, knockoutStageByDate } = useMemo(() => {
    const groupStage = {}
    const knockoutStage = {}
    
    Object.keys(matchesByDate).forEach(date => {
      const dayMatches = matchesByDate[date]
      const groupMatches = dayMatches.filter(m => m.stage === stages.GROUP)
      const knockoutMatches = dayMatches.filter(m => m.stage !== stages.GROUP)
      
      if (groupMatches.length > 0) {
        groupStage[date] = groupMatches
      }
      if (knockoutMatches.length > 0) {
        knockoutStage[date] = knockoutMatches
      }
    })
    
    return { groupStageByDate: groupStage, knockoutStageByDate: knockoutStage }
  }, [matchesByDate])

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Header - Left/Right Layout */}
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Subtle background orbs */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-5 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left: Title & Subtitle */}
            <div>
              <h1 className="text-2xl md:text-4xl font-light tracking-tight mb-1">
                FIFA World Cup <span className="text-amber-400 font-normal">2026</span>
              </h1>
              <p className="text-slate-300 text-xs md:text-sm tracking-wider uppercase">USA • Mexico • Canada</p>
            </div>
            
            {/* Right: Countdowns & Stats */}
            <div className="flex flex-col md:items-end gap-2">
              {/* Countdown Timers */}
              <Countdown />
              
              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-medium">{filteredMatches.length}</span>
                  <span>Matches</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-medium">16</span>
                  <span>Venues</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-amber-400 font-medium">48</span>
                  <span>Teams</span>
                </div>
              </div>
              
              {/* Groups Toggle Button */}
              <button
                onClick={() => setShowGroups(!showGroups)}
                className={`mt-2 md:mt-0 inline-flex items-center gap-2 px-4 py-2 transition-all duration-200 text-sm font-light tracking-wide border-b-2 ${
                  showGroups 
                    ? 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600' 
                    : 'bg-white/10 text-white border-amber-400 hover:bg-white/20'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {showGroups ? 'Hide' : 'Show'} Groups
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      </header>

      {/* Compact Filters */}
      <FilterBar
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        selectedVenue={selectedVenue}
        setSelectedVenue={setSelectedVenue}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        uniqueStages={uniqueStages}
        uniqueVenues={uniqueVenues}
        uniqueDates={uniqueDates}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        favoritesCount={favorites.length}
      />

      {/* Groups View - Collapsible */}
      {showGroups && (
        <div className="animate-fadeIn">
          <GroupsView 
            onGroupClick={(groupId) => {
              // TODO: Implement group modal or filter by group
              console.log('Group clicked:', groupId)
            }} 
          />
        </div>
      )}

      {/* Matches by Date */}
      <main className="container mx-auto px-4 py-8">
        {Object.keys(matchesByDate).length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚽</div>
            <h3 className="text-2xl font-light text-slate-700 mb-2">No matches found</h3>
            <p className="text-slate-500">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            {/* All Matches (Group Stage + Knockout Stage) */}
            {Object.keys(matchesByDate).sort().map(date => (
              <div key={date} id={`date-${date}`} className="mb-12">
                {/* Elegant thin date header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
                    <div>
                      <h2 className="text-xl font-light text-slate-900 tracking-wide">
                        {formatDate(date)}
                      </h2>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {matchesByDate[date].length} {matchesByDate[date].length === 1 ? 'match' : 'matches'}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchesByDate[date].map(match => (
                    <MatchCard 
                      key={match.id} 
                      match={match}
                      onClick={() => setSelectedMatch(match)}
                      isFavorite={favorites.includes(match.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </main>

      {/* Knockout Bracket - Show at the END after all matches, hidden on mobile */}
      {Object.keys(knockoutStageByDate).length > 0 && (
        <div id="knockout-bracket" className="hidden lg:block">
          <KnockoutBracket onMatchClick={setSelectedMatch} />
        </div>
      )}

      {/* Match Modal */}
      {selectedMatch && (
        <MatchModal 
          match={selectedMatch}
          onClose={() => {
            setSelectedMatch(null)
            // Clean up URL parameter when modal closes
            const url = new URL(window.location)
            url.searchParams.delete('match')
            window.history.replaceState({}, '', url)
          }}
          onMatchSelect={setSelectedMatch}
        />
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Jump to Bracket/Calendar Button - Hidden on mobile since bracket is hidden */}
        {Object.keys(knockoutStageByDate).length > 0 && (
          <button
            onClick={() => {
              if (isViewingBracket) {
                // Scroll to top when viewing bracket
                window.scrollTo({ 
                  top: 0,
                  behavior: 'smooth'
                })
              } else {
                // Scroll to bracket when not viewing it with offset for header visibility
                const bracketElement = document.getElementById('knockout-bracket')
                if (bracketElement) {
                  const elementPosition = bracketElement.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - 100 // 100px offset for header visibility
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }
            }}
            className="hidden lg:flex group px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isViewingBracket ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
              <span className="text-sm font-medium tracking-wide">
                {isViewingBracket ? 'Jump to Calendar' : 'Jump to Bracket'}
              </span>
            </div>
          </button>
        )}

        {/* Built with Memex Badge */}
        <a
          href="https://memex.tech?utm_source=built_with_memex"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2">
              <img 
                src="/memex-logo.svg" 
                alt="Memex" 
                className="w-5 h-5"
              />
              <span className="text-sm font-light text-slate-700 tracking-wide">
                Built with <span className="font-medium text-slate-900">Memex</span>
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-24 border-t-4 border-amber-500">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-300 font-light tracking-wide">
            FIFA World Cup 2026™ Match Calendar
          </p>
          <p className="text-sm text-slate-500 mt-3 font-light">
            Note: Team draws have not been conducted yet. Match numbers are used as placeholders.
          </p>
        </div>
      </footer>
      <Analytics />
    </div>
  )
}

export default App
