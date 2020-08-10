<template>
	<a-locale-provider :locale="locale">
		<div id="app">
			<router-view/>
		</div>
	</a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {mapActions} from 'vuex'
import {getRouters, TOKEN_KEY} from '@/libs/util'
import Cookies from 'js-cookie'

export default {
  name: 'App',
  data () {
    return {
      locale: zhCN,
      menuList: []
    }
  },
  computed: {
    getList () {
      return this.$store.state.app.menuList
    }
  },
  watch: {
    $route (to, from) {
      this.changeAppMinHeight(to)
    }
  },
  created () {
    this.$router.addRoutes(getRouters(this.$store.state.app.menuList).concat([{
      path: '*',
      redirect: '/404'
    }]))
    this.handleTree({})
    this.handleShowHotelChoseStatus(false)

    this.$store.commit('setTreeVisible', false)
    this.$route.name !== 'Login' && Cookies.get(TOKEN_KEY) && this.getMenuList()
    window.onresize = (e) => {
      this.$store.commit('setOnresize', e)
    }

    /* document.body.onbeforeunload = (e) => {
				console.log(e)
				console.log('I am ready to refresh')
				alert('I am ready to refresh')
				this.$store.commit('onbeforeunload', e)
			}*/
  },
  methods: {
    ...mapActions([
      'handleTree',
      'getMenuList',
      'handleChoseTr',
      'handleTreeSelect',
      'handleShowHotelChoseStatus'
    ]),
    changeAppMinHeight (route) {
      document.getElementById('app').style.minHeight = route.name === 'home' ? '720px' : '100%'
    }
  },
  mounted () {
    this.changeAppMinHeight(this.$route)
  }
}

</script>
<style lang="less">
	@import 'assets/css/reset.css';
	@import 'assets/css/base';

	body {
		background-color: #F2F4F8 !important;

		p {
			margin-bottom: 0;
		}
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
		min-width: 1280px;
		min-height: 100%;
		overflow: hidden;

		.mains {
			height: 100%;
			overflow: auto;
			/*min-width: 1380px;*/
			/*.ant-table {
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
			}*/
		}
	}

</style>
