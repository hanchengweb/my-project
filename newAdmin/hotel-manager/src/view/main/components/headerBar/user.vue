<template>
	<div class="user clearfix">
		<!--<p class="fl" @click="toMySpace">
			<a-icon type="user" class="fl block"/>
			<span class="name fl block">{{userName}}</span></p>-->
		<img src="/static/img/main/header/user.png" style="height: 30px;margin-top: 9px;margin-right: 20px;cursor: pointer" @click="toMySpace" class="block fl" alt="">
		<a-icon type="poweroff" class="fl block" @click="loginOut"/>
	</div>
</template>
<script>
	import {loginOut} from '@/libs/axios'

	export default {
		data () {
			return {
				userName: '系统管理员'
			}
		},
		created () {
			this.userName = this.$store.state.user.userName
		},
		methods: {
			toMySpace () {
				if (this.$route.name==='mySpace'){
					this.$router.go(-1)
				} else{
					this.$router.push('/mySpace')
				}

			},
			loginOut () {
				this.$confirm({
					title: '退出登录?',
					content: '点击后,您将退出登录',
					centered: true,
					onOk () {
						return new Promise((resolve, reject) => {
							loginOut()
							resolve()
						}).catch(() => console.log('Oops errors!'))
					},
					onCancel () {
					},
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.user {
		position: absolute;
		right: 0;
		color: #fff;
		font-size: 24px;
		line-height: 48px;
		padding-right: 20px;

		i {
			font-size: 24px;
			line-height: 48px;
			cursor: pointer;
			margin: 4px 0;
		}

		p {
			cursor: pointer;
			margin-right: 30px;
		}

		.name {
			font-size: 14px;
			line-height: 48px;
			margin-left: 10px;

		}
	}
</style>
