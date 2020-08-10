<template>
  <searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import { mapActions, mapState } from 'vuex'
import { getConst, getConstOther } from '../../api/hotelConst'
import { getData } from '@/api/common'
import { isArray, isJson, isEmptyObject } from '../../libs/tool'
import Cookies from 'js-cookie'
import {
  TOKEN_KEY
} from '@/libs/util'

export default {
  components: {
    searchTable
  },
  data () {
    return {
      searchTable: {
        table: {
          type: 'main',
          deleteColumnsIndex: 1,//自定义Columns宽度
          data: {
            name: '',
            num: '',
            activityTitle: '',
            activityImgLocation: '',
            seqno: '',
            flag: '',
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
            data: {
              activityImgLocation: [],
              // activityId: [],
              name: []
            },
            upload: {
              logo: {
                imgList: '',
                sortReturnUploadFile: this.sortReturnUploadFile
              }
            },
            onModalChange: this.onModalChange
          }
        },
        search: {
          nameArray: [
            { name: '活动标题', type: 'input', data: [], span: '4', dataIndex: 'activityTitle' },
            { name: '关联活动编号', type: 'input', data: [], span: '6', dataIndex: 'num' },
            { name: '状态', type: 'select', data: [], span: '6', dataIndex: 'flag' }
          ]
        }
      },
      activityStatus: [],
      positionStatus: [],
      file: {
        fileName: ''
      },
      activityImgCode: ''
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus'
    ]),
    sortReturnData (data) {
      let _this = this
      data && data.length && data.forEach((item, i) => {
        data[i].nameName = data[i].name
        if (data[i].status == 1) {
          data[i].statusName2 = '上线'
        } else if (data[i].status == 0) {
          data[i].statusName2 = '新增'
        } else {
          data[i].statusName2 = '下线'
        }

        if (data[i].activityImgLocation == 1) {
          data[i].locationName = '轮播'
        } else if (data[i].activityImgLocation == 2) {
          data[i].locationName = '会员专享'
        } else if (data[i].activityImgLocation == 3) {
          data[i].locationName = '绿色出行,低碳生活'
        }
      })
      return data
    },
    sortReturnModalData (values) {
      let status = false
      if (isJson(values.logo.value)) {
        status = !values.logo.value.status
        if (!values.logo.value.status) {
          this.$message.error(values.logo.value.msg)
        } else {
          values.logo = ''
        }
      } else if (isArray(values.logo.value)) {
        values.logo = values.logo.value[0]
      }
      // console.log(this.file.fileName)
      if (this.file.fileName) values.imageName = this.file.fileName
      let data = new FormData()
      for (let i in values) {
        if (i == 'apkVersion' || i == 'jsVersion') values[i] = parseFloat(values[i])
        data.append(i, values[i])
      }
      return { type: 'formData', data: data, noSubmitByPage: status }
    },
    getFlag () {
      getConst('flag').then(res => {
        this.searchTable.search.nameArray[2].data = res
      })
      getConstOther('activitylist').then(res => {
        this.searchTable.table.modal.data.name = res
      })
    },
    getStatus () {
      getConst('positionStatus').then(res => {
        this.positionStatus = res
        this.searchTable.table.modal.data.activityImgLocation = res
      })
    },
    changeStatus (val) {
      this.searchTable.table.data = { ...this.searchTable.table.data, ...val }
      this.handleChangeTableStatus(Math.random())
    },
    onModalChange (val, key, form) {
      if (key === 'logo' && val.value && isArray(val.value) && val.value[0] && this.file.fileName && this.file.fileSuffix) {
        form.setFieldsValue({ fileName: this.file.fileName })
        form.setFieldsValue({ fileSuffix: this.file.fileSuffix })
      }
    },
    sortReturnUploadFile (file) {
      if (file && file.name) {
        this.file = {
          fileName: file.name.substring(0, file.name.lastIndexOf('.')),
          fileSuffix: file.name.substring(file.name.lastIndexOf('.') + 1)
        }
      }
    },
    getImgList () {
      return `${process.env.UPLOAD_ROOT}hotel-lodger/hotel/lodger/manager/activityPageHome/readImage/?activityImgCode=${this.activityImgCode}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
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
    this.getStatus()
    this.getFlag()
  },
  mounted () {
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
