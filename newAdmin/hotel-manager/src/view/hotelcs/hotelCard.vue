<template>
  <searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import { mapActions, mapState } from 'vuex'
import { getFlag, getTradeList } from '@/api/const'
import { getConstGoods, getConst } from '../../api/hotelConst'
import { isArray, isJson, isEmptyObject } from '../../libs/tool'
import { getData } from '../../api/common'
import { getDate } from '../../libs/date'

export default {
  components: {
    searchTable
  },
  data () {
    return {
      searchTable: {
        table: {
          type: 'main',
          useUrlStatus: true,
          url: 'u_consumerCoupon_page_get', /// hotel/manager/dictionary/dic/{code}
          data: {
            page: '0',
            size: '10',
            hotelid: '1',
            companyCode: '1',
            couponType: 10
          },
          deleteColumnsIndex: 1,
          banDblClick: false,
          urls: {},
          buttons: {
            hideDel: true,
            hideAdd: true
          },
          pagination: {
            pageSize: 10
          },
          modal: {
            sortReturnModalData: this.sortReturnModalData,
            data: {

            },
            upload: {
              image: {
                imgList: '',
                sortReturnUploadFile: this.sortReturnUploadFile
              }
            },
            onModalChange: this.onModalChange
          },
          hideSearch: true,
          noHideSearch: true// 直接显示查询条件隐藏点击查询功能
        },
        search: {
          isShowHigh: true,
          timeSearch: true, // 存在时间重置问题
          sortReturnSearchData: this.sortReturnSearchData,
          sortReturnSearchResetData: this.sortReturnSearchData,
          nameArray: [
            {name: '用户编码', type: 'input', span: '3', dataIndex: 'userNum'},
            {name: '商品类别', type: 'select', data: [], span: '3', dataIndex: 'goodsCategory'},
            {name: '券状态', type: 'select', data: [], span: '3', dataIndex: 'couponStatus'}
          ],
          highArray: [
            {name: '推广方式', type: 'select', data: [], span: '3', dataIndex: 'receiveChannel'},
            {name: '领取时间', type: 'timeRange', span: '6', dataIndex: ['receiveTime']},
            {name: '核销时间', type: 'timeRange', span: '6', dataIndex: ['useTime']}
          ]
        }
      }
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
    btnClickCache (item) {
      let icon = item.icon
      item.icon = 'loading'
      getData({ name: 'h_cachemgr_cacheByCode_post', data: item.data }).then(res => {
        item.icon = icon
        if (res.code == '200') {
          if (res.data.success) {
            this.$message.success('操作成功!')
          } else {
            this.$message.error(res.data.message || '操作失败!')
          }
        }
      }, err => {
        item.icon = icon
      })
    },
    getFlag () {
      getConst('flag').then(res => {
        this.searchTable.table.modal.data.flag = res
      })
    },
    getCouponStatus () { // 券状态
      getConst('couponStatus').then(res => {
        this.searchTable.search.nameArray[2].data = res
      })
    },
    getGeneralizeModel () { // 推广方式
      getConst('generalizeModel').then(res => {
        this.searchTable.search.highArray[0].data = res
      })
    },
    getConstGoods () { // 商品品类
      getConstGoods(this.searchTable.table.data.companyCode).then(res => {
        res.forEach(item => {
          item.value = item.code
        })
        this.searchTable.search.nameArray[1].data = res
      })
    },
    sortReturnModalData (values) {
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
      // console.log(this.file.fileName)
      // if (this.file.fileName) values.imageName = this.file.fileName
      let data = new FormData()
      for (let i in values) {
        if (i == 'apkVersion' || i == 'jsVersion') values[i] = parseFloat(values[i])
        data.append(i, values[i])
      }
      return { type: 'formData', data: data, noSubmitByPage: status }
    },
    sortReturnSearchData (data) {
      if (data.receiveTime != '') {
        data.receiveBeginTime = getDate(data.receiveTime[0]) + ' 00:00:00'
        data.receiveEndTime = getDate(data.receiveTime[1]) + ' 23:59:59'
      } else {
        data.receiveBeginTime = ''
        data.receiveEndTime = ''
      }
      if (data.useTime != '') {
        data.useBeginTime = getDate(data.useTime[0]) + ' 00:00:00'
        data.useEndTime = getDate(data.useTime[1]) + ' 23:59:59'
      } else {
        data.useBeginTime = ''
        data.useEndTime = ''
      }
      return data
    },
    onModalChange (val, key, form) {
      if (key === 'logo' && val.value && isArray(val.value) && val.value[0] && this.file.fileName && this.file.fileSuffix) {
        form.setFieldsValue({ fileName: this.file.fileName })
        form.setFieldsValue({ fileSuffix: this.file.fileSuffix })
      }
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
    getData({
      name: 'm_getCouponLoginInfo__get',
      data: {},
      type: ''
    }).then(res => {
      this.searchTable.table.data.companyCode = res.data.companyCode || ''
      this.searchTable.table.data.hotelid = res.data.hotelid || ''
      // this.searchTable.table.data.companyCode = 'S00003'
      // this.searchTable.table.data.hotelid = 36
      this.handleChangeTableStatus(Math.random())
      this.getConstGoods()
    })
    this.getFlag()
    this.getGeneralizeModel()
    this.getCouponStatus()
  },
  mounted () {
    // this.handleChangeTableStatus(this.$route.name)
  }
}
</script>
