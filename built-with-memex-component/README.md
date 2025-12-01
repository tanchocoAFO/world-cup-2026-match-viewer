# Built with Memex Component

A reusable React component to showcase that your app was built with Memex.

## What's Included

- `BuiltWithMemex.jsx` - The React component
- `memex-logo.svg` - The Memex logo (required)
- `README.md` - This file

## Installation

### 1. Copy Files to Your Project

Copy both files into your project:
```
your-project/
├── src/
│   └── components/
│       └── BuiltWithMemex.jsx
└── public/
    └── memex-logo.svg
```

### 2. Ensure Tailwind CSS is Configured

This component uses Tailwind CSS. Make sure Tailwind is set up in your project. If not, install it:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Usage

### Basic Usage

```jsx
import BuiltWithMemex from './components/BuiltWithMemex';

function App() {
  return (
    <div>
      {/* Your app content */}
      
      <BuiltWithMemex />
    </div>
  );
}
```

### Size Options

The component supports three sizes:

```jsx
<BuiltWithMemex size="small" />   {/* Compact version */}
<BuiltWithMemex size="default" /> {/* Default size */}
<BuiltWithMemex size="large" />   {/* Larger version */}
```

### Variant Options

Two variants are available:

```jsx
{/* Floating style with shadow and backdrop blur (default) */}
<BuiltWithMemex variant="floating" />

{/* Inline style with simple border */}
<BuiltWithMemex variant="inline" />
```

### Custom Styling

Add additional Tailwind classes:

```jsx
<BuiltWithMemex className="mt-8" />
```

## Common Placements

### Fixed Position (Floating Button)

```jsx
<div className="fixed bottom-4 right-4 z-50">
  <BuiltWithMemex />
</div>
```

### Footer

```jsx
<footer className="py-8 text-center">
  <BuiltWithMemex variant="inline" className="mx-auto" />
</footer>
```

### Alongside Other Buttons

```jsx
<div className="flex items-center gap-4">
  <button>Other Button</button>
  <BuiltWithMemex size="small" variant="inline" />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small'` \| `'default'` \| `'large'` | `'default'` | Size of the badge |
| `variant` | `'floating'` \| `'inline'` | `'floating'` | Style variant |
| `className` | `string` | `''` | Additional Tailwind classes |

## Examples from World Cup 2026 App

The component is used in a fixed position in the World Cup 2026 Match Viewer:

```jsx
<div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
  {/* Jump to bracket button */}
  <button>...</button>
  
  {/* Built with Memex badge */}
  <BuiltWithMemex />
</div>
```

## Customization

### Using Your Own Logo Path

If you place the logo in a different location, update the `src` in `BuiltWithMemex.jsx`:

```jsx
<img 
  src="/your/custom/path/memex-logo.svg" 
  alt="Memex" 
  className={logoSizes[size]}
/>
```

### Changing Colors

Modify the Tailwind classes in the component:

```jsx
// Change from slate to another color
<span className="text-sm font-light text-blue-700 tracking-wide">
  Built with <span className="font-medium text-blue-900">Memex</span>
</span>
```

## Support

For questions or issues:
- Visit [memex.tech](https://memex.tech)
- Join our community

## License

Free to use in any project built with Memex.
