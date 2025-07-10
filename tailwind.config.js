/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette based on user's preferences
        background: {
          DEFAULT: '#0B0C10', // Primary dark background
          secondary: '#1F2833', // Medium dark
          tertiary: '#1F2833'
        },
        surface: {
          DEFAULT: '#1F2833',
          hover: '#2A3441',
          active: '#334155',
          glass: 'rgba(31, 40, 51, 0.8)'
        },
        text: {
          primary: '#C5C6C7', // Light neutral
          secondary: '#C5C6C7cc', // Light neutral with opacity
          tertiary: '#C5C6C799', // Light neutral with more opacity
          muted: '#C5C6C766'
        },
        accent: {
          anime: {
            DEFAULT: '#66FCF1', // Cyan
            light: '#7DFCF2',
            dark: '#45A29E', // Teal
            glow: 'rgba(102, 252, 241, 0.3)'
          },
          movie: {
            DEFAULT: '#45A29E', // Teal
            light: '#66FCF1', // Cyan
            dark: '#1F2833', // Dark
            glow: 'rgba(69, 162, 158, 0.3)'
          },
          tv: {
            DEFAULT: '#66FCF1', // Cyan
            light: '#7DFCF2',
            dark: '#45A29E', // Teal
            glow: 'rgba(102, 252, 241, 0.3)'
          },
          book: {
            DEFAULT: '#45A29E', // Teal
            light: '#66FCF1', // Cyan
            dark: '#1F2833', // Dark
            glow: 'rgba(69, 162, 158, 0.3)'
          }
        },
        rating: {
          star: '#66FCF1', // Using cyan for stars
          gold: '#66FCF1',
          silver: '#C5C6C7',
          bronze: '#45A29E'
        },
        status: {
          success: '#45A29E', // Teal for success
          warning: '#66FCF1', // Cyan for warning
          error: '#66FCF1', // Cyan for error (no red)
          info: '#66FCF1' // Cyan for info
        },
        border: {
          DEFAULT: '#C5C6C7', // Light neutral
          hover: '#C5C6C7cc',
          focus: '#66FCF1' // Cyan for focus
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 20px rgba(102, 252, 241, 0.3)', // Cyan glow
        'glow-blue': '0 0 20px rgba(102, 252, 241, 0.3)', // Cyan glow
        'glow-green': '0 0 20px rgba(69, 162, 158, 0.3)', // Teal glow
        'glow-orange': '0 0 20px rgba(69, 162, 158, 0.3)', // Teal glow
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
          '0%': { boxShadow: '0 0 5px rgba(102, 252, 241, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(102, 252, 241, 0.4)' }
        }
      }
    },
  },
  plugins: [],
}
