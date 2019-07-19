const webpack = require("webpack");
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",

        jQuery: "jquery",

        "windows.jQuery": "jquery"
      })
    ]
  },

  // baseUrl: process.env.NODE_ENV === "production" ? "" : "",
  publicPath: process.env.NODE_ENV === "production" ? "/ellis_works/" : "/",
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        // 根据自己样式文件的位置调整
        data: `@import "@/assets/scss/all.scss";`
      }
    }
  },

  lintOnSave: false
};
