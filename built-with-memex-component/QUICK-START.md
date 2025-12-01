# Quick Start Guide

## 5-Minute Setup

### Step 1: Copy Files (30 seconds)

Copy these files to your project:
```
BuiltWithMemex.jsx  →  src/components/BuiltWithMemex.jsx
memex-logo.svg      →  public/memex-logo.svg
```

### Step 2: Import Component (10 seconds)

In your main App component:
```jsx
import BuiltWithMemex from './components/BuiltWithMemex';
```

### Step 3: Add to Your App (30 seconds)

Add this to your JSX (usually at the bottom of your main component):
```jsx
<div className="fixed bottom-4 right-4 z-50">
  <BuiltWithMemex />
</div>
```

### Complete Example

```jsx
import BuiltWithMemex from './components/BuiltWithMemex';

function App() {
  return (
    <div>
      {/* Your existing app code */}
      <h1>My Awesome App</h1>
      
      {/* Add the badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <BuiltWithMemex />
      </div>
    </div>
  );
}

export default App;
```

## That's It!

You should now see the "Built with Memex" badge in the bottom-right corner of your app.

## Need Help?

- Check `README.md` for full documentation
- Check `EXAMPLES.md` for more usage examples
- Visit [memex.tech](https://memex.tech) for support

## Common Issues

**Badge not showing up?**
- Make sure `memex-logo.svg` is in the `public/` folder
- Check that Tailwind CSS is installed and configured
- Verify the component import path is correct

**Logo not loading?**
- The logo path in the component is `/memex-logo.svg` (from public folder)
- If your logo is elsewhere, update the path in `BuiltWithMemex.jsx`

**Styling issues?**
- Ensure Tailwind CSS is properly set up
- Check that your `tailwind.config.js` includes the component path in `content`
