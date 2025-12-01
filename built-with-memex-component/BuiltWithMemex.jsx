/**
 * Built with Memex Badge Component
 * 
 * A reusable badge/button component to showcase that your app was built with Memex.
 * Includes the Memex logo and hover effects.
 */

const BuiltWithMemex = ({ 
  className = '',
  size = 'default', // 'small', 'default', 'large'
  variant = 'floating' // 'floating', 'inline'
}) => {
  const sizeClasses = {
    small: 'px-3 py-1.5',
    default: 'px-4 py-2',
    large: 'px-5 py-3'
  };

  const logoSizes = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const textSizes = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base'
  };

  const variantClasses = variant === 'floating'
    ? 'bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
    : 'bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all duration-200';

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
          <span className={`${textSizes[size]} font-light text-slate-700 tracking-wide`}>
            Built with <span className="font-medium text-slate-900">Memex</span>
          </span>
        </div>
      </div>
    </a>
  );
};

export default BuiltWithMemex;
