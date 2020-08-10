<template>
  <dbTable :dbTable="dbTable"></dbTable>
</template>
<script>
import dbTable from '@/view/components/dbTable/dbTable'
import { getFlag } from '@/api/const'
import { getConst, getConfigField, getAlarmType, getModbusMacUser } from '../../api/hotelConst'
import { isEmptyObject } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl, sortProviceCityTree } from '@/libs/util'
import { treeProviceSearch } from '../mixins/treeProviceSearch'

export default {
  mixins: [treeProviceSearch],
  components: {
    dbTable
  },
  data () {
    return {
      tree: {
        title: '省市列表',
        treeTop: {
          type: 'input'
        },
        url: 'h_common_proviceCity__get',
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
        addType: 'system'
      },
      dbTable: {
        searchTable: {
          table: {
            type: 'main',
            title: 'terminal',
            deleteColumnsIndex: 1,
            showHotel: true,
            data: {
              mac: '',
              floor: '',
              flag: '',
              page: '0',
              size: '10'
            },
            urls: {},
            buttons: {
              hideFlag: true,
              hideAdd: true,
              cache: {
                data: {
                  hotelid: ''
                }
              }
              /*actions: [{
                name: '缓存同步',
                icon: 'swap',
                btnClick: this.btnClick,
                style: 'margin-left:-1px',
              }]*/
            },
            modal: {
              urls: {},
              data: {
                mac: [],
              },
              baseData: {
                add: {}
              },
            },
          },
          search: {
            isShowHigh: false,
            nameArray: [{
              name: 'MAC', type: 'input', span: '4', dataIndex: 'mac'
            }, {
              name: '楼层', type: 'input', data: [], span: '6', dataIndex: 'floor'
            }, {
              name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
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
                owner: 'terminal'
              },
              alarmConfig: {
                ownerId: '',
                owner: 'terminal'
              },
            },
            urls: {},
            buttons: {
              cache: {
                data: {
                  configId: '',
                  hotelid: ''
                }
              },
            },
            modal: {
              // name: 'dictionaryDetail',
              // title: 'dictionaryDetail',
              data: {
                field: [],
                alarmType: []
              },
              baseData: {
                add: {
                  owner: 'terminal',
                  ownerName: '终端',
                  ownerId: '',
                }
              },
            },
          },
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
    ]),
    beforeHandleTree (val) {
      this.tree.tempTree = val
      return (val.isTreeTop || val.protype) ? {
        status: false,
        message: '省市级别无法查看该数据,只有酒店可以查看'
      } : ''
    },
    btnClick (item) {
      // console.log(item)
    },
    sortBtnClick (item) {
      let treeData = this.tree.tempTree
      return item.type == 'add' && (item.isTreeTop || treeData.protype) ? {
        status: false,
        message: '省市级别不能添加终端，只有到酒店级别才能添加'
      } : ''
    },
    getFlag () {
      getConst('flag').then(res => {
        this.dbTable.searchTable.search.nameArray[2].data = res
      })
    },
    getConfigField () {
      getConfigField('terminal').then(res => {
        this.dbTable.tabsTable.table.modal.data.field = res
      })
    },
    getAlarmType () {
      getAlarmType('terminal').then(res => {
        this.dbTable.tabsTable.table.modal.data.alarmType = res
      })
    },
    getModbusMac (id) {
      getModbusMacUser(id, 'terminal').then(res => {
        this.dbTable.searchTable.table.modal.data.mac = res
      })
    },
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus('sub') : this.handleChangeTableStatus(this.$route.name)
    },
    sortReturnTreeData (data) {
      let arr = sortProviceCityTree(data)
      arr.length && arr.forEach((item, index) => {
        if (item.proviceCode) arr[index].isLeaf = true
      })
      return arr
    }
  },
  created () {
    this.getFlag()
    this.getConfigField()
    this.getAlarmType()
    const id = this.$store.state.common.choseHotel.id
    if (id) {
      this.dbTable.searchTable.table.data.hotelId = id
      this.dbTable.searchTable.table.modal.baseData.add.hotelId = id
      this.dbTable.searchTable.table.buttons.cache.data.hotelid = id
      this.dbTable.tabsTable.table.buttons.cache.data.hotelid = id
      this.getModbusMac(id)
    }
  },
  mounted () {
    this.changeStatus()
  },
  computed: {
    ...mapState({
      getChoseTr: state => state.data.choseTr,
      getSubChoseTr: state => state.data.subChoseTr,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getSubPegination: state => state.data.subPegination,
      getSubSearch: state => state.data.subSearch,
      getChoseHotel: state => state.common.choseHotel
    }),
  },
  watch: {
    getSubChoseTr (val) {
      if (!isEmptyObject(val)) {
        //this.dbTable.tabsTable.table.buttons.cache.data.configId = val.id
      }
    },
    getTree (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.searchTable.table.data.hotelId = val.id
        this.dbTable.searchTable.table.modal.baseData.add.hotelId = val.id
        this.getModbusMac(val.id)
        this.changeStatus()
      }
    },
    getChoseHotel (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.searchTable.table.data.hotelId = val.id
        this.dbTable.searchTable.table.modal.baseData.add.hotelId = val.id
        this.dbTable.searchTable.table.buttons.cache.data.hotelid = val.id
        this.dbTable.tabsTable.table.buttons.cache.data.hotelid = val.id
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

      if (!val.reset) {
        this.changeStatus()
      }
    },
    getSearch (val) {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      if (!val.reset) {
        this.changeStatus()
      }
    },
    getSubPegination (val) {
      this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
      if (!val.reset) this.changeStatus('sub')

    },
    getSubSearch (val) {
      this.dbTable.tabsTable.table.data = { ...this.dbTable.tabsTable.table.data, ...val }
      if (!val.reset) this.changeStatus('sub')

    },
  },
}
</script>
