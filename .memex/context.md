# World Cup 2026 Match Viewer - Project Rules

## Project Overview

React + Vite application for viewing FIFA World Cup 2026 match schedule, including group stage and knockout bracket visualization. Deployed on Vercel with Tailwind CSS styling.

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (with custom configuration)
- **Deployment:** Vercel
- **Analytics:** @vercel/analytics/react
- **Version Control:** Git/GitHub (repo: world-cup-2026-match-viewer)

## Critical: Knockout Bracket Structure

### Official FIFA Bracket Flow (Dec 2024)

**DO NOT MODIFY** the bracket structure without verifying against FIFA updates. Current structure:

**Semi-Finals:**
- M101: Winner M97 vs Winner M98
- M102: Winner M99 vs Winner M100

**Quarter-Finals (ordered for visual alignment):**
- M97 (M89 + M90) → feeds M101
- M98 (M93 + M94) → feeds M101
- M99 (M91 + M92) → feeds M102
- M100 (M95 + M96) → feeds M102

**Round of 16 (reordered):**
- M89, M90, M93, M94, M91, M92, M95, M96

**Round of 32 (reordered in pairs):**
- M74+M77 → M89
- M73+M75 → M90
- M83+M84 → M93
- M81+M82 → M94
- M76+M78 → M91
- M79+M80 → M92
- M86+M88 → M95
- M85+M87 → M96

### Bracket Spacing Math

Critical spacing calculations for visual alignment:
- Match height: 80px
- R32 pair gap: 12px (gap-3)
- Between pairs gap: 24px (gap-6)
- R32 pair total: 172px, spacing: 196px, center: 86px
- R16 margin top: 46px, gap: 116px
- QF margin top: 144px, gap: 312px
- SF margin top: 340px, gap: 704px
- Final margin top: 702px

**Reference:** See `.memex/context.md` for detailed spacing calculations.

## Groups Feature

### Groups Data Structure

Groups stored in `src/data/worldCupData.js` with export:
```javascript
export const groups = {
  A: {
    id: 'A',
    teams: [
      { name: 'Mexico', pot: 1, flag: '🇲🇽', position: 1 },
      { name: 'TBD', pot: 3, flag: '⚽', position: 2 },
      { name: 'TBD', pot: 2, flag: '⚽', position: 3 },
      { name: 'TBD', pot: 4, flag: '⚽', position: 4 }
    ]
  },
  // ... groups B-L
}
```

**Important:**
- Position order follows FIFA draw allocation (NOT pot order)
- Example: Group A is Pot 1, 3, 2, 4 (in that position order)
- Host nations pre-assigned: Mexico (Group A), Canada (Group B), USA (Group D)
- All other teams are "TBD" until December 5, 2025 draw
- After draw, update team names and flags - features will automatically work

### GroupsView Component

Collapsible groups display (`src/components/GroupsView.jsx`):
- Toggle via "Show Groups" button in FilterBar (dark blue when not selected)
- Grid layout: 2 cols mobile, 3 small, 4 medium, 6 large screens
- Each group card is clickable → opens GroupModal
- Clean, compact design matching app aesthetic
- No team count badges

### GroupModal Component

Detailed group view (`src/components/GroupModal.jsx`):
- Opens on top of other modals (z-index 60)
- Shows group letter, all 4 teams with positions
- Team info: flag, name, pot number
- Group stage info: 6 matches, top 2 advance, 3rd place maybe
- **"Matches" button per team** (except TBD) - filters to that team's matches
- **"View Group X Matches" button** at bottom - filters to all group matches
- Can be opened from:
  - GroupsView (clicking group card)
  - MatchModal (clicking group badges in match details)
  - MatchModal (clicking group letters in R32 descriptions)

### Group References in Match Modals

**Group Stage Matches:**
- Blue "Group X" badge appears next to stage name
- Clickable → opens GroupModal

**Round of 32 Matches:**
- Descriptions cleaned up: "1st place" not "winners", "2nd place" not "runners-up"
- Third place: "Best 3rd of Groups X/Y/Z"
- All group letters in descriptions are clickable blue buttons → open GroupModal
- Example: "Group A 1st place vs Group B 2nd place" - both A and B are clickable

### Filtering System

**Filter Bar Layout (7 columns):**
1. Search
2. Stage
3. **Group** (dropdown: All Groups, A-L)
4. Venue
5. Date
6. Favorites
7. Show Groups toggle

**Filter Logic:**
- Group filter: Shows only matches from selected group
- Team filter: Shows only matches mentioning team name in description
- Filters interact intelligently:
  - Selecting group filter resets team filter
  - Selecting team filter resets group filter
- All filters saved in state, work with existing filter system

**Filter Behaviors:**
- Clicking "View Group X Matches" → sets group filter, collapses groups view, closes modals
- Clicking team "Matches" button → sets team filter, collapses groups view, closes modals
- Reset filters button clears all including group and team filters

## Asset Management

### Public Assets (Runtime)
All assets needed at runtime must be in `/public/` folder:
- `/public/memex-logo.svg` - Memex logo for button
- `/public/social-preview.png` - Social media share image
- `/public/favicon.svg` - Soccer ball emoji favicon

