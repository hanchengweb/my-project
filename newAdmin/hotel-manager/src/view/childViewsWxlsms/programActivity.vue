<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import {mapActions, mapState} from 'vuex'
import {getConst} from '../../api/hotelConst'

export default {
  components: {
    searchTable
  },
  data () {
    return {
      searchTable: {
        table: {
          type: 'main',
          deleteColumnsIndex: 2,//自定义Columns宽度
          data: {
            name: '',
            num: '',
            redirectUrl: '',
            status: '',
            page: '0',
            size: '10'
          },
          sortReturnData: this.sortReturnData,
          urls: {},
          buttons: {
            hideDel: false
          },
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            data: {},
            onModalChange: this.onModalChange
          }
        },
        search: {
          nameArray: [
            {name: '活动编号', type: 'input', data: [], span: '4', dataIndex: 'num'},
            {name: '活动名称', type: 'input', data: [], span: '6', dataIndex: 'name'},
            {name: '状态', type: 'select', data: [], span: '6', dataIndex: 'status'}
          ]
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus'
    ]),
    sortReturnData (data) {
      data && data.length && data.forEach((item, i) => {
        if (data[i].status === 1) {
          data[i].statusName2 = '上线'
        } else if (data[i].status === 2) {
          data[i].statusName2 = '下线'
        } else if (data[i].status === 0) {
          data[i].statusName2 = '新增'
        }
      })
      return data
    },
    onModalChange (val, key, form) {
      /* if (key === 'apkFile' && val.value && isArray(val.value) && val.value[0] && this.file.fileName) {
					form.setFieldsValue({apkFileName: this.file.fileName})
				} */
    },
    sortReturnModalData (values) {
      return values
    },
    getFlag () {
      getConst('activityStatus').then(res => {
        this.searchTable.search.nameArray[2].data = res
      })
    },
    changeStatus (val) {
      this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      this.handleChangeTableStatus(Math.random())
    }
  },
  computed: {
    ...mapState({
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search
    })
  },
  watch: {
    getPegination (val) {
      if (!val.reset) {
        this.changeStatus(val)
      } else {
        this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      }
    },
    getSearch (val) {
      if (!val.reset) {
        this.changeStatus(val)
      } else {
        this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      }
    }
  },
  created () {
    this.getFlag()
  },
  mounted () {
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
