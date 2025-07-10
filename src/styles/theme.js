// src/styles/theme.js

// Custom color palette configuration
export const colorTheme = {
  // Primary brand colors - using #66FCF1 (cyan) as primary
  primary: {
    50: '#f0fffe',
    100: '#ccfef9',
    200: '#99fdf3',
    300: '#5dfceb',
    400: '#26f7e0',
    500: '#66FCF1', // Main brand color
    600: '#02b3a5',
    700: '#029086',
    800: '#06726c',
    900: '#0a5e5a',
  },
  // Secondary colors - using #45A29E (teal) as secondary
  secondary: {
    50: '#f0fdfc',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5debd7',
    400: '#26d0c3',
    500: '#45A29E', // Secondary brand color
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  // Neutral colors - using #0B0C10, #1F2833, #C5C6C7
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#C5C6C7', // Light neutral
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1F2833', // Medium dark
    900: '#0B0C10', // Primary dark background
  },
  // Media category colors using the custom palette variations
  media: {
    anime: { from: '#66FCF1', to: '#45A29E' }, // cyan to teal
    movie: { from: '#45A29E', to: '#1F2833' }, // teal to dark
    tv: { from: '#66FCF1', to: '#C5C6C7' }, // cyan to light
    book: { from: '#45A29E', to: '#66FCF1' }, // teal to cyan
    search: { from: '#C5C6C7', to: '#66FCF1' }, // light to cyan
  }
};

