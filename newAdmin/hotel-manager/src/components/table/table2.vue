<template>
  <div class="tableSelf"
       ref="tableSelf">
    <a-table :columns="columns"
             :dataSource="data"
             :loading="loading"
             :defaultExpandAllRows="true"
             :scroll="scroll"
             :customRow="customRowFun"
             :rowSelection="rowSelection"
             bordered
             @expand="expand"
             :pagination="false">
      <template v-for="col in table.tableSlot"
                :slot="col"
                slot-scope="record">
        <a-icon type="home"
                style="font-size: 14px;margin-right: 3px;margin-left:-5px"
                v-if="col=='title'" />
        <p v-html="record"
           v-if="table.htmlRecordStatus"></p>
        <p style="margin: 0;display: inline-block"
           v-else
           v-html="col!='title'?(table.slotName && table.slotName[col]&&record[table.slotName[col]]):table.tableSlotSelfTitle[col]"></p>

      </template>
      <template slot="operation"
                slot-scope="text,record">
        <div>
          <a href="javascript:void(0)"
             class="ant-btn ant-btn-primary"
             v-if="table.operationStatus && table.operationButtons"
             v-for="item in table.operationButtons"
             :style="item.style"
             :key="`operation-btn-${item.name}`"
             @click="item.click(item,record)">
            {{item.name}}
          </a>
        </div>
      </template>

      <template v-if="columnsSlot"
                v-for="(item,key) in columnsSlot"
                :slot="key"
                slot-scope="text, record, index">
        <a-radio-group v-if="item.type=='radio'"
                       size="small"
                       :disabled="!record.editable"
                       @change="e=>onChange(e.target.value,key,index)">
          <a-radio size="small"
                   :value="i.value"
                   v-for="i in item.array"
                   :checked="i.value==record[key]"
                   :key="`radio-${i.value}`">{{i.name}}
          </a-radio>
        </a-radio-group>
        <a-select v-if="item.type=='select'"
                  :defaultValue="record[key]"
                  @change="(val)=>{selectChange(val,record,key)}"
                  :disabled="!record.editable">
          <a-select-option v-for="d in item.array"
                           :key="d.value"
                           :value="d.value"
                           :disabled="d.disabled">
            {{d.name}}
          </a-select-option>
        </a-select>
        <a-button-group v-if="item.type=='button'">
          <a-button v-for="i in item.array"
                    :key="`button-${i.type}`"
                    @click="item.function(i.type)">
            {{i.name}}
          </a-button>
        </a-button-group>
        <div class='editable-row-operations'
             v-if="item.type=='edit'">
          <span v-if="record.editable">
            <a @click="() => save(index,item)">保存</a>
            <a-popconfirm title='确定取消吗?'
                          @confirm="() => cancel(index,item)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(index)">编辑</a>
            <a @click="() => del(index,item)">删除</a>
          </span>
        </div>
        <p v-else-if="item.type==='html'"
           v-html="text[key]">{{text[key]}}</p>
      </template>
    </a-table>
  </div>
</template>
<script type="text/jsx">
import { getTable } from '@/api/tableData'
import { mapActions, mapState } from 'vuex'
import { getUrlData } from '@/api/common'
import { choseTableTrData, clearTableTrData, addTableDict } from '@/libs/util'
import { isEmptyObject, isArray } from '@/libs/tool'
import { baseData, baseSettings } from '@/api/hotelBaseData'
import { dictData, getConst } from '../../api/hotelConst'
import { changeFirstUrl, getAccess, getCompanyCode, getCompany} from '../../libs/util'
import { debug } from 'util'
import Qs from 'qs'

