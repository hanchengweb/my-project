<template>
  <div style="height: 100%">
    <treeDbTable :treeJson="tree"
                 :dbTable="dbTable"
                 style="height: 100%;"></treeDbTable>
    <setModbusConfigModal :modalVisible="visible"></setModbusConfigModal>
  </div>
</template>
<script>
import treeDbTable from '@/view/components/treeDbTable/treeDbTable'
import { getFlag } from '@/api/const'
import { getConst, getConfigField, getAlarmType } from '../../api/hotelConst'
import { isEmptyObject } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl, sortProviceCityTree,getCompany } from '@/libs/util'
import { treeProviceSearch } from '../mixins/treeProviceSearch'
import { getData } from '../../api/common'
import setModbusConfigModal from './modbus/setModbusConfig'

export default {
  mixins: [treeProviceSearch],
  components: {
    treeDbTable,
    setModbusConfigModal
  },
  data () {
    return {
      tree: {
        title: '省市列表',
        url: 'h_common_proviceCity__get',
        expandAction: 'click',
        sortReturnTreeData: this.sortReturnTreeData,
        beforeHandleTree: this.beforeHandleTree,
        defaultLoadTreeStatus: true,
        tempTree: {},
        data: { protype: 1, procode: '990001' },
        loadData: {
          type: 'provice',
          down: 'hotel',
          plus: ['hotel'],
          url: 'h_hotel__get',
          data: {
            city_code: ''
          }
        },
        load: {
          url: 'h_common_proviceCity__get',
          data: { protype: 1, procode: '990001' }
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
              provice_code: '',
              city_code: '',
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
              }

            },
            choseTrCb: this.choseTrCb,
            modal: {
              data: {
                deviceGrade: [],
                collectMode: [],
                protocolCode: []
              },
              urls: {},
              baseData: {
                add: {}
              }
            }
          },
          search: {
            isShowHigh: false,
            nameArray: [
              {
                name: '设备等级', type: 'select', span: '4', dataIndex: 'deviceGrade'
              }, {
                name: '采集模式', type: 'select', span: '4', dataIndex: 'collectMode'
              }, {
                name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
              }
            ]
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '参数配置', key: 'config' },
              { name: '告警配置', key: 'alarmConfig' },
              { name: '通讯机配置', key: 'modbusDeviceConfig' }
            ]
          },
          search: {
            type: 'sub',
            hotelGuestRoomType: {
              nameArray: [{
                name: '名称', type: 'input', span: '4', dataIndex: 'name'
              }, {
                name: '编码', type: 'input', span: '4', dataIndex: 'code'
              }, {
                name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
              }]
            }
          },
          table: {
            name: 'config',
            title: 'config',
            type: 'sub',
            multiple: true,
            data: {
              page: '0',
              size: '10'
            },
            sortReturnData: this.sortReturnData,
            tabData: {
              config: {
                ownerId: '',
                owner: 'modbus'
                // ownerName: '通讯机'
              },
              alarmConfig: {
                ownerId: '',
                owner: 'modbus'
                // ownerName: '通讯机'
              },
              modbusDeviceConfig: {
                mac: ''
              }
            },
            urls: {},
            buttons: {
              cache: {
                data: {
                  configId: '',
                  hotelid: ''
                }
              },
              actionsAfter: [],
              subData: {
                modbusDeviceConfig: {
                  hideAdd: true,
                  hideDel: true,
                  actionsAfter: [{
                    name: '召测',
                    icon: 'snippets',
                    btnClick: this.btnClickRead,
                    noDisabled: true,
                    style: 'margin-left:-1px'
                  }, {
                    name: '设置参数',
                    icon: 'edit',
                    btnClick: this.btnClickSetting,
                    noDisabled: true
                  }]
                },
                alarmConfig: {
                  hideAdd: false,
                  hideDel: false,
                  actionsAfter: []
                },
                config: {
                  hideAdd: false,
                  hideDel: false,
                  actionsAfter: []
                }
              }

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
                  owner: 'modbus',
                  ownerName: '通讯机',
                  ownerId: '',
                  mac: ''
                }
              }
            }
          }
        }
      },
      modbusDeviceConfigLength: 0,
      visible: false
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus'
    ]),
    sortReturnData (data, type, name) {
      if (name === 'modbusDeviceConfig') {
        this.modbusDeviceConfigLength = data.length
      }

      return data
    },
    btnClickSetting (item) {
      // let subChoseTr = this.$store.state.data.subChoseTr
      if (!this.modbusDeviceConfigLength) {
        this.$message.info('请先召测,再进行该操作!')
        return false
      }
      this.visible = Math.random()
      // this.$self_modal({title: '详情', style: '', data: {labels: this.labels, data: {}}})
    },
    btnClickRead (item) {
      let icon = item.icon
      item.icon = 'loading'
      getData({
        name: 'h_modbusDeviceConfig_readModbusConfig_get',
        data: { mac: this.$store.state.data.choseTr.mac }
      }).then(res => {
        if (res.code == '200') {
          if (res.data.success) {
            this.$message.success('操作成功!')
            this.changeStatus('sub')
          } else {
            this.$message.error(res.data.message || '操作失败!')
          }
        }
        item.icon = icon
      }, err => {
        item.icon = icon
      })
    },
    btnClick (item) {
      // console.log(item)
    },
    sortBtnClick (item) {
      let treeData = this.tree.tempTree
      return item.type == 'add' && (item.isTreeTop || treeData.protype) ? {
        status: false,
        message: '省市级别不能添加通讯机，只有到酒店级别才能添加'
      } : ''
    },
    beforeHandleTree (val) {
      this.tree.tempTree = val
      return (val.isTreeTop || val.protype) ? {
        status: false,
        message: '省市级别无法查看该数据,只有酒店可以查看'
      } : ''
    },
    getFlag () {
      getConst('flag').then(res => {
        this.dbTable.searchTable.search.nameArray[2].data = res
      })
    },
    getDeviceGrade () {
      getConst('deviceGrade').then(res => {
        this.dbTable.searchTable.search.nameArray[0].data = res
        this.dbTable.searchTable.table.modal.data.deviceGrade = res
      })
    },
    choseTrCb (data) {
      let data1 = JSON.parse(data)
      if (data1.collectMode) data1.collectMode = data1.collectMode.toString()
      if (data1.deviceGrade) data1.deviceGrade = data1.deviceGrade.toString()
      return data1
    },
    getCollectMode () {
      getConst('collectMode').then(res => {
        this.dbTable.searchTable.search.nameArray[1].data = res
        this.dbTable.searchTable.table.modal.data.collectMode = res
      })
    },
    getProtocolCode () {
      getConst('protocolCode').then(res => {
        // this.dbTable.searchTable.search.highArray[2].data = res
        this.dbTable.searchTable.table.modal.data.protocolCode = res
      })
    },
    getConfigField () {
      getConfigField('modbus').then(res => {
        this.dbTable.tabsTable.table.modal.data.field = res
      })
    },
    getAlarmType () {
      getAlarmType('modbus').then(res => {
        this.dbTable.tabsTable.table.modal.data.alarmType = res
      })
    },
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus('sub') : this.handleChangeTableStatus(this.$route.name)
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
    this.getDeviceGrade()
    this.getCollectMode()
    this.getProtocolCode()
    this.getConfigField()
    this.getAlarmType()
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

        this.changeStatus()
      }
    },
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.tabsTable.table.tabData.config.ownerId = val.id
        this.dbTable.tabsTable.table.tabData.alarmConfig.ownerId = val.id
        this.dbTable.tabsTable.table.tabData.modbusDeviceConfig.mac = val.mac
        this.dbTable.tabsTable.table.modal.baseData.add.ownerId = val.id
        this.dbTable.tabsTable.table.modal.baseData.add.mac = val.mac
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
