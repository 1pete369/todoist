/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}","./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
   extend: {
      colors: {
        brand: {
          50:  '#f3f2fc',
          100: '#e7e4f9',
          200: '#cdc9f3',
          300: '#9a93ea',
          400: '#6760e1',
          500: '#533CE8', // ← your Sign-up purple
          600: '#452dbf',
          700: '#352194',
          800: '#241567',
          900: '#120b31',
        },
        accent: {
          50:  '#fff7f2',
          100: '#ffeadd',
          200: '#ffd2b3',
          300: '#ffb580',
          400: '#ff944d',
          500: '#ff7300', // Electric Orange
          600: '#cc5c00',
          700: '#994500',
          800: '#662e00',
          900: '#331700',
        },
        gray: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        success: { 500: '#22c55e' },
        warning: { 500: '#facc15' },
        danger:  { 500: '#ef4444' },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body:    ['Inter',   'sans-serif'],
      },
    },
  },
  plugins: [],
}
