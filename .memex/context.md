# FIFA World Cup 2026 Match Calendar Viewer

## Project Overview
Interactive web application displaying the complete 2026 FIFA World Cup match schedule (104 matches across 16 venues in USA, Mexico, and Canada). Features include favorites, countdown timers, calendar exports, sharing, directions, stadium capacity indicators, knockout bracket visualization, and filters.

## Tech Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS v3 (NOT v4 - important!)
- **Data**: Static match schedule with venue information (official FIFA schedule)
- **APIs**: Pexels API for city/venue images

## Design System

### UI Philosophy: Compact & Elegant
- **Goal**: Maximize match visibility - calendar should feel like a calendar, not a landing page
- **Approach**: Compact header (~80px), elegant thin date separators, immediate match visibility
- **Aesthetic**: Editorial/magazine-like, elegant, sophisticated

### Color Palette
- **Primary**: slate-900, slate-800 for headers/dark sections
- **Accent**: amber-400, amber-500, amber-600 for highlights, badges, and accents
- **Favorites**: rose-500, rose-600 for favorite hearts and filter
- **Background**: slate-50 for page background
- **Gradients**: Used for depth (from-slate-900 via-slate-800 to-slate-900)

### Typography
- Light font weights (font-light), generous tracking
- Year "2026" highlighted in amber-400 in main title
- Elegant thin date headers (not sticky, not heavy)

### Components
- **Cards**: Clean borders, subtle shadows, minimal design with favorite heart button in top-right
- **Badges**: Frosted glass style (backdrop-blur, border, rounded-full)
- **Date Headers**: Thin inline style with vertical accent bar and fade line

## Data Conventions

### Match Numbering Format
- **ALWAYS use "M" prefix**: "M73", "M89", etc. (NOT "Match 73")
- **Applies to**:
  - Match labels in cards
  - Match descriptions (e.g., "Winner M74 vs Winner M77")
  - All references throughout the app
- **Reason**: Space efficiency in compact UI

### Venue Data Structure
```javascript
{
  id: 'mex',
  name: 'Estadio Azteca',
  city: 'Mexico City',
  country: 'Mexico',
  capacity: 87523  // Required field
}
```

### Match Data Structure
```javascript
{
  id: 89,
  matchNumber: 89,
  date: '2026-07-04',
  time: 'TBD',
  venue: 'phi',
  stage: stages.R16,
  description: 'Winner M74 vs Winner M77'  // Use "M" not "Match"
}
```

## Features

### Stadium Capacity (NEW)
- **Location**: Match modal, in "Getting There" section
- **Display**: Shows formatted capacity (e.g., "87,523")
- **Badge**: Large stadiums (80k+) get amber "Large" badge with star icon
- **Grid**: Part of 4-column grid (Transit, Parking, Airport, Capacity)

### Knockout Bracket Visualization (NEW)
- **Location**: After all calendar matches (at end of page)
- **Design Approach**: Spacing-based grouping (NOT connecting lines)
  - Lines were tried but caused alignment issues and visual clutter
  - Spacing creates clear visual hierarchy without complexity
- **Layout**:
  - Pairs of matches that feed same next-round match grouped tightly (0.5rem gap)
  - Different groups separated by larger gap (2rem between pairs in R32)
  - Each subsequent round's matches vertically centered with their "parent" pair
- **Vertical Alignment**: Uses specific rem offsets to center each match with midpoint of its parent matches
  - R32: 0.5rem within pairs, 2rem between pairs
  - R16: 2.25rem initial offset, 11.5rem gaps
  - QF: 8rem initial offset, 23.5rem gaps
  - SF: 19.75rem initial offset, 48rem gaps
  - Final: 43.75rem offset
- **Match Cards**: 
  - Max width 180px
  - Compact padding (2.5)
  - Small text (9px-11px)
  - Show "MX" format for match numbers
- **Responsive**:
  - Desktop: Horizontal flow across columns
  - Mobile: Stacked by round with grid layout
- **Styling**: Clean, minimal, uses same design system as rest of app

