<template>
	<div class="topCommonHome clearfix">
		<a-button icon="home" @click="backHome" type="primary" class="fl">{{backName||'首页'}}
			<a-icon type="rollback"/>
		</a-button>
		<span class="name">{{name}}</span>
	</div>
</template>
<script>
	export default {
		props: {
			name: '',
			backFun: {},
			backName: ''
		},
		methods: {
			backHome () {
				if (this.backFun) {
					this.backFun()
				} else {
					this.$router.go(-1)
				}

			}
		}
	}
</script>
<style lang="less">
	.topCommonHome {
		height: 40px;
		background-color: #fff;

		.name {
			font-size: 16px;
			color: #666;
			display: inline-block;
			line-height: 40px;
		}

		.ant-btn {
			margin-top: 4px;
			border-radius: 0;
		}
	}
</style>
