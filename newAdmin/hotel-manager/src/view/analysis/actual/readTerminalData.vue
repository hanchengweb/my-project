<template>
	<div>
		<searchTable style="height: 100%;" :searchTableJson="searchTable"></searchTable>

		<a-modal
			title="终端环境历史数据"
			v-model="visible"
			:width="modalWidth"
			ref="readTerminalHis"
			:maskClosable="false"
			:style="modalStyle"
			@ok="handleOk"
			class="selfModal modalSelfPure readTerminalHis"
			:footer="null"
		>
			<!-- <a-icon :type="!isFullScreen?'fullscreen':'fullscreen-exit'" class="fullScreenIcon" @click="toFullScreen"/> -->
			<div class="fullScreenIcon" @click="toFullScreen">
				<img src="/static/img/analysis/menu/maximize.png" v-if="!isFullScreen" alt="">
				<img src="/static/img/analysis/menu/minimize.png" v-else alt="">
			</div>
			<treeTableSearch :treeJson="modal.treeJson" :searchTableJson="modal.searchTable"
							 :style="`height:${modalHeight}px`"></treeTableSearch>
		</a-modal>
	</div>

</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import treeTableSearch from '@/componentsForPackage/treeTable/treeTableSearch'
import {mapActions, mapState} from 'vuex'
import moment from 'moment'
import {isEmptyObject} from '../../../libs/tool'
import {fullScreen} from '../../../assets/mixins/fullScreen'

