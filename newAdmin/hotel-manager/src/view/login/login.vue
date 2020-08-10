<script type="text/jsx">
import {Form} from 'ant-design-vue'
import {mapActions} from 'vuex'
import {isEmptyObject} from '../../libs/tool'

const NormalLoginForm = {
  data () {
    return {
      verifycode: {},
      plusLogin: {
        syscode: 'hotel-manager'
      },
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getMenuList',
      'handleCurrentName',
      'handleShowHotelChoseStatus',
      'getUserHotel',
      'handleChoseHotel'
    ]),
    getHotelUser () {

    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this.handleLogin({...values, ...this.plusLogin}).then(res => {
            if (!res) this.loading = false
            this.handleChoseHotel({})
            res && this.getMenuList(this.plusLogin).then(() => {
              this.getUserHotel(res.user).then(res1 => {
                this.loading = false
                if (res1 && !isEmptyObject(res1) && !isEmptyObject(res1.hotel)) {
                  this.handleChoseHotel(res1.hotel)
                }
                // this.handleCurrentName('home')
                // this.$router.push({path: '/home'})
                this.handleShowHotelChoseStatus(false)
                this.$router.push({path: '/'})
              }, err => {
                this.loading = false
              })
            }, err => {
              this.loading = false
            })
            // this.$router.push({path: '/home'})
          }, err => {
            this.loading = false
          })
        }
      })
    }

  },
  render () {
    const {
      getFieldDecorator
    } = this.form
    return (
      <div class="loginSelf">
        <div class="loginBox">
          <img src="/static/img/login/title.png" alt="" class="titlePng"/>
          <a-form id='components-form-demo-normal-login' onSubmit={this.handleSubmit} class='login-form'>
            <a-form-item>
              {getFieldDecorator('usercode', {
                rules: [{required: true, message: '请输入您的账号!'}]
              })(
                <a-input prefix={<a-icon type='user'
															 style={{color: 'rgba(255,255,255,1)', fontSize: '20px'}}/>}
											 placeholder='请输入您的账号'/>
              )}
            </a-form-item>
            <a-form-item>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入您的密码!'}]
              })(
                <a-input prefix={<a-icon type='lock'
															 style={{color: 'rgba(255,255,255,1)', fontSize: '20px'}}/>}
											 type='password' placeholder='请输入您的密码'/>
              )}
            </a-form-item>
            <a-form-item class="passwordPart">
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <a-checkbox style="float:left">记住密码</a-checkbox>
              )}
              <a class='login-form-forgot' href='javascript:void(0)' style="float:right">忘记密码?</a>
            </a-form-item>
            <a-form-item class="btn">
              <a-button type='primary' htmlType='submit' class='login-form-button'
										  loading={this.loading}>
                {this.loading ? '正在登录' : '登录'}
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <p style="text-align: center;color: #fff;font-size: 14px;position: fixed;bottom: 20px;width: 100%;">CopyRight2017-2019 浙江省通信管理局版权所有 浙ICP备15041647号-1</p>
      </div>
    )
  }
}

export default Form.create({})(NormalLoginForm)

</script>
<style lang="less">
	@media screen and (max-width: 1280px ) {
		.loginSelf {
			.loginBox {
				transform: scale(.85, .85);
				-ms-transform: scale(.85, .85); /* IE 9 */
				-moz-transform: scale(.85, .85); /* Firefox */
				-webkit-transform: scale(.85, .85); /* Safari 和 Chrome */
				-o-transform: scale(.85, .85); /* Opera */
			}
		}
	}

	.loginSelf {
		width: 100%;
		height: 100%;
		background: url("/static/img/login/login.png") #121143 no-repeat center center;
		background-size: cover;
		display: flex;
		min-height: 100vh;
		margin: 0;

		input:-webkit-autofill {
			transition: background-color 5000s ease-in-out 0s;
			-webkit-text-fill-color: #fff;
		}

		input {
			background-color: rgba(255, 255, 255, 0.6);
			color: #fff !important;
		}

		.loginBox {
			width: 576px;
			height: 513px;
			margin: auto;
			text-align: center;
			background: rgba(0, 59, 93, .5);

			.titlePng {
				padding-top: 40px;
				margin-bottom: 46px;
			}

			.login-form {
				width: 382px;
				margin: 0 auto;

				.ant-input {
					background: rgba(0, 0, 0, 0);
					line-height: 54px;
					height: 54px;
					color: #fff;
					font-size: 14px;
					border-color: #fff;
					padding-left: 48px;

					&::-webkit-input-placeholder {
						color: #fff;
					}

					/* 使用webkit内核的浏览器 */

					&:-moz-placeholder {
						color: #fff;
					}

					/* Firefox版本4-18 */

					&::-moz-placeholder {
						color: #fff;
					}

					/* Firefox版本19+ */

					&:-ms-input-placeholder {
						color: #fff;
					}

					/* IE浏览器 */
				}

				.passwordPart {
					color: #fff;
					font-size: 12px;
					margin-top: -30px;

					.login-form-forgot {
						color: #fff;
						font-size: 12px;
					}
				}

				.btn {
					margin-top: -10px;
				}

				.ant-form-item {
					margin-bottom: 45px;

					.ant-form-explain {
						text-align: left;
						position: absolute;
					}
				}

				.ant-form-item-children {
					width: 100%;
					display: block;

					.ant-checkbox-wrapper {
						color: #fff;
						font-size: 12px;

						.ant-checkbox-inner {
							background-color: rgba(0, 0, 0, 0);
						}

					}
				}

				.ant-btn-primary {
					width: 100%;
					background: #0084C9;
					border-color: #0084C9;
					line-height: 54px;
					height: 54px;
					font-size: 20px;
				}
			}
		}
	}
</style>
