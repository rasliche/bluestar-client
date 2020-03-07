const plugin = require('tailwindcss/plugin')
const prlx = function() {
  return plugin(function({ addComponents }) {
    const newParallaxComponents = {
      '.prlx': {
        'perspective': '1px',
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        'perspective-origin-x': '100%',
        'scroll-behavior': 'smooth', 
      },
      'prlx-group': {
        position: 'relative',
        'transform-style': 'preserve-3d',
      },
      '.prlx-layer': {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
      '.prlx-base': {
        transform: 'translateZ(0)',
        'transform-origin-x': '100%',
      },
      '.prlx-back': {
        // scale = 1 + (translateZ * -1) / perspective
        transform: 'translateZ(-1px) scale(2)',
        'transform-origin-x': '100%',
      },
      '.prlx-back-deep': {
        // scale = 1 + (translateZ * -1) / perspective
        transform: 'translateZ(-3px) scale(4)',
        'transform-origin-x': '100%',
      },
      '.prlx-back-deeper': {
        // scale = 1 + (translateZ * -1) / perspective
        transform: 'translateZ(-7px) scale(8)',
        'transform-origin-x': '100%',
      },
      '.prlx-back-deepest': {
        // scale = 1 + (translateZ * -1) / perspective
        transform: 'translateZ(-15px) scale(16)',
        'transform-origin-x': '100%',
      },
      '.prlx-offset-25': {
        padding: '25vh 0'
      },
      '.prlx-offset-50': {
        padding: '50vh 0'
      },
      '.prlx-offset-100': {
        padding: '100vh 0'
      },
      '.prlx-offset-200': {
        padding: '200vh 0'
      },
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
