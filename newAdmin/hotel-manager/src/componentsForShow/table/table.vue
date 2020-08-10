<template>
	<a-table
		:columns="columns"
		:dataSource="data"
		size="small"
		bordered
		:scroll="scroll"
		:pagination="false">
	</a-table>
</template>
<script>
	export default {
		data () {
			return {
				data: [],
				columns: [],
			}
		},
		props: {
			tableJson: {}
		},
		watch: {
			tableJson (val) {
				this.scroll = this.tableJson.scroll || {}

			}
		},
		methods: {},
		created () {
			this.data = this.tableJson.data
			this.columns = this.tableJson.columns
			this.scroll = this.tableJson.scroll || {}
		}

	}
</script>
