/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050B18',
          900: '#081225',
          800: '#0D1B33',
          700: '#132443',
          600: '#1B3159',
        },
        cyan: {
          glow: '#3DE8E0',
          soft: '#7FF4EE',
        },
        indigo: {
          accent: '#5B7CFA',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(61, 232, 224, 0.25)',
        'glow-lg': '0 0 80px rgba(61, 232, 224, 0.35)',
        card: '0 8px 32px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        drift: 'drift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0)' },
          '100%': { transform: 'translate(-40px, -30px)' },
        },
      },
    },
  },
  plugins: [],
}
