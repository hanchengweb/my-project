<template>
	<div class="" id="analysisMain">
		<a-row :gutter="16" type="flex">
			<a-col :span="6" v-for="menu in menuList" :key="menu.route">
				<a-card :bordered="true" class="selfCard">
					<div class="mainMenu">
						<img :src="`/static/img/analysis/menu/${menu.route}.png`" alt="">
						<p class="title">{{menu.name}}</p>
					</div>
					<a-row :gutter="16" class="subMenu hide">
						<a-col :span="12" v-for="subMenu in menu.children" :key="subMenu.route"
							   @click="onClick(subMenu)">
							<img :src="`/static/img/analysis/menu/sub/${subMenu.route}.png`" alt="">
							<p class="title">{{subMenu.name}}</p>
						</a-col>
					</a-row>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>
<script>
	import {analysisMenu} from '../../api/tempData'

	export default {
		data () {
			return {
				menuList: []
			}
		},
		methods: {
			onClick (menu) {
				if (menu.route) this.$router.push({path: `/analysis/${menu.route}`})
			}
		},
		created () {
			this.menuList = this.$store.state.app.subMenuList['analysis']
		}
	}
</script>
<style lang="less">
	#analysisMain {
		padding: 0 10px;
		.selfCard {
			margin-bottom: 16px;
			cursor: pointer;
			min-height: 200px;
			.subMenu {
				display: none;
			}
			&:hover {
				-moz-box-shadow: 0px 0px 12px #ddd;
				-webkit-box-shadow: 0px 0px 12px #ddd;
				box-shadow: 0px 0px 12px #ddd;
				.mainMenu {
					display: none;
					opacity: 0;
				}
				.subMenu {
					opacity: 1;
					display: block;
				}
			}
			.mainMenu {
				opacity: 1;
				.title {
					font-size: 14px;
					color: #333;
					margin-top: 8px;
				}
			}

			.subMenu {
				opacity: 0;
				.title {
					font-size: 12px;
				}
				.ant-col-12 {
					margin-bottom: 20px;
				}
			}
		}
	}

</style>
