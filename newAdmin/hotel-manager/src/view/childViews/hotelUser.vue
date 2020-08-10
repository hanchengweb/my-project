<template>
  <div>
    <dbTable style="height: 100%;"
             :dbTable="dbTable"></dbTable>
    <a-modal title="房间分布"
             v-model="visible"
             :width="modalWidth"
             :destroyOnClose="true"
             class="modalSelf1"
             @ok="handleOk">
      <hotelModal :id="id"></hotelModal>
    </a-modal>

  </div>
</template>
<script>
import dbTable from '@/view/components/dbTable/dbTable'
import hotelModal from './hotel/modal'
import { getFlag } from '@/api/const'
import {
  getConst,
  getBrandUser,
  getCountyCode,
  getCompanys,
  getConfigField,
  getAlarmType,
  getProviceCityCountyUser
} from '../../api/hotelConst'
import { isEmptyObject } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl, sortProviceCityTree, sortCompanyBrand } from '@/libs/util'
import { treeProviceSearch } from '../mixins/treeProviceSearch'

export default {
  mixins: [treeProviceSearch],
  components: {
    dbTable,
    hotelModal
  },
  data () {
    return {
      tree: {
        title: '省市列表',
        treeTop: {
          type: 'input'
        },
        url: 'h_common_proviceCity__get',
        sortReturnTreeData: sortProviceCityTree,
        data: { protype: 1 },
        loadData: {
          type: 'provice'
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
            title: 'hotel',
            data: {
              name: '',
              code: '',
              brandCode: '',
              proviceCode: '',
              cityCode: '',
              countyCode: '',
              flag: '',
              page: '0',
              size: '10'
            },
            choseTrCb: this.choseTrCb,
            urls: {},
            buttons: {
              hideFlag: true,
              hideAdd: true,
              cache: {
                data: {
                  hotelid: ''
                }
              },
              /*actions: [{
                name: '缓存同步',
                icon: 'swap',
                btnClick: this.btnClick,
                style: 'margin-left:-1px',
              }]*/
            },
            pagination: {

              isSelf: true,
              buttons: [{
                name: '房间分布',
                //url: 'readEleCurve',
                onClick: this.showChartModal,
                style: 'margin-left:-44px'
                //icon: 'line-chart'
              },]
            },
            modal: {
              sortReturnModalData: this.sortReturnModalData,
              onModalChange: this.onModalChange,
              urls: {},
              data: {
                brandCode: [],
                countyCode: [],
                companyBrand: []
              },
              baseData: {
                add: {
                  proviceCode: '',
                  cityCode: ''
                }
              },
            },
          },
          search: {
            isShowHigh: false,
            sortReturnSearchData: this.sortReturnSearchData,
            nameArray: [{
              name: '名称', type: 'input', span: '4', dataIndex: 'name'
            }, {
              name: '编码', type: 'input', span: '4', dataIndex: 'code'
            }, {
              name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
            }],
            // highArray: [{
            // 	name: '集团/品牌', type: 'cascader', spans: '12', data: [], dataIndex: 'companyBrand'
            // }]
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '参数配置', key: 'config' },
              { name: '告警配置', key: 'alarmConfig' },
              { name: '客房类型', key: 'hotelGuestRoomType' },
            ]
          },
          search: {
            type: 'sub',
            hotelGuestRoomType: {
              nameArray: [{
                name: '客房类型名称', type: 'input', spans: '7', dataIndex: 'name'
              }, {
                name: '客房类型编码', type: 'input', spans: '7', dataIndex: 'code'
              }, {
                name: '状态', type: 'select', data: [], spans: '4', dataIndex: 'flag'
              }]
            }
          },
          table: {
            name: 'config',
            title: 'config',
            type: 'sub',
            multiple: true,
            deleteColumnsIndex: {
              hotelGuestRoomType: 1
            },
            data: {
              page: '0',
              size: '10'
            },
            search: ['hotelGuestRoomType'],
            tabData: {
              config: {
                ownerId: '',
                owner: 'hotel'
              },
              alarmConfig: {
                ownerId: '',
                owner: 'hotel'
              },
              hotelGuestRoomType: {
                hotelId: '',
                sort: 'seqno',
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
            },
            modal: {
              data: {
                field: [],
                name: [],
                alarmType: [],
                proCityConutry: []
              },
              baseData: {
                add: {
                  owner: 'hotel',
                  ownerName: '酒店',
                  ownerId: '',
                  hotelId: '',
                  proCityConutry: []
                }
              },
            },
          },
        }
      },
      companyIdJson: {},
      visible: false,
      id: '',
      modalWidth: '800px'
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
    ]),
    showChartModal () {
      if (isEmptyObject(this.$store.state.data.choseTr)) {

        this.$message.info('请选择一个酒店,再进行操作!')
        return false
      }
      this.id = this.$store.state.data.choseTr.id
      this.visible = true

    },
    handleOk () {
      this.visible = false
    },
    sortReturnSearchData (data) {
      if (data.companyBrand && data.companyBrand.length) {
        data.companyCode = data.companyBrand[0]
        if (data.companyBrand[1]) data.brandCode = data.companyBrand[1]
      }
      return data
    },
    btnClick (item) {
      // console.log(item)
    },
    choseTrCb (data) {
      let json = JSON.parse(data)
      json.proCityConutry = [json.proviceCode, json.cityCode]
      json.countyCode && json.proCityConutry.push(json.countyCode)
      return json
    },
    getProviceCityCounty () {
      getProviceCityCountyUser().then(res => {
        this.dbTable.searchTable.table.modal.data.proCityConutry = res
      })
    },
    onModalChange (val, key, form) {
      if (key === 'companyCode') {
        getBrand({ companyCode: val }).then(res => {
          this.dbTable.searchTable.table.modal.data.brandCode = res
          form.setFieldsValue({ brandCode: '' })
        })
      }
    },
    sortReturnModalData (values) {
      values.proviceCode = values.proCityConutry[0]
      values.cityCode = values.proCityConutry[1]
      values.countyCode = values.proCityConutry[2] || ''
      return values
    },
    getFlag () {
      getConst('flag').then(res => {
        this.dbTable.searchTable.search.nameArray[2].data = res
        this.dbTable.tabsTable.search.hotelGuestRoomType.nameArray[2].data = res
      })
    },
    getAlarmType () {
      getAlarmType('hotel').then(res => {
        this.dbTable.tabsTable.table.modal.data.alarmType = res
      })
    },
    getConfigField () {
      getConfigField('hotel').then(res => {
        this.dbTable.tabsTable.table.modal.data.field = res
      })
    },
    getCountyCode (data) {
      getCountyCode(data).then(res => {
        this.dbTable.searchTable.table.modal.data.countyCode = res
      })
    },
    // getCompanys () {
    // 	getCompanys().then(res => {
    // 		this.dbTable.searchTable.table.modal.data.companyCode = res
    // 		getBrandUser().then(res1 => {
    // 			this.dbTable.searchTable.search.highArray[0].data = sortCompanyBrand(res, res1)
    // 		})
    // 	})
    // },
    getName () {
      getConst('name').then(res => {
        this.dbTable.tabsTable.table.modal.data.name = res
      })
    },
    getBrand (code) {
      getBrandUser(code).then(res => {
        this.dbTable.searchTable.table.modal.data.brandCode = res
      })
    },
    changeStatus (type) {
      type === 'sub' ? this.handleChangeSubTableStatus('sub') : this.handleChangeTableStatus(this.$route.name)
    },
  },
  created () {
    this.modalWidth = document.getElementById('app').clientWidth * .8 + 'px'
    this.getFlag()
    //this.getBrand()

    //this.getCompanys()
    this.getConfigField()
    this.getName()
    this.getAlarmType()
    this.getProviceCityCounty()
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
    }),
  },
  watch: {
    getSubChoseTr (val) {
      if (!isEmptyObject(val)) {
        //this.dbTable.tabsTable.table.buttons.cache.data.configId = val.id
      }
    },
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.tabsTable.table.tabData.config.ownerId = val.id
        this.dbTable.tabsTable.table.tabData.config.owner = 'hotel'
        //this.dbTable.tabsTable.table.tabData.config.ownerName = '酒店'
        this.dbTable.tabsTable.table.tabData.alarmConfig.ownerId = val.id
        this.dbTable.tabsTable.table.tabData.hotelGuestRoomType.hotelId = val.id

        this.dbTable.tabsTable.table.modal.baseData.add.ownerId = val.id
        this.dbTable.tabsTable.table.modal.baseData.add.owner = 'hotel'
        //this.dbTable.tabsTable.table.modal.baseData.add.ownerName = '酒店'
        this.dbTable.tabsTable.table.modal.baseData.add.hotelId = val.id

        this.dbTable.searchTable.table.buttons.cache.data = { hotelid: val.id }
        this.dbTable.tabsTable.table.buttons.cache.data.hotelid = val.id

        this.getBrand(val.companyCode)

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
    },
  },
}
</script>
<style lang="less">
.modalSelf1 {
  .ant-form-item-label {
  }

  .ant-modal-body {
    padding: 28px 50px;
  }

  .ant-modal-footer {
    border-top-width: 0;
    margin-top: 10px;
    padding: 10px 0 20px;
    text-align: center;

    button {
      height: 34px;
      margin-left: 40px;
      width: 100px;
    }
  }

  .ant-form-explain,
  .ant-form-extra {
    position: absolute;
  }

  .ant-modal-close-x {
    color: #fff;
    height: 38px;
    line-height: 38px;
  }

  .ant-modal-close {
    height: 38px;
    line-height: 38px;
  }

  .ant-modal-header {
    background: #0acac7;
    border-bottom-width: 0;
    padding: 8px 24px;

    .ant-modal-title {
      color: #fff;
    }
  }

  .ant-calendar-picker,
  .ant-input-number {
    width: 100%;
  }

  .ant-advanced-search-form .ant-form-item {
    margin-bottom: 0;
  }

  /*.ant-col-24, .ant-col-12 {*/
  /*padding: 0 !important;*/
  /*margin-bottom: 10px;*/
  /*&:nth-child(even) {*/
  /*margin-left: -1px;*/
  /*}*/
  /*}*/

  .ant-form-item-label {
    padding: 5px 0;
    background: #f0f2f4;
    color: #666666;

    label {
      font-size: 12px;
    }
  }

  .ant-form-item-control-wrapper {
    margin-top: 4px;
    padding-left: 9px;

    input,
    textarea {
      border-radius: 0 !important;
    }

    textarea {
      margin-bottom: 0 !important;
    }
  }
}
</style>
