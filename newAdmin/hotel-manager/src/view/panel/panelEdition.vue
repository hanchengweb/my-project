<template>
	<searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
import searchTable from '@/components/searchTable/searchTable'
import {mapActions, mapState} from 'vuex'
import {getConst} from '../../api/hotelConst'

import {isArray, isJson, isEmptyObject} from '../../libs/tool'
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
          deleteColumnsIndex: 1,
          data: {
            page: '0',
            size: '10'
          },
          // hideButtonSearch: true,
          hideSearch: true,
          urls: {},
          buttons: {},
          useUrlStatus: true, // 是否使用本页面url
          url: 'p_version_page_get',
          modal: {
            data: {},
            sortReturnModalData: this.sortReturnModalData,
            upload: {
              file: {
                imgList: '',
                sortReturnUploadFile: this.sortReturnUploadFile
              }
            },
            onModalChange: this.onModalChange
          }
        },
        search: {}
      },
      file: {
        fileName: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'handleChangeTableStatus'
    ]),
    onModalChange (val, key, form) {
      /* if (key === 'apkFile' && val.value && isArray(val.value) && val.value[0] && this.file.fileName) {
					form.setFieldsValue({apkFileName: this.file.fileName})
				} */
    },
    sortReturnUploadFile (file) {
      if (file && file.name) {
        this.file = {
          fileName: file.name.substring(0, file.name.lastIndexOf('.'))
        }
      }
    },
    sortReturnData (data) {
      return data
    },
    getImgList (v) {
      /// hotel/terminal/readDevelpoerTwobarcode
      return `${process.env.UPLOAD_ROOT}hotel-terminal/hotel/terminal/apkdown/?version=${v}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    },
    sortReturnModalData (values) {
	  let status = false
      if (isJson(values.file.value)) {
        status = !values.file.value.status
        if (!values.file.value.status) {
          this.$message.error(values.file.value.msg)
        } else {
          values.file = ''
        }
      } else if (isArray(values.file.value)) {
        values.file = values.file.value[0]
      }
      if (this.file.fileName) values.fileName = this.file.fileName
      let data = new FormData()
      for (let i in values) {
        if (i == 'apkVersion' || i == 'jsVersion') values[i] = parseFloat(values[i])
        data.append(i, values[i])
      }
      return {type: 'formData', data: data, noSubmitByPage: status}
    },
    changeStatus (val) {
      this.searchTable.table.data = {...this.searchTable.table.data, ...val}
      this.handleChangeTableStatus(Math.random())
    }
  },
  computed: {
    ...mapState({
      getPegination: state => state.data.pegination,
      getChoseTr: state => state.data.choseTr,
      getSearch: state => state.data.search
    })
  },
  watch: {
    getChoseTr (val) {
      if (!isEmptyObject(val)) {
        this.searchTable.table.modal.upload.file.imgList = this.getImgList(val.versionCode)
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
  },
  mounted () {
    this.handleChangeTableStatus(Math.random())
  }
}
</script>
