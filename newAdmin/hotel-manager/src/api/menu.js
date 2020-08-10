import {
	getData
} from '@/api/common'

export const getMenuList = (data) => {
	return getData({
		name: 'r_menu_tree_get',
		data: data
	})
}
export const getAccess = (data) => {
	return getData({
		name: 'r_module_access_get',
		data: data
	})
}
export const getUserHotel = (data) => {
	return getData({
		name: 'h_userHotel_anyone_get',
		data: data
	})
}
