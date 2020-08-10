import Vue from 'vue'
import modal from './modal'

const modalBox = Vue.extend(modal)
modal.install = (option, type) => {
	if (!option) {
		option = {text: ''}
	} else if (typeof option === 'string' || typeof option === 'number') {
		option = {text: option}
	}
	if (type) {
		option.type = type
	}
	let instance = new modalBox({
		data: option
	}).$mount()

	Vue.nextTick(() => {
		instance.visible = true
	})
}
export default modal
