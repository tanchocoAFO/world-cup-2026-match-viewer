# World Cup 2026 Match Viewer - Development Context

## Bracket Alignment Fix (December 2024)

### Problem
The knockout bracket was displaying matches in the wrong order and with incorrect spacing. Matches were not visually aligned to show which matches from previous rounds fed into subsequent rounds.

### Root Causes
1. **Incorrect Match Ordering**: Round of 32 matches were displayed by match number (73, 74, 75, 76...) instead of by bracket position (which pairs feed into each R16 match)
2. **Wrong Spacing Calculations**: The gap between matches in each round was calculated incorrectly

### Solution

#### 1. Match Reordering
Reordered R32 matches based on bracket flow:
```javascript
// Instead of sequential (73, 74, 75, 76...)
// Organized by which pairs feed R16 matches:
const r32Matches = [
  findR32Match(74), findR32Match(77), // Feed M89
  findR32Match(73), findR32Match(75), // Feed M90
  findR32Match(76), findR32Match(78), // Feed M91
  findR32Match(79), findR32Match(80), // Feed M92
  findR32Match(83), findR32Match(84), // Feed M93
  findR32Match(81), findR32Match(82), // Feed M94
  findR32Match(86), findR32Match(88), // Feed M95
  findR32Match(85), findR32Match(87), // Feed M96
]
```

Also reordered Quarter-Finals to match bracket flow:
```javascript
const qfMatches = [
  findQFMatch(97),  // M89 + M90
  findQFMatch(99),  // M91 + M92
  findQFMatch(98),  // M93 + M94
  findQFMatch(100), // M95 + M96
]
```

#### 2. Spacing Calculations
Fixed spacing with proper mathematical calculations:

**Constants:**
- Match height: 80px
- Gap within R32 pair: 12px (gap-3)
- Gap between R32 pairs: 24px (gap-6)

**R32 Layout:**
- Each pair total height: 80 + 12 + 80 = 172px
- Spacing between pair starts: 172 + 24 = 196px
- Pair center: 86px from pair start (80 + 12/2)

**R16 Layout:**
- Should center on each R32 pair
- MarginTop: 86 - 40 = 46px (to center R16 match on R32 pair)
- Gap between R16 matches: 196 - 80 = **116px** (NOT 196px!)

**QF Layout:**
- Should center on each R16 pair
- R16 pair centers are 392px apart (196 × 2)
- MarginTop: 144px
- Gap between QF matches: 392 - 80 = **312px**

**SF Layout:**
- Should center on each QF pair
- QF pair centers are 784px apart (392 × 2)
- MarginTop: 340px
- Gap between SF matches: 784 - 80 = **704px**

**Final:**
- Should center between two SF matches
- MarginTop: 702px (final is 140px tall)

### Key Insight
The gap between matches is NOT the same as the spacing between match starts. For proper alignment:
- **Gap between matches = spacing between parent pair centers - match height**
- Example: R16 matches need 196px spacing (to align with R32 pair centers), but the CSS gap is only 116px because each match is 80px tall.

### Files Modified
- `src/components/KnockoutBracket.jsx`: Match reordering and spacing calculations
