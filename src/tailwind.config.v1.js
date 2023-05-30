/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../app/*.html',
    './assets/v1/js/**/*.js'
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1480px'
    },
    extend: {
      colors: {
        primary: '#23d1a9',
        secondary: '#235ad1',
        accent: '#f57f17',
        error: '#ff5722',
        warning: '#ffc107',
        info: '#607d8b',
        success: '#4caf50',
      },
      fontFamily: {
        'first': [
          'RobotoFlex',
          'sans-serif'
        ]
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('./tailwind-plugins/icon-component')
  ],
}
