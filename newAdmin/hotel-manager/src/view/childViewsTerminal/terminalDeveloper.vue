<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
	import searchTable from '@/components/searchTable/searchTable'
	import {mapActions, mapState} from 'vuex'
	import {getConst} from '../../api/hotelConst'
	import {isArray, isJson} from '../../libs/tool'
	import Cookies from 'js-cookie'
	import {
		TOKEN_KEY
	} from '@/libs/util'

	export default {
		components: {
			searchTable
		},
		data () {
			return {
				searchTable: {
					table: {
						type: 'main',
						deleteColumnsIndex: 3,
						data: {
							page: '0',
							size: '10'
						},
						sortReturnData: this.sortReturnData,
						//hideButtonSearch: true,
						hideSearch: true,
						urls: {},
						buttons: {
							hideDel: true,
							showNoFlagDel: true
						},
						modal: {
							data: {},
							sortReturnModalData: this.sortReturnModalData,
							upload: {
								logo: {
									imgList: ''
								}
							},
						},
					},
					search: {}
				},
			}
		},
		methods: {
			...mapActions([
				'handleChangeTableStatus'
			]),
			sortReturnData (data) {
				this.searchTable.table.buttons.hideAdd = !!data.length
				return data
			},
			getImgList () {
				///hotel/terminal/readDevelpoerTwobarcode
				return `${process.env.UPLOAD_ROOT}hotel-terminal/hotel/terminal/readDevelpoerTwobarcode/?token=${ Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
			},
			sortReturnModalData (values) {
				let status = false
				if (isJson(values.logo.value)) {
					status = !values.logo.value.status
					if (!values.logo.value.status) {
						this.$message.error(values.logo.value.msg)
					} else {
						values.logo = ''
					}
				} else if (isArray(values.logo.value)) {
					values.logo = values.logo.value[0]
				}
				let data = new FormData()
				for (let i in values) {
					data.append(i, values[i])
				}
				return {type: 'formData', data: data, noSubmitByPage: status}
			},
			changeStatus (val) {
				this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				this.handleChangeTableStatus(Math.random())
			}
		},
		computed: {
			...mapState({
				getPegination: state => state.data.pegination,
				getSearch: state => state.data.search
			}),
		},
		watch: {
			getPegination (val) {
				if (!val.reset) {
					this.changeStatus(val)
				} else {
					this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				}
			},
			getSearch (val) {
				if (!val.reset) {
					this.changeStatus(val)
				} else {
					this.searchTable.table.data = {...this.searchTable.table.data, ...val}
				}
			}
		},
		created () {
			this.searchTable.table.modal.upload.logo.imgList = this.getImgList()
		},
		mounted () {
			this.handleChangeTableStatus(Math.random())
		}
	}
</script>
