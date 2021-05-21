module.exports = {
  purge: [
    './apps/next-starter/pages/**/*.{js,ts,jsx,tsx}',
    './apps/next-starter/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        secondary: '#374151',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