### Bracket Implementation Notes
- **Don't use SVG connecting lines**: Too complex to align properly, causes visual clutter
- **Use spacing for visual grouping**: Much cleaner and more maintainable
- **Alignment is tricky**: Requires precise rem calculations based on card height + gaps
- **Test alignment**: First match (M89) should center on gap between M73 and M74
- **Browser caching**: May need hard refresh (Ctrl+Shift+R) to see changes

## Header Design (Current - Left/Right Compact Layout)

### Structure
- **Layout**: Left/right split (not centered)
- **Left side**: 
  - Title: "FIFA World Cup 2026" (2026 in amber-400)
  - Subtitle: "USA • Mexico • Canada"
- **Right side**: 
  - Countdown timers (top) - shows days to Draw and Kickoff
  - Stats badges (bottom): Matches, Venues, Teams
- **Height**: ~80px total (compact)
- **Background**: Gradient with subtle blur orbs
- **Border**: Thin gradient line at bottom

### Countdown Timers
- **Component**: `src/components/Countdown.jsx`
- **Two counters**:
  1. Days to FIFA Draw (December 5, 2025) - amber/yellow styling
  2. Days to Kickoff (June 11, 2026) - rose/pink styling
- **Updates**: Every hour via setInterval
- **Behavior**: Draw counter disappears after Dec 5, 2025

## Development Environment

### Modal Sandbox Configuration
- **Dev server**: Runs on port 3000
- **Server config**: Must bind to 0.0.0.0 (not localhost)
- **Vite config**: Includes `allowedHosts: ['.modal.host']` for tunnel support
- **Tunnel access**: Use `open_localhost` tool with port 3000

### Important: Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: ['.modal.host']
  }
})
```

## Common Issues & Solutions

### Development Issues
1. **Bracket alignment**: Use spacing-based grouping, not lines
2. **Data format**: Always use "M" prefix for match references
3. **Browser cache**: Hard refresh needed after data changes (Ctrl+Shift+R or Cmd+Shift+R)
4. **Tunnel issues**: Restart with `open_localhost` if "service unavailable"
5. **HMR not updating**: Check terminal for errors, may need server restart

### Code Patterns
1. **Updating match data**: Edit descriptions in `worldCupData.js`, use find/replace for "Match " → "M"
2. **Adding venue info**: Update venue objects with required fields (id, name, city, country, capacity)
3. **Bracket spacing**: Start with reasonable gaps, then fine-tune alignment with rem offsets
4. **Modal features**: Add to MatchModal.jsx, maintain 4-column grid in "Getting There" section

## Completed Features
✅ All 16 city images working (Pexels)
✅ Google Maps directions to all stadiums
✅ Calendar export (Google Calendar + .ics) with all-day events
✅ Share with URL deep linking
✅ Compact header with left/right layout
✅ Countdown timers to FIFA Draw (Dec 5, 2025) and first match (June 11, 2026)
✅ Frosted glass badges for stats
✅ Upward-opening dropdowns for all buttons
✅ Match modal with city photos and transit info
✅ Filters and search (5 filters on same line)
✅ Responsive design
✅ "Built with Memex" branding (badge + calendar exports with UTM tracking)
✅ TBD times for all matches
✅ Favorites feature with localStorage persistence
✅ Correct official FIFA schedule (all 104 matches with accurate dates/venues)
✅ **Stadium capacity indicators** with large stadium badges (80k+)
✅ **Knockout bracket visualization** with spacing-based grouping

## File Structure
```
src/
├── components/
│   ├── MatchCard.jsx         # Has favorite heart button
│   ├── MatchModal.jsx         # Shows capacity in 4-column grid
│   ├── FilterBar.jsx          # 5-column layout with Favorites filter
│   ├── Countdown.jsx          # Countdown timers component
│   └── KnockoutBracket.jsx    # NEW: Bracket visualization with spacing-based grouping
├── data/
│   └── worldCupData.js        # Includes capacity, uses "M" prefix in descriptions
└── App.jsx                    # Main app, bracket appears after all matches
```

## Next Features to Consider
- Export to Apple Calendar / Outlook (in addition to Google Calendar)
- Print-friendly wall chart view
- Time zone converter
- Custom notifications/reminders