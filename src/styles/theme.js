// src/styles/theme.js

export const theme = {
  gradient: {
    brand: 'from-violet-500 to-purple-600',
    hover: 'from-violet-500 hover:to-purple-500',
  },
  text: {
    primary: 'text-white',
    secondary: 'text-slate-300',
    accent: 'text-violet-400 hover:text-violet-300',
  },
  bg: {
    soft: 'bg-white/5',
    hoverSoft: 'hover:bg-white/5',
    hard: 'bg-white/10',
  },
  border: {
    base: 'border border-white/20',
    hover: 'hover:border hover:border-white/10',
  },
  shadow: {
    base: 'shadow-lg shadow-violet-500/25',
    hover: 'hover:shadow-xl hover:shadow-violet-500/30',
  },
  transition: 'transition-all duration-300',
  rounded: 'rounded-xl',
  blur: 'backdrop-blur-sm',
};

// themeStyles object for components that use it
export const themeStyles = {
  backgrounds: {
    main: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
  },
  glass: {
    card: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300",
    panel: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl",
  },
  gradients: {
    title: "from-white via-purple-200 to-violet-200",
    primary: "from-violet-600 to-purple-600",
    media: {
      anime: "from-pink-500 to-purple-600",
      movie: "from-orange-500 to-red-500",
      tv: "from-blue-500 to-cyan-400",
      book: "from-green-400 to-teal-500",
    }
  },
  text: {
    primary: "text-white",
    secondary: "text-slate-300",
  },
  interactive: {
    hover: "hover:scale-[1.02]",
    active: "active:scale-[0.98]",
  }
};