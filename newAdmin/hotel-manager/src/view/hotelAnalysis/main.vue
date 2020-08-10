<template>
	<div class="" id="analysisMain">
		<a-row :gutter="16" type="flex">
			<a-col :span="8" v-for="menu in menuList" :key="menu.route" style="margin-bottom: 16px">
				<a-card :bordered="true" class="selfCard">
					<div class="mainMenu">
						<div>
							<img :src="`/static/img/analysis/menu/${menu.route}.png`" alt=""/>
							<p class="title">{{menu.name}}</p>
							<p class="sub">{{menu.uri}}</p>
						</div>
					</div>
					<a-row :gutter="16" class="subMenu">
						<a-col :span="6" v-for="subMenu in menu.children" :key="subMenu.route"
							   @click="onClick(subMenu)">
							<img :src="`/static/img/analysis/menu/sub/${subMenu.route}.png`" alt=""
								 style="width: 40px;">
							<p class="title" style="font-size: 12px;">{{subMenu.name}}</p>
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
			console.log(this.menuList)
		}
	}
</script>
<style lang="less">
	#analysisMain {
		padding: 0 10px;

		.selfCard {
			//margin-bottom: 16px;
			cursor: pointer;
			/*min-height: 200px;*/
			/*height: 329px;*/
			//height: 100%;
			height: 250px;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			border: 1px solid #d8d8d8;
			overflow: hidden;

			.ant-card-body {
				position: relative;
				width: 100%;
				height: 100%;

			}

			.subMenu {
				//display: none;
				//	position: absolute;
				/*left: 0;*/
				/*top: 0;*/
				opacity: 0;
				z-index: 2;
				transform: translateY(150%);
				-ms-transform: translateY(150%);
				-webkit-transform: translateY(150%);
				-o-transform: translateY(150%);
				-moz-transform: translateY(150%);
				-webkit-transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
				transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
				transition-property: opacity, transform, padding;
				transition-duration: 0.3s, 0.3s, 0.15s;
				transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1);
				transition-delay: 0s, 0s, 0s;
			}

			&:hover {
				-moz-box-shadow: 0 0 12px #ddd;
				-webkit-box-shadow: 0 0 12px #ddd;
				box-shadow: 0 0 12px #ddd;

				.mainMenu {
					//display: none;
					opacity: 0;
				}

				.subMenu {
					opacity: 1;
					transform: translateY(0);
					-ms-transform: translateY(0);
					-webkit-transform: translateY(0);
					-o-transform: translateY(0);
					-moz-transform: translateY(0);
					//display: block;
				}
			}

			.mainMenu {
				opacity: 1;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				margin: 0 auto;
				display: flex;
				justify-content: center;
				align-items: center;

				-webkit-transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
				transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
				transition-property: opacity, background, padding;
				transition-duration: 0.3s, 0.3s, 0.15s;
				transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1);
				transition-delay: 0s, 0s, 0s;

				.title {
					font-size: 16px;
					color: #333;
					margin-top: 8px;
					font-weight: bold;
				}

				.sub {
					font-size: 12px;
					color: #888;
					margin-top: 18px;

				}

				img {
					margin-top: -10px;
				}
			}

			.subMenu {
				//opacity: 0;
				.title {
					font-size: 12px;
				}

				.ant-col-6 {
					margin-bottom: 20px;
				}
			}
		}
	}

</style>
