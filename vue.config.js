const path = require("path")
const sourceMap = process.env.NODE_ENV === "development"

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack配置
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production"
    } else {
      // 为开发环境修改配置...
      config.mode = "development"
    }

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
        alias: {
          vue$: "vue/dist/vue.js",
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          utils: path.resolve(__dirname, "./src/utils"),
          less: path.resolve(__dirname, "./src/less"),
          views: path.resolve(__dirname, "./src/views"),
          assets: path.resolve(__dirname, "./src/assets"),
          com: path.resolve(__dirname, "./src/components"),
          store: path.resolve(__dirname, "./src/store"),
          mixins: path.resolve(__dirname, "./src/mixins")
        }
      }
    })
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: sourceMap,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "localhost",
    port: 2222,
    https: false,
    hotOnly: false,
    proxy: {
      // 设置代理
      // proxy all requests starting with /api to jsonplaceholder
      "/api": {
        target: "http://localhost:1111/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
