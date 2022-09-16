const dotenv = require('dotenv')
dotenv.config()
module.exports = ({env}) => ({
  plugins: [
    require('postcss-import')(),
    require('tailwindcss')({config: `./tailwind.config.${process.env.VITE_ASSETS_VERSION}.js`}),
    require('postcss-preset-env')({stage: 2, autoprefixer: {cascade: false}}),
    env === 'production' ? require('postcss-csso')({restructure: false, comments: false}) : false,
    env === 'production' ? require('postcss-combine-media-query')() : false
  ]
})
