<template>
  <treeTable :treeJson="tree"
             :searchTableJson="searchTable"></treeTable>
</template>
<script>
import treeTable from '@/view/components/treeTable/treeTable'
import { getFlag, getScope, getAccess, getModuleListId } from '@/api/const'
import { isEmptyObject, isJson, isArray } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'
import { getUrlData } from '@/api/common'
import { sortProviceCityTree } from '@/libs/util'
import { getConst } from '../../api/hotelConst'

export default {
  components: {
    treeTable
  },
  data () {
    return {
      tree: {
        title: '省市列表',
        url: 'h_common_proviceCity__get',
        treeTop: {},
        sortReturnTreeData: this.sortReturnTreeData,
        defaultSelectedStatue: true,
        data: { protype: 1, flag: 1 },
        loadData: {
          type: 'provice',
        },
        load: {
          url: 'h_common_proviceCity__get',
          data: { protype: 1 }
        },
        addType: 'system'
      },
      searchTable: {
        table: {
          type: 'main',
          deleteColumnsIndex: 6,
          hideMenuFold: true,
          data: {
            name: '',
            code: '',
            sort: 'seqno',
            page: '0',
            size: '10'
          },
          urls: {},
          addDict: ['protype'],
          buttons: {
            sortBtnClick: this.sortBtnClick
          },
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            baseData: {
              add: {
                procode: '',
                pathway: '',
                protype: '',
                proName: ''
              }
            }
          }
        },
        search: {
          isShowHigh: false,
          nameArray: [{
            name: '名称', type: 'input', span: '4', dataIndex: 'name'
          }, {
            name: '编码', type: 'input', span: '4', dataIndex: 'code'
          }]
        }
      },

    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleModalData'
    ]),
    sortBtnClick (item) {
      let treeData = this.$store.state.data.tree
      return item.type == 'add' && treeData.protype == 3 ? { status: false, message: '区级不能在增下级地区' } : ''
    },
    getProtype () {
      getConst('protype').then(res => {
        //this.searchTable.search.nameArray[2].data = res
      })
    },
    sortReturnModalData (values) {
      let json = { ...values, ...this.searchTable.table.modal.baseData.add }
      if (json.protype == 1) {
        json.pathway = `${json.procode}.${json.code}`
      } else {
        json.pathway = `${json.pathway}.${json.code}`
      }
      return json
    },
    changeModalData (key, value, changeKey) {
      const arr = this.searchTable.table.modal.data.modulename
      let id = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title == value) {
          id = arr[i].value
        }
      }
      return { name: changeKey, value: id }
    },
    changeStatus (val) {
      this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      this.handleChangeTableStatus(this.$route.name)
    },

    sortReturnTreeData (data) {
      let arr = sortProviceCityTree(data)
      arr.length && arr.forEach((item, index) => {
        if (item.protype == 2) arr[index].isLeaf = true
      })
      return arr
    }
  },
  computed: {
    ...mapState({
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getChoseTr: state => state.data.choseTr,
    }),
  },
  watch: {
    getTree (val) {
      if (!isEmptyObject(val)) {
        if (val.isTreeTop) {
          this.searchTable.table.modal.baseData.add.protype = 1
          this.searchTable.table.modal.baseData.add.procode = '990001'
          this.searchTable.table.modal.baseData.add.proName = ''
          this.changeStatus({ protype: 1, procode: '' })
        } else {
          this.searchTable.table.modal.baseData.add.protype = val.protype + 1
          this.searchTable.table.modal.baseData.add.procode = val.code
          this.searchTable.table.modal.baseData.add.proName = val.name
          this.searchTable.table.modal.baseData.add.pathway = val.pathway
          this.changeStatus({ protype: val.protype + 1, procode: val.code })
        }
      }

    },
    getPegination (val) {
      if (!val.reset) {
        this.changeStatus(val)
      } else {
        this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      }
    },
    getSearch (val) {
      if (!val.reset) {
        this.changeStatus(val)
      } else {
        this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      }
    }
  },
  created () {
    //this.getProtype()
  }
}
</script>
