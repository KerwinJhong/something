module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/something/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_base.scss";
          @import "@/scss/_mixins.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://recus.herokuapp.com/'
      }
    },
    disableHostCheck: true
  }
}