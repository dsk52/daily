/* eslint-disable @typescript-eslint/no-var-requires */
const purgecss = require('@fullhuman/postcss-purgecss')({
  context: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
  ],

  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

    return broadMatches.concat(innerMatches)
  }
})

module.exports = {
  plugins: [
    require("tailwindcss")('./tailwindcss-config.js'),
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
    ? [purgecss] : [],
    require('postcss-sorting'),
    require('cssnano')
  ]
}
