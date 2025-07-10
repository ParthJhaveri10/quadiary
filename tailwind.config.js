/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern dark theme inspired by AniList/Letterboxd
        background: {
          DEFAULT: '#0B0E16',
          secondary: '#151922',
          tertiary: '#1C2128'
        },
        surface: {
          DEFAULT: '#1C2128',
          hover: '#252A34',
          active: '#2D3441',
          glass: 'rgba(28, 33, 40, 0.8)'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0AEC0',
          tertiary: '#718096',
          muted: '#4A5568'
        },
        accent: {
          anime: {
            DEFAULT: '#FF6B9D',
            light: '#FF8FB3',
            dark: '#E65A8A',
            glow: 'rgba(255, 107, 157, 0.3)'
          },
          movie: {
            DEFAULT: '#FF5722',
            light: '#FF7043',
            dark: '#D84315',
            glow: 'rgba(255, 87, 34, 0.3)'
          },
          tv: {
            DEFAULT: '#3F51B5',
            light: '#5C6BC0',
            dark: '#303F9F',
            glow: 'rgba(63, 81, 181, 0.3)'
          },
          book: {
            DEFAULT: '#4CAF50',
            light: '#66BB6A',
            dark: '#388E3C',
            glow: 'rgba(76, 175, 80, 0.3)'
          }
        },
        rating: {
          star: '#FFD700',
          gold: '#FFB000',
          silver: '#C0C0C0',
          bronze: '#CD7F32'
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6'
        },
        border: {
          DEFAULT: '#2D3441',
          hover: '#3A4553',
          focus: '#4A5568'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 107, 157, 0.3)',
        'glow-blue': '0 0 20px rgba(63, 81, 181, 0.3)',
        'glow-green': '0 0 20px rgba(76, 175, 80, 0.3)',
        'glow-orange': '0 0 20px rgba(255, 87, 34, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 107, 157, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 107, 157, 0.4)' }
        }
      }
    },
  },
  plugins: [],
}