// Dynamic theme system
export const themeStyles = {
  // Background patterns - using custom palette
  backgrounds: {
    main: "bg-gradient-to-br from-[#0B0C10] via-[#1F2833] to-[#0B0C10]",
    page: "min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#1F2833] to-[#0B0C10]",
    section: "bg-gradient-to-r from-[#66FCF1]/5 to-[#45A29E]/10",
    decorative: {
      blob1: "absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#66FCF1]/20 to-[#45A29E]/20 rounded-full blur-3xl",
      blob2: "absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#45A29E]/20 to-[#66FCF1]/20 rounded-full blur-3xl",
      blob3: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#66FCF1]/10 to-[#45A29E]/10 rounded-full blur-3xl"
    }
  },

  // Glass morphism components
  glass: {
    card: "bg-[#C5C6C7]/10 backdrop-blur-xl border border-[#C5C6C7]/20 rounded-3xl shadow-2xl hover:bg-[#C5C6C7]/[0.12] hover:border-[#C5C6C7]/30 transition-all duration-300",
    panel: "bg-[#C5C6C7]/5 backdrop-blur-xl border border-[#C5C6C7]/10 rounded-2xl",
    nav: "bg-[#C5C6C7]/10 backdrop-blur-xl border border-[#C5C6C7]/20 rounded-xl",
    modal: "bg-[#C5C6C7]/98 backdrop-blur-xl border border-[#0B0C10]/30 rounded-2xl shadow-2xl",
  },

  // Modal-specific text styles (dark text for light modal background)
  modalText: {
    primary: "text-[#0B0C10]",
    secondary: "text-[#1F2833]",
    tertiary: "text-[#1F2833]/80",
  },

  // Text styles
  text: {
    primary: "text-[#C5C6C7]", // Reverted to original light color
    secondary: "text-[#C5C6C7]/80", // Reverted to original
    tertiary: "text-[#C5C6C7]/60", // Reverted to original
    accent: "text-[#66FCF1]",
    error: "text-[#66FCF1]", // Using cyan instead of red
    success: "text-[#45A29E]", // Using teal
    warning: "text-[#66FCF1]", // Using cyan instead of yellow
  },

  // Gradient combinations
  gradients: {
    title: "from-[#C5C6C7] via-[#66FCF1] to-[#45A29E]",
    primary: "from-[#66FCF1] to-[#45A29E]",
    secondary: "from-[#45A29E] to-[#66FCF1]",
    accent: "from-[#66FCF1] to-[#C5C6C7]",
    success: "from-[#45A29E] to-[#66FCF1]",
    warning: "from-[#66FCF1] to-[#45A29E]", // Using palette colors
    error: "from-[#66FCF1] to-[#45A29E]", // Using palette colors
    media: {
      anime: "from-[#66FCF1] to-[#45A29E]",
      movie: "from-[#45A29E] to-[#1F2833]",
      tv: "from-[#66FCF1] to-[#C5C6C7]",
      book: "from-[#45A29E] to-[#66FCF1]",
      search: "from-[#C5C6C7] to-[#66FCF1]",
    }
  },

  // Interactive states
  interactive: {
    hover: "hover:scale-[1.02] transition-all duration-300",
    active: "active:scale-[0.98] transition-all duration-150",
    focus: "focus:ring-2 focus:ring-[#66FCF1]/50 focus:outline-none",
    disabled: "opacity-50 cursor-not-allowed",
  },

  // Buttons
  buttons: {
    primary: "px-6 py-3 bg-gradient-to-r from-[#66FCF1] to-[#45A29E] hover:from-[#66FCF1]/90 hover:to-[#45A29E]/90 text-[#0B0C10] rounded-xl font-semibold shadow-lg shadow-[#66FCF1]/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
    secondary: "px-6 py-3 bg-[#C5C6C7]/10 hover:bg-[#C5C6C7]/15 border border-[#C5C6C7]/20 text-[#C5C6C7] rounded-xl font-semibold transition-all duration-300",
    ghost: "px-4 py-2 text-[#C5C6C7]/80 hover:text-[#C5C6C7] hover:bg-[#C5C6C7]/10 rounded-xl transition-all duration-300",
    danger: "px-6 py-3 bg-gradient-to-r from-[#45A29E] to-[#1F2833] hover:from-[#45A29E]/90 hover:to-[#1F2833]/90 text-[#C5C6C7] rounded-xl font-semibold transition-all duration-300",
  },

  // Form elements
  forms: {
    input: "w-full px-4 py-3 bg-[#C5C6C7]/10 border border-[#C5C6C7]/20 rounded-xl text-[#C5C6C7] placeholder-[#C5C6C7]/60 focus:border-[#66FCF1] focus:ring-2 focus:ring-[#66FCF1]/20 transition-all duration-300",
    label: "block text-[#C5C6C7] text-sm font-semibold mb-2",
    error: "mt-1 text-[#66FCF1] text-sm", // Using cyan instead of red
    success: "mt-1 text-[#45A29E] text-sm", // Using teal
  },

  // Layout
  layout: {
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    section: "py-12 md:py-20",
    grid: {
      cols1: "grid grid-cols-1 gap-6",
      cols2: "grid grid-cols-1 md:grid-cols-2 gap-6",
      cols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      cols4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
      cols6: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4",
    }
  },

  // Shadows and effects
  effects: {
    shadow: {
      sm: "shadow-sm shadow-[#66FCF1]/10",
      md: "shadow-md shadow-[#66FCF1]/20",
      lg: "shadow-lg shadow-[#66FCF1]/25",
      xl: "shadow-xl shadow-[#66FCF1]/30",
    },
    glow: "shadow-2xl shadow-[#66FCF1]/40",
    blur: "backdrop-blur-xl",
    transition: "transition-all duration-300",
  },

  // Media cards
  mediaCard: {
    container: "aspect-[2/3] rounded-xl overflow-hidden relative group cursor-pointer",
    image: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
    overlay: "absolute inset-0 bg-gradient-to-t from-[#0B0C10]/90 via-[#0B0C10]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4",
    title: "text-[#C5C6C7] font-semibold text-base mb-1 drop-shadow-lg", // Increased font weight and size, added drop shadow
    rating: "flex items-center text-sm", // Increased from text-xs to text-sm
    star: "text-[#66FCF1] font-bold drop-shadow-lg", // Added drop shadow
    score: "text-[#C5C6C7] ml-1 font-medium drop-shadow-lg", // Increased opacity and added drop shadow
  }
};

// Legacy theme object for backward compatibility
export const theme = {
  gradient: {
    brand: 'from-[#66FCF1] to-[#45A29E]',
    hover: 'from-[#66FCF1] hover:to-[#45A29E]',
  },
  text: {
    primary: 'text-[#C5C6C7]',
    secondary: 'text-[#C5C6C7]/90', // Increased opacity for better visibility
    accent: 'text-[#66FCF1] hover:text-[#66FCF1]/90',
  },
  bg: {
    soft: 'bg-[#C5C6C7]/5',
    hoverSoft: 'hover:bg-[#C5C6C7]/5',
    hard: 'bg-[#C5C6C7]/10',
  },
  border: {
    base: 'border border-[#C5C6C7]/20',
    hover: 'hover:border hover:border-[#C5C6C7]/10',
  },
  shadow: {
    base: 'shadow-lg shadow-[#66FCF1]/25',
    hover: 'hover:shadow-xl hover:shadow-[#66FCF1]/30',
  },
  transition: 'transition-all duration-300',
  rounded: 'rounded-xl',
  blur: 'backdrop-blur-sm',
};