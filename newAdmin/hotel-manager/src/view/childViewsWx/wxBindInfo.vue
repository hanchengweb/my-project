<template>
  <dbTable :dbTable="dbTable"></dbTable>
</template>
<script>

import dbTable from '@/view/components/dbTable/dbTable'
import { getFlag } from '@/api/const'
import { getConst, getAlarmTypeWx, getUserTypeWx } from '../../api/hotelConst'
import { isEmptyObject } from '@/libs/tool'
import { mapActions, mapState } from 'vuex'

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
            deleteColumnsIndex: 2,
            useUrlStatus: true,
            sortReturnData: this.sortReturnData,
            url: 'o_manager_wxBinduser_bindInfo_get',///hotel/official/manager/wxBinduser/bindInfo?uname&utype
            data: {
              uname: '',
              utype: '',
              page: '0',
              size: '10'
            },
            banDblClick: true,
            urls: {},
            buttons: {
              hideAdd: true,
              hideDel: true,
              hideFlag: true
            },
            modal: {
              urls: {},
              baseData: {
                add: {}
              },
            },
          },
          search: {
            isShowHigh: false,
            nameArray: [{
              name: '用户名称', type: 'input', span: '4', dataIndex: 'uname'
            }, {
              name: '用户类型', type: 'select', data: [], span: '6', dataIndex: 'utype'
            }]
          }
        },
        tabsTable: {
          search: {
            type: 'sub',
            wxUserfollow: {
              nameArray: [{
                name: '酒店名称', type: 'input', span: '4', dataIndex: 'hotelName'
              },]
            }
          },
          tabs: {
            arr: [
              { name: '用户关注的酒店', key: 'wxUserfollow' },//用户关注的酒店（wx_userfollow）
            ]
          },
          table: {
            name: 'wxUserfollow',
            title: 'wxUserfollow',
            type: 'sub',
            deleteColumnsIndex: {
              wxUserfollow: 1
            },
            banDblClick: true,
            keyName: 'ii',
            data: {
              hotelName: '',
              openid: '',
              page: '0',
              size: '10'
            },
            urls: {},
            buttons: {
              hideFlag: true,
              hideAdd: true
            },
            modal: {
              name: 'wxUserfollow',
              title: 'wxUserfollow',
              baseData: {
                add: {
                  openid: ''
                }
              },
              data: {
                //alarmType: []
              }
            },
          },
        }
      },
      userTypeWx: {}
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus',
      'handleChangeSubTableStatus',
    ]),

    sortReturnData (data) {
      data && data.length && data.forEach((item, i) => {
        data[i].utype = item.utype.toString()
        data[i].utypeName = this.userTypeWx[item.utype]
      })
      return data
    },
    getUserTypeWx () {
      getUserTypeWx().then(res => {
        res && res.length && res.forEach(item => {
          this.userTypeWx[item.value] = item.name
        })
        this.dbTable.searchTable.search.nameArray[1].data = res
      })
    },

    changeStatus (type) {
      type === 'sub' ? this.handleChangeSubTableStatus(Math.random()) : this.handleChangeTableStatus(Math.random())
    },
  },
  created () {
    this.getUserTypeWx()
  },
  computed: {
    ...mapState({
      getChoseTr: state => state.data.choseTr,
      getTree: state => state.data.tree,
      getPegination: state => state.data.pegination,
      getSearch: state => state.data.search,
      getSubSearch: state => state.data.subSearch,
      getSubPegination: state => state.data.subPegination,
    }),
  },
  watch: {
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.dbTable.tabsTable.table.data.openid = val.openid
        this.dbTable.tabsTable.table.modal.baseData.add.openid = val.openid
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
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
