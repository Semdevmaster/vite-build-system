const plugin = require('tailwindcss/plugin')
const iconComponent = plugin(function ({matchComponents}) {
  matchComponents({
      icon: (value) => ({
        maskImage: `url('@/img/icons/${value}.svg')`,
      })
    },
  )
})
module.exports = iconComponent
