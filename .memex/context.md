# World Cup 2026 Match Viewer - Project Rules

## Project Overview
A React-based web application for viewing the FIFA World Cup 2026 schedule, featuring match cards, filters, favorites, and an interactive knockout bracket.

## Key Technical Implementations

### 1. Knockout Bracket Alignment (Critical Fix)

**Problem Solved:**
The knockout bracket was displaying matches in wrong order with incorrect spacing, making it impossible to follow which matches fed into subsequent rounds.

**Root Causes:**
1. R32 matches were ordered by match number (73, 74, 75...) instead of bracket position
2. Spacing calculations were fundamentally wrong (confusing gap between matches with spacing between match centers)

**Solution:**

#### Match Reordering
Matches must be reordered by bracket flow, not sequential match numbers:

```javascript
// R32: Ordered by which pairs feed R16 matches
const r32Matches = [
  findR32Match(74), findR32Match(77), // Feed M89
  findR32Match(73), findR32Match(75), // Feed M90
  findR32Match(76), findR32Match(78), // Feed M91
  // ... etc
]

// QF: Reordered to match bracket flow
const qfMatches = [
  findQFMatch(97),  // M89 + M90 (top)
  findQFMatch(99),  // M91 + M92
  findQFMatch(98),  // M93 + M94
  findQFMatch(100), // M95 + M96 (bottom)
]
```

#### Spacing Mathematics
**Key Insight:** The CSS gap between matches ≠ spacing between match centers

**Constants:**
- Match height: 80px
- Gap within R32 pair: 12px
- Gap between R32 pairs: 24px
- Each R32 pair height: 80 + 12 + 80 = 172px
- Spacing between pair starts: 172 + 24 = 196px

**Calculations:**
- **R16:** Centers on each R32 pair
  - marginTop: 46px (to center on first R32 pair)
  - gap: 116px (NOT 196px! = 196 - 80)
  
- **QF:** Centers on each R16 pair
  - R16 pair centers are 392px apart (196 × 2)
  - marginTop: 144px
  - gap: 312px (= 392 - 80)

- **SF:** Centers on each QF pair
  - QF pair centers are 784px apart (392 × 2)
  - marginTop: 340px
  - gap: 704px (= 784 - 80)

- **Final:** Centers between two SF matches
  - marginTop: 702px

**Critical Formula:**
```
gap_between_matches = spacing_between_parent_pair_centers - match_height
```

### 2. Host Country Matches

Host countries (Mexico, Canada, USA) have predetermined group stage matches. These must be labeled:

**Format:** `"[Country] vs TBD"`

**Matches:**
- Match 1: Mexico vs TBD (Opening Match)
- Match 3: Canada vs TBD
- Match 4: USA vs TBD
- Match 27: Canada vs TBD
- Match 28: Mexico vs TBD
- Match 32: USA vs TBD
- Match 51: Canada vs TBD
- Match 53: Mexico vs TBD
- Match 59: USA vs TBD

### 3. Match Card Layout

Match cards display team information on the same line as match number to maintain consistent card height:

```jsx
<div className="mb-4 flex items-center justify-between">
  <div className="text-2xl font-light text-slate-900">
    #{match.matchNumber}
  </div>
  <div className="text-slate-600 text-xs font-light">
    {match.description || 'TBD vs TBD'}
  </div>
</div>
```

**Default:** All matches without descriptions show "TBD vs TBD"

### 4. Countdown Timer

Draw countdown shows specific time with precision:
- **Date:** December 5, 2025 at 12:00 PM Eastern Time (17:00 UTC)
- **Format:** Days, hours, minutes (e.g., "5d 12h 30m to draw")
- **Update frequency:** Every minute (not hourly)
- **Implementation:** `new Date('2025-12-05T17:00:00Z')`

### 5. Modal Close Button

The close button must stay positioned relative to the modal, not the page:

```jsx
<div className="relative bg-white max-w-4xl w-full max-h-[90vh] ...">
  <button className="absolute top-4 right-4 ...">
    {/* Close button */}
  </button>
</div>
```

**Key:** Add `relative` to the modal container div.

### 6. Floating Action Buttons

Floating buttons are stacked in bottom-right corner:
```jsx
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
  {/* Jump to Bracket button (conditional) */}
  {/* Built with Memex badge */}
</div>
```

Jump to Bracket button uses smooth scrolling:
```javascript
document.getElementById('knockout-bracket')?.scrollIntoView({ 
  behavior: 'smooth',
  block: 'start'
})
```

### 7. Bracket Legend

Keep legend minimal and relevant:
- "Click any match for details"
- "Teams TBD after group stage draw"

Remove references to connector lines or visual elements not present.

## File Structure

- `src/data/worldCupData.js` - Match data, venues, stages
- `src/components/KnockoutBracket.jsx` - Tournament bracket with precise alignment
- `src/components/MatchCard.jsx` - Individual match display cards
- `src/components/MatchModal.jsx` - Detailed match view modal
- `src/components/Countdown.jsx` - Countdown timers
- `src/components/FilterBar.jsx` - Filter controls
- `src/App.jsx` - Main application component

## Design Principles

- **Apple-inspired design**: Clean, minimal, focused
- **Responsive**: Mobile-first approach with desktop enhancements
- **Performance**: Efficient rendering, memoized calculations
- **Accessibility**: Proper semantic HTML, ARIA labels where needed

## Technical Stack

- React with Vite
- Tailwind CSS for styling
- No external state management (useState, useEffect, useMemo)
- Local storage for favorites persistence

## Development Commands

- `npm run dev` - Start dev server (configured for port 3001)
- Server must bind to `0.0.0.0` for Modal tunnel access
- Configure `allowedHosts: ['.app.memex.run']` in vite.config.js