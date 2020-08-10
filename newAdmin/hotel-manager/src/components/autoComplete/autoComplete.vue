<template>
	<a-auto-complete
		style="width: 500px"
		@search="handleSearch"
		@filterOption="false"
		@select="select"
		size="large"
		placeholder="请输入"
	>
		<template slot="dataSource">
			<a-select-option v-for="email in result" :key="email.code">{{email.name}}</a-select-option>
		</template>
		<a-input>
			<a-button slot="suffix" class="search-btn" size="large" type="primary">
				<a-icon type="search"/>
			</a-button>
		</a-input>
	</a-auto-complete>
</template>
<script>
	import {getData} from '../../api/common'

	export default {
		data () {
			return {
				result: [],
				data: {},
				params: {
					name: 'h_proviceCity_provice_query_get',
					data: {name: '杭州'}
				}
			}
		},
		created () {
			this.getData()
		},
		methods: {
			getData () {
				getData(this.params).then(res => {
					this.result = res.data
				})
			},
			handleSearch () {

			},
			select (value, option) {
			},
		}
	}
</script>
