module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Agile Manifesto',
    },
  },
  devServer: {
    port: 3000
}
}
