<template>
	<div class="treeSelectSelf">
		<a-tree-select
			style="width: 100%"
			:dropdownStyle="{ maxHeight: '200px',width:'100px', overflow: 'auto' }"
			:treeData="data"
			:dropdownMatchSelectWidth="false"
			:treeDefaultExpandAll="!treeSelectJson.treeDefaultHiddenAll"
			v-model="value"
			:disabled="disabled"
			@change="handleChange"
		>
		</a-tree-select>
	</div>
</template>
<script>
	import {getTreeSelectData} from '@/api/treeSelectData'
	import {isArray, isEmptyObject} from '@/libs/tool'
	import {sortTreeData, sortListTreeData} from '@/libs/util'
	import {mapActions} from 'vuex'

	export default {
		data () {
			return {
				value: '',
				data: []
			}
		},
		props: {
			treeSelectJson: {},
			initValue: '',
			keys: '',
			disabled: false
		},
		watch: {
			value (value) {
				this.treeSelectJson.type != 'sub' && value && !isEmptyObject(value) && this.handleTreeSelect(this.value)
			},
		},
		methods: {
			...mapActions([
				'handleTreeSelect',
			]),
			handleChange (value, label, extra) {
				this.$emit('change', {value: value, label: label[0], data: this.data})
			},
			getData () {
				getTreeSelectData(this.treeSelectJson.url, this.treeSelectJson.data).then(res => {
					if (res) {
						if (!this.treeSelectJson.sortReturnData) {
							let data = isArray(res.data) ? res.data : [res.data],
								changeArr = this.treeSelectJson.changeArr || [['value', 'id'], ['label', 'name']],
								sortData = this.treeSelectJson.type != 'list' ? sortTreeData(data, changeArr) : sortListTreeData(data, changeArr)
							this.value = sortData[0].value
							this.data = this.treeSelectJson.addType ? [{
								...this.plusData[this.treeSelectJson.addType],
								children: sortData
							}] : sortData
						} else {
							this.data = this.treeSelectJson.sortReturnData(res.data)
						}
						this.value = this.initValue
					}
				}, err => {
				})
			}
		},
		created () {
			this.getData()

		}
	}
</script>
