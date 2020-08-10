<template>
	<div id="erors-404">
		<p>
			sorry!该页面404了!
			<router-link to="" @click="tonext">返回首页</router-link>
		</p>
	</div>
</template>
<style lang="less">
	#erors-404 {
		width: 100%;
		background-color: #fff !important;
		p {
			font-size: 18px;
			text-align: center;
			padding: 100px 0;
			a {
				display: block;
				margin-top: 30px;
			}

		}

	}
</style>
