module.exports = {
  theme: {
    extend: {
      inset: {
        '1': '.25rem'
      }
    },
  },
  variants: {
    visibility: ['hover']
  },
  plugins: [
    require('./plugins/parallax')
  ],
  corePlugins: {
    // gridTemplateColumns: false,
    // gridColumn: false,
    // gridColumnStart: false,
    // gridColumnStarEnd: false,
    // gridTemplateRows: false,
    // gridRow: false,
    // gridRowStart: false,
    // gridRowStartEnd: false,
    // gap: false,
    // gridAutoFlow: false
  }
}