### Development Assets
Source images in `/data/` folder are NOT accessible at runtime:
- Used for development/reference only
- Must be copied to `/public/` if needed in production

## Responsive Design Patterns

### Mobile Countdown Labels
- Mobile: "Draw:" and "Kickoff:" prefix labels
- Desktop: "to draw" and "days to kickoff" suffix labels
- Use Tailwind responsive classes: `lg:hidden` and `hidden lg:inline`

### Bracket Display
- Desktop: Visual bracket layout with horizontal progression
- Mobile: Stacked by round (R32, R16, QF, SF, Final)
- Use `hidden lg:block` for desktop bracket, separate mobile view

### Filter Bar
- Mobile: Collapsible with toggle button
- Desktop: Always visible, 7-column grid
- Indicators for active filters

## Component Interaction Patterns

### Modal Stacking
- MatchModal: z-50
- GroupModal: z-60 (can open on top of MatchModal)
- Modals use bg-black with opacity for overlay
- Click outside to close, X button in corner

### State Management
- Local state for UI interactions (modals, filters)
- localStorage for favorites persistence
- URL parameters for match sharing (`?match=123`)
- Filter state lifted to App.jsx for cross-component access

### Prop Drilling Pattern
Key callbacks passed through components:
- `onGroupClick` - Opens GroupModal (deprecated, now using direct state)
- `onFilterByGroup` - Sets group filter
- `onFilterByTeam` - Sets team filter  
- `onMatchSelect` - Opens MatchModal
- `onClose` - Closes modals

## Match Data Structure

### Group Stage Matches
```javascript
{
  id: 1,
  matchNumber: 1,
  date: '2026-06-11',
  time: 'TBD',
  venue: 'mex',
  stage: stages.GROUP,
  group: 'A',
  description: 'Mexico vs TBD (Opening Match)'
}
```

### Round of 32 Matches
```javascript
{
  id: 73,
  matchNumber: 73,
  date: '2026-06-28',
  venue: 'la',
  stage: stages.R32,
  description: 'Group A 2nd place vs Group B 2nd place'
}
```

**Description Format Rules:**
- Use "1st place" not "winners"
- Use "2nd place" not "runners-up"
- Use "Best 3rd of Groups X/Y/Z" not "third place"
- Group letters must be capital for clickable parsing

## Known Host Teams

Pre-assigned (Pot 1):
- Mexico → Group A
- Canada → Group B
- USA → Group D

## Development Server Configuration

### Vite Config (vite.config.js)
Required for external access (Vercel preview, tunnels):
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',        // Bind to all interfaces
    port: 3000,
    strictPort: false,
    allowedHosts: ['.app.memex.run']  // Allow tunnel hostnames
  }
})
```

### Starting Server
Use varying ports (3000-3005) to avoid conflicts:
```bash
npm run dev -- --host 0.0.0.0 --port 3001
```

## Git Workflow

### Commit Messages
Use HEREDOC format for multi-line commits:
```bash
git commit -m "$(cat <<'EOF'
Title of commit

- Bullet point 1
- Bullet point 2
EOF
)"
```

### Safety
- Commit early and often
- Never use interactive git commands (-i flag)
- Don't push unless explicitly requested

## Deployment

### Vercel
- Auto-deploys from main branch
- Build command: `npm run build`
- Output directory: `dist`
- Environment: Node.js

### Post-Deployment Checklist
- Verify social preview image loads
- Check favicon appears in browser tab
- Confirm analytics tracking (wait 30 seconds for data)
- Test bracket alignment on desktop and mobile

## Reusable Components

### Built with Memex Component
Package location: `/built-with-memex-component/`

Files:
- `BuiltWithMemex.jsx` - React component
- `memex-logo.svg` - Required logo asset
- `README.md` - Full documentation
- `EXAMPLES.md` - Usage examples
- `QUICK-START.md` - 5-minute setup guide

Requirements:
- React
- Tailwind CSS
- Logo in `/public/memex-logo.svg`

## Important Dates

- FIFA Draw: December 5, 2025 at 12:00 PM ET (17:00 UTC)
- First Match: June 11, 2026
- Final: July 19, 2026 at MetLife Stadium

## Common Issues & Solutions

### Images Not Loading
- Check asset is in `/public/` not `/data/`
- Verify path starts with `/` (e.g., `/memex-logo.svg`)
- Restart dev server if asset was just added

### Bracket Alignment Issues
- Don't modify spacing calculations without testing all rounds
- Verify match reordering matches FIFA structure
- Check both desktop and mobile layouts

### Analytics Not Working
- Ensure `@vercel/analytics` is installed
- Verify `<Analytics />` is added to App.jsx
- Analytics only work on Vercel deployment, not localhost

### Dev Server Not Accessible
- Confirm `host: '0.0.0.0'` in vite.config.js
- Check `allowedHosts` includes domain pattern
- Try different port (3000-3005 range)

### Group Filter Not Working After Draw
- Verify team names in `groups` object match exactly with match descriptions
- Team filter checks for substring match in `match.description`
- Update both groups data and match descriptions consistently