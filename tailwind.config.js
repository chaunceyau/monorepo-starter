module.exports = {
  purge: [
    './apps/next-starter/public/**/*.html',
    './libs/ui/src/**/*.{js,ts,jsx,tsx}',
    './apps/next-starter/pages/**/*.{js,ts,jsx,tsx}',
    './apps/next-starter/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      backgroundColor: ['odd', 'even'],
    },
  },
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        secondary: '#374151',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
