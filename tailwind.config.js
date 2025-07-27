/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Himalayan Color Palette
        himalayan: {
          snow: '#F8FFFE',
          sky: '#87CEEB',
          stone: '#708090',
          earth: '#8B7355',
          light: '#E3F6FC',
          DEFAULT: '#4FB0C6',
          dark: '#165067'
        },
        prayer: {
          red: '#DC143C',
          blue: '#4169E1',
          yellow: '#FFD700',
          green: '#228B22',
          white: '#FFFFFF'
        },
        mountain: {
          rhododendron: '#FF69B4',
          gold: '#DAA520',
          forest: '#2F4F2F',
          sunset: '#FF8C00'
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'cultural': ['Noto Sans Devanagari', 'sans-serif']
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(75, 176, 198, 0.9) 0%, rgba(22, 80, 103, 0.9) 100%)',
        'mountain-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f8fffe\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};