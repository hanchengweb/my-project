<template>
  <div class="buttonLineSearchSelf clearfix"
       ref="buttonLineSearch">

    <a-button-group class="baseAntBtn fl">
      <a-button :icon="getBtnStatus?`menu-unfold`:`menu-fold`"
                style="font-size: 24px;padding: 0;min-width: 40px;"
                v-if="((table && !isEmptyObject(table) &&table.type=='main')||isAnalysis ||isHotel) && !table.hideMenuFold && showMenuBtnStatus"
                @click="changeLeftVisible"></a-button>
      <a-button style="font-size: 14px;width: 80px;overflow: hidden"
                class="hotelChoseBtn"
                v-if="isAnalysis || table.showHotel||isHotel||search.showHotel"
                :title="getChoseHotel.name||'酒店'"
                @click="hotelChose">
        <a-icon type="home"
                style="font-size: 16px;" />
        <!--{{getChoseHotel.name||'酒店'}}-->
        酒店
        <!--<a-icon type="double-right"/>-->
      </a-button>
      <a-button @click="showSearch"
                v-if="showSearchBtn && isSys && !isHotel"
                v-show="!table.hideSearch"
                style="width: 70px">查询
        <a-icon :type="searchVisible?`double-left`:`double-right`" />
      </a-button>
      <!-- 广告查询酒店选择按钮 -->
      <a-button style="font-size: 14px;width: 80px;overflow: hidden"
                class="hotelChoseBtn"
                v-if="table.hotelSreach"
                title="酒店"
                @click="hotelSreach">
        <a-icon type="home"
                style="font-size: 16px;" />
        酒店
      </a-button>
      <!-- 计划审核自定义查询 -->
      <a-button @click="custSreach"
                v-if="table.custSreach"
                icon="plus"
                style="width: 70px">查询
        <sup title="1" v-show="table.custSreach.showDot" class="ant-scroll-number ant-badge-dot" data-show="true" style="top:8px;right:14px !important"></sup>
        <!-- <a-icon type="plus" /> -->
      </a-button>
      <a-button @click="showBtnLine"
                class="showOperationBtnLine"
                style="font-size: 24px;"
                icon="bars"
                v-if="isSys&& !isHotel"
                v-show="searchVisible"></a-button>

    </a-button-group>

    <!--<hotelChose></hotelChose>-->

    <div class="operation"
         :class="{'operationSearch':(searchVisible && table.type=='sub')||table.hideMenuFold||search.hideMenuFold,'hotelOperation':(table.showHotel && table.type=='main')|| search.showHotel}"
         v-show="searchVisible"
         v-if="table&&!isEmptyObject(table)">
      <buttonLine class="operationBtnLine hide"
                  :buttons="table.buttons"
                  :data="data"
                  :urls="table.urls"
                  :type="table.type"
                  v-if="isSys && !isHotel"
                  v-show="!table.hideButtons"
                  :name="name"
                  @show-modal="showModal"></buttonLine>
    </div>
    <a-button-group class="actionsBtnGroup"
                    v-show="!searchVisible"
                    v-if="table&&!isEmptyObject(table)">
      <buttonLine :buttons="table.buttons"
                  :data="data"
                  :urls="table.urls"
                  :type="table.type"
                  v-if="!table.hideButtons && isSys && !isHotel"
                  :name="name"
                  @show-modal="showModal"></buttonLine>
    </a-button-group>
    <div class="fl btnSearchPart"
        :style="newStyle"
         :class="{leftSearchCls:(searchVisible && table.type=='sub')|| table.hideMenuFold||(search.showHotel && search.hideMenuFold),leftPositionSearchCls:isSys && !isHotel && table.type=='main' && table.showHotel,'hotelSearchCls':isAnalysis || table.showHotel||isHotel||(search.showHotel && !search.hideMenuFold)}">
      <search class="searchPart"
              :search="search"
              ref="search"
              :toResetStatus="toResetStatus"
              :class="{}"
              v-show="searchVisible||isAnalysis||isHotel||search.showSearchStatus"></search>
    </div>

    <!--<div class="fr clearfix inOut">-->
    <!--<img src="/static/img/components/buttonLine/in.png" alt="" class="block fl mr-18 pointer"/>-->
    <!--<img src="/static/img/components/buttonLine/out.png" alt="" class="block fl pointer"/>-->
    <!--</div>-->
  </div>
</template>
<script>
import buttonLine from '@/components/buttonLine/buttonLine'
import search from '@/components/search/search'
import { treeTabs } from '../../api/hotelBaseData'
import { mapState, mapActions } from 'vuex'
import { isEmptyObject } from '../../libs/tool'

