# Built with Memex - Usage Examples

## Example 1: Fixed Bottom-Right (Most Common)

```jsx
import BuiltWithMemex from './components/BuiltWithMemex';

function App() {
  return (
    <div>
      {/* Your app content */}
      
      {/* Fixed position badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <BuiltWithMemex />
      </div>
    </div>
  );
}
```

## Example 2: Footer Integration

```jsx
function App() {
  return (
    <div>
      {/* Your app content */}
      
      <footer className="bg-slate-900 text-white py-12 mt-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-300 mb-4">
            © 2024 Your App Name
          </p>
          <BuiltWithMemex variant="inline" className="mx-auto" />
        </div>
      </footer>
    </div>
  );
}
```

## Example 3: Multiple Sizes Side by Side

```jsx
function ComponentShowcase() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">Small:</span>
        <BuiltWithMemex size="small" variant="inline" />
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">Default:</span>
        <BuiltWithMemex size="default" variant="inline" />
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">Large:</span>
        <BuiltWithMemex size="large" variant="inline" />
      </div>
    </div>
  );
}
```

## Example 4: Responsive Visibility

```jsx
function App() {
  return (
    <div>
      {/* Your app content */}
      
      {/* Hide on mobile, show on desktop */}
      <div className="hidden lg:block fixed bottom-4 right-4 z-50">
        <BuiltWithMemex />
      </div>
      
      {/* Show smaller version on mobile in footer */}
      <footer className="lg:hidden p-4 text-center">
        <BuiltWithMemex size="small" variant="inline" />
      </footer>
    </div>
  );
}
```

## Example 5: With Other Action Buttons

```jsx
function App() {
  return (
    <div>
      {/* Your app content */}
      
      {/* Stacked floating buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
          Feedback
        </button>
        
        <button className="px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
          Share
        </button>
        
        <BuiltWithMemex />
      </div>
    </div>
  );
}
```

## Example 6: Header Integration

```jsx
function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold">Your App</h1>
      </div>
      
      <nav className="flex items-center gap-6">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <BuiltWithMemex size="small" variant="inline" />
      </nav>
    </header>
  );
}
```

## Example 7: Dark Mode Support

```jsx
// Add to BuiltWithMemex.jsx for dark mode support
const BuiltWithMemex = ({ 
  className = '',
  size = 'default',
  variant = 'floating',
  darkMode = false 
}) => {
  // ... existing size configs ...
  
  const variantClasses = variant === 'floating'
    ? darkMode 
      ? 'bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
      : 'bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
    : darkMode
      ? 'bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition-all duration-200'
      : 'bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all duration-200';

  const textColor = darkMode ? 'text-slate-300' : 'text-slate-700';
  const textColorBold = darkMode ? 'text-white' : 'text-slate-900';

  return (
    <a
      href="https://memex.tech?utm_source=built_with_memex"
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-block ${className}`}
    >
      <div className={`${sizeClasses[size]} ${variantClasses}`}>
        <div className="flex items-center gap-2">
          <img 
            src="/memex-logo.svg" 
            alt="Memex" 
            className={logoSizes[size]}
          />
          <span className={`${textSizes[size]} font-light ${textColor} tracking-wide`}>
            Built with <span className={`font-medium ${textColorBold}`}>Memex</span>
          </span>
        </div>
      </div>
    </a>
  );
};

// Usage:
<BuiltWithMemex darkMode={true} />
```

## Example 8: Conditional Display Based on Route

```jsx
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const showBadge = location.pathname !== '/checkout'; // Don't show on checkout

  return (
    <div>
      {/* Your app content */}
      
      {showBadge && (
        <div className="fixed bottom-4 right-4 z-50">
          <BuiltWithMemex />
        </div>
      )}
    </div>
  );
}
```

## Tips

1. **Use `variant="floating"` for fixed positions** - The shadow and backdrop blur work great for floating buttons
2. **Use `variant="inline"` for footers/headers** - Cleaner look when part of a layout
3. **Consider mobile responsiveness** - Use smaller sizes or hide on mobile if space is limited
4. **Z-index matters** - Make sure the badge appears above other content with appropriate z-index
5. **UTM tracking** - The link includes `utm_source=built_with_memex` for analytics
