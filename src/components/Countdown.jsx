import { useState, useEffect } from 'react'

const Countdown = () => {
  const [timeToFirstMatch, setTimeToFirstMatch] = useState(null)
  const [timeToDraw, setTimeToDraw] = useState(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const firstMatch = new Date('2026-06-11T00:00:00')
      // FIFA Draw on December 5th, 2025 at 12:00 PM Eastern Time (17:00 UTC)
      const drawDate = new Date('2025-12-05T17:00:00Z')
      
      const diffFirstMatch = firstMatch - now
      const diffDraw = drawDate - now

      if (diffFirstMatch > 0) {
        const days = Math.floor(diffFirstMatch / (1000 * 60 * 60 * 24))
        setTimeToFirstMatch(days)
      } else {
        setTimeToFirstMatch(0)
      }

      if (diffDraw > 0) {
        const days = Math.floor(diffDraw / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diffDraw % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diffDraw % (1000 * 60 * 60)) / (1000 * 60))
        setTimeToDraw({ days, hours, minutes })
      } else {
        setTimeToDraw(null) // Draw has passed
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000 * 60) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (timeToFirstMatch === null) return null

  return (
    <div className="flex items-center gap-3">
      {timeToDraw !== null && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/50">
          <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="text-amber-200 text-xs lg:hidden">Draw:</span>
          <span className="text-amber-300 font-medium text-sm">
            {timeToDraw.days}d {timeToDraw.hours}h {timeToDraw.minutes}m
          </span>
          <span className="text-amber-200 text-xs hidden lg:inline">to draw</span>
        </div>
      )}
      
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 backdrop-blur-sm rounded-full border border-rose-500/50">
        <svg className="w-3.5 h-3.5 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span className="text-rose-200 text-xs lg:hidden">Kickoff:</span>
        <span className="text-rose-300 font-medium text-sm">{timeToFirstMatch}d</span>
        <span className="text-rose-200 text-xs hidden lg:inline">days to kickoff</span>
      </div>
    </div>
  )
}

export default Countdown
