import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import "normalize.css"  // reset css

import '@/permission'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/element-ui.scss'

import '@/utils/rem.js' // 引入rem布局

Vue.use(ElementUI);

// import { Table, Button, Input } from 'element-ui' // 按需引入element-ui
// 国际化
// import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'
// locale.use(lang)

// Vue.use(Table)
// Vue.use(Button)
// Vue.use(Input)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
