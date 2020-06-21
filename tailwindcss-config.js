module.exports = {
  theme: {
    screens: {
      tablet: '768px',
      desktop: '1024px',
    },
    container: {
      center: true,
    },
  },
  variants: {
    opacity: ['responsive', 'hover']
  },
  plugins: [],
  corePlugins: {
    float: false,
    objectFit: false,
    objectPosition: false,
  },
}
