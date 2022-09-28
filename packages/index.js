import FullScreenContainer from './full-screen-container'

const components = [FullScreenContainer]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  FullScreenContainer,
}
