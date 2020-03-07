const plugin = require('tailwindcss/plugin')
const prlx = () => {
  return plugin(function({ addComponents }) {
    const newParallaxComponents = {
      '.prlx': {
        'perspective': '1px',
        'height': '50vh',
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        'perspective-origin-x': '100%',
        'scroll-behavior': 'smooth', 
      },
      '.prlx-base': {
        padding: '50vh 0',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        transform: 'translateZ(0)',
        'transform-origin-x': '100%',
      },
      '.prlx-back': {
        padding: '50vh 0',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        transform: 'translateZ(-1px) scale(2)',
        'transform-origin-x': '100%',
      }
    }

    addComponents(newParallaxComponents)
  })
}

module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    prlx()
  ],
  corePlugins: {
    gridTemplateColumns: false,
    gridColumn: false,
    gridColumnStart: false,
    gridColumnStarEnd: false,
    gridTemplateRows: false,
    gridRow: false,
    gridRowStart: false,
    gridRowStartEnd: false,
    gap: false,
    gridAutoFlow: false
  }
}
