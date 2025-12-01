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
- Toggle via `lg:block` and `lg:hidden` classes

## Social Media & SEO

### Meta Tags (index.html)
- Title: "FIFA World Cup 2026 Match Calendar"
- Description: "Complete match schedule for FIFA World Cup 2026. Track all 104 matches across USA, Canada & Mexico."
- Open Graph tags for Facebook/LinkedIn
- Twitter Card tags with `summary_large_image`
- Social preview image: 1200x630px recommended

### Favicon
- Soccer ball emoji (⚽) as SVG favicon
- Path: `/public/favicon.svg`

### Memex Branding
- "Built with Memex" button with logo
- UTM tracking: `utm_source=built_with_memex`
- Component available in `/built-with-memex-component/` for reuse

## Analytics

### Vercel Analytics
- Package: `@vercel/analytics`
- Import: `import { Analytics } from '@vercel/analytics/react'`
- Usage: Add `<Analytics />` component at end of App.jsx
- Auto-tracks page views when deployed to Vercel

## Group Stage Match Structure

### Position/Pot System
Groups have position assignments (e.g., GA: 1, 3, 2, 4 means Position 1=Pot 1, Position 2=Pot 3, etc.)

**IMPORTANT:** Match numbering within matchdays does NOT follow a consistent pattern. Don't assume higher-numbered matches always have Pot 1 teams.

### Known Host Teams
- Group A: Mexico (Pot 1)
- Group B: Canada (Pot 1)
- Group D: USA (Pot 1)

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
