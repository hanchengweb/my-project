<template>
	<div class="roomInfo-operation-home">
		<commonTop :name="'房间分布详情'"></commonTop>
		<hotelRoom class="warnInfoSelf" :id="id" :name="'hotel'"></hotelRoom>
	</div>
</template>
<script>
	import hotelRoom from '../childViews/hotel/modal'
	import commonTop from './commonTop'

	export default {
		components: {
			hotelRoom,
			commonTop
		},
		data () {
			return {
				id: ''
			}
		},
		created () {
			this.id = this.$route.query.id
		}
	}
</script>
<style lang="less">
	.roomInfo-operation-home {
		padding: 0 10px;
		background-color: #fff;

		.warnInfoSelf {
			height: calc(100% - 40px);
		}

	}
</style>
