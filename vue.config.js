const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const fs = require('fs')

const join = path.join

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

function getEntries(path) {
  let files = fs.readdirSync(resolve(path))
  const entries = files.reduce((ret, item) => {
    const itemPath = join(path, item)
    const isDir = fs.statSync(itemPath).isDirectory()
    if (isDir) {
      ret[item] = resolve(join(itemPath, 'index.js'))
    } else {
      const [name] = item.split('.')
      ret[name] = resolve(`${itemPath}`)
    }
    return ret
  }, {})
  return entries
}

module.exports = defineConfig({
  lintOnSave: false,
  // pages: {
  //   index: {
  //     entry: 'examples/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //   },
  // },
  configureWebpack: {
    entry: {
      ...getEntries('packages'),
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'commonjs2',
    },
  },
  productionSourceMap: false, // 好处: 减少打包编译的时间, 避免在生产环境中用F12开发者工具在Sources中看到源码
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
      .end()

    // 删除splitChunks，因为每个组件是独立打包，不需要抽离每个组件的公共js出来
    config.optimization.delete('splitChunks')

    // 删除copy，不要复制public文件夹内容到lib文件夹中
    config.plugins.delete('copy')

    // 删除html，只打包组件，不生成html页面
    config.plugins.delete('html')

    // 删除preload以及prefetch，因为不生成html页面，所以这两个也没用
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // 删除hmr，删除热更新
    config.plugins.delete('hmr')

    // 删除自动加上的入口App
    config.entryPoints.delete('app')
  },
})
