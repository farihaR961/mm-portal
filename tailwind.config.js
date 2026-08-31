/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ua: {
          green: '#007C41',
          'deep-green': '#0B3D23',
          gold: '#FFDB05',
        },
        mist: '#F3F6F2',
        line: '#DBE2DA',
        ink: {
          DEFAULT: '#101B13',
          2: '#44544A',
        },
        sage: '#E3EDE6',
        cream: '#F7ECC4',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        accent: ['Fraunces', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        card: '4px',
      },
    },
  },
  plugins: [],
}
