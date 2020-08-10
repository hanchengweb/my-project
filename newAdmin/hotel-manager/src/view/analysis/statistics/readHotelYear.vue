<template>
	<div id="readHotelYear">
		<searchTable :searchTableJson="searchTable" style="height: 100%" ref="searchTableSelf"></searchTable>
		<a-modal :visible="visible" :title="title" class="selfModal modalSelf" :destroyOnClose="true"
				 :style="modalStyle"
				 :width="modalWidth" @cancel="onCancel" @ok="onCancel" :footer="null" :centered="true">
			<!-- <a-icon :type="!isFullScreen?'fullscreen':'fullscreen-exit'" class="fullScreenIcon" @click="toFullScreen"/> -->
			<div class="fullScreenIcon" @click="toFullScreen">
				<img src="/static/img/analysis/menu/maximize.png" v-if="!isFullScreen" alt="">
				<img src="/static/img/analysis/menu/minimize.png" v-else alt="">
			</div>
			<searchTable
				:searchTableJson="subSearchTable"
				:height="modalHeight" :style="`height:${modalHeight}px`">
			</searchTable>

		</a-modal>
	</div>

</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import {mapActions, mapState} from 'vuex'
import {isEmptyObject} from '../../../libs/tool'
import {getUrlData} from '../../../api/common'

