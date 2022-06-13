module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      blue: {
        500: '#7C91F9',
        900: '#4661E6',
      },
      coral: '#F49F85',
      indigo: {
        100: '#F7F8FD',
        300: '#F2F4FF',
        400: '#CFD7FF',
        500: '#647196',
        600: '#656EA3',
        800: '#3A4374',
        900: '#373F68',
      },

      red: {
        500: '#E98888',
        900: '#D73737',
      },
      'sky-medium': '#62BCFA',
      violet: {
        500: '#C75AF6',
        900: '#AD1FEA',
      },
      white: '#FFFFFF',
    },
    screens: {
      sm: '480px',
      md: '720px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontSize: {
        small: '0.813rem',
      },
      borderRadius: {
        5: '5px',
        10: '10px',
      },
      borderWidth: {
        6: '6px',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          margin: '0 auto',
          '@screen sm': {
            maxWidth: '100%',
          },
          '@screen md': {
            maxWidth: '90%',
          },
          '@screen lg': {
            maxWidth: 'calc(90% + 2rem)',
          },
          '@screen xl': {
            maxWidth: '1100px',
          },
        },
      })
    },
  ],
}
