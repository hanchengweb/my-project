export const forEach = (arr, fn) => {
	if (!arr.length || !fn) return
	let i = -1, len = arr.length
	while (++i < len) {
		let item = arr[i]
		fn(item, i, arr)
	}
}



export const isJson = (data) => {
	return typeof(data) == 'object' && Object.prototype.toString.call(data).toLowerCase() == '[object object]' && !data.length
}
export const isArray = (obj) => {
	return Object.prototype.toString.call(obj) == '[object Array]'
}
export const isString = (str) => {
	return ((str instanceof String) || (typeof str).toLowerCase() == 'string')
}
export const isEmptyObject = (value) => {
	// if (value.nodeType || (value != null && value === value.window)) return false;
	// if (!value || !(Object.prototype.toString.call(value) === '[object Object]') || !value.hasOwnPrototype) return false;
	// for (let key in value) {
	//   if (value.hasOwnPrototype(key)) return false;
	// }

	return JSON.stringify(value) == '{}'
}
export const reJsonFun = (json) => {
	return isJson(json) ? JSON.parse(JSON.stringify(json)) : json
}

export const changeUndefined = (values) => {
	for (let key in values) {
		if (typeof(values[key]) == 'undefined' || values[key] == null) values[key] = ''
	}
	return values
}

