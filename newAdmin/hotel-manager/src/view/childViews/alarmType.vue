<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import {mapActions, mapState} from 'vuex'
import {getFlag, getTradeList} from '@/api/const'
import {getConst} from '../../api/hotelConst'
import {sortOwner} from '../mixins/sortOwner'
import {isEmptyObject} from '../../libs/tool'

export default {
  name: 'system',
  mixins: [sortOwner],
  components: {
    searchTable
  },
  data () {
    return {

      searchTable: {
        table: {
          type: 'main',
          data: {
            name: '',
            flag: '',
            page: '0',
            size: '10'
          },
          addDict: ['owner'],
          sortReturnData: this.sortReturnData,
          urls: {},
          buttons: {
            cache: {
              data: {}
            }
          },
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            data: {
              owner: [],
              strategy: []
            }
          }
        },
        search: {
          isShowHigh: false,
          nameArray: [{
            name: '名称', type: 'input', span: '4', dataIndex: 'name'
          }, {
            name: '编码', type: 'input', span: '4', dataIndex: 'code'
          }, {
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
      // return data
      console.log(456)
      return data.map(item => {
        let owner = {strategy: item.strategy.split(',')}
        return {...item, ...owner}
      })
    },
    sortReturnModalData (values) {
      values = this.sortReturnOwnerData(values, this.searchTable.table.modal.data.strategy, 'strategy')
      let json = {...values}
	    json.strategy = values.strategy.join(',')
      return json
    },
    getFlag () {
      getConst('flag').then(res => {
        this.searchTable.search.nameArray[2].data = res
      })
    },
    getOwner () {
      console.log(123)
      getConst('owner').then(res => {
        this.searchTable.table.modal.data.owner = res
        this.searchTable.table.modal.data.strategy = res
      })
    },
    changeStatus (val) {
      this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      this.handleChangeTableStatus(this.$route.name)
    }
  },
  computed: {
    ...mapState({
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getChoseTr: state => state.data.choseTr
    })
  },
  watch: {
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.searchTable.table.buttons.cache.data = {code: val.code}
      }
    },
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
    this.getOwner()
  },
  mounted () {
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
