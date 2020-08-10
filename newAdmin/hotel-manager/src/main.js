// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import Antd from 'ant-design-vue'
import router from './router'
// import EasyScroll from 'easyscroll';
import errorHandle from './libs/errorHandler'
import 'ant-design-vue/dist/antd.less'
import Modal from '@/componentsForShow/modal'

Vue.prototype.$self_modal = Modal.install

// import './assets/theme.less';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

Vue.config.productionTip = false
Vue.use(Antd)
// Vue.use(EasyScroll);
// Vue.use(errorHandle);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
