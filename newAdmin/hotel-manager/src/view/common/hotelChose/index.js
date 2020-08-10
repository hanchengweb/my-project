import Vue from 'vue'
import hotelChose from './hotelChose'

const hotelChoseBox = Vue.extend(hotelChose)
hotelChose.install = (option, type) => {
	if (!option) {
		option = {text: ''}
	} else if (typeof option === 'string' || typeof option === 'number') {
		option = {text: option}
	}
	if (type) {
		option.type = type
	}
	let instance = new hotelChoseBox({
		data: option
	}).$mount()

	Vue.nextTick(() => {
		instance.visible = true
	})
}
export default hotelChose
