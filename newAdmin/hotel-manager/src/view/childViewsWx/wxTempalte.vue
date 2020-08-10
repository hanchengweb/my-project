<template>
  <searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import { mapActions, mapState } from 'vuex'
import { getConst, getAlarmTypeWx } from '../../api/hotelConst'

export default {
  components: {
    searchTable
  },
  data () {
    return {
      searchTable: {
        table: {
          type: 'main',
          deleteColumnsIndex: 3,
          data: {
            warntype: '',
            flag: '',
            page: '0',
            size: '10'
          },
          sortReturnData: this.sortReturnData,
          urls: {},
          buttons: {},
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            data: {
              warntype: []
            }
          },
        },
        search: {
          isShowHigh: false,
          nameArray: [{
            name: '告警类型', type: 'select', data: [], span: '6', dataIndex: 'warntype'
          }, {
            name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag'
          }]
        }
      },
      alarmTypeWx: {}

    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus'
    ]),
    sortReturnData (data) {
      // data && data.length && data.forEach((item, i) => {
      // 	data[i].warntypeName = this.alarmTypeWx[item.warntype]
      // })
      return data
    },
    sortReturnModalData (values) {
      return values
    },
    getFlag () {
      getConst('flag').then(res => {
        this.searchTable.search.nameArray[1].data = res
      })
    },
    getAlarmTypeWx () {
      getAlarmTypeWx().then(res => {
        this.searchTable.search.nameArray[0].data = res
        this.searchTable.table.modal.data.warntype = res
        res && res.length && res.forEach(item => {
          this.alarmTypeWx[item.value] = item.name
        })
      })
    },
    changeStatus (val) {
      this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      this.handleChangeTableStatus(Math.random())
    }
  },
  computed: {
    ...mapState({
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search
    }),
  },
  watch: {
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
    this.getAlarmTypeWx()
  },
  mounted () {
    this.$nextTick(() => {
      this.handleChangeTableStatus(Math.random())
    })
  }
}
</script>