export default {
  props: {
    table: {},
    columsSlot: {},
    choseTr: {}
  },
  data () {
    // this.cacheData = data.map(item => ({ ...item }))
    return {
      data: [],
      tempData: [],
      scrollHeight: 0,
      scrollWidth: 0,
      loading: false,
      name: '',
      columns: [],
      columnsSlot: {},
      scroll: {},
      dictData: [],
      record: {},
      isSys: false,
      isAnalysis: false,
      isHotel: false,
      rowSelection: null,
      npCompanylist: false
    }
  },
  computed: {
    ...mapState({
      getChangeTableStatus: state => state.change.changeTableStatus,
      getChangeSubTableStatus: state => state.change.changeSubTableStatus,
      getChangeHotelTableStatus: state => state.change.changeHotelTableStatus,
      getChangeExtraTableStatus: state => state.change.changeExtraTableStatus,
      getChoseTr: state => state.data.choseTr,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getModalData: state => state.data.modalData,
      getTabs: state => state.data.tabs,
      getOnresize: state => state.app.onresize,
      getSlideMenuVisible: state => state.app.slideMenuVisible,
      getTreeVisible: state => state.app.treeVisible,
      getChangeProgramCredit: state => state.change.changeProgramCredit,
      getChangeRouterName: state => state.change.changeRouterName
    })
  },
  watch: {
    choseTr () {
      this.record = {}
    },
    scroll (val) {
    },
    getOnresize (e) {
      this.getScroll()
    },
    getSlideMenuVisible () {
      this.getScroll()
    },
    getTreeVisible () {
      this.getScroll()
    },
    // tab切换
    getTabs (val) {
      // console.log(val)
      // console.log(this.table.type)
      if (this.table.type === 'sub') {
        this.name = val
        this.data = []
        this.record = {}
        this.columnsSlot = this.table.columnsSlot || {}
        this.dictData = []
        this.columns = this.getColumns()
        this.getScroll()
        if (val != 'adPlanChannel') {
          !isEmptyObject(this.getChoseTr) && this.getData('sub')
        } else {
          this.getData('sub')
        }
      }
      let _this = this
      if (val == 'selectedHotel' || val == 'hotelslist') {
        setTimeout(function () {
          _this.handleChangeSubTableStatus(Math.random())
        }, 100)
      }
    },
    getChangeTableStatus (val) {
      let _this = this
      val && _this.getData('main')
      if (val && _this.table.type === 'sub') {
        _this.data = []
      }
    },
    getChangeProgramCredit (val) {
      val && this.getData('extra')
    },
    getChangeRouterName (val) {
      if (val.indexOf('npCompanylist') != -1) { // 禁止请求companylist接口
        this.npCompanylist = true
      }
      if (val.indexOf('companylist2') != -1) {
        this.name = 'companylist2'
        val && this.getData('sub')
      }
      if (val.indexOf('adMaterial') != -1) {
        this.name = 'adMaterial'
        val && this.getData('sub')
      }
      if (val.indexOf('hotelslist') != -1) {
        this.name = 'hotelslist'
        val && this.getData('sub')
      }
      if (val.indexOf('companylist') != -1) {
        this.name = 'companylist'
        val && this.getData('sub')
      }
      if (val.indexOf('adPlanChannel') != -1) {
        this.name = 'adPlanChannel'
        val && this.getData('sub')
      }
      if (val.indexOf('avalibleMaterial') != -1) {
        this.name = 'avalibleMaterial'
        val && this.getData('sub')
      }
      if (val.indexOf('managerPlan') != -1) {
        this.name = 'managerPlan'
        val && this.getData('main')
      }
      if (val.indexOf('managerAdMaterial') != -1) {
        this.name = 'managerAdMaterial'
        val && this.getData('main')
      }
    },
    getChangeSubTableStatus (val) {
      val && this.getData('sub')
    },
    getChangeHotelTableStatus (val) {
      val && this.getData('hotel')
    },
    getChangeExtraTableStatus (val) {
      val && this.getData('extra')
    },
    getTree (val) {
      if (isEmptyObject(val)) this.data = []
    },
    getModalData (val) {
      if (val && !isEmptyObject(val)) {
        val.type === 'sub' ? this.handleChangeSubTableStatus(this.$route.name) : this.handleChangeTableStatus(this.$route.name)
      }
    },
    table (val) {
    }
  },
  created () {
    this.isSys = this.$route.matched[0].name === 'Sys' || this.$route.matched[0].name === 'Card' || this.$route.matched[0].name === 'Advert'
    this.isAnalysis = this.$route.matched[0].name === 'Analysis'

    this.isHotel = this.table.type === 'hotel'
    this.name = this.table.title || this.$route.name
    this.columnsSlot = this.table.columnsSlot || {}
    this.rowSelection = this.table.rowSelection || null
    if (this.name == 'programCredit' || this.name == 'programSignHistory' || this.name == 'programSignCurrent' || this.name == 'programUser' || this.name == 'memberWechat' || this.name == 'memberCreditExpend') {
      this.isAnalysis = false
      this.isSys = true
    }
    this.columns = this.getColumns()
  },
  mounted () {
    this.getScroll()
  },
  methods: {
    expand (expanded, record) {
      this.table.expand && this.table.expand(expanded, record, this.table.type)
    },
    getScroll () {
      if (!this.$refs.tableSelf) return false
      if (!this.$refs.tableSelf.clientWidth) return false
      const width = this.$refs.tableSelf.clientWidth,
        x = this.scrollWidth
      let deleteColumnsIndex = this.table.deleteColumnsIndex ? this.table.deleteColumnsIndex[this.name] ? this.table.deleteColumnsIndex[this.name] : this.table.deleteColumnsIndex : (this.columns.length - 1)

      // deleteColumnsIndex = deleteColumnsIndex || (this.columns.length - 1)
      this.getScrollHeight()
      // if (x < width && this.columns.length && this.columns[deleteColumnsIndex].width) {
      //   delete this.columns[deleteColumnsIndex].width
      // }
      if (x < width && this.columns.length && this.columns[deleteColumnsIndex]) {
        delete this.columns[deleteColumnsIndex].width
      }
      this.scroll = x > width ? {
        y: this.scrollHeight,
        x: x
      } : { y: this.scrollHeight }
      if ((x && (this.$refs.tableSelf.clientWidth > x)) || this.table.deleteFixed) delete this.columns[0].fixed
    },
    getScrollHeight () {
      const tableHeader = this.$refs.tableSelf && this.$refs.tableSelf.getElementsByClassName && this.$refs.tableSelf.getElementsByClassName('ant-table-header') && this.$refs.tableSelf.getElementsByClassName('ant-table-header').length && this.$refs.tableSelf.getElementsByClassName('ant-table-header')[0] && this.$refs.tableSelf.getElementsByClassName('ant-table-header').getElementsByTagName && this.$refs.tableSelf.getElementsByClassName('ant-table-header').getElementsByTagName('table') && this.$refs.tableSelf.getElementsByClassName('ant-table-header').getElementsByTagName('table').length && this.$refs.tableSelf.getElementsByClassName('ant-table-header').getElementsByTagName('table')[0].scrollHeight || 38
      let height = 0
      if (this.table.hideButtons && this.table.hidePegination) this.$refs.tableSelf.style.cssText = 'height:calc(100% - 1px)'

      height = height + (this.table.showTableTabs ? 40 : 0)
      if (this.table.hideButtonSearch) this.$refs.tableSelf.style.cssText = `height:calc(100% - 38px)`
      if (this.table.pagination && this.table.pagination.hidePaginationAll) height = height - 38
      if (this.table.showTableTitle) height = height + 35
      this.scrollHeight = this.$refs.tableSelf.offsetHeight - tableHeader - height
      if (this.$refs.tableSelf && this.$refs.tableSelf.getElementsByClassName && this.$refs.tableSelf.getElementsByClassName('ant-table-body').length && this.$refs.tableSelf.getElementsByClassName('ant-table-body')[0]) {
        this.$refs.tableSelf.getElementsByClassName('ant-table-body')[0].style.height = this.data.length ? `${this.scrollHeight}px` : ''
      }
    },
    selectChange (val, item, key) {
      item[key] = val
    },
    getColumns () {
      let columns = [], width = 0
      if (this.isSys && !this.isHotel && !this.table.useColumnsStatus) {
        const data = baseData[this.name]
        for (let i in data) {
          if (dictData.hasOwnProperty(i) && this.dictData.indexOf(i) === -1) this.dictData.push(i)
          if (data[i].tableShow) {
            let plus = { ...data[i].tableShow }
            if (data[i].tableShow.width) {
              width += data[i].tableShow.width
              plus.width = data[i].tableShow.width
            }
            columns.push({ title: data[i].name, dataIndex: i, key: i, ...plus })
          }
        }
      } else {
        this.table.columns && this.table.columns.length && this.table.columns.forEach(item => {
          width += item.width || 0
        })
        columns = this.table.columns ? JSON.parse(JSON.stringify(this.table.columns)) : []
      }
      columns.unshift({
        title: '#',
        dataIndex: 'ii',
        width: 60,
        align: 'center',
        fixed: 'left'
      })
      width += 60
      width += 20
      if (this.table.tableSlot && this.table.tableSlot.length) width += 50
      this.scrollWidth = width
      return columns
    },
    customRowFun (record, index) {
      return {
        props: {},
        on: {
          click: (e) => {
            const key = this.isSys && !this.isHotel && baseSettings[this.name].keyName || this.table.keyName || 'id'
            this.record = record
            this.table.beforeBanClickTr && this.table.beforeBanClickTr(record, e.target)
            if (this.table.banClick) return false
            this.$refs.tableSelf.querySelectorAll(`[data-row-key="${this.record[key]}"]`).length && this.$refs.tableSelf.querySelectorAll(`[data-row-key="${this.record[key]}"]`).forEach(item => {
              choseTableTrData(item, 'chosed')
            })
            if (this.table.type === 'main') this.handleChoseTr(record)
            if (this.table.type === 'sub') this.handleSubChoseTr(record)
            if (this.table.type === 'hotel') this.handleChoseHotel(record)
            this.$emit('get-choseTr', this.table.choseTrCb ? this.table.choseTrCb(JSON.stringify(record)) : record)
          },
          dblclick: (e) => {
            this.table.beforeBanDblClickTr && this.table.beforeBanDblClickTr(this.record, this.name)
            if (this.table.multiple && this.table.banDblClickName && this.table.banDblClickName[this.name]) return false
            if (this.table.banDblClick) return false
            const access = getAccess(this.$route.params, this.record, this.getChoseTr, this.table.type, this.$store.state.access.subAccess[this.name] || 0)
            // 集团商品管理系统产品只能查看不能修改
            if (this.record.systemDefault == 1) {
              this.$emit('show-modal', 'check')
              return false
            }
            if (this.name == 'platformPlan' || this.name == 'hotelPlan' || this.name == 'groupPlan') {
              if (this.record.status == 1 || this.record.auditStatus == 1) {
                this.$emit('show-modal', 'check')
                return false
              }
            }
            if (this.name == 'homeBannerDetail' && this.record.newsId != null) {
              this.$emit('show-modal', 'check')
              return false
            }
            // 券模板只能查看不能修改
            if (this.$route.name == 'groupCoupTempOther' || this.$route.name == 'groupCoupTemp') {
              if (this.record.flag == 0) {
                this.$emit('show-modal', access ? 'update' : 'check')
              } else {
                this.$emit('show-modal', 'check')
              }
              return false
            }
            this.$emit('show-modal', access ? 'update' : 'check')
          }
        }
      }
    },
    onChange (value, key, index) {
      const newData = [...this.data], target = newData[index]
      if (target) {
        target[key] = value
        this.data = newData
      }
    },
    del (index, item) {
      item.delCb && item.delCb(item, this.data[index])
    },
    edit (index) {
      const newData = [...this.data], target = newData[index]
      this.tempData = this.data
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (index, item) {
      const newData = [...this.data], target = newData[index]
      if (target) {
        this.data = newData
        let status = true, cbData = item.cb && item.cb(target)
        const data = item.cb ? cbData : target
        if (item.cb) status = cbData
        if (status) {
          this.loading = true
          getUrlData(item.url, data).then(res => {
            this.loading = false
            if (res) {
              this.$message.success('修改成功!', 2)
              delete target.editable
            } else {
              this.$message.error('修改失败!', 2)
            }
            // item.editSaveCb && item.editSaveCb();
          })
        }
      }
    },
    cancel (index, item) {
      const newData = [...this.tempData], target = newData[index]
      if (target) {
        delete target.editable
        this.data = newData
      }
      item.editCancelCb && item.editCancelCb()
    },
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
      'handleModalData',
      'handleChoseTr',
      'handleChoseHotel',
      'handleChangeHotelTableStatus',
      'handleChangeExtraTableStatus',
      'handleSubChoseTr'
    ]),
    toPegination (data) {
      this.$emit('get-pegination', data)
    },
    addKey () {
      this.data.length && this.data.forEach((item, i) => {
        this.data[i].key = i++
      })
    },

    addTableDict (data, addDict) {
      const flag = baseData[this.name].hasOwnProperty('flag') ? ['flag'] : []
      let arr = addDict ? [...addDict, ...flag] : flag
      arr = this.dictData
      // debugger
      arr.forEach(item => {
        let dict = dictData[item]
        if (dict.data) {
          this.data = addTableDict(this.data, dictData)
        } else {
          dict.fun(dict.type === 'const' ? item === 'owner' || item === 'strategy' ? 'configOwner' : item : dict.type === 'owner' ? this.$route.name : '').then(res => {
            let json = {}
            res.forEach(item => {
              json[item.value] = item.title
            })
            this.data = addTableDict(this.data, dictData, { [item]: json })
          })
        }
      })
    },
    addIndex (data) {
      const key = this.isSys && !this.isHotel && baseSettings[this.name].keyName || this.table.keyName || 'id',
        pegination = (this.table.type === 'hotel' ? this.$store.state.common.commonHotelPegination : this.table.type === 'sub' ? this.$store.state.data.subPegination : this.$store.state.data.pegination) || {
          page: 10,
          size: 1
        }
      data && data.length && data.forEach((item, i) => {
        data[i].ii = i + 1 + ((pegination.page || 0) * (pegination.size || 10))
        data[i].key = data[i][key]
      })
      return data
    },
    defaultClick (index) {
      if (!this.$refs.tableSelf) return false
      if (!this.$refs.tableSelf.clientWidth) return false
      setTimeout(() => {
        const width = this.$refs.tableSelf.clientWidth,
          x = this.isSys && !this.isHotel ? baseSettings[this.name].x : (this.table.x || width)
        if (x && (this.$refs.tableSelf.clientWidth > x)) delete this.columns[0].fixed
        this.$refs.tableSelf && this.$refs.tableSelf.getElementsByTagName && this.$refs.tableSelf.getElementsByTagName('tbody') && this.$refs.tableSelf.getElementsByTagName('tbody')[0] && this.$refs.tableSelf.getElementsByTagName('tbody')[0].children && this.$refs.tableSelf.getElementsByTagName('tbody')[0].children[index] && this.$refs.tableSelf.getElementsByTagName('tbody')[0].children[index].click && this.$refs.tableSelf.getElementsByTagName('tbody')[0].children[index].click()
      }, 0)
    },
    sortKeyToIndex (data) {
      const key = this.isSys && !this.isHotel && baseSettings[this.name].keyName || this.table.keyName || 'id'
      let json = {}, index = 0
      data && data.length && data.forEach((item, i) => {
        if (item.hasOwnProperty(key)) json[item[key]] = i
      })
      if (!isEmptyObject(json) && !isEmptyObject(this.record)) index = json[this.record[key]] || 0
      if (key === 'ii') index = 0
      !this.table.banClick && this.defaultClick(index)
    },
    getData (type) {
      let typeAxios = ''
      if (this.$route.name == 'groupCoupTempOther' || this.$route.name == 'groupCoupTemp') {
        if (this.table.name == 'availableHotel') {
          this.name = 'availableHotel'
        }
        if (this.table.name == 'selectedHotel') {
          this.name = 'selectedHotel'
        }
      }
      if (this.$route.name == 'platformPlan' || this.$route.name == 'platformSearch' || this.$route.name == 'groupPlan' ||
      this.$route.name == 'groupSearch' || this.$route.name == 'hotelPlan' || this.$route.name == 'hotelSearch' ||
      this.$route.name == 'managerPlan' || this.$route.name == 'managerAdMaterial') {
        // if (this.name == 'companylist2') {
        //   this.name = 'companylist'
        // } else {
        //   if (this.table.name == 'companylist' && !this.npCompanylist) {
        //     this.name = 'companylist'
        //   }
        //   if (this.table.name == 'companylist' && this.npCompanylist) {
        //     return false
        //   }
        // }
        if (this.name == 'companylist2') {
          this.name = 'companylist'
        } else if (this.table.name == 'companylist' && !this.npCompanylist) {
          this.name = 'companylist'
        } else if (this.table.name == 'companylist' && this.npCompanylist) {
          return false
        }
        // else if (this.table.name == 'companylist' && !this.npCompanylist) {
        //   this.name = 'companylist'
        // } else if (this.table.name == 'companylist' && this.npCompanylist) {
        //   return false
        // }
        // if (this.table.name == 'hotelslist') {
        //   this.name = 'hotelslist'
        // }
        // if (this.table.name == 'adMaterial') {
        //   this.name = 'adMaterial'
        // }
      }
      if (this.$route.name == 'programUser' && type == 'extra') {

      } else if (this.$route.name == 'groupCard' && type == 'extra') {

      } else if (this.$route.name == 'platformPlan' && type == 'extra') {

      } else if (this.$route.name == 'platformSearch' && type == 'extra') {

      } else if (this.$route.name == 'managerAdMaterial' && type == 'extra') {

      } else if (this.$route.name == 'managerPlan' && type == 'extra') {

      } else if (this.$route.name == 'groupPlan' && type == 'extra') {

      } else if (this.$route.name == 'groupSearch' && type == 'extra') {

      } else if (this.$route.name == 'hotelPlan' && type == 'extra') {

      } else if (this.$route.name == 'hotelSearch' && type == 'extra') {

      } else {
        if (type !== this.table.type) return false
        if (this.$route.name != 'managerAdMaterial' && this.$route.name != 'platformSearch' && this.$route.name != 'platformPlan' && this.$route.name != 'managerPlan' &&
        this.$route.name != 'groupSearch' && this.$route.name != 'hotelSearch') {
          if (this.table.type === 'sub' && isEmptyObject(this.$store.state.data.choseTr)) return false
        }
      }
      if (this.table.noDataShowStatus) {
        this.data = []
        this.afterGetDataClearStatus()
        return false
      }
      this.loading = true
      this.data = []
      // const url = !this.table.useUrlStatus ? (this.isSys && !this.isHotel ? `${this.name.indexOf('wx') > -1 ? 'o' : 'h'}_${this.name}_page_get` : this.table.url) : this.table.url
      let url = !this.table.useUrlStatus ? (this.isSys && !this.isHotel ? `${changeFirstUrl(this.name)}_${this.name}_page_get` : this.table.url) : this.table.url
      // console.log(this.table.data)
      let data = this.table.data
      if (this.name === 'programActivity') {
        url = `l_activityPage_page_get`
      }
      if (this.name === 'programIndex') {
        url = `l_activityPageHome_customerPage_get`
      }
      if (this.name === 'programSystem') {
        url = `l_systemImage_page_get`
      }
      if (this.name === 'programUser') {
        url = `l_memberUser_page_get`
      }
      if (this.name === 'memberWechat') {
        url = `l_memberWechat_page_get`
      }
      if (this.name === 'memberCredit') {
        url = `l_memberCredit_page_get`
      }
      if (this.name === 'hotelInfo') {
        url = `h_hotelInfo__get`
      }
      if (this.name === 'memberCreditExpend') {
        url = `l_memberCreditExpend_customerPage_get`
        data.beginTime = data.beginTime ? data.beginTime : ''
        data.endTime = data.endTime ? data.endTime : ''
      }
      if (this.name === 'memberCreditIncome') {
        url = `l_memberCreditIncome_customerPage_get`
        data.beginTime = data.beginTime ? data.beginTime : ''
        data.endTime = data.endTime ? data.endTime : ''
      }
      if (this.name === 'memberCreditFreeze') {
        url = `l_memberCreditFreeze_customerPage_get`
        data.beginTime = data.beginTime ? data.beginTime : ''
        data.endTime = data.endTime ? data.endTime : ''
      }
      if (this.name === 'platFormCard' && type === 'extra') {
        data.flag = 1
        // url = `u_goodsCategory_page_get`
        url = `u_goodsCategory_readAvailableGoods_get`
      }
      if (this.name === 'groupHotelSign') {
        url = `u_couponTempHotelRelation_page_get`
      }
      if (this.name === 'groupCoupTempghg') {
        url = `u_consumerCouponTemplate_page_get`
      }
      if (this.name === 'selectedHotel') {
        url = `u_couponTempHotelRelation_selectedHotel_get`
      }
      if (this.name === 'availableHotel') {
        url = `u_couponTempHotelRelation_availableHotel_get`
      }
      if (this.name === 'programNewsList') {
        data.flag = 1
        url = `l_homeNews__get`
      }
      if (this.name === 'homeBannerDetail') {
        data.flag = ''
        url = `l_homeBannerDetail_page_get`
      }
      if (this.name === 'adMaterial') {
        url = `p_manager_adMaterial_findBySystemPlanId_get`
        if (this.$route.name == 'groupPlan' || this.$route.name == 'platformSearch') {
          url = `p_manager_adMaterial_findByPlanIdAndOwner_get`
        }
        if (this.$route.name == 'groupPlan' || this.$route.name == 'groupSearch') {
          url = `p_manager_adMaterial_findByPlanIdAndOwner_get`
        }
        if (this.$route.name == 'hotelPlan' || this.$route.name == 'hotelSearch') {
          url = `p_manager_adMaterial_findByPlanIdAndOwner_get`
        }
      }
      if (this.name === 'adPlanChannel') {
        if (!data.planId) {
          data.planId = 1
        }
        url = `p_manager_adPlanChannel_readAll_get`
        if (this.$route.name == 'groupPlan' || this.$route.name == 'groupSearch') {
          url = `p_manager_adPlanChannel_readByCompanyPlan_get`
        }
        if (this.$route.name == 'hotelPlan' || this.$route.name == 'hotelSearch') {
          url = `p_manager_adPlanChannel_readByHotelPlan_get`
        }
      }
      if (this.name === 'companylist') {
        url = `h_company_page_get`
        if (this.$route.name == 'hotelSearch' || this.$route.name == 'groupSearch' || this.$route.name == 'groupPlan') {
          url = `h_company_findByCode_get`
          data.code = JSON.parse(getCompany()).companyCode
        }
      }
      if (this.name === 'hotelslist') {
        if (getCompanyCode()) {
          data.companyCode = getCompanyCode()
        }
        url = `h_hotel_page_get`
      }
      if (this.name === 'avalibleMaterial') {
        url = `p_manager_adMaterial_readSystemAvalibleMaterial_get`
        if (this.$route.name == 'groupPlan') {
          url = `p_manager_adMaterial_readCompanyAvalibleMaterial_get`
        }
        if (this.$route.name == 'hotelPlan') {
          url = `p_manager_adMaterial_readHotelAvalibleMaterial_get`
        }
      }
      if (this.name === 'platformPlan') {
        url = `p_manager_adPlan_readSystemPlan_get`
      }
      if (this.name === 'groupPlan') {
        url = `p_manager_adPlan_readCompanyPlan_get`
      }
      if (this.name === 'hotelPlan') {
        url = `p_manager_adPlan_readHotelPlan_get`
      }
      if (this.name === 'managerPlan') {
        url = 'p_manager_adPlan_readAll_get'
      }
      if (this.name === 'managerAdMaterial') {
        url = 'p_manager_adMaterial_readAll_get'
      }
      if (this.table.multiple && this.table.type === 'sub' && this.table.tabData && this.table.tabData[this.name]) {
        data = { ...this.table.tabData[this.name], ...this.table.data }
      }
      let _this = this
      getTable(url, data, typeAxios).then(res => {
        _this.loading = false
        let data = []
        res = res || {}
        res.data = res.data || []
        if (_this.table.baseData && isArray(_this.table.baseData) && _this.table.baseData.length) {
          const baseData = JSON.parse(JSON.stringify(_this.table.baseData))
          res.data = [...res.data, ...baseData]
        }
        if (res && !_this.table.hidePegination) {
          if (res.data.hasOwnProperty('content')) {
            data = _this.table.sortReturnData ? _this.table.sortReturnData(res.data.content, _this.table.type, _this.name) : res.data.content

            data.forEach(item => {
              if (item.hasOwnProperty('inTime')) {
                item.inTime = item.inTime.slice(0, 10)
              }
              if (item.hasOwnProperty('outTime')) {
                item.outTime = item.outTime.slice(0, 10)
              }
              if (item.hasOwnProperty('realOutTime')) {
                item.realOutTime = item.realOutTime.slice(0, 10)
              }
            })
            _this.toPegination({ total: res.data.totalElements, pages: res.data.totalPages })
          } else {
            data = _this.table.sortReturnData ? _this.table.sortReturnData(res.data, _this.table.type, _this.name) : res.data
            if (isArray(data)) {
              data = { total: data.length, data: data }
            }
            data = data || {}
            _this.toPegination({ total: data.total || data.length || 0, pages: data.pages || 1 })
            data = !isArray(data.data) ? data.data ? [data.data] : [] : data.data
          }
        }
        if (res && _this.table.hidePegination) {
          data = _this.table.sortReturnData ? _this.table.sortReturnData(res.data, _this.table.type, _this.name) : res.data
        }
        data = _this.addIndex(data)
        _this.addKey()
        _this.data = data
        _this.isSys && !_this.isHotel && _this.addTableDict(_this.data, _this.table.type === 'sub' && _this.table.addDict ? _this.table.addDict[_this.name] : _this.table.addDict)
        _this.$refs.tableSelf && _this.$refs.tableSelf.getElementsByTagName && _this.$refs.tableSelf.getElementsByTagName('tbody') && clearTableTrData(_this.$refs.tableSelf.getElementsByTagName('tbody')[0], 'chosed')
        _this.sortKeyToIndex(_this.data)
        _this.$emit('get-choseTr', {})
        if (_this.table.type === 'main') _this.handleChoseTr({})
        if (_this.table.reloadColumnsAfterDataReturn) {
          _this.columns = _this.getColumns()
        }
        _this.getScroll()
        _this.afterGetDataClearStatus()
      }, err => {
        _this.loading = false
        _this.afterGetDataClearStatus()
      })
    },
    afterGetDataClearStatus () {
      this.handleChangeSubTableStatus('')
      this.handleChangeTableStatus('')
      this.handleChangeHotelTableStatus('')
      this.handleChangeExtraTableStatus('')
    }
  }
}
</script>
<style lang="less">
.editable-row-operations a {
  margin-right: 8px;
}

