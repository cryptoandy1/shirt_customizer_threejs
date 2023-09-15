/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'max-xl': '1920px',
        xs: '360px',
        mdh: { raw: '(min-width: 768px) and (min-height: 913px)' },
        landsc: { raw: '(max-height: 414px)' },
        'landsc-xs': { raw: '(max-height: 280px)' },
      },
    },
  },
  plugins: [],
}
