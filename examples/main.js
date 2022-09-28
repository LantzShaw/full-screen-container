import Vue from 'vue'
import App from './App.vue'

// 导入组件库
import FullScreenContainer from '../packages'

// 注册组件库
Vue.use(FullScreenContainer)

console.log('------step2------')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
