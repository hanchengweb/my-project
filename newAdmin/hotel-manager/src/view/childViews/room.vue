<template>
  <treeDbTable :treeJson="tree"
               :dbTable="dbTable"></treeDbTable>
</template>
<script>
import treeDbTable from '@/view/components/treeDbTable/treeDbTable'
import { getFlag } from '@/api/const'
import { getConst, getHotelGuestRoomType, getModbusMac, getConfigField, getAlarmType } from '../../api/hotelConst'
import { isEmptyObject } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl, sortProviceCityTree,getCompany } from '@/libs/util'
import { treeProviceSearch } from '../mixins/treeProviceSearch'
import { getData } from '../../api/common'

export default {
  mixins: [treeProviceSearch],
  components: {
    treeDbTable
  },
  data () {
    return {
      roomTypeJson: {},
      tree: {
        title: '省市列表',
        url: 'h_common_proviceCity__get',
        expandAction: 'click',
        sortReturnTreeData: this.sortReturnTreeData,
        beforeHandleTree: this.beforeHandleTree,
        defaultLoadTreeStatus: true,
        tempTree: {},
        data: { protype: 1 },
        loadData: {
          type: 'provice',
          down: 'hotel',
          plus: ['hotel'],
          url: 'h_hotel__get',
          data: {
            cityCode: ''
          }
        },
        load: {
          url: 'h_common_proviceCity__get',
          data: { protype: 1 }
        },
        addType: 'system',
        noTopSelectable: true
      },
      dbTable: {
        searchTable: {
          table: {
            type: 'main',
            hideMenuFold: true,
            data: {
              name: '',
              code: '',
              hotelId: '',
              proviceCode: '',
              cityCode: '',
              flag: '',
              page: '0',
              size: '10'
            },
            urls: {},
            buttons: {
              sortBtnClick: this.sortBtnClick,
              cache: {
                data: {
                  hotelid: ''
                }
              },
              actionsAfter: [{
                name: '召测',
                icon: 'snippets',
                btnClick: this.btnClickRead,
                style: 'margin-left:-1px',
                noDisabled: false
              } ]

            },
            sortReturnData: this.sortReturnData,
            modal: {
              urls: {},
              data: {
                mac: [],
                roomType: [],
                guestRoomType: []
              },
              baseData: {
                add: {
                  hotelId: ''
                }
              }
            }
          },
          search: {
            isShowHigh: true,
            nameArray: [{
              name: '名称', type: 'input', span: '4', dataIndex: 'name'
            }, {
              name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
            }],
            highArray: [{
              name: '房间类型', type: 'select', span: '6', dataIndex: 'type'
            }, {
              name: '客房类型', type: 'select', span: '6', dataIndex: 'guestRoomType'
            }]
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '参数配置', key: 'config' },
              { name: '告警配置', key: 'alarmConfig' }
            ]
          },
          search: {},
          table: {
            name: 'config',
            title: 'config',
            type: 'sub',
            multiple: true,
            data: {
              page: '0',
              size: '10'
            },
            tabData: {
              config: {
                ownerId: '',
                owner: 'room'
              },
              alarmConfig: {
                ownerId: '',
                owner: 'room'
              }
            },
            urls: {},
            buttons: {
              cache: {
                data: {
                  configId: '',
                  hotelid: ''
                }
              }
            },
            modal: {
              data: {
                field: [],
                alarmType: []
              },
              baseData: {
                add: {
                  owner: 'room',
                  ownerName: '房间',
                  ownerId: ''
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus'
    ]),
    sortBtnClick (item) {
      let treeData = this.tree.tempTree
      return item.type == 'add' && (item.isTreeTop || treeData.protype) ? {
        status: false,
        message: '省市级别不能添加酒店，只有到酒店级别才能添加'
      } : ''
    },
    btnClickRead (item) {
      let icon = item.icon
      item.icon = 'loading'
      getData({
        name: 'h_room_callRoomSequence_get', /// hotel/manager/room/callRoomSequence
        data: { hotelid: this.$store.state.data.tree.id }
      }).then(res => {
        if (res.code == '200') {
          if (res.data.success) {
            this.$message.success('操作成功!')
            this.changeStatus()
          } else {
            this.$message.error(res.data.message || '操作失败!')
          }
        }
        item.icon = icon
      }, err => {
        item.icon = icon
      })
    },
    getFlag () {
      getConst('flag').then(res => {
        this.dbTable.searchTable.search.nameArray[1].data = res
      })
    },
    sortReturnData (data) {
      data && data.length && data.forEach((item, i) => {
        data[i].roomType = data[i].roomType && data[i].roomType.toString() || data[i].roomType || ''
        data[i].typeName = data[i].roomType && this.roomTypeJson[data[i].roomType] || ''
      })
      return data
    },
    getType () {
      getConst('type').then(res => {
        this.dbTable.searchTable.search.highArray[0].data = res
        this.dbTable.searchTable.table.modal.data.roomType = res
        res && res.length && res.forEach((item, i) => {
          this.roomTypeJson[item.value] = item.title
        })
      })
    },
    getConfigField () {
      getConfigField('room').then(res => {
        this.dbTable.tabsTable.table.modal.data.field = res
      })
    },
    getAlarmType () {
      getAlarmType('room').then(res => {
        this.dbTable.tabsTable.table.modal.data.alarmType = res
      })
    },
    getHotelGuestRoomType () {
      getConst('name').then(res => {
        this.dbTable.searchTable.search.highArray[1].data = res
        this.dbTable.searchTable.table.modal.data.guestRoomType = res
      })
    },
    getModbusMac (id) {
      getModbusMac(id).then(res => {
        this.dbTable.searchTable.table.modal.data.mac = res
      })
    },
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus('sub') : this.handleChangeTableStatus(this.$route.name)
    },
    beforeHandleTree (val) {
      this.tree.tempTree = val
      return (val.isTreeTop || val.protype) ? {
        status: false,
        message: '省市级别无法查看该数据,只有酒店可以查看'
      } : ''
    },
    sortReturnTreeData (data) {
      let arr = sortProviceCityTree(data)
      arr.length && arr.forEach((item, index) => {
        if (item.proviceCode) {
          arr[index].isLeaf = true
        } else {
          arr[index].selectable = false
        }
      })
      return arr
    }
  },
  created () {
    const companyCodes=JSON.parse(getCompany()).companyCode
    if(companyCodes){
      this.tree.url='h_common_readPCByCompany__get'
      this.tree.data.companyCode=companyCodes
      this.tree.load.url='h_common_readPCByCompany__get'
      this.tree.load.data.companyCode=companyCodes
    }
    this.getFlag()
    this.getType()
    this.getConfigField()
    this.getAlarmType()
    this.getHotelGuestRoomType()
  },
  computed: {
    ...mapState({
      getChoseTr: state => state.data.choseTr,
      getSubChoseTr: state => state.data.subChoseTr,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getSubPegination: state => state.data.subPegination,
      getSubSearch: state => state.data.subSearch
    })
  },
  watch: {
    getSubChoseTr (val) {
      if (!isEmptyObject(val)) {
        // this.dbTable.tabsTable.table.buttons.cache.data.configId = val.id
      }
    },
    getTree (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.searchTable.table.data.hotelId = val.id
        this.dbTable.searchTable.table.modal.baseData.add.hotelId = val.id

        this.dbTable.searchTable.table.buttons.cache.data.hotelid = val.id
        this.dbTable.tabsTable.table.buttons.cache.data.hotelid = val.id
        // this.getHotelGuestRoomType(val.id)
        this.getModbusMac(val.id)
        this.changeStatus()
      }
    },
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.tabsTable.table.tabData.config.ownerId = val.id
        this.dbTable.tabsTable.table.tabData.alarmConfig.ownerId = val.id
        this.dbTable.tabsTable.table.modal.baseData.add.ownerId = val.id
        this.changeStatus('sub')
      }
    },
    getPegination (val) {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      if (!val.reset) this.changeStatus()
    },
    getSearch (val) {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      if (!val.reset) this.changeStatus()
    },
    getSubPegination (val) {
      this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
      if (!val.reset) this.changeStatus('sub')
    },
    getSubSearch (val) {
      this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
      if (!val.reset) this.changeStatus('sub')
    }
  }
}
</script>