export default {
  props: {
    data: {},
    table: {},
    search: {},
    name: ''
  },
  components: {
    buttonLine,
    search
  },
  data () {
    return {
      btnVisible: false,
      searchVisible: false,
      type: '',
      isSys: false,
      isHotel: false,
      isAnalysis: false,
      toResetStatus: false,
      newStyle: '', // 自定查询展开后的
      showMenuBtnStatus: true // 当前页面如果有侧菜单栏,即slideMenu存在,显示,在created中判断
    }
  },
  created () {
    if (!this.table || isEmptyObject(this.table)) {
      this.searchVisible = true
    }
    this.isSys = this.$route.matched[0].name === 'Sys' || this.$route.matched[0].name === 'Card' || this.$route.matched[0].name === 'Advert'
    this.isAnalysis = this.$route.matched[0].name === 'Analysis'
    this.isHotel = this.table.type === 'hotel'
    if (this.name == 'programCredit' || this.name == 'programSignHistory' || this.name == 'programSignCurrent' || this.name == 'programUser' || this.name == 'memberWechat' || this.name == 'memberCreditExpend') {
      this.isAnalysis = false
      this.isSys = true
    }
    this.showMenuBtnStatus = !!this.$store.state.app.subMenuList[this.$store.state.app.currentName.toLowerCase()]// 当前页面如果有侧菜单栏,即slideMenu存在,显示,在created中判断
    if (this.table.noHideSearch) {
      this.toResetStatus = this.searchVisible
      this.searchVisible = !this.searchVisible
      this.btnVisible = false
      this.newStyle = 'left:0 !important;width:calc(100% - 0px) !important'
    }
  },
  mounted () {
    document.getElementsByTagName('body')[0].onclick = (e) => {
      if (e && e.target && e.target.classList.contains('showOperationBtnLine')) {
        return false
      }
      if (document.getElementsByClassName('operationBtnLine') && document.getElementsByClassName('operationBtnLine').length) {
        for (let i = 0; i < document.getElementsByClassName('operationBtnLine').length; i++) {
          if (document.getElementsByClassName('operationBtnLine')[i].classList.contains('show')) {
            document.getElementsByClassName('operationBtnLine')[i].classList.remove('show')
            document.getElementsByClassName('operationBtnLine')[i].classList.add('hide')
          }
        }
      }
    }
  },
  watch: {
    getTabs (val) {
      if (this.table.type === 'sub') {
        this.searchVisible = false
      }
    },
    $route (to, from) {
      if (to.matched[0].name === 'Analysis' && to.matched[1].name !== 'AnalysisMain' && isEmptyObject(this.$store.state.common.choseHotel)) {
        this.handleShowHotelChoseStatus(true)
      } else {
        this.handleShowHotelChoseStatus(false)
      }
    },
    searchVisible (val) {
    },
    showHotelChoseStatus (val) {
      this.isHotel = val
    }
  },
  computed: {
    showSearchBtn () {
      return this.table && this.table.type && (this.table.type == 'main' || (this.table.type == 'sub' && this.search[this.name] && this.search[this.name].nameArray && this.search[this.name].nameArray.length))
    },
    ...mapState({
      getTabs: state => state.data.tabs,
      getChoseHotel: state => state.common.choseHotel,
      getSlideMenuVisible: state => state.app.slideMenuVisible,
      showHotelChoseStatus: state => state.common.showHotelChoseStatus
    }),
    getBtnStatus () {
      // if (treeTabs.indexOf(this.$route.name) > -1) {
      // 	this.$store.commit('setTreeVisible', !this.$store.state.app.treeVisible)
      // } else {
      // 	this.$store.commit('setSlideMenuVisible', !this.$store.state.app.slideMenuVisible)
      // }
      return treeTabs.indexOf(this.$route.name) > -1 ? this.$store.state.app.treeVisible : this.$store.state.app.slideMenuVisible
    }
  },
  methods: {
    ...mapActions([
      'handleShowHotelChoseStatus'
    ]),
    hotelChose () {
      if (this.$store.state.common.showHotelChoseStatus && isEmptyObject(this.$store.state.common.choseHotel)) {
        this.$message.info('请先选择酒店再进行操作!')
        return false
      }
      this.handleShowHotelChoseStatus(!this.$store.state.common.showHotelChoseStatus)
    },
    isEmptyObject,
    showModal (data) {
      this.$emit('show-modal', data)
    },
    showBtnLine (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        window.event.returnValue == false
      }

      if (document.getElementsByClassName('operationBtnLine') && document.getElementsByClassName('operationBtnLine').length) {
        if (this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].classList.contains('hide')) {
          this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].classList.remove('hide')
          this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].classList.add('show')
        } else {
          this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].classList.remove('show')
          this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].classList.add('hide')
        }
      }
      this.btnVisible = !this.btnVisible
      // if (this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].style.display == 'none' && this.btnVisible) {
      // 	console.log(this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].style)
      // 	this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].style.display = ''
      // 	console.log(this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].style.cssText)
      // 	console.log(this.$refs.buttonLineSearch.getElementsByClassName('operationBtnLine')[0].style.display)
      // 	this.btnVisible = true
      // } else {
      // 	this.btnVisible = !this.btnVisible
      // }
    },
    showSearch () {
      // if (!this.searchVisible) {
      // 	console.log(this.$store.state.data.search)
      // 	this.toResetStatus = true
      // } else {
      // 	this.toResetStatus = false
      // }
      this.toResetStatus = this.searchVisible
      // if (this.searchVisible) return false
      this.searchVisible = !this.searchVisible
      this.btnVisible = false
    },
    custSreach () {
      this.table.custSreach.btnClick()
    },
    hotelSreach () {
      this.table.hotelSreach.btnClick()
    },
    changeLeftVisible () {
      // this.$store.commit('setSlideMenuVisible')
      if (treeTabs.indexOf(this.$route.name) > -1) {
        this.$store.commit('setTreeVisible', !this.$store.state.app.treeVisible)
      } else {
        this.$store.commit('setSlideMenuVisible', !this.$store.state.app.slideMenuVisible)
      }
    }
  }
}
</script>
<style lang="less">
.buttonLineSearchSelf {
  text-align: left;
  background-color: #fff;
  /*margin-left: -1px;*/
  position: relative;

  .ant-btn-group > .ant-btn:only-child {
    border-radius: 0;
  }

  .hotelChoseBtn {
    /*span {*/
    /*width: calc(100% - 42px);*/
    /*overflow: hidden;*/
    /*}*/
  }

  .actionsBtnGroup {
    .ant-btn {
      //width: 70px;
      min-width: 70px;
      padding: 0 5px;

      &:first-child {
        //margin-left: -1px;
      }
    }

    .buttonLineSelf .ant-btn-group > .ant-btn:first-child:not(:last-child),
    .buttonLineSelf
      .ant-btn-group
      > span:first-child:not(:last-child)
      > .ant-btn {
      border-left-width: 0;
    }
  }

  /*.ant-btn:visited {*/
  /*!*color: #333;*!*/
  /*!*border-color: rgb(217, 217, 217);*!*/
  /*}*/

  .ant-btn {
    &:focus {
      color: #666;
      border-color: rgba(217, 217, 217);
    }

    &:hover {
      color: rgb(45, 214, 206);
      border-color: rgb(45, 214, 206);

      &[disabled="disabled"] {
        border-color: rgba(217, 217, 217);
      }
    }

    &:active,
    &.active {
      color: #666;
      border-color: rgba(217, 217, 217);
    }
  }

  .inOut {
    img {
      height: 24px;
    }
  }

  .ant-btn.disabled,
  .ant-btn[disabled],
  .ant-btn.disabled:hover,
  .ant-btn[disabled]:hover,
  .ant-btn.disabled:focus,
  .ant-btn[disabled]:focus,
  .ant-btn.disabled:active,
  .ant-btn[disabled]:active,
  .ant-btn.disabled.active,
  .ant-btn[disabled].active {
    color: rgba(82, 82, 82, 0.23);
    background-color: rgba(0, 0, 0, 0);
  }

  .btnSearchPart {
    width: calc(100% - 168px);
    position: absolute;
    left: 168px;
    top: 0;
    z-index: 10;

    &.leftSearchCls {
      left: 129px;
      width: calc(100% - 129px);
    }

    &.hotelSearchCls {
      left: 120px;
      width: calc(100% - 120px);
    }

    &.leftPositionSearchCls {
      left: 250px;
      width: calc(100% - 250px);
    }

    .searchPart {
      margin-bottom: 0;
      height: 42px;

      .ant-advanced-search-form {
        padding: 6px;
        min-width: 780px;
      }
    }
  }

  .operation {
    position: absolute;
    left: 39px;
    top: 42px;
    z-index: 11;

    .ant-btn-group .ant-btn + .ant-btn,
    .ant-btn + .ant-btn-group,
    .ant-btn-group span + .ant-btn,
    .ant-btn-group .ant-btn + span,
    .ant-btn-group > span + span,
    .ant-btn-group + .ant-btn,
    .ant-btn-group + .ant-btn-group {
      margin-left: 0;
    }

    &.operationSearch {
      left: 0;
    }

    &.hotelOperation {
      left: 166px;
    }

    .ant-btn {
    }

    .operationBtnLine {
      position: absolute;
      z-index: 11;
      border: 1px solid #e0e0e2;
      width: 129px;
      height: auto;
      background-color: #fff;
      overflow: hidden;

      .ant-btn {
        width: 100%;
        border-width: 0;
        border-bottom-width: 1px;
        border-bottom-color: rgba(6, 6, 6, 0.05);

        &:first-child {
          width: 100%;
        }

        &:last-child {
          border-bottom-width: 0;
        }
      }
    }
  }

  .baseAntBtn {
    .ant-btn {
      border-top-width: 0;
      border-bottom-width: 0;
      font-size: 12px;
      line-height: 42px;
      height: 42px;
      min-width: 60px;
      padding: 0 5px;
    }

    .operation {
      .ant-btn {
      }
    }

    & > .ant-btn:first-child:not(:last-child),
    & > span:first-child:not(:last-child) > .ant-btn {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      border-left-width: 0;
    }

    & > .ant-btn:last-child:not(:first-child),
    & > span:last-child:not(:first-child) > .ant-btn {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
  }
}
</style>
