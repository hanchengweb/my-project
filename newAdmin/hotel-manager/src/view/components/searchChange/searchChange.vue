<template>
<div>
    <div class="clearfix">
      <div class="selectline clearfix">
          <div class="selectlineDiv">
              <span>归属类型：</span>
              <a-select  style="width: 118px" @change="(value)=>changeOwntype(value)" v-model="searchData.ownerTypeNam">
                  <a-select-option v-for="(item,index) in ownerTypeList" :value="item.code" :key="index">{{item.name}}</a-select-option>
              </a-select>
          </div>
          <div class="selectlineDiv">
              <button :class="[ownerTypeValue==1?'disabledClor':'' ,'ant-btn ant-colors selectBut']" :disabled="ownerTypeValue==1" v-if="ownType.length<=0" @click="selectObjs('ownType')">+添加归属标识匹配</button>
              <div class="selectResult ant-colors" v-else>
                  <span>{{selectOwnTypeObject}}</span>
                  <img class="selectCancle" src="/static/img/components/buttonLine/cancle.png" alt="" @click="cancleObs('ownType')">
              </div>
          </div>
      </div>
      <div class="selectline clearfix" style="padding-left:0;">
          <div class="selectlineDiv"  v-if="selectShow">
              <span>投放范围：</span>
              <a-select  style="width: 118px" @change="(value)=>changeScope(value)" v-model="searchData.scopeNam">
                  <a-select-option v-for="(item,index) in scopeList" :value="item.code" :key="index">{{item.name}}</a-select-option>
              </a-select>
          </div>
          <div class="selectlineDiv"  v-if="selectShow">
              <button :class="[scopeValue==1?'disabledClor':'' ,'ant-btn ant-colors selectBut']" :disabled="scopeValue==1" v-if="targetObject.length<=0" @click="selectObjs('targetObject')">+添加投放对象匹配</button>
              <div class="selectResult ant-colors" v-else>
                  <span>{{selecttargetObject}}</span>
                  <img class="selectCancle" src="/static/img/components/buttonLine/cancle.png" alt="" @click="cancleObs('targetObject')">
              </div>
          </div>
      </div>
    </div>
    <modalCompanyHotel :modalData="modalData"></modalCompanyHotel>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import modalCompanyHotel from './../modalCompanyHotel/modalCompanyHotel'
import { fullScreen } from '../../../assets/mixins/fullScreen'
import tabsTable from '@/components/tabsTable/tabsTable'
import searchSelf from '@/components/search/search'
import { getData } from '@/api/common'
import { getConst } from '@/api/hotelConst'
import { getCompany} from '@/libs/util'
export default {
  data () {
    return {
      visible: false,
      modalTitle: '添加归属标识匹配',
      ownType: '',
      targetObject: '',
      ownerTypeList: [],
      scopeList: [],
      modalData: {
        title: '关联投放对象',
        visible: false,
        first: true,
        planId: '',
        complete: this.complete
      },
      ownerTypeValue: '',
      scopeValue: '',
      selectOwnTypeObject: '',
      selecttargetObject: '',
      selectShow: true,
      searchData: {
        ownerTypeNam: '',
        scopeNam: ''
      }
    }
  },

  mixins: [fullScreen],
  props: {
    searchComplete: {}
  },
  components: {
    tabsTable,
    modalCompanyHotel,
    searchSelf
  },
  computed: {
    ...mapState({
      getChangeRefSearch: state => state.change.changeRefSearch
    })
  },
  watch: {
    getChangeRefSearch () {
      this.searchData.ownerTypeNam = ''
      this.searchData.scopeNam = ''
      this.searchComplete.completeOwntype('', '')
      this.searchComplete.completeScope('', '')
      this.ownType = ''
      this.selectOwnTypeObject = ''
      this.targetObject = ''
      this.selecttargetObject = ''
      this.ownerTypeValue = ''
      this.scopeValue = ''
    }
  },
  methods: {

    handleOk () {

    },
    complete (companyCode, hotelIds) {
      if (this.modalData.type == 'ownType') {
        this.ownType = 'ownType'
        if (hotelIds.length > 0) {
          // this.selectOwnTypeObject = companyCode[0].name + '，' + hotelIds[0].name
          this.selectOwnTypeObject = hotelIds[0].name
          this.searchComplete && this.searchComplete.completeOwntype && this.searchComplete.completeOwntype(this.ownerTypeValue, hotelIds[0].id)
        } else {
          this.selectOwnTypeObject = companyCode[0].name
          this.searchComplete && this.searchComplete.completeOwntype && this.searchComplete.completeOwntype(this.ownerTypeValue, companyCode[0].code)
        }
      } else if (this.modalData.type == 'targetObject') {
        this.targetObject = 'targetObject'
        if (hotelIds.length > 0) {
          // this.selecttargetObject = companyCode[0].name + '，' + hotelIds[0].name
          this.selecttargetObject = hotelIds[0].name
          this.searchComplete && this.searchComplete.completeScope && this.searchComplete.completeScope(this.scopeValue, hotelIds[0].id)
        } else {
          this.selecttargetObject = companyCode[0].name
          this.searchComplete && this.searchComplete.completeScope && this.searchComplete.completeScope(this.scopeValue, companyCode[0].code)
        }
      }
    },
    // 选择集团酒店
    selectObjs (type) {
      let modalTitle, selectValue
      if (type == 'ownType') {
        modalTitle = '添加归属标识匹配'
        selectValue = this.ownerTypeValue
      } else {
        modalTitle = '添加投放对象匹配'
        selectValue = this.scopeValue
      }
      // this.visible = true
      this.modalData.visible = true
      this.modalData.first = false
      this.modalData.type = type
      this.modalData.title = modalTitle
      this.modalData.selectValue = selectValue
    },
    // 删除选择的集团酒店
    cancleObs (type) {
      if (type == 'ownType') {
        this.ownType = ''
        this.selectOwnTypeObject = ''
      } else {
        this.targetObject = ''
        this.selecttargetObject = ''
      }
    },
    getOwnerType () { // 归属者类型
      getConst('ownerType').then(res => {
        this.ownerTypeList = res
        this.$forceUpdate()
      })
    },
    getScope () { // 投放范围
      getData({
        name: 'p_manager_selection_readPlanScope_get',
        data: {ownerType: this.ownerTypeValue},
        type: ''
      }).then(res => {
        this.scopeList = res.data
      })
    },
    changeOwntype (item) {
      this.ownerTypeValue = item
      if (item == 1) {
        this.searchComplete && this.searchComplete.completeOwntype && this.searchComplete.completeOwntype(this.ownerTypeValue, '')
      }
      if (this.$route.name == 'hotelSearch') {
        if (item == 2) {
          getData({
            name: 'h_company_findByCode_get',
            data: {code: JSON.parse(getCompany()).companyCode},
            type: ''
          }).then(res => {
            this.ownType = 'ownType'
            this.modalData.type = 'ownType'
            const companyCode = res.data.content
            const hotelIds = ''
            this.complete(companyCode, hotelIds)
          })
        }
        if (item == 3) {
          getData({
            name: 'h_company_findByCode_get',
            data: {code: JSON.parse(getCompany()).companyCode},
            type: ''
          }).then(res => {
            this.ownType = 'ownType'
            this.modalData.type = 'ownType'
            const companyCode = res.data.content
            const hotelIds = [{name: JSON.parse(getCompany()).hotelName, id: JSON.parse(getCompany()).hotelid}]
            this.complete(companyCode, hotelIds)
          })
        }
      }
      this.getScope()
      this.cancleObs('ownType')
    },
    changeScope (item) {
      this.scopeValue = item
      this.cancleObs('targetObject')
      if (item == 1) {
        this.searchComplete && this.searchComplete.completeScope && this.searchComplete.completeScope(this.scopeValue, '')
        return false
      }
      if (this.$route.name == 'hotelSearch') {
        if (item == 2) {
          getData({
            name: 'h_company_findByCode_get',
            data: {code: JSON.parse(getCompany()).companyCode},
            type: ''
          }).then(res => {
            this.targetObject = 'targetObject'
            this.modalData.type = 'targetObject'
            const companyCode = res.data.content
            const hotelIds = ''
            this.complete(companyCode, hotelIds)
          })
        }
        if (item == 3) {
          getData({
            name: 'h_company_findByCode_get',
            data: {code: JSON.parse(getCompany()).companyCode},
            type: ''
          }).then(res => {
            this.targetObject = 'targetObject'
            this.modalData.type = 'targetObject'
            const companyCode = res.data.content
            const hotelIds = [{name: JSON.parse(getCompany()).hotelName, id: JSON.parse(getCompany()).hotelid}]
            this.complete(companyCode, hotelIds)
          })
        }
      }
    }
  },
  created () {
    this.getOwnerType()
    this.getScope()
    if (this.$route.name == 'managerAdMaterial') {
      this.selectShow = false
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/modal/modal";
    .readTerminalHis {
        top:50px;
        .ant-modal-body {
            padding: 0 !important;
        }
    }
    .modalSelfPureupdate .fullScreenIcon{
        top:-37px !important
    }
    .clearfix {
        zoom: 1;
    }
    .clearfix:after{
        content: "020";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .selectline{
        text-align: left;
        background-color:#fff;
        padding:5px 20px;
        //border-bottom:1px solid #d9d9d9;
        font-size:12px;
        float:left;
        //height: 62px;
        .selectlineDiv{
            float: left;
            margin-right:20px
        }
        .selectResult{
            height: 32px;
            line-height: 32px;
            width: 300px;
            border-radius:4px;
            text-align: center;
            position: relative;
            .selectCancle{
                position: absolute;
                top: 5px;
                right: 12px;
                cursor: pointer;
            }
        }
        .selectBut{width:300px}
        .ant-colors{background-color: #0084c9;color: #fff}
        .disabledClor{background-color: #F5F5F5 !important;color: #D9D9D9 !important}
    }
</style>
