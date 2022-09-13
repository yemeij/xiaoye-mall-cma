const path = require('path')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // 1.配置方式一: CLI中提供的配置选项
  outputDir: './build',
  publicPath: './',
  // 2.配置方式二
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://152.136.185.210:5000',  // 备用 http://152.136.185.210:4000
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      },
      historyApiFallback: true
    }
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },

  // 3.配置方式三
  // chainWebpack: (config) => {
  //   config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
  // }
}