.tableSelf {
  overflow: hidden;

  .ant-table {
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

      &.active,
      &[data-chosed],
      &.ant-table-row-selected {
        td {
          background-color: #6d819d !important;
          color: #fff !important;

          span {
            background-color: #6d819d !important;
            color: #fff !important;
          }

          .ant-table-row-expand-icon {
            color: #333;
          }
        }
      }
    }
  }

  .ant-table td {
    //white-space: nowrap;
    vertical-align: middle;
  }

  .ant-table.ant-table-bordered .ant-table-title {
    padding: 6px 16px;
    text-align: left;
    border-radius: 0;
    background-color: #e6fffa;
    font-size: 12px;
  }

  .ant-radio-wrapper {
    font-size: 12px;
    margin-right: 4px;
  }

  .ant-table-fixed-header .ant-table-scroll .ant-table-header {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .ant-table-tbody > tr {
    &:nth-child(odd) td {
      background-color: #fff;
    }

    &:nth-child(even) td {
      background-color: #f3f3f3;
    }

    &.ant-table-row-hover td {
      background-color: #999 !important;
      color: #fff;

      &.ant-table-row-expand-icon-cell {
        color: #fff;

        .ant-table-row-expand-icon {
          background-color: #999;
        }
      }
    }
  }

  .ant-table-thead > tr > th {
    background-color: #eeeeee;
    color: #333333;
    font-size: 14px;
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    //border-bottom-width: 0 !important;
    padding: 9px 16px;
    font-size: 12px;

    .ant-select {
      width: 80%;
    }
  }
}
</style>
