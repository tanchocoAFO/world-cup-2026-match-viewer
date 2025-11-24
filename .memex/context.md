# World Cup 2026 Match Viewer - Project Rules

## Project Overview
A React + Vite application for viewing FIFA World Cup 2026 schedule, with interactive calendar, knockout bracket visualization, and match details with navigation between related matches.

**Deployed on:** Vercel (automatic deployments from GitHub main branch)
**GitHub:** https://github.com/tanchocoAFO/world-cup-2026-match-viewer

## Architecture & Tech Stack
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS following Apple design guidelines
- **State:** React hooks (useState, useMemo, useEffect)
- **Data:** Static JSON in `src/data/worldCupData.js`
- **Deployment:** Vercel (auto-deploy on push to main)

## Key Features

### 1. Match Navigation System
Users can explore bracket structure by clicking through match relationships in modals:
- **Feeder Matches:** Shows which matches feed into current match (backward navigation)
- **Next Match:** Shows which match the winner advances to (forward navigation)
- **Implementation:** `getFeederMatches()` and `getNextMatch()` in worldCupData.js
- **Important:** Only knockout matches show forward navigation (group stage returns null)

### 2. Mobile-First Responsive Design

**Mobile Breakpoint:** `lg` (1024px) is the primary breakpoint for desktop features

**Mobile Optimizations:**
- **Header:** Vertical layout on mobile, horizontal on desktop
- **Filters:** Collapsible by default on mobile with toggle button
  - Labels inline with inputs on mobile (flexbox with gap-3)
  - Labels above inputs on desktop (block layout)
- **Bracket:** Hidden on mobile (`hidden lg:block`)
  - Users navigate via modal navigation instead
- **Jump to Bracket button:** Hidden on mobile (`hidden lg:flex`)
- **Modal headers:** Stack vertically on mobile, horizontal on desktop

**Pattern for responsive components:**
```jsx
// Collapsible on mobile, always visible on desktop
<div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>

// Inline labels on mobile, stacked on desktop
<div className="flex items-center gap-3 lg:block">
  <label className="whitespace-nowrap lg:block lg:mb-2">Label</label>
  <input className="flex-1 lg:w-full" />
</div>
```

### 3. Knockout Bracket Alignment
The bracket uses precise pixel calculations for match alignment:
- Each match height: 80px
- R32 pairs: 172px total (80 + 12 gap + 80)
- Gap between matches calculated as: `parent_pair_spacing - match_height`
- See `.memex/context.md` for detailed spacing math

### 4. Match Data Structure

**Match relationships are encoded in descriptions:**
- `"Winner M74 vs Winner M77"` - feeds from matches 74 and 77
- `"Loser M101 vs Loser M102"` - third place match
- Regex pattern `M(\d+)` used to extract match numbers

**Navigation logic:**
- `getFeederMatches()` - extracts all M{number} from description
- `getNextMatch()` - finds matches referencing current match
  - Prioritizes "Winner" matches over "Loser" matches for semi-finals
  - Returns null for group stage matches

### 5. Modal Patterns

**Team Display:**
- Show `match.description` if exists
- Fallback to "TBD vs TBD" if no description
- Group stage and knockout matches handled differently

**Mobile Modal Fixes:**
- Reduced padding: `p-4 md:p-6`
- Responsive text: `text-2xl md:text-3xl`
- Added `break-words` to prevent overflow
- Stack layout on mobile: `flex-col md:flex-row`

## Development Workflow

### Git Conventions
- **Commit messages:** Use heredoc for multi-line messages
- **Never use:** Interactive git commands (`git rebase -i`, `git add -i`)
- **Commit early and often**
- **DO NOT push to remote** unless explicitly requested

**Commit message format:**
```bash
git commit -m "$(cat <<'EOF'
Title summarizing the change

Section 1: Feature/Area
- Bullet point details
- More details

Section 2: Another Area
- More changes

Bug Fixes:
- Specific fixes
EOF
)"
```

### Deployment Process
1. Make changes locally with Memex
2. Commit with descriptive message
3. Push to GitHub main branch: `git push`
4. Vercel automatically deploys (1-2 minutes)
5. Changes live at custom domain

**No manual Vercel deployment needed** - it watches GitHub

## Design System

### Colors
- **Primary Action:** Amber (amber-500, amber-600)
- **Stages:**
  - Final: amber-50/500/900
  - Semi-Finals: rose-50/500/900
  - Quarter-Finals: indigo-50/500/900
  - R16/R32: emerald-50/500/900
  - Group: slate-50/400/900

### Interactive Elements
- **Buttons:** Hover states with scale transforms (`hover:scale-105`)
- **Cards:** Border transitions on hover (`hover:border-amber-400`)
- **Collapsibles:** Rotate chevron icon on expand (`rotate-180`)

### Typography
- **Headers:** font-light for large text (text-3xl, text-4xl)
- **Labels:** text-xs uppercase tracking-wider
- **Body:** text-sm for descriptions

## Important Patterns

### Filtering Logic
All filters use "all" as the default/reset value:
- `selectedStage === 'all'` means no filter applied
- Reset function sets all filters back to 'all'

### Favorites
- Stored in localStorage: `'worldcup2026-favorites'`
- Array of match IDs
- Persisted across sessions

### Active Filters Detection
```javascript
const hasActiveFilters = 
  selectedStage !== 'all' || 
  selectedVenue !== 'all' || 
  selectedDate !== 'all' || 
  searchQuery !== '' || 
  showFavoritesOnly
```

### Scroll Detection for Bracket
Uses intersection logic to detect when bracket is in viewport:
- Check if bracket element's `rect.top < windowHeight && rect.bottom > 0`
- Updates button text: "Jump to Bracket" ↔ "Jump to Calendar"

## Common Pitfalls & Solutions

### Issue: Port conflicts in development
**Solution:** Vite config uses `strictPort: false` to auto-increment port

### Issue: Tunnel hostname blocked
**Solution:** `allowedHosts: ['.app.memex.run']` in vite.config.js

### Issue: Dependencies in useEffect
**Solution:** Don't reference variables defined later in code. Use empty array `[]` if listener only needs to run once

### Issue: Group stage showing forward navigation
**Solution:** Check `match.stage === stages.GROUP` and return null in `getNextMatch()`

## File Structure
```
src/
├── components/
│   ├── Countdown.jsx
│   ├── FilterBar.jsx          # Collapsible on mobile
│   ├── KnockoutBracket.jsx    # Hidden on mobile
│   ├── MatchCard.jsx
│   └── MatchModal.jsx         # Match navigation UI
├── data/
│   └── worldCupData.js        # Match data + navigation functions
├── App.jsx                     # Main app, filters, layout
└── main.jsx
```

## Testing Checklist
- [ ] Modal navigation works both directions (feeder + next)
- [ ] Group stage matches don't show forward navigation
- [ ] Semi-finals show Final (not Third Place) as next match
- [ ] Filters collapse on mobile, always visible on desktop
- [ ] Bracket hidden on mobile, visible on desktop
- [ ] "TBD vs TBD" shows for matches without specific teams
- [ ] Mobile modal headers don't bunch/overflow
- [ ] Jump to Bracket button hidden on mobile