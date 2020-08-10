<template>
	<a-form class="selfFormForShow">
		<a-row v-if="!isEmptyObject(labels)">
			<a-col :span="12" v-for="(item,key) in labels" :key="`self-form-${key}`">
				<a-form-item v-bind="formItemLayout" :label="item">
					<span class="ant-form-text">{{data[key]}}</span>
				</a-form-item>
			</a-col>
		</a-row>

	</a-form>
</template>
<script>
	import {isEmptyObject} from '../../libs/tool'

	export default {
		props: {
			json: {}
		},
		data () {
			return {
				labels: {},
				data: {},
				formItemLayout: {
					labelCol: {span: 8},
					wrapperCol: {span: 14},
				}
			}
		},
		created () {
			this.labels = this.json.labels || {}
			this.data = this.json.data || {}
		},
		methods: {
			isEmptyObject
		}
	}
</script>
<style lang="less">
	.selfFormForShow{
		.ant-row {
			margin-bottom: 0;
		}
		.ant-col-24, .ant-col-12 {
			border: 1px solid #E6E6E6;
			padding: 0 !important;
			margin-bottom: 10px;
			&:nth-child(even) {
				margin-left: -1px;
			}
		}
		.ant-form-item-label {
			background: #F0F2F4;
			color: #666666;
			label {
				font-size: 12px;
			}

		}
		.ant-form-item-control-wrapper {
			padding-left: 9px;
			input, textarea {
				border-radius: 0 !important;
			}
			textarea {
				margin-bottom: 0 !important;
			}
		}
		.ant-form-item-control{
			line-height: 40px;
			height: 40px;
			overflow: hidden;
		}
	}
</style>
