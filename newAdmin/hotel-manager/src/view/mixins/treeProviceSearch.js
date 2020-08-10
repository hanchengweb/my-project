import {sortProviceCityTree} from '../../libs/util'
import {mapActions, mapState} from 'vuex'

export const treeProviceSearch = {
	data () {
		return {
			tree: {
				treeTop: {
					type: 'input'
				},
				url: 'h_common_proviceCity__get',
				sortReturnTreeData: sortProviceCityTree,
				beforeHandleTree: this.beforeHandleTree,
				tempTree: {},
				data: {protype: 1, procode: '990001'},
				search: {
					url: 'h_proviceCity_provice_query_get',
					data: {name: ''}
				},
				load: {
					url: 'h_common_proviceCity__get',
					data: {protype: 1, procode: '990001'}
				},
				// loadData: {
				// 	type: 'provice',
				// 	down: 'hotel',
				// 	plus: ['hotel'],
				// 	url: 'h_hotel__get',
				// 	data: {
				// 		cityCode: ''
				// 	}
				// },
				addType: 'system'
			},
		}
	},
	computed: {
		...mapState({
			getChangeTreeStatus: state => state.change.changeTreeStatus,
			getTreeSelect: state => state.data.treeSelect
		}),
	},
	created () {
	},
	watch: {
		getTreeSelect (val) {
			this.tree.url = 'h_proviceCity_provice_query_get'
			this.tree.data = {name: val, flag: 1}
			this.handleChangeTreeStatus(true)
		}
	},
	methods: {
		...mapActions([
			'handleChangeTreeStatus',
		]),
		beforeHandleTree (val) {
			this.tree.tempTree = val
			return this.$route.name != 'hotel' ? (val.isTreeTop || val.protype) ? {
				status: false,
				message: '省市级别无法查看该数据,只有酒店可以查看'
			} : '' : ''
		},
	}
}
