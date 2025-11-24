import { getVenue, getFeederMatches, getNextMatch } from '../data/worldCupData'
import { useState } from 'react'

const MatchModal = ({ match, onClose, onMatchSelect }) => {
  const [shareMessage, setShareMessage] = useState('')
  const [showCalendarOptions, setShowCalendarOptions] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [showGettingThere, setShowGettingThere] = useState(false)
  
  if (!match) return null
  
  const venue = getVenue(match.venue)
  const feederMatches = getFeederMatches(match)
  const nextMatch = getNextMatch(match)

  // Get stage styling
  const getStageStyle = (stage) => {
    if (stage.includes('Final')) return { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-900' }
    if (stage.includes('Semi')) return { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-900' }
    if (stage.includes('Quarter')) return { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-900' }
    if (stage.includes('16') || stage.includes('32')) return { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-900' }
    return { bg: 'bg-slate-50', border: 'border-slate-400', text: 'text-slate-900' }
  }

  const getFlag = (country) => {
    const flags = { 'USA': '🇺🇸', 'Mexico': '🇲🇽', 'Canada': '🇨🇦' }
    return flags[country] || '⚽'
  }

  const formatCapacity = (capacity) => {
    return capacity.toLocaleString()
  }

  const isLargeStadium = (capacity) => {
    return capacity >= 80000
  }

  // Real city skyline photos from Pexels and Unsplash
  const getStadiumImage = (venueId) => {
    const images = {
      'atl': { url: 'https://images.pexels.com/photos/2815167/pexels-photo-2815167.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'center' },  // Atlanta skyline
      'bos': { url: 'https://images.pexels.com/photos/30740350/pexels-photo-30740350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'center' },  // Boston Paramount Theatre
      'dal': { url: 'https://images.pexels.com/photos/2061222/pexels-photo-2061222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'center' },  // Dallas at night
      'hou': { url: 'https://images.pexels.com/photos/18462185/pexels-photo-18462185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'center' },  // Houston downtown at night
      'kc': { url: 'https://images.pexels.com/photos/349506/pexels-photo-349506.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'bottom' },  // Kansas City
      'la': { url: 'https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'center' },  // LA skyline golden hour
      'mia': { url: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=1200&q=80', position: 'center' },  // Miami skyline
      'nyj': { url: 'https://images.unsplash.com/photo-1546436836-07a91091f160?w=1200&q=80', position: 'center' },  // NYC skyline
      'phi': { url: 'https://images.pexels.com/photos/5437555/pexels-photo-5437555.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'center' },  // Philadelphia Liberty Bell
      'sf': { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80', position: 'center' },  // San Francisco
      'sea': { url: 'https://images.pexels.com/photos/32869498/pexels-photo-32869498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'center' },  // Seattle Space Needle
      'gdl': { url: 'https://images.pexels.com/photos/10040010/pexels-photo-10040010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'center' },  // Guadalajara Cathedral
      'mex': { url: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1200&q=80', position: 'center' },  // Mexico City skyline
      'mty': { url: 'https://images.pexels.com/photos/13144052/pexels-photo-13144052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', position: 'top' },  // Monterrey stadium
      'tor': { url: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80', position: 'center' },  // Toronto skyline
      'van': { url: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=1200&q=80', position: 'center' },  // Vancouver skyline
    }
    return images[venueId] || { url: 'https://images.unsplash.com/photo-1546436836-07a91091f160?w=1200&q=80', position: 'center' }
  }

  // Getting there info
  const getTransitInfo = (venueId) => {
    const transitInfo = {
      'atl': { metro: 'MARTA Blue/Green Line', parking: 'On-site parking available', airport: '15 min from ATL' },
      'bos': { metro: 'Commuter Rail - Foxboro', parking: 'Stadium lots', airport: '45 min from BOS' },
      'dal': { metro: 'DART Orange Line', parking: 'Multiple lots', airport: '20 min from DFW' },
      'hou': { metro: 'METRORail Purple Line', parking: 'Stadium parking', airport: '25 min from IAH' },
      'kc': { metro: 'Limited transit', parking: 'Ample parking', airport: '30 min from MCI' },
      'la': { metro: 'Metro K Line', parking: 'On-site & off-site', airport: '20 min from LAX' },
      'mia': { metro: 'Limited transit', parking: 'Stadium parking', airport: '25 min from MIA' },
      'nyj': { metro: 'NJ Transit to Secaucus', parking: 'Multiple lots', airport: '30 min from EWR' },
      'phi': { metro: 'SEPTA Broad Street Line', parking: 'Stadium complex', airport: '20 min from PHL' },
      'sf': { metro: 'Caltrain to Santa Clara', parking: 'Stadium lots', airport: '20 min from SJC' },
      'sea': { metro: 'Link Light Rail', parking: 'Limited parking', airport: '15 min from SEA' },
      'gdl': { metro: 'Limited transit', parking: 'Available nearby', airport: '30 min from GDL' },
      'mex': { metro: 'Metro Line 2', parking: 'Limited parking', airport: '45 min from MEX' },
      'mty': { metro: 'Limited transit', parking: 'Stadium parking', airport: '25 min from MTY' },
      'tor': { metro: 'TTC Streetcar 511', parking: 'Limited parking', airport: '30 min from YYZ' },
      'van': { metro: 'SkyTrain to Stadium', parking: 'Limited parking', airport: '25 min from YVR' },
    }
    return transitInfo[venueId] || { metro: 'Check local transit', parking: 'Check venue', airport: 'Check directions' }
  }

  // Google Maps directions from city center to stadium
  const getDirectionsUrl = (venueId) => {
    const directions = {
      'atl': { origin: 'Peachtree Center, Atlanta, GA', destination: 'Mercedes-Benz Stadium, Atlanta, GA' },
      'bos': { origin: 'Boston Common, Boston, MA', destination: 'Gillette Stadium, Foxborough, MA' },
      'dal': { origin: 'Downtown Dallas, TX', destination: 'AT&T Stadium, Arlington, TX' },
      'hou': { origin: 'Downtown Houston, TX', destination: 'NRG Stadium, Houston, TX' },
      'kc': { origin: 'Country Club Plaza, Kansas City, MO', destination: 'Arrowhead Stadium, Kansas City, MO' },
      'la': { origin: 'Downtown Los Angeles, CA', destination: 'SoFi Stadium, Inglewood, CA' },
      'mia': { origin: 'Downtown Miami, FL', destination: 'Hard Rock Stadium, Miami Gardens, FL' },
      'nyj': { origin: 'Times Square, New York, NY', destination: 'MetLife Stadium, East Rutherford, NJ' },
      'phi': { origin: 'City Hall, Philadelphia, PA', destination: 'Lincoln Financial Field, Philadelphia, PA' },
      'sf': { origin: 'Union Square, San Francisco, CA', destination: 'Levi\'s Stadium, Santa Clara, CA' },
      'sea': { origin: 'Pike Place Market, Seattle, WA', destination: 'Lumen Field, Seattle, WA' },
      'gdl': { origin: 'Centro Histórico, Guadalajara, Jalisco', destination: 'Estadio Akron, Zapopan, Jalisco' },
      'mex': { origin: 'Zócalo, Ciudad de México', destination: 'Estadio Azteca, Ciudad de México' },
      'mty': { origin: 'Macroplaza, Monterrey, Nuevo León', destination: 'Estadio BBVA, Guadalupe, Nuevo León' },
      'tor': { origin: 'CN Tower, Toronto, ON', destination: 'BMO Field, Toronto, ON' },
      'van': { origin: 'Canada Place, Vancouver, BC', destination: 'BC Place, Vancouver, BC' },
    }
    
    const location = directions[venueId]
    if (!location) return '#'
    
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(location.origin)}&destination=${encodeURIComponent(location.destination)}&travelmode=driving`
  }

  const stageStyle = getStageStyle(match.stage)
  const transitInfo = getTransitInfo(match.venue)
  const stadiumImage = getStadiumImage(match.venue)
  
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Add to Calendar - Google Calendar URL
  const getGoogleCalendarUrl = () => {
    // Use all-day event format since time is TBD
    const dateOnly = match.date.replace(/-/g, '')
    const nextDay = new Date(match.date)
    nextDay.setDate(nextDay.getDate() + 1)
    const nextDayFormatted = nextDay.toISOString().split('T')[0].replace(/-/g, '')
    
    const title = `FIFA World Cup 2026 - Match ${match.matchNumber}${match.description ? ': ' + match.description : ''}`
    const details = `${match.stage}${match.group ? ' - Group ' + match.group : ''}\nKickoff Time: TBD\nVenue: ${venue.name}\nCity: ${venue.city}, ${venue.country}\n\nBuilt with Memex`
    const location = `${venue.name}, ${venue.city}, ${venue.country}`
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      details: details,
      location: location,
      dates: `${dateOnly}/${nextDayFormatted}`
    })
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  // Download .ics file (fallback)
  const downloadIcsFile = () => {
    // Use all-day event format since time is TBD
    const dateOnly = match.date.replace(/-/g, '')
    const nextDay = new Date(match.date)
    nextDay.setDate(nextDay.getDate() + 1)
    const nextDayFormatted = nextDay.toISOString().split('T')[0].replace(/-/g, '')
    
    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//FIFA World Cup 2026//Match Calendar//EN',
      'BEGIN:VEVENT',
      `UID:worldcup2026-match-${match.id}@worldcup2026.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART;VALUE=DATE:${dateOnly}`,
      `DTEND;VALUE=DATE:${nextDayFormatted}`,
      `SUMMARY:FIFA World Cup 2026 - Match ${match.matchNumber}${match.description ? ': ' + match.description : ''}`,
      `DESCRIPTION:${match.stage}${match.group ? ' - Group ' + match.group : ''}\\nKickoff Time: TBD\\nVenue: ${venue.name}\\nCity: ${venue.city}, ${venue.country}\\n\\nBuilt with Memex`,
      `LOCATION:${venue.name}, ${venue.city}, ${venue.country}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `worldcup2026-match${match.matchNumber}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Share Match - Copy link to clipboard
  const handleCopyLink = async () => {
    const url = new URL(window.location)
    url.searchParams.set('match', match.id)
    const matchUrl = url.toString()
    
    try {
      await navigator.clipboard.writeText(matchUrl)
      setShareMessage('Link copied to clipboard!')
      setShowShareOptions(false)
      
      // Clear message after 3 seconds
      setTimeout(() => setShareMessage(''), 3000)
    } catch (err) {
      console.error('Copy failed:', err)
      setShareMessage('Failed to copy link')
      setTimeout(() => setShareMessage(''), 3000)
    }
  }

  // Share via native share API (mobile)
  const handleNativeShare = async () => {
    const url = new URL(window.location)
    url.searchParams.set('match', match.id)
    const matchUrl = url.toString()
    const shareText = `FIFA World Cup 2026 - Match ${match.matchNumber}\n${match.stage}${match.group ? ' - Group ' + match.group : ''}\n${formatDate(match.date)} (Time TBD)\n${venue.name}, ${venue.city}`
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `FIFA World Cup 2026 - Match ${match.matchNumber}`,
          text: shareText,
          url: matchUrl
        })
        setShareMessage('Shared successfully!')
        setShowShareOptions(false)
      }
      
      // Clear message after 3 seconds
      setTimeout(() => setShareMessage(''), 3000)
    } catch (err) {
      if (err.name !== 'AbortError') { // User cancelled share
        console.error('Share failed:', err)
        setShareMessage('Failed to share')
        setTimeout(() => setShareMessage(''), 3000)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition-colors z-10"
        >
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Stadium Image */}
        <div className="relative h-48 md:h-64 bg-slate-900">
          <img 
            src={stadiumImage.url}
            alt={venue.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: stadiumImage.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
            <h2 className="text-4xl font-light mb-2">{venue.name}</h2>
            <p className="text-xl text-white/90 flex items-center">
              {getFlag(venue.country)} {venue.city}, {venue.country}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Match Details */}
          <div className={`${stageStyle.bg} border-l-4 ${stageStyle.border} p-6 mb-8`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className={`text-xs uppercase tracking-wider font-medium ${stageStyle.text} mb-2`}>
                  {match.stage}
                  {match.group && ` • Group ${match.group}`}
                </div>
                <div className="text-3xl font-light text-slate-900">Match #{match.matchNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Date & Time</div>
                <div className="text-sm font-medium text-slate-900">{formatDate(match.date)}</div>
                <div className="text-sm text-slate-600">TBD</div>
              </div>
            </div>
            {match.description && (
              <div className="text-slate-700 text-sm leading-relaxed">
                {match.description}
              </div>
            )}
          </div>

          {/* Match Navigation - Feeder Matches */}
          {feederMatches.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                This match features winners from:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {feederMatches.map((feederMatch) => {
                  const feederVenue = getVenue(feederMatch.venue);
                  const feederStageStyle = getStageStyle(feederMatch.stage);
                  
                  return (
                    <button
                      key={feederMatch.id}
                      onClick={() => onMatchSelect && onMatchSelect(feederMatch)}
                      className="text-left p-4 border-2 border-slate-200 hover:border-amber-400 hover:shadow-md transition-all rounded-lg bg-white group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className={`text-xs uppercase tracking-wider font-medium ${feederStageStyle.text} mb-1`}>
                          {feederMatch.stage}
                          {feederMatch.group && ` • Group ${feederMatch.group}`}
                        </div>
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div className="font-medium text-slate-900 mb-2">Match #{feederMatch.matchNumber}</div>
                      <div className="text-sm text-slate-600 mb-2">{feederMatch.description}</div>
                      <div className="text-xs text-slate-500 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(feederMatch.date)} • {feederVenue.city}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Match Navigation - Next Match */}
          {nextMatch && (
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Winner advances to:
              </h3>
              <button
                onClick={() => onMatchSelect && onMatchSelect(nextMatch)}
                className="w-full text-left p-4 border-2 border-slate-200 hover:border-amber-400 hover:shadow-md transition-all rounded-lg bg-white group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`text-xs uppercase tracking-wider font-medium ${getStageStyle(nextMatch.stage).text} mb-1`}>
                    {nextMatch.stage}
                    {nextMatch.group && ` • Group ${nextMatch.group}`}
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="font-medium text-slate-900 mb-2">Match #{nextMatch.matchNumber}</div>
                <div className="text-sm text-slate-600 mb-2">{nextMatch.description}</div>
                <div className="text-xs text-slate-500 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(nextMatch.date)} • {getVenue(nextMatch.venue).city}
                </div>
              </button>
            </div>
          )}

          {/* Getting There - Collapsible */}
          <div className="border-t border-slate-200 pt-6">
            <button
              onClick={() => setShowGettingThere(!showGettingThere)}
              className="w-full flex items-center justify-between text-left mb-6 group"
            >
              <h3 className="text-xl font-light text-slate-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Getting There
              </h3>
              <svg 
                className={`w-5 h-5 text-slate-400 transition-transform ${showGettingThere ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showGettingThere && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Public Transit
                </div>
                <div className="text-sm text-slate-900">{transitInfo.metro}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Parking
                </div>
                <div className="text-sm text-slate-900">{transitInfo.parking}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  From Airport
                </div>
                <div className="text-sm text-slate-900">{transitInfo.airport}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Stadium Capacity
                </div>
                <div className="text-sm text-slate-900 flex items-center gap-2">
                  {formatCapacity(venue.capacity)}
                  {isLargeStadium(venue.capacity) && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-300">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Large
                    </span>
                  )}
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap gap-3">
              <a 
                href={getDirectionsUrl(match.venue)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 transition-colors text-sm font-light tracking-wide border-b-2 border-amber-500"
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </a>
              <div className="relative">
                <button 
                  onClick={() => setShowCalendarOptions(!showCalendarOptions)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-light tracking-wide"
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add to Calendar
                  <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                
                {showCalendarOptions && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white border border-slate-200 shadow-lg rounded z-10 min-w-[200px]">
                    <a
                      href={getGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 hover:bg-slate-50 text-sm text-slate-700 border-b border-slate-100"
                      onClick={() => setShowCalendarOptions(false)}
                    >
                      <svg className="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                      </svg>
                      Google Calendar
                    </a>
                    <button
                      onClick={() => {
                        downloadIcsFile()
                        setShowCalendarOptions(false)
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-slate-50 text-sm text-slate-700"
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download .ics file
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-light tracking-wide"
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share Match
                  <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                
                {showShareOptions && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white border border-slate-200 shadow-lg rounded z-10 min-w-[200px]">
                    <button
                      onClick={handleCopyLink}
                      className="block w-full text-left px-4 py-3 hover:bg-slate-50 text-sm text-slate-700 border-b border-slate-100"
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy Link
                    </button>
                    {navigator.share && (
                      <button
                        onClick={handleNativeShare}
                        className="block w-full text-left px-4 py-3 hover:bg-slate-50 text-sm text-slate-700"
                      >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        Share via...
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Share confirmation message */}
            {shareMessage && (
              <div className="mt-4 px-4 py-2 bg-green-50 border border-green-200 text-green-800 text-sm rounded animate-fadeIn">
                {shareMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchModal
