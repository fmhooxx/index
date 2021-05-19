const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 30
})

// 使用等比适配插件
module.exports = {
  publicPath: './', // 公共路径
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: true,
  chainWebpack: config => {
    // // 修改当前项目默认svg 配置，排除icons目录
    config.module.rule('svg')
      .exclude.add(resolve('./src/icons'))
    // 新增一个 rule：添加icons 里面svg
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'  // 配置跨域处理,只有一个代理
    // proxy: { //配置多个跨域
    //   "/api": {
    //     target: "http://172.11.11.11:7071",
    //     changeOrigin: true,
    //     // ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       "^/api": "/"
    //     }
    //   },
    //   "/api2": {
    //     target: "http://172.12.12.12:2018",
    //     changeOrigin: true,
    //     //ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       "^/api2": "/"
    //     }
    //   },
    // }
  }
}