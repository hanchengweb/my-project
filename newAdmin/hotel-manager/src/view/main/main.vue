<template>
  <div :class="{'mains':true,'hideMenu':getSlideMenuVisible||!showSlideMenu}">
    <headerBar></headerBar>
    <!-- 侧边栏 -->
    <slideMenu v-show="showSlideMenu"></slideMenu>
    <hotelChoseModal :visible="isEmptyObject(getChoseHotel)"></hotelChoseModal>
    <div class="main">
      <hotelChose v-if="getShowHotelChoseStatus"
                  class="selfHotelChose"></hotelChose>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>
<script>
import headerBar from './components/headerBar/headerBar'
import slideMenu from './components/slideMenu/slideMenu'
import { mapState, mapActions } from 'vuex'
import { showSlideMennuArr } from '../../api/hotelBaseData'
import hotelChose from '../../view/common/hotelChose/hotelChose'
import hotelChoseModal from '../../view/common/hotelChose/hotelChoseModal'
import { isEmptyObject } from '../../libs/tool'

export default {
  components: {
    headerBar,
    slideMenu,
    hotelChose,
    hotelChoseModal
  },
  data () {
    return {
      showSlideMenu: false
    }
  },
  computed: {
    ...mapState({
      getSlideMenuVisible: state => state.app.slideMenuVisible,
      getShowHotelChoseStatus: state => state.common.showHotelChoseStatus,
      getChoseHotel: state => state.common.choseHotel
    })
  },
  watch: {
    $route (to, from) {
      this.showSlideMenu = showSlideMennuArr.indexOf(to.fullPath.split('/')[1].toLocaleLowerCase()) > -1 && to.name !== 'AnalysisMain'
    }
  },
  methods: {
    isEmptyObject,
    ...mapActions([
      'handleShowHotelChoseStatus'
    ])
  },
  created () {
    this.showSlideMenu = showSlideMennuArr.indexOf(this.$route.fullPath.split('/')[1].toLocaleLowerCase()) > -1 && this.$route.name !== 'AnalysisMain'

    if (this.$route.matched[0].name === 'Analysis' && this.$route.matched[1].name !== 'AnalysisMain' && isEmptyObject(this.$store.state.common.choseHotel)) {
      this.handleShowHotelChoseStatus(true)
    } else {
      this.handleShowHotelChoseStatus(false)
    }
  }
}
</script>
<style lang="less">
.mains {
  height: 100%;
  width: 100%;
  position: relative;
  padding-top: 48px;
  padding-left: 182px;
  -webkit-transition: padding-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: padding-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: padding-left, background, padding;
  transition-duration: 0.3s, 0.3s, 0.15s;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1),
    cubic-bezier(0.645, 0.045, 0.355, 1), cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0s, 0s, 0s;
  &.hideMenu {
    padding-left: 0;
    .slideMenu {
      width: 0;
      overflow: hidden;
    }
  }
  .main {
    padding-top: 6px;
    height: 100%;
    position: relative;
    .selfHotelChose {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 6px;
      z-index: 20;
      .tableSelf {
        margin-left: -1px;
        margin-top: 1px;
      }
    }
    .view {
      height: 100%;
    }
  }
}
</style>