export default {
  components: {
    searchTable
  },
  data () {
    return {
      tabs: 'Year',
      subTabs: 'Year',
      visible: false,
      isFullScreen: false,
      title: '日期:',
      modalWidth: '1000px',
      modalHeight: '1000px',
      modalStyle: '',
      arr: [
        {name: '房间年统计', key: 'Year' },
        {name: '房间月统计', key: 'Month' },
        {name: '房间日统计', key: 'Day' }
      ],
      names: {
        Year: '年份',
        Month: '年月',
        Day: '年月日'
      },
      columns: [
        {title: '酒店名称', dataIndex: 'name', width: 520},
        {title: '时间', dataIndex: 't', width: 180},
        {title: '最大电流', dataIndex: 'maxi', width: 180},
        {title: '最大电流的时间', dataIndex: 'maxit', width: 180},
        {title: '最大电压', dataIndex: 'maxu', width: 180},
        {title: '最大电压的时间', dataIndex: 'maxut', width: 180},
        {title: '最小电压', dataIndex: 'minu', width: 180},
        {title: '最小电压的时间', dataIndex: 'minut', width: 180},
        {title: '最大功率', dataIndex: 'maxp', width: 180},
        {title: '最大功率的时间', dataIndex: 'maxpt', width: 180},
        {title: '用电量', dataIndex: 'p', width: 180}
      ],
      subSearchTable: {
        table: {
          url: `a_statistics_readRoomPower_get`, /// hotel/analysis/statistics/readHotelYear
          type: 'sub',
          hideButtonSearch: true,
          hidePegination: true,
          deleteFixed: true,
          expand: this.expand,
          reloadColumnsAfterDataReturn: true,
          tableSlot: ['expandedRowRender'],
          slotName: {expandedRowRender: 'description'},
          sortReturnData: this.sortReturnData,
          data: {
            hotelid: '',
            date: '',
            tag: 'year',
            page: '0',
            size: '10'
          },
          showTableTabs: true,
          tabs: {
            noHandleTabs: true,
            change: this.subTabChange,
            arr: [
              {name: '房间年统计', key: 'Year' },
              {name: '房间月统计', key: 'Month' },
              {name: '房间日统计', key: 'Day' }
            ]
          },
          banDblClick: true,
          x: 1320,
          keyName: 'ii',
          urls: {},
          deleteColumnsIndex: 1,
          columns: [{title: '房间名称', dataIndex: 'name', width: 120},
            // {title: '年份', dataIndex: 't', width: 180},
            {title: '年份', dataIndex: 'year', width: 120, align: 'center'},
            {title: '起始电量', dataIndex: 'q1', width: 120, align: 'center'},
            {title: '结束电量', dataIndex: 'q2', width: 120, align: 'center'},
            {title: '差值', dataIndex: 'q', width: 120, align: 'center'} ],
          buttons: {},
          pagination: {
            hidePaginationAll: true
          }
        }
      },
      searchTable: {
        table: {
          url: 'a_statistics_readHotelPower_get', /// /hotel/analysis/statistics/readHotelPower
          type: 'main',
          showExpandedRowRender: true,
          tableSlotStatus: true,
          expand: this.expand,
          reloadColumnsAfterDataReturn: true,
          tableSlot: ['expandedRowRender'],
          slotName: {expandedRowRender: 'description'},
          defaultExpandAllRows: true,
          data: {
            hotelid: '',
            date: new Date().getFullYear() + '-01-01 00:00:00',
            tag: 'year',
            page: '0',
            size: '10'
          },
          sortReturnData: this.sortReturnData,
          showTableTabs: true,
          tabs: {
            noHandleTabs: true,
            change: this.tabChange,
            arr: [
              {name: '酒店年统计', key: 'Year' },
              {name: '酒店月统计', key: 'Month' },
              {name: '酒店日统计', key: 'Day' }
            ]
          },
          banDblClick: true,
          keyName: 'ii',
          x: 900,
          urls: {},
          columns: [
            // {title: '年份', dataIndex: 't', width: 180},
            {title: '年份', dataIndex: 'year', width: 120, align: 'center'},
            // {title: '0点值', dataIndex: 'q1', width: 180},
            // {title: '24点值', dataIndex: 'q2', width: 180},
            {title: '用电量', dataIndex: 'q'} ],
          buttons: {},
          pagination: {
            isSelf: true,
            buttons: [
              {
                name: '房间统计报表',
                onClick: this.showModal,
                style: 'margin-left:-44px'
              }
            ]
          },
          hidePaginationPart: true
        },
        search: {
          isShowHigh: false,
          defaultVals: {
            date: new Date().getFullYear()
          },
          nameArray: [{
            name: '年份',
            type: 'number',
            spans: '6',
            dataIndex: 'date',
            defaultValue: new Date().getFullYear(),
            onBlur: () => {
            }
          } ]
        }
      }
    }
  },
  computed: {
    ...mapState({
      getSearch: state => state.data.search,
      getChoseTr: state => state.data.choseTr,
      getChoseHotel: state => state.common.choseHotel
    })

  },
  watch: {
    getChoseTr (val) {
      if (val && !isEmptyObject(val)) {
        this.subSearchTable.table.data.date = val.t
        this.title = `日期:${val.t}`
      }
    },
    isFullScreen (val) {
      this.modalWidth = val ? document.getElementById('app').clientWidth : document.getElementById('app').clientWidth * 0.9
      this.modalHeight = val ? (document.getElementById('app').clientHeight - 38) : document.getElementById('app').clientHeight * 0.8
      this.modalStyle = val ? `top:0;height:${document.getElementById('app').clientHeight}px` : ''
      this.$store.commit('setOnresize', Math.random())
    },
    getSearch (val) {
      this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      this.searchTable.table.data.date = val.date + '-01-01 00:00:00'
      this.tabs != 'Year' && this.$refs.searchTableSelf && this.$refs.searchTableSelf.$el && this.$refs.searchTableSelf.$el.querySelector && this.$refs.searchTableSelf.$el.querySelector('.ant-tabs-tab') && this.$refs.searchTableSelf.$el.querySelector('.ant-tabs-tab').click && this.$refs.searchTableSelf.$el.querySelector('.ant-tabs-tab').click()

      // this.tabChange('Year')
      !val.rest && this.changeStatus()
    },
    getChoseHotel (val) {
      val && !isEmptyObject(val) && this.changeStatus()
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus'
    ]),

    toFullScreen () {
      this.isFullScreen = !this.isFullScreen
    },
    expand (expanded, record, type) {
      const isSub = type == 'sub', tag = isSub ? this.subTabs : this.tabs
      if (expanded) {
        getUrlData(`a_statistics_read${isSub ? 'Room' : 'Hotel'}PowerNode_get`, {
          tag: tag.toLowerCase(),
          date: record.t,
          roomid: record.id
        }).then(res => {
          if (res && res.data) {
            const item = res.data, json = {
              maxu: ['最大电压', 'maxut'],
              minu: ['最小电压', 'minut'],
              maxi: ['最大电流', 'maxit'],
              maxp: ['最大功率', 'maxpt']
            }
            record.description = ''
            for (let i in json) {
              record.description += `${json[i][0]} <span style="color: red">${typeof item[i] === 'number' ? item[i] : '暂无'}</span>(${item[json[i][1]] || '暂无'})<i style="width:10px;display: inline-block"></i>  `
            }
            // record.description = `最大电压 <span style="color: red">${item.maxu || '暂无'}</span>(${item.maxut || '暂无'})  最小电压 <span style="color: red">${item.minu || '暂无'}</span>(${item.minut || '暂无'})  最大电流 <span style="color: red">${item.maxi || '暂无'}</span>(${item.maxit || '暂无'})  最大功率 <span style="color: red">${item.maxp || '暂无'}</span>(${item.maxpt || '暂无'})`
          }
        })
      }
    },
    sortReturnData (data, type) {
      data && data.length && data.forEach((item, i) => {
        data[i].year = data[i].t.substring(0, 4)
        data[i].month = data[i].t.substring(0, 7)
        data[i].day = data[i].t.substring(0, 10)
        data[i].description = `最大电压 <span style="color: red">${item.maxu || '暂无'}</span>(${item.maxut || '暂无'})  最小电压 <span style="color: red">${item.minu || '暂无'}</span>(${item.minut || '暂无'})  最大电流 <span style="color: red">${item.maxi || '暂无'}</span>(${item.maxit || '暂无'})`
      })
      if (type == 'sub') {
        this.subSearchTable.table.columns[1] = {
          title: this.names[this.subTabs],
          dataIndex: this.subTabs.toLowerCase(),
          width: 120,
          align: 'center'
        }
      } else {
        this.searchTable.table.columns[0] = {
          title: this.names[this.tabs],
          dataIndex: this.tabs.toLowerCase(),
          width: 120,
          align: 'center'
        }
      }
      return data
    },
    changeStatus () {
      if (!this.$store.state.data.choseTr.t && this.tabs != 'Year') {
        this.$message.info('暂无数据')
        return false
      }
      if (this.tabs === 'Year') {
        this.searchTable.table.data.date = (this.searchTable.table.data.date || this.searchTable.search.defaultVals.date)
      } else {
        this.searchTable.table.data.date = this.$store.state.data.choseTr.t
      }
      !isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
    },
    tabChange (key) {
      const arr = ['Year', 'Month', 'Day'], arr1 = this.arr.slice(arr.indexOf(key)), key1 = arr1[0].key
      // this.searchTable.table.data.date = val.date + '-01-01 00:00:00'
      this.tabs = key
      this.subSearchTable.table.tabs.arr = arr1
      this.subSearchTable.table.columns[1] = {
        title: this.names[key1],
        dataIndex: key1.toLowerCase(),
        width: 120,
        align: 'center'
      }
      this.searchTable.table.data.tag = key.toLowerCase()
      this.searchTable.table.columns[0] = {
        title: this.names[this.tabs],
        dataIndex: this.tabs.toLowerCase(),
        width: 120,
        align: 'center'
      }
      // this.searchTable.table.url = `a_statistics_readHotel${key}_get`
      this.changeStatus()
    },
    onCancel () {
      this.visible = false
    },
    subTabChange (key) {
      this.subTabs = key
      this.subSearchTable.table.columns[1] = {
        title: this.names[this.subTabs],
        dataIndex: this.subTabs.toLowerCase(),
        width: 120,
        align: 'center'
      }
      // this.subSearchTable.table.url = key === 'Day' && this.tabs !== 'Day' ? `a_statistics_readRoom${key}_get` : `a_statistics_readHotel${this.tabs}_readRoom${key}_get`
      // if (this.tabs === key) {
      // 	this.subSearchTable.table.url = `a_statistics_readRoomPower_get`
      // 	this.subSearchTable.table.data.tag = key.toLowerCase()
      // } else {
      // 	this.subSearchTable.table.url = `a_statistics_readRoom_get`
      // 	this.subSearchTable.table.data.tag = key.toLowerCase()
      // }

      this.subSearchTable.table.url = `a_statistics_${this.tabs === key ? 'readRoomPower' : 'readRoom'}_get`
      this.subSearchTable.table.data.tag = key.toLowerCase()

      if (key === 'Year') {
        this.subSearchTable.table.data.date = this.$store.state.data.choseTr.t
      } else {
        this.subSearchTable.table.data.date = this.$store.state.data.subChoseTr.t
        this.subSearchTable.table.data.roomid = this.$store.state.data.subChoseTr.id
      }
      if (!this.subSearchTable.table.data.date) {
        this.$message.info('暂无数据')
        return false
      }

      // is.subSearchTable.table.keyName = key === 'Year' ? 'id' : 't'
      this.handleChangeSubTableStatus(Math.random())
    },
    showModal () {
      const key = this.subSearchTable.table.tabs.arr[0].key
      // if (this.tabs === key) {
      // 	this.subSearchTable.table.url = `a_statistics_readRoomPower_get`
      // } else {
      // 	this.subSearchTable.table.url = `a_statistics_readRoom_get`
      // }
      this.subSearchTable.table.url = `a_statistics_${this.tabs === key ? 'readRoomPower' : 'readRoom'}_get`
      this.subSearchTable.table.data.tag = key.toLowerCase()
      // this.subSearchTable.table.url = key === 'Day' && this.tabs !== 'Day' ? `a_statistics_readRoom${key}_get` : `a_statistics_readHotel${this.tabs}_readRoom${key}_get`
      // this.subSearchTable.table.keyName = key === 'Year' ? 'id' : 't'

      // const arr = ['Year', 'Month', 'Day'], key1 = this.tabs
      // this.subSearchTable.table.tabs.arr = this.arr.slice(arr.indexOf(key1))

      this.subSearchTable.table.data.date = this.$store.state.data.choseTr.t
      if (!this.subSearchTable.table.data.date) {
        this.$message.info('暂无数据')
        return false
      }
      this.visible = true
      // this.handleChangeSubTableStatus(Math.random())
      window.setTimeout(() => {
        this.handleChangeSubTableStatus(Math.random())
      }, 0)
      // this.handleChangeSubTableStatus(Math.random())
    }
  },
  created () {
    this.modalWidth = document.body.clientWidth * 0.9
    this.modalHeight = document.body.clientHeight * 0.8
  },
  mounted () {
    this.changeStatus()
  }
}
</script>
<style lang="less">
	@import "../../../components/modal/modal";

	.selfModal {
		padding-bottom: 0;
		.ant-modal-body {
			padding: 0 !important;
		}
		.ant-table {
			tr {
				cursor: pointer;
				&:hover {
					td {
						background-color: #999 !important;
						color: #fff;
						span {
							background-color: #999 !important;
							color: #fff !important;
						}
						.ant-table-row-expand-icon {
							color: #333;
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
		}
	}
</style>
