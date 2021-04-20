module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
    require("@hail2u/css-mqpacker")()
  ]
}
