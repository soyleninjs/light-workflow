const config = {
  plugins: {
    'postcss-functions': {
      functions: {
        formula (minValue, maxValue, minViewportWidth, maxViewportWidth) {
          // Modo de uso: formula(10, 20, 1024, 1440)
          const calc = `calc(${minValue}px + (${maxValue} - ${minValue}) * ((100vw - ${minViewportWidth}px) / ${maxViewportWidth - minViewportWidth}))`

          return calc
        },
        responsive (minValue, maxValue, minViewportWidth = 1024, maxViewportWidth = 1440, returnNegativeValues = false) {
          // Modo de uso: responsive(10, 20, 1024, 1440)
          const clamp = `clamp(${minValue}px, calc(${minValue}px + (${maxValue} - ${minValue}) * ((100vw - ${minViewportWidth}px) / ${maxViewportWidth - minViewportWidth})), ${maxValue}px)`

          if (returnNegativeValues) {
            return `calc(${clamp} * -1)`
          }

          return clamp
        },
        bp (minValue, maxValue, mediaQueryChange = 680) {
          // Modo de uso: bp(10, 20, 1024)
          return `clamp(${minValue}px, calc(${minValue}px + (${maxValue} - ${minValue}) * (100vw - ${mediaQueryChange}px)), ${maxValue}px)`
        }
      }
    },
    'postcss-import': {},
    'postcss-nesting': {},
    'postcss-sorting': {
      order: ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
      'unspecified-properties-position': 'bottom'
    },
    'postcss-sort-media-queries': {
      sort: 'desktop-first'
    }
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config
}
