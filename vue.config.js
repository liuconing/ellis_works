const webpack = require("webpack");
module.exports = {
  devServer: {
    proxy: {
      "/token": {
        target: "https://account.kkbox.com/oauth2/token",
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",

        jQuery: "jquery",

        "windows.jQuery": "jquery"
      })
    ]
  },

  // publicPath: process.env.NODE_ENV === "production" ? "/ellis_works/" : "/",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
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
