const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')

// module.exports = defineConfig({
//   // transpileDependencies: true,
//   pages: {
//     index: {
//       entry: 'examples/main.js',
//       template: 'public/index.html',
//       filename: 'index.html',
//     },
//   },
//   chainWebpack: config => {
//     config.module
//       .rule('js')
//       .include.add(resolve('packages'))
//       .end()
//       .use('babel')
//       .loader('babel-loader')
//   },
// })

module.exports = defineConfig({
  lintOnSave: false, // 禁用eslint
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(resolve('/packages'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .end()
      .use('less')
      .loader('less-loader')
  },
})