export default {
  mixins: [fullScreen],
  components: {
    searchTable,
    treeTableSearch
  },
  data () {
    return {
      searchTable: {
        table: {
          url: 'a_actual_readTerminalData_get',
          type: 'main',
          data: {
            // beginDate: `${moment(new Date()).format('YYYY-MM-DD')} 00:00:00`,
            // endDate: `${moment(new Date()).format('YYYY-MM-DD')} 00:00:00`,
            hotelid: '',
            ammeter: '',
            smoke: '',
            page: '0',
            size: '30'
          },
          banDblClick: true,
          deleteColumnsIndex: 2,
          keyName: 'ii',
          x: 1490,
          urls: {},
          sortReturnData: this.sortReturnData,
          columns: [
            {title: '终端序号', dataIndex: 'ammeter', width: 120, align: 'center'},
            {title: '终端名称', dataIndex: 'name', width: 120, align: 'center'},
            {title: '终端地址', dataIndex: 'address', width: 120, align: 'center'},
            {title: '时间', dataIndex: 'time', width: 180, align: 'center'},
            {title: '温度', dataIndex: 'temperature', width: 120, align: 'center'},
            {title: '烟雾告警', dataIndex: 'smokeName', width: 120, align: 'center'},
            {title: '预留漏点', dataIndex: 'leakage', width: 120, align: 'center'}
          ],
          buttons: {},
          pagination: {
            pageSize: 30,
            isSelf: true,
            buttons: [{
              name: '查看历史数据',
              url: 'readPowerCurve',
              onClick: this.showModal,
              style: 'margin-left:-44px'
            }]
          }
          // hidePaginationPart: true,
        },
        search: {
          isShowHigh: false,
          // sortReturnSearchData: this.sortReturnSearchData,
          // sortReturnSearchResetData: this.sortReturnSearchData,
          defaultVals: {
            // time: [moment(new Date()), moment(new Date)]
          },
          nameArray: [{
            name: '终端序号', type: 'input', span: '4', dataIndex: 'ammeter'
          }, {
            name: '烟雾告警',
            type: 'select',
            span: '4',
            dataIndex: 'smoke',
            data: [{title: '告警', value: '1', key: '1'}, {title: '不告警', value: '0', key: '0'}]
          }]
          /* nameArray: [{
							name: '起止时间', type: 'timeRange', spans: '6', dataIndex: 'time'
						}, {
							name: '终端序号', type: 'input', span: '4', dataIndex: 'ammeter'
						}, {
							name: '烟雾告警',
							type: 'select',
							span: '4',
							dataIndex: 'smoke',
							data: [{title: '告警', value: '1', key: '1'}, {title: '不告警', value: '0', key: '0'}]
						}]*/
        }
      },
      modal: {
        modalWidth: '1200px',
        treeJson: {
          url: 'a_actual_readTerminalTree_get', /// hotel/analysis/actual/readTerminalTree
          sortReturnTreeData: this.sortReturnTreeData,
          choseTree: this.choseTree,
          noHandle: true,
          data: {hotelid: '' }
        },
        searchTable: {
          table: {
            url: 'a_actual_readTerminalHis_get',
            type: 'extra',
            hideButtonSearch: true,
            data: {
              beginDate: `${moment(new Date()).format('YYYY-MM-DD')} 00:00:00`,
              endDate: `${moment(new Date()).format('YYYY-MM-DD')} 23:59:59`,
              hotelid: '',
              terminalId: '',
              sort: 'time,desc',
              smoke: '',
              page: '0',
              size: '30'
            },
            banDblClick: true,
            deleteColumnsIndex: 2,
            keyName: 'ii',
            x: 1490,
            urls: {},
            sortReturnData: this.sortReturnData,
            columns: [
              {title: '终端地址', dataIndex: 'address', width: 120, align: 'center'},
              {title: '时间', dataIndex: 'time', width: 180, align: 'center'},
              {title: '温度', dataIndex: 'temperature', width: 120, align: 'center'},
              {title: '烟雾告警', dataIndex: 'smokeName', width: 120, align: 'center'},
              {title: '预留漏点', dataIndex: 'leakage', width: 120, align: 'center'}
            ],
            buttons: {},
            pagination: {
              pageSize: 30,
              type: 'extra',
              sortReturnPagination: this.sortReturnPagination
            }
            // hidePaginationPart: true,
          },
          search: {
            type: 'extra',
            isShowHigh: false,
            sortReturnSearchData: this.sortReturnSearchData,
            sortReturnSearchResetData: this.sortReturnSearchData,
            defaultVals: {
              time: [moment(new Date()), moment(new Date())]
            },
            nameArray: [{
              name: '起止时间', type: 'timeRange', spans: '6', dataIndex: 'time'
            }]
          }
        }

      },
      visible: false,
      choseTreeData: {}
    }
  },
  computed: {
    ...mapState({
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getChoseHotel: state => state.common.choseHotel
    })
  },
  watch: {
    getSearch (val) {
      this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      !val.reset && this.changeStatus()
    },
    getPegination (val) {
      this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      !val.reset && this.changeStatus()
    },
    getChoseHotel (val) {
      this.handlePegination({page: 0, size: this.searchTable.table.data.size, reset: true})
      val && !isEmptyObject(val) && this.changeStatus()
    },
    visible (val) {
      val && this.$nextTick(() => {
        this.handleChangeTreeStatus(Math.random())
      })
    }
  },
  methods: {
    choseTree (data) {
      this.choseTreeData = data
      this.modal.searchTable.table.data.terminalId = data.id
      this.handleChangeExtraTableStatus(Math.random())
    },
    sortReturnPagination (data) {
      if (isEmptyObject(this.choseTreeData)) {
        this.$message.info('请先选择左侧房间!')
        return false
      }
      this.modal.searchTable.table.data = {...this.modal.searchTable.table.data, ...data}
      this.handleChangeExtraTableStatus(Math.random())
      return data
    },

    sortReturnSearchData (data) {
      if (data.time && data.time.length) {
        data.beginDate = data.time[0].format('YYYY-MM-DD') + ' 00:00:00'
        data.endDate = data.time[1].format('YYYY-MM-DD') + ' 23:59:59'
      } else {
        data.beginDate = moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00'
        data.endDate = moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59'
      }

      if (isEmptyObject(this.choseTreeData)) {
        this.$message.info('请先选择左侧房间!')
        return false
      }
      this.modal.searchTable.table.data = {...this.modal.searchTable.table.data, ...data}
      this.handleChangeExtraTableStatus(Math.random())
      return data
    },
    sortReturnTreeData (data) {
      let arr = []
      data = data[0]
      if (!isEmptyObject(data)) {
        for (let i in data) {
          const item = data[i]
          let subArr = {title: `楼层${i}`, key: i, children: []}
          item && item.length && item.forEach((m, n) => {
            subArr.children.push({title: `${m.ammeter}(${m.name})`, key: m.id, isLeaf: true, ...m})
          })
          arr.push(subArr)
        }
      }
      return arr
    },
    handleOk () {

    },
    showModal () {
      this.visible = true
    },
    changeStatus () {
      !isEmptyObject(this.$store.state.common.choseHotel) && this.handleChangeTableStatus(Math.random())
      // this.handleChangeTableStatus(Math.random())
    },
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeExtraTableStatus',
      'handleChangeTreeStatus',
      'handlePegination'
    ]),
    sortReturnData (data) {
      data && data.length && data.forEach((item, i) => {
        data[i].smokeName = ['不告警', '告警'][item.smoke]
      })
      return data
    }
  },
  created () {
    this.handlePegination({page: 0, size: 30, reset: true})
  },
  mounted () {
    this.changeStatus()
  }
}
</script>
<style lang="less">

	@import "../../../assets/css/modal/modal";

	.readTerminalHis {
		.ant-modal-body {
			padding: 0 !important;
		}
	}
</style>
