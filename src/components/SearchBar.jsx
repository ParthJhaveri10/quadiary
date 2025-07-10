import { useState, useEffect, useRef, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';

const themeColors = {
  anime: {
    ring: "ring-violet-500/50",
    text: "text-violet-400",
    border: "border-violet-500/30"
  },
  movie: {
    ring: "ring-orange-500/50",
    text: "text-orange-400",
    border: "border-orange-500/30"
  },
  tv: {
    ring: "ring-blue-500/50",
    text: "text-blue-400",
    border: "border-blue-500/30"
  },
  book: {
    ring: "ring-emerald-500/50",
    text: "text-emerald-400",
    border: "border-emerald-500/30"
  },
  default: {
    ring: "ring-violet-500/50",
    text: "text-violet-400",
    border: "border-violet-500/30"
  }
};

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search...', 
  initialQuery = '',
  mediaType = 'default',
  enableRealTimeSearch = true,
  debounceDelay = 500
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);
  
  // Get theme colors
  const getTheme = () => {
    return themeColors[mediaType] || themeColors.default;
  };
  
  const theme = getTheme();

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      if (searchQuery.trim() && enableRealTimeSearch) {
        onSearch(searchQuery.trim(), mediaType);
      } else if (!searchQuery.trim() && enableRealTimeSearch) {
        // Clear results when search is empty
        onSearch('', mediaType);
      }
    }, debounceDelay);
  }, [onSearch, mediaType, enableRealTimeSearch, debounceDelay]);

  // Handle input change with debounced search
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (enableRealTimeSearch) {
      debouncedSearch(newQuery);
    }
  };
  
  // Handle search submission (for manual search or Enter key)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Cancel debounce timer and search immediately
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      onSearch(query.trim(), mediaType);
    }
  };

  // Handle clear button
  const handleClear = () => {
    setQuery('');
    if (enableRealTimeSearch) {
      onSearch('', mediaType);
    }
  };

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  // Add keyboard shortcut for focusing search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex items-center transition-all duration-300 ${
        isFocused ? `ring-2 ${theme.ring}` : ''
      }`}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className={`w-5 h-5 ${isFocused ? theme.text : 'text-slate-400'}`} />
        </div>
        <input
          ref={inputRef}
          type="search"
          className={`block w-full p-2.5 pl-10 text-sm bg-white/10 backdrop-blur-sm border ${isFocused ? theme.border : 'border-white/20'} 
                   rounded-xl focus:outline-none text-white placeholder-slate-400 transition-all duration-300`}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search"
        />
        {query && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
            onClick={handleClear}
          >
            <XMarkIcon className="w-5 h-5" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
      <div className="ml-2 text-xs text-slate-400 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20">
        <kbd className="px-1">
          {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+K
        </kbd>
      </div>
    </form>
  );
};

export default SearchBar;