<template>
  <dbTable :dbTable="dbTable"></dbTable>
</template>
<script>

import dbTable from '@/view/components/dbTable/dbTable'
import { getFlag } from '@/api/const'
import { getConst, getConfigField } from '../../api/hotelConst'
import { isEmptyObject } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { changeUrl, getChangeUrl } from '@/libs/util'

export default {
  components: {
    dbTable
  },
  data () {
    return {
      dbTable: {
        searchTable: {
          table: {
            type: 'main',
            data: {
              name: '',
              code: '',
              flag: '',
              page: '0',
              size: '10'
            },
            deleteColumnsIndex: 1,
            urls: {},
            buttons: {
              cache: {
                data: {}
              }
            },
            modal: {
              urls: {},
              baseData: {
                add: {}
              },
            },
          },
          search: {
            nameArray: [{
              name: '名称', type: 'input', span: '4', dataIndex: 'name'
            }, {
              name: '编码', type: 'input', span: '4', dataIndex: 'code'
            }, {
              name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
            }]
          }
        },
        tabsTable: {
          type: 'tabs',
          tabs: {
            arr: [{ name: '参数配置', key: 'config' }, { name: '品牌维护', key: 'brand' }]
          },
          search: {
            type: 'sub',
            brand: {
              nameArray: [{
                name: '名称', type: 'input', span: '4', dataIndex: 'name'
              }, {
                name: '编码', type: 'input', span: '4', dataIndex: 'code'
              }, {
                name: '等级', type: 'select', data: [], span: '4', dataIndex: 'grade'
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
            search: ['brand'],
            deleteColumnsIndex: {
              brand: 1
            },
            addDict: {
              brand: ['grade']
            },
            data: {
              page: '0',
              size: '10'
            },
            tabData: {
              config: {
                ownerId: '',
                owner: 'company'
              },
              brand: {
                companyId: '',
                companyName: '',
                companyCode: '',
                owner: 'company'
              },
            },
            urls: {},
            buttons: {
              cache: {
                data: {}
              }
            },
            modal: {
              // name: 'dictionaryDetail',
              // title: 'dictionaryDetail',
              data: {
                grade: [],
                field: []
              },
              baseData: {
                add: {
                  companyId: '',
                  companyCode: '',
                  ownerId: '',
                  owner: 'company',
                  ownerName: '集团'
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
    getFlag () {
      getConst('flag').then(res => {
        this.dbTable.searchTable.search.nameArray[2].data = res
        this.dbTable.tabsTable.search.brand.nameArray[3].data = res
      })
    },
    getConfigField () {
      getConfigField('company').then(res => {
        this.dbTable.tabsTable.table.modal.data.field = res
      })
    },
    getGrade () {
      getConst('grade').then(res => {
        this.dbTable.tabsTable.search.brand.nameArray[2].data = res
        this.dbTable.tabsTable.table.modal.data.grade = res
      })
    },
    changeStatus (type) {
      type == 'sub' ? this.handleChangeSubTableStatus('sub') : this.handleChangeTableStatus(this.$route.name)
    },
  },
  created () {
    this.getFlag()
    this.getGrade()
    this.getConfigField()
  },
  computed: {
    ...mapState({
      getChoseTr: state => state.data.choseTr,
      getSubChoseTr: state => state.data.subChoseTr,
      getTabs: state => state.data.tabs,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getSubSearch: state => state.data.subSearch,
      getSubPegination: state => state.data.subPegination,
    }),
  },
  watch: {
    getTabs (val) {
      this.dbTable.tabsTable.table.buttons.cache.data = val === 'config' ? {
        code: '',
        configId: ''
      } : { code: '' }
    },
    getSubChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.tabsTable.table.buttons.cache.data = this.$store.state.data.tabs === 'config' ? {
          configId: val.id,
          hotelid: ''
        } : { code: this.$store.state.data.choseTr.code }
      }
    },
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        // this.dbTable.tabsTable.table.data.pid = val.id
        this.dbTable.tabsTable.table.tabData.brand.companyId = val.id
        this.dbTable.tabsTable.table.tabData.brand.companyCode = val.code
        this.dbTable.tabsTable.table.tabData.brand.companyName = val.name

        this.dbTable.tabsTable.table.tabData.config.ownerId = val.id
        this.dbTable.tabsTable.table.modal.baseData.add.companyId = val.id
        this.dbTable.tabsTable.table.modal.baseData.add.companyCode = val.code
        this.dbTable.tabsTable.table.modal.baseData.add.companyName = val.name
        this.dbTable.tabsTable.table.modal.baseData.add.ownerId = val.id

        this.dbTable.searchTable.table.buttons.cache.data = { code: val.code }

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
  mounted () {
    this.handleChangeTableStatus(this.$route.name)
  }
}
</script>
