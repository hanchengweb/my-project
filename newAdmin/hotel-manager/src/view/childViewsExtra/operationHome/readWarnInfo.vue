<template>
	<div class="readWarnInfo" id="readWarnInfoHome">
		<commonTop :name="'告警详情'" backName="运维首页"></commonTop>
		<warnInfo style="height:calc(100% - 46px);margin-top: 6px;"></warnInfo>
	</div>

</template>
<script>
	import warnInfo from './readWarnInfoDetail'
	import commonTop from '../commonTop'

	export default {
		components: {
			warnInfo,
			commonTop
		}
	}
</script>
<style lang="less">
	#readWarnInfoHome {
		.topTable {
			.buttonLineSearchSelf {
				height: 42px;
				margin-left: -165px;
			}
		}
	}
</style>
