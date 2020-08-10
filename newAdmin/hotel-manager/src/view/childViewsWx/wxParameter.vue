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
          deleteColumnsIndex: 2,
          data: {
            name: '',
            flag: '',
            page: '0',
            size: '10'
          },
          sortReturnData: this.sortReturnData,
          urls: {},
          buttons: {},
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            data: {}
          }
        },
        search: {
          isShowHigh: false,
          nameArray: [{
            name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
          }]
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus'
    ]),
    sortReturnData (data) {
      return data
    },
    sortReturnModalData (values) {
      return values
    },
    getFlag () {
      getConst('flag').then(res => {
        this.searchTable.search.nameArray[0].data = res
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
