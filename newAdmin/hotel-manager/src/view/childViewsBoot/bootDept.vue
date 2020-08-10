<template>
  <treeDbTable :treeJson="tree"
               :dbTable="dbTable">
  </treeDbTable>
</template>
<script>

import treeDbTable from '@/view/components/treeDbTable/treeDbTable'
import { mapActions, mapState } from 'vuex'
import { sortTreeData } from '../../libs/util'
import { isEmptyObject } from '../../libs/tool'
import { getData } from '../../api/common'

export default {
  components: {
    treeDbTable
  },
  data () {
    return {
      tree: {
        title: '酒店列表',
        treeTop: {
          type: 'input',
          name: '部门列表'
        },
        url: 'r_author_dept_tree_get',
        sortReturnTreeData: this.sortReturnTreeData,
        defaultLoadTreeStatus: true,
        defaultSelectedStatue: true,
        data: { moduleid: this.$route.query.moduleid },
        load: {
          url: 'r_author_dept_tree_get',
          data: { protype: 1 }
        },
      },
      dbTable: {
        searchTable: {
          table: {
            type: 'main',
            hideMenuFold: true,
            useUrlStatus: true,
            url: 's_dept_page_get',
            deleteColumnsIndex: 2,
            data: {
              pid: '',
              name: '',
              flag: '',
              page_page: '0',
              size_size: '10'
            },
            banDblClick: true,
            urls: {},
            hideButtons: true,
            buttons: {},
            pagination: {},
            modal: {},
          },
          search: {
            isShowHigh: false,
            //sortReturnSearchData: this.sortReturnSearchData,
            nameArray: [{
              name: '名称', type: 'input', span: '4', dataIndex: 'name'
            }, {
              name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
            }],
          }
        },
        tabsTable: {
          search: {},
          tabs: {
            arr: [
              { name: '部门类型', key: 'bootDeptType' },
            ],
            noAccess: true
          },
          table: {
            name: 'bootDeptType',
            title: 'bootDeptType',
            type: 'sub',
            deleteColumnsIndex: {
              bootDeptType: 1
            },
            useUrlStatus: true,
            url: 's_dept_i_type_page_get',
            data: {
              id: '',
              page_page: '0',
              page_size: '10'
            },
            urls: {},
            buttons: {
              hideAdd: true,
              hideDel: true,
              hideFlag: true
            },
            modal: {
              name: 'bootDeptType',
              title: 'bootDeptType',
              baseData: {
                add: {}
              },
            },
          },
        }
      },
    }
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
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.tabsTable.table.data.id = val.id
        this.changeStatus('sub')
      }
    },
    getTree (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.searchTable.table.data.pid = val.id
        this.handleChangeTableStatus(Math.random())
      }
    },
    getPegination (val) {
      let page = { page_page: val.page, page_size: val.size }
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...page }
      if (!val.reset) this.changeStatus()
    },
    getSearch (val) {
      this.dbTable.searchTable.table.data = { ...this.dbTable.searchTable.table.data, ...val }
      if (!val.reset) this.changeStatus()

    }
  },

  methods: {
    ...mapActions([
      'handleChangeTreeStatus',
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
    ]),
    sortReturnTreeData (data) {
      return sortTreeData(data)
    },
    changeStatus (type) {
      type ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    },
    getFlag () {
      getData({
        name: 'r_dict_flag_get'
      }).then(res => {
        if (res.code == '200') {
          let data = res.data
          data.length && data.forEach((item, i) => {
            data[i].title = data[i].name
            data[i].value = data[i].code
            data[i].key = data[i].code
          })
          this.dbTable.searchTable.search.nameArray[1].data = data
        }

      })
    }
  },
  created () {
    this.getFlag()
  },
  mounted () {
    this.handleChangeTreeStatus(true)
  }

}
</script>
