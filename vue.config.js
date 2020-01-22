module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/lit-eyrie-37404/' : '/',
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
  }
}