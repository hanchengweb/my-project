<template>
  <searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import { mapActions, mapState } from 'vuex'
import { getFlag, getTradeList } from '@/api/const'
import { getConst } from '../../api/hotelConst'
import { isEmptyObject } from '../../libs/tool'
import { getData } from '../../api/common'

export default {
  components: {
    searchTable
  },
  data () {
    return {
      searchTable: {
        table: {
          type: 'main',
          hideSearch: true,
          useUrlStatus: true,
          url: 'l_creditThresholdDefault_page_get',///hotel/manager/dictionary/dic/{code}
          data: {
            page: '0',
            size: '30'
          },
          deleteColumnsIndex: 1,
          banDblClick: false,
          urls: {},
          buttons: {
            hideAdd: false,
            hideDel: false,
            hideFlag: false,
          },
          pagination: {
            pageSize: 30,
          },
          modal: {
            data: {
              flag: []
            },
          },
        },
        search: {
          isShowHigh: false,
        }
      },
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus'
    ]),
    changeStatus (val) {
      this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      this.handleChangeTableStatus(this.$route.name)
    },
    getFlag () {
      getConst('flag').then(res => {
        this.searchTable.table.modal.data.flag = res
      })
    }
  },
  computed: {
    ...mapState({
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getChoseTr: state => state.data.choseTr,
    }),
  },
  watch: {
    getChoseTr (val) { },
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
    this.getFlag()
  },
  mounted () {
    this.handleChangeTableStatus(this.$route.name)
  }
}
</script>
