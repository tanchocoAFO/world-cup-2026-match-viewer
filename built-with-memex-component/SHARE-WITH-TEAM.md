# Built with Memex Component - Team Distribution

## What This Is

A reusable React component that displays a "Built with Memex" badge. Perfect for showcasing that your app was built using Memex.

## Package Contents

```
built-with-memex-component/
├── BuiltWithMemex.jsx    # The React component
├── memex-logo.svg        # Memex logo (required asset)
├── README.md             # Full documentation
├── EXAMPLES.md           # 8 usage examples
├── QUICK-START.md        # 5-minute setup guide
└── SHARE-WITH-TEAM.md    # This file
```

## Quick Start (30 seconds)

1. Copy `BuiltWithMemex.jsx` to `src/components/`
2. Copy `memex-logo.svg` to `public/`
3. Import and use:

```jsx
import BuiltWithMemex from './components/BuiltWithMemex';

function App() {
  return (
    <div>
      {/* Your app */}
      
      <div className="fixed bottom-4 right-4 z-50">
        <BuiltWithMemex />
      </div>
    </div>
  );
}
```

## Features

✅ Three sizes: `small`, `default`, `large`  
✅ Two variants: `floating` (with shadow), `inline` (simple)  
✅ Fully responsive  
✅ Tailwind CSS styled  
✅ Hover animations  
✅ Includes Memex logo  
✅ UTM tracking built-in  

## Requirements

- React project
- Tailwind CSS configured
- That's it!

## Examples

**Floating button (most common):**
```jsx
<div className="fixed bottom-4 right-4 z-50">
  <BuiltWithMemex />
</div>
```

**Footer badge:**
```jsx
<footer>
  <BuiltWithMemex variant="inline" />
</footer>
```

**Small size:**
```jsx
<BuiltWithMemex size="small" />
```

## Where to Use It

- ✅ Bottom-right corner (floating)
- ✅ Footer
- ✅ Header/nav bar
- ✅ Sidebar
- ✅ About page
- ✅ Settings page

## Documentation

- **QUICK-START.md** - Get running in 5 minutes
- **README.md** - Complete documentation with all props and options
- **EXAMPLES.md** - 8 real-world usage examples

## Live Example

See it in action: [World Cup 2026 Match Viewer](https://world-cup-2026-match-viewer.vercel.app)

## Support

Questions? Issues?
- Check the README.md for troubleshooting
- Visit [memex.tech](https://memex.tech)
- Ask in the team channel

---

**Note for Engineers:** This component is framework-agnostic (just React + Tailwind). It works with Next.js, Vite, Create React App, or any React setup. No external dependencies beyond React and Tailwind.
