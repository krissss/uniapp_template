import Vue from 'vue'
import App from './App'
import plugins from './plugins'

Vue.config.productionTip = false

App.mpType = 'app'

// 挂载插件
for (const pluginName of Object.keys(plugins)) {
  Vue.prototype['$' + pluginName] = plugins[pluginName]
}

const app = new Vue({
  ...App
})
app.$mount()
