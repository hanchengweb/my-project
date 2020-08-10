<template>
	<div class="warnInfo-home">
		<commonTop :name="'风险监控告警详情'" :backFun="backFun"></commonTop>
		<warnInfoSelf class="warnInfoSelf"></warnInfoSelf>
	</div>
</template>
<script>
	import warnInfoSelf from '../common/warnInfo/warnInfo'
	import commonTop from './commonTop'

	export default {
		components: {
			warnInfoSelf,
			commonTop
		},
		created () {

		},
		methods: {
			backFun () {
				this.$router.push({path: '/home', query: this.$route.query})
			}
		}
	}
</script>
<style lang="less">
	.warnInfo-home {
		background-color: #fff;

		.warnInfoSelf {
			height: calc(100% - 40px);
		}

	}
</style>
