<template>
	<div class="headerBar">
		<img src="/static/img/login/title.png" alt="" class="title"/>
		<userLogo></userLogo>
		<a-menu
			v-model="current"
			:mode="mode"
			@select="onSelect"
		>
			<a-menu-item v-for="item in menuList" :key="item.route||`${Math.random()}`">
				<!--<a-icon :type="item.icon"/>-->
				<img :src="`/static/img/main/headerBar/${item.route}.png`" class="imgIcon" alt="">
				{{item.name}}
			</a-menu-item>
		</a-menu>
	</div>
</template>
<script>
import userLogo from './user'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    userLogo
  },
  data () {
    return {
      current: [''],
      mode: 'horizontal',
      menuList: []
    }
  },
  watch: {
    current (val) {

    },
    $route (to, from) {
      if (to.name === 'mySpace') {
        this.current = ['']
        this.handleCurrentName('')
      } else {
        let name = to.matched[0].name
        name = name === 'extra' && to.meta && to.meta.matchKey ? to.meta.matchKey : name
        this.current = [name]
        this.handleCurrentName(name)
      }
      if (from.name === 'mySpace') {
        const name = to.matched[0].name
        this.current = [name]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleCurrentName'
    ]),

    onSelect (e) {
      const val = e.selectedKeys
      const subMenuList = this.$store.state.app.subMenuList,
        name = val[0][0].toLowerCase() + val[0].substring(1)
      !subMenuList[name] && this.$router.push({name: name})
      if (name === 'analysis') this.$router.push({name: 'Analysis'})
      this.handleCurrentName(name)
    },
    getCurrent () {
      if (this.$route.matched) {
        let name = this.$route.matched[0].name, to = this.$route
        name = name === 'extra' && to.meta && to.meta.matchKey ? to.meta.matchKey : name
        this.current = [name]
      }
    }
  },
  created () {
    this.getCurrent()
    this.menuList = this.$store.state.app.menuList
  }
}
</script>
<style lang="less">
	.headerBar {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;

		.title {
			position: absolute;
			left: 20px;
			height: 26px;
			display: block;
			top: 11px;
		}

		.ant-menu-horizontal > .ant-menu-item:hover, .ant-menu-horizontal > .ant-menu-submenu:hover, .ant-menu-horizontal > .ant-menu-item-active, .ant-menu-horizontal > .ant-menu-submenu-active, .ant-menu-horizontal > .ant-menu-item-open, .ant-menu-horizontal > .ant-menu-submenu-open, .ant-menu-horizontal > .ant-menu-item-selected, .ant-menu-horizontal > .ant-menu-submenu-selected {

			border-bottom: 0 solid #1890ff;
			color: #fff;
		}

		.ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu {
			top: 0;
		}

		.ant-menu-horizontal {
			border-bottom-width: 0;
			text-align: left;
		}

		.ant-menu {
			padding-left: 400px;
			background-color: #0084C9;
			color: #fff;
			font-size: 14px;
			line-height: 48px;
			height: 48px;

			.ant-menu-item {
				border-left: 1px solid #75D0FF;
				border-right: 1px solid #75D0FF;
				margin-left: -1px;
				border-bottom-width: 0;
				min-width: 130px;
				text-align: center;

				.imgIcon {
					margin: -10px 0;
				}

				&:hover {
					border-bottom-width: 0;
					color: #fff;
				}

				&.ant-menu-item-selected {
					background: #0ACAC7;
				}
			}
		}
	}
</style>
