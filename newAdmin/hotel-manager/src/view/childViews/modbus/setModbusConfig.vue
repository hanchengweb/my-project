<template>
	<a-modal
		class="modalSelf"
		:visible="visible"
		@cancel="onCancel"
		:destroyOnClose="true"
		:width="modalWidth"
		@ok="onOk"
		title="设置参数"
	>
		<a-form class="ant-advanced-search-form"
				:form="form">
			<a-row>
				<a-col :span="12" v-for="(item,key) in labels" :key="`self-form-${key}`">
					<a-form-item v-bind="formItemLayout" :label="item.name">
						<a-radio-group
							v-if="item.type==='radio'"
							v-decorator="[key,{rules:[{required:true,message:`请输入${item.name}!`}],initialValue:item.defaultValue}]"

							:options="item.options"></a-radio-group>
						<a-input
							v-else
							:disabled="item.disabled"
							v-decorator="[key, {rules:[{required:true,message:`请输入${item.name}!`}],initialValue:item.defaultValue}]"
							:placeholder="`请输入${item.name}`"/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>
<script>
	import {getData} from '../../../api/common'
	import {isEmptyObject} from '@/libs/tool'
	import {mapActions, mapState} from 'vuex'

	export default {
		data () {
			return {
				visible: false,
				modalWidth: 1000,
				formItemLayout: {
					labelCol: {span: 8},
					wrapperCol: {span: 14},
				},
				labels: {
					mac: {
						name: 'mac地址',
						disabled: true,
						defaultValue: ''
					},
					uip: {
						name: '远程服务器IP地址'
					},
					uport: {
						name: '远程服务器IP端口',
					},
					bip: {
						name: '远程备用服务器IP地址'
					},
					bport: {
						name: '远程备用服务器IP端口'
					},
					checkTime: {
						name: '是否校准时间',
						type: 'radio',
						options: [{label: '是', value: true}, {label: '否', value: false}],
						defaultValue: true
					},
					reload: {
						name: '是否重启硬件',
						type: 'radio',
						options: [{label: '是', value: true}, {label: '否', value: false}],
						defaultValue: true
					}
				},
			}
		},
		methods: {
			...mapActions([
				'handleChangeSubTableStatus',
			]),
			changeStatus (type) {
				 this.handleChangeSubTableStatus('sub')
			},
			onCancel () {
				this.visible = false
			},
			onOk () {
				this.form.validateFields((error, data) => {
					if (error) return false
					getData({name: 'h_modbusDeviceConfig_setModbusConfig_put', data: data}).then(res => {///hotel/manager/modbusDeviceConfig/setModbusConfig
						if (res.code == '200') {
							if (res.data.success) {
								this.$message.success('操作成功!')
								this.changeStatus('sub')
							} else {
								this.$message.error(res.data.message || '操作失败!')
							}
						}
					})

				})

			}
		},
		computed: {

			...mapState({
				getChoseTr: state => state.data.choseTr,
			})
		},
		watch: {
			modalVisible (val) {
				this.visible = !!val
			},
			getChoseTr (val) {
				if (!isEmptyObject(val)) {
					this.labels.mac.defaultValue = val.mac
				}
			}
		},
		props: {
			modalVisible: false,
		},
		created () {
			this.modalWidth = document.getElementById('app').clientWidth * .8 + 'px'
			if (this.$store.state.choseTr && !isEmptyObject(this.$store.state.choseTr)) this.labels.mac.defaultValue = this.$store.state.choseTr.mac
		},
		beforeCreate () {
			this.form = this.$form.createForm(this, {})
		},
	}
</script>
