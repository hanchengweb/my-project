<template>
	<a-modal
		title="选择酒店"
		v-model="visible"
		:closable="false"
		class="modalForChoseHotel"
		:width="modalWidth"
		:height="modalHeight"
		ref="modalForChoseHotel"
		:maskClosable="false"
		@ok="handleOk"
		:footer="null"
	>
		<hotelChose ref="hotelChose" class="hotelChose"></hotelChose>
	</a-modal>
</template>
<script>
	import hotelChose from './hotelChose'

	export default {
		props: {
			visible: false
		},
		data () {
			return {
				modalWidth: 1000,
				modalHeight: 1000
			}
		},
		components: {
			hotelChose
		},
		methods: {
			handleOk () {

			}
		},
		created () {

			this.modalWidth = document.getElementById('app').clientWidth - 80
			this.modalHeight = document.getElementById('app').clientHeight
		},
		mounted () {
			// console.log(this.$refs.hotelChose.$el.style.height)
			// this.$refs.hotelChose.$el.style.height=document.getElementById('app').clientHeight
			// console.log(this.$refs.hotelChose.$el.style.height)
		}

	}
</script>
<style lang="less">

	.modalForChoseHotel {
		.ant-modal-body {
			padding: 0;
			position: relative;
			.hotelChose {
				height: 600px;
				.buttonLineSearchSelf {
					height: 42px;
					.baseAntBtn {
						display: none;
					}
					.hotelSearchCls {
						left: 10px;
						width: calc(100% - 10px);
					}
				}

				tr {
					cursor: pointer;
					&:hover {
						td {
							background-color: #999 !important;
							color: #fff;
							.ant-table-row-expand-icon {
								background-color: rgba(0, 0, 0, 0);
							}
						}
					}
					&.active, &[data-chosed], &.ant-table-row-selected {
						td {
							background-color: #6D819D !important;
							color: #fff !important;
							span {
								background-color: #6D819D !important;
								color: #fff !important;
							}
							.ant-table-row-expand-icon {
								color: #333;
							}
						}
					}
				}
			}

		}
		.ant-modal-close-x {
			color: #fff;
			height: 38px;
			line-height: 38px;
			width: 38px;
			&:hover {
				background-color: rgba(0, 0, 0, .1);

			}
		}
		.ant-modal-content {
			height: 100%;
		}
		.fullScreenIcon {
			position: absolute;
			color: #fff;
			top: -38px;
			height: 38px;
			right: 38px;
			font-size: 16px;
			padding: 11px;
			cursor: pointer;
			&:hover {
				background-color: rgba(0, 0, 0, .1);
			}
		}
		.ant-modal-close {
			height: 38px;
			line-height: 38px;
		}
		.ant-modal-header {
			background: #0ACAC7;
			border-bottom-width: 0;
			padding: 8px 24px;
			.ant-modal-title {
				color: #fff;

			}
		}
	}

</style>
