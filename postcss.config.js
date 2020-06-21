const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    require("tailwindcss"),
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
    ? [purgecss] : [],
    require('postcss-sorting'),
    require('cssnano')
  ]
}
