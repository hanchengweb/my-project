<template>
  <div>
    <!-- 主体 -->
    <treeDbTable style="height: 100%;"
                 :treeJson="tree"
                 :dbTable="dbTable"></treeDbTable>
    <!-- 房间分布弹框 -->
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
import treeDbTable from '@/view/components/treeDbTable/treeDbTable'
import hotelModal from './hotel/modal'
import { getFlag } from '@/api/const'
import {
  getConst,
  getBrand,
  getCountyCode,
  getCompanys,
  getConfigField,
  getAlarmType,
  getProviceCityCounty
} from '../../api/hotelConst'
import { isArray, isJson, isEmptyObject } from '../../libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl, sortProviceCityTree, sortCompanyBrand,getCompany } from '@/libs/util'
import { treeProviceSearch } from '../mixins/treeProviceSearch'

export default {
  mixins: [treeProviceSearch],
  components: {
    treeDbTable,
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
        sortReturnTreeData: this.sortReturnTreeData,
        defaultLoadTreeStatus: true,
        defaultSelectedStatue: true,
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
            hideMenuFold: true,
            data: {
              name: '',
              code: '',
              brandCode: '',
              proviceCode: '',
              cityCode: '',
              countyCode: '',
              hotelType: '',
              flag: '',
              page: '0',
              size: '10'
            },
            choseTrCb: this.choseTrCb,
            urls: {},
            buttons: {
              sortBtnClick: this.sortBtnClick,
              cache: {
                data: {
                  hotelid: ''
                }
              }
            },
            pagination: {
              isSelf: true,
              buttons: [{
                name: '房间分布',
                // url: 'readEleCurve',
                onClick: this.showChartModal,
                style: 'margin-left:-44px'
                // icon: 'line-chart'
              } ]
            },
            modal: {
              // sortReturnModalData: this.sortReturnModalData,
              onModalChange: this.onModalChange,
              urls: {},
              data: {
                brandCode: [],
                countyCode: [],
                companyBrand: [],
                hotelType: []
              },
              baseData: {
                add: {
                  proviceCode: '',
                  cityCode: ''
                }
              }
              // upload: {
              //   image: {
              //     imgList: '',
              //     sortReturnUploadFile: this.sortReturnUploadFile
              //   }
              // }
            }
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
            }] // 表格详情上部搜索
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [
              { name: '参数配置', key: 'config' },
              { name: '告警配置', key: 'alarmConfig' },
              { name: '客房类型', key: 'hotelGuestRoomType' },
              { name: '酒店简介', key: 'hotelInfo' }
            ] // 表格详情下部选项
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
            } // 表格详情上部搜索（应该是作废）
          },
          table: {
            name: 'config',
            title: 'config',
            type: 'sub',
            deleteColumnsIndex: {
              hotelGuestRoomType: 1
            },
            multiple: true,
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
                sort: 'seqno'
              },
              hotelInfo: {
                hotelId: '',
                sort: 'seqno'
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
              }
            }
          }
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
      'handleChangeSubTableStatus'
    ]),
    // sortReturnUploadFile (file) {
    //   if (file && file.name) {
    //     this.file = {
    //       fileName: file.name.substring(0, file.name.lastIndexOf('.')),
    //       fileSuffix: file.name.substring(file.name.lastIndexOf('.') + 1)
    //     }
    //   }
    // },
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
    choseTrCb (data) {
      let json = JSON.parse(data)
      json.proCityConutry = [json.proviceCode, json.cityCode]
      json.countyCode && json.proCityConutry.push(json.countyCode)
      return json
    },
    getProviceCityCounty () {
      getProviceCityCounty().then(res => {
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
      if (key === 'image' && val.value && isArray(val.value) && val.value[0] && this.file.fileName && this.file.fileSuffix) {
        form.setFieldsValue({ fileName: this.file.fileName })
        form.setFieldsValue({ fileSuffix: this.file.fileSuffix })
      }
    },
    sortReturnModalData (values) {
      values.proviceCode = values.proCityConutry[0]
      values.cityCode = values.proCityConutry[1]
      values.countyCode = values.proCityConutry[2] || ''
      let status = false
      if (isJson(values.image.value)) {
        status = !values.image.value.status
        if (!values.image.value.status) {
          this.$message.error(values.image.value.msg)
        } else {
          values.image = ''
        }
      } else if (isArray(values.image.value)) {
        values.image = values.image.value[0]
      }
      if (this.file) values.imageName = this.file.fileName
      let data = new FormData()
      for (let i in values) {
        if (i == 'apkVersion' || i == 'jsVersion') values[i] = parseFloat(values[i])
        data.append(i, values[i])
      }
      return { type: 'formData', data: data, noSubmitByPage: status, proviceCode: values.proviceCode, cityCode: values.cityCode, countyCode: values.countyCode }
      // return values
    },
    getFlag () {
      getConst('flag').then(res => {
        this.dbTable.searchTable.search.nameArray[2].data = res
        this.dbTable.tabsTable.search.hotelGuestRoomType.nameArray[2].data = res
      })
      getConst('hotelType').then(res => {
        this.dbTable.searchTable.table.modal.data.hotelType = res
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
    getCompanys () {
      getCompanys().then(res => {
        this.dbTable.searchTable.table.modal.data.companyCode = res
        // getBrand().then(res1 => {
        // 	this.dbTable.searchTable.search.highArray[0].data = sortCompanyBrand(res, res1)
        // })
      })
    },
    getName () {
      getConst('name').then(res => {
        this.dbTable.tabsTable.table.modal.data.name = res
      })
    },
    getBrand () {
      getBrand({}).then(res => {
        this.dbTable.searchTable.table.modal.data.brandCode = res
      })
    },
    changeStatus (type) {
      type === 'sub' ? this.handleChangeSubTableStatus('sub') : this.handleChangeTableStatus(this.$route.name)
    },
    sortBtnClick (item) {
      let treeData = this.$store.state.data.tree
      return item.type == 'add' && treeData.protype != 2 ? {
        status: false,
        message: '省级别不能添加酒店，只有到市级别才能添加'
      } : ''
    },
    sortReturnTreeData (data) {
      let arr = sortProviceCityTree(data)
      arr.length && arr.forEach((item, index) => {
        if (item.protype == 2) arr[index].isLeaf = true
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
    this.modalWidth = document.getElementById('app').clientWidth * 0.8 + 'px'
    this.getFlag()
    // this.getBrand()

    this.getCompanys()
    this.getConfigField()
    this.getName()
    this.getAlarmType()
    this.getProviceCityCounty()
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
        if (val.isTreeTop) {
          this.dbTable.searchTable.table.data = {
            ...this.dbTable.searchTable.table.data,
            proviceCode: '',
            cityCode: ''
          }
        } else if (val.protype == 1) {
          this.dbTable.searchTable.table.data = {
            ...this.dbTable.searchTable.table.data,
            proviceCode: val.code,
            cityCode: ''
          }
        } else if (val.protype == 2) {
          this.dbTable.searchTable.table.data = {
            ...this.dbTable.searchTable.table.data,
            proviceCode: val.procode,
            cityCode: val.code
          }
          this.dbTable.searchTable.table.modal.baseData.add.cityCode = val.code
          this.dbTable.searchTable.table.modal.baseData.add.proviceCode = val.procode
          this.dbTable.searchTable.table.modal.baseData.add.proCityConutry = [val.procode, val.code]
          // this.getCountyCode({procode: val.code})
        }
        this.changeStatus({})
      }
    },
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.tabsTable.table.tabData.config.ownerId = val.id
        this.dbTable.tabsTable.table.tabData.config.owner = 'hotel'
        // this.dbTable.tabsTable.table.tabData.config.ownerName = '酒店'
        this.dbTable.tabsTable.table.tabData.alarmConfig.ownerId = val.id
        this.dbTable.tabsTable.table.tabData.hotelGuestRoomType.hotelId = val.id
        this.dbTable.tabsTable.table.tabData.hotelInfo.hotelId = val.id

        this.dbTable.tabsTable.table.modal.baseData.add.ownerId = val.id
        this.dbTable.tabsTable.table.modal.baseData.add.owner = 'hotel'
        // this.dbTable.tabsTable.table.modal.baseData.add.ownerName = '酒店'
        this.dbTable.tabsTable.table.modal.baseData.add.hotelId = val.id

        this.dbTable.searchTable.table.buttons.cache.data = { hotelid: val.id }
        this.dbTable.tabsTable.table.buttons.cache.data.hotelid = val.id

        getBrand({ companyCode: val.companyCode }).then(res => {
          this.dbTable.searchTable.table.modal.data.brandCode = res
        })

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
