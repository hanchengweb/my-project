<template>
	<div id="mySpace">
		<div class="content">
			<div class="sub userCont">
				<p class="title"><img src="/static/img/mySpace/user.png" alt=""/>用户登录信息</p>
				<div class="clearfix cont">
					<img src="/static/img/mySpace/baseUser.png" alt="" style="height: 110px;display: block" class="fl"/>
					<p class="fl">
						<span class="block name">{{userData.name||'名称'}}</span>
						<span class="block">账号:{{userData.code||'暂无'}}</span>
						<span class="block">部门:{{userData.dept||'暂无'}}</span>
						<span class="block">关联酒店:{{userData.hotel||'暂无'}}</span>
					</p>
				</div>
			</div>
			<div class="sub psdCont">
				<p class="title"><img src="/static/img/mySpace/psd.png" alt=""/>用户修改密码</p>
				<div class="clearfix cont">
					<a-form class="ant-advanced-search-form"
							:form="form">
						<a-row>
							<a-col :span="24" v-for="(item,key) in labels" :key="`self-form-${key}`">
								<a-form-item v-bind="formItemLayout" :label="item.name"
											 :validateStatus="item.validateStatus" :help="item.help">
									<a-input
										@change="onChange(key)"
										type="password"
										v-decorator="[key, {rules:[{required:true,message:`请输入${item.name}!`}]}]"
										:placeholder="`请输入${item.name}`"/>
								</a-form-item>
							</a-col>
						</a-row>
						<a-row style="margin-top: 20px">
							<a-col :span="4"></a-col>
							<a-col :span="16" style="text-align: left">
								<a-button type="primary" @click="submit" :loading="loading">保存</a-button>
							</a-col>
						</a-row>
					</a-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {getData} from '../../api/common'
	import {mapActions, mapState} from 'vuex'
	import {loginOut} from '@/libs/axios'

	export default {
		beforeCreate () {
			this.form = this.$form.createForm(this, {})
		},
		created () {
			this.userData = this.$store.state.user.user
			this.userData.dept = this.$store.state.user.dept.name
			this.userData.hotel = this.$store.state.common.choseHotel.name
		},
		computed: {

			...mapState({
				getChoseHotel: state => state.common.choseHotel,
			})
		},
		watch: {
			getChoseHotel (val) {
				this.userData.hotel = val.name
			},
		},
		methods: {
			onChange (key) {
				this.labels.newpass1.validateStatus = ''
				this.labels.newpass1.help = ''
			},
			submit () {
				this.form.validateFields((error, data) => {

					if (error) {
						if (error.hasOwnProperty('newpass1')) {
							this.labels.newpass1.validateStatus = 'error'
							this.labels.newpass1.help = '请输入相同的新密码!'
						}
						return false
					}
					if (data.newpass != data.newpass1) {
						this.labels.newpass1.validateStatus = 'error'
						this.labels.newpass1.help = '请输入相同的新密码!'
						return false
					}
					this.loading = true

					getData({
						name: 'r_password_post',
						data: data
					}).then(res => {
						this.loading = false
						if (res.code == '200') {
							this.$message.success('修改成功!即将前往登录页面!', 1, () => {
								this.form.resetFields()
								loginOut()
							})
						}
					}, error => {
						this.loading = false
					})

				})

			}
		},
		data () {
			return {
				loading: false,
				userData: {},
				formItemLayout: {
					labelCol: {span: 4},
					wrapperCol: {span: 14},
				},
				labels: {
					oldpass: {
						name: '旧密码',
					},
					newpass: {
						name: '新密码',
					},
					newpass1: {
						name: '重复新密码',
					},

				}
			}
		}
	}
</script>
<style lang="less">
	#mySpace {
		height: 100%;
		margin: 6px 11px 0;
		background: #fff;

		.ant-advanced-search-form .ant-form-item {
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
			padding: 5px 0;
			background: #F0F2F4;
			color: #666666;

			label {
				font-size: 12px;
			}

		}

		.ant-form-item-control-wrapper {
			margin-top: 4px;
			padding-left: 9px;

			.ant-form-item-control {
				position: relative;

				.ant-form-explain {
					position: absolute;
					left: calc(100% + 15px);
					width: 100%;
					text-align: left;
					top: 12px;
				}
			}

			input, textarea {
				border-radius: 0 !important;
			}

			textarea {
				margin-bottom: 0 !important;
			}
		}

		.content {
			padding: 10px 48px;

			.sub {
				padding: 10px 27px;

				&.psdCont {
					padding-top: 20px;
				}

				&.userCont {
					border-bottom: 1px solid #eee;

					.cont {
						padding-top: 20px;
						padding-bottom: 20px;

						img {
							display: block;
							padding-right: 20px;
						}

						span {
							font-size: 14px;
							text-align: left;
							line-height: 26px;
							color: #999;

							&.name {
								color: #333;
								line-height: 30px;
								font-size: 16px;
							}
						}
					}
				}

				.cont {
					padding: 20px 71px
				}

				.title {
					color: #4596E0;
					text-align: left;
					font-size: 14px;
					line-height: 30px;

					img {
						margin: -5px 5px -5px;
					}
				}
			}
		}
	}
</style>
