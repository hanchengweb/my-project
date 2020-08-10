<script type="text/jsx">
import { Form, message, Button } from 'ant-design-vue'
import Editor from 'wangeditor'
import { baseData, changeModalTimeData, uploadTabs } from '@/api/hotelBaseData'
import { getData } from '../../api/common'
import { mapActions } from 'vuex'
import treeSelect from '@/components/treeSelect/treeSelect'
import uploadSelf from '@/components/upload/uploadTest'
import { isEmptyObject, isArray, reJsonFun, changeUndefined } from '@/libs/tool'
import moment from 'moment'
import { dictData } from '../../api/hotelConst'
import { changeFirstUrl, TOKEN_KEY, getCompany } from '../../libs/util'
import { getDay, getDate } from '../../libs/date'
import Cookies from 'js-cookie'

const modalForm = {
  components: {
    treeSelect,
    uploadSelf
  },
  props: {
    data: {},
    urls: {},
    url: '',
    modalVisible: {
      type: Boolean,
      default: false
    },
    title: '',
    modalData: {},
    type: '',
    name: ''
  },
  created () {
    this.visible = true
    this.formItems = reJsonFun(baseData[this.name || this.modalData.title || this.$route.name])
    this.getDelModalDataArr()
    this.modalWidth = document.getElementById('app').clientWidth * 0.8 + 'px'
    this.modalTitle = this.title == 'add' ? '新增' : '修改'
    if (this.$route.name == 'hotelCardOther' || this.$route.name == 'hotelCard') {
      this.modalTitle = '详情'
      // this.title = 'check'
    }
    if (this.$route.name == 'programIndex') {
      // 图片url获取
      this.modalData.upload.logo.imgList = `${process.env.UPLOAD_ROOT}hotel-lodger/hotel/lodger/manager/activityPageHome/readImage/?activityImgCode=${this.data.activityImgCode}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    }
    if (this.$route.name == 'programSystem') {
      // 图片url获取
      this.modalData.upload.logo.imgList = `${process.env.UPLOAD_ROOT}hotel-lodger/hotel/lodger/manager/systemImage/readImage/?imageCode=${this.data.imageCode}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    }
    // if (this.$route.name === 'hotel' && this.type === 'main') {
    //   this.modalData.upload.image.imgList = `${process.env.UPLOAD_ROOT}hotel-manager/hotel/manager/hotel/readImage/${this.data.id}?token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    // }
    if (this.$route.name === 'enviroImage' && this.type === 'main') {
      this.modalData.upload.image.imgList = `${process.env.UPLOAD_ROOT}hotel-manager/hotel/manager/hotelEnviroImage/readHotelImage/?id=${this.data.id}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    }
    if (this.$route.name === 'platFormCard' && this.type === 'main') {
      this.modalData.upload.image.imgList = `${process.env.UPLOAD_ROOT}hotel-lodger/hotel/coupon/manager/goodsIcon/readImage/?category=${this.data.code}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    }
    if (this.$route.name === 'groupCard' || this.$route.name === 'groupCardOther' && this.type === 'main') {
      this.modalData.upload.image.imgList = `${process.env.UPLOAD_ROOT}hotel-lodger/hotel/coupon/manager/goodsIcon/readImage/?category=${this.data.code}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    }
    if (this.$route.name === 'hotelCardOther' || this.$route.name === 'hotelCard' && this.type === 'main') {
      this.modalData.upload.image.imgList = `${process.env.UPLOAD_ROOT}hotel-lodger/hotel/coupon/manager/goodsIcon/readImage/?category=${this.data.goodsCategoryIconCode}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    }
    if (this.$route.name === 'programNews') {
      this.modalData.upload.image.imgList = `${process.env.UPLOAD_ROOT}hotel-lodger/hotel/lodger/manager/homeNews/readImage/${this.data.id}?token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
      // 首页新闻管理编辑器
      this.editorInfo =
        <div class="ant-col-24" style="padding-left: 8px; padding-right: 8px;">
          <div class="ant-row ant-form-item ant-form-item-no-colon">
            <div class="ant-col-3 ant-form-item-label" style="height:365px">
              <label title="内容" class="ant-form-item-required">内容</label>
            </div>
            <div class="ant-col-20 ant-form-item-control-wrapper">
              <div class="ant-form-item-control">
                <span class="ant-form-item-children"><div id="editor" class="editor"></div></span>
              </div>
            </div>
          </div>
        </div>
    }
    if (this.name === 'programCarousel') {
      this.modalData.upload.image.imgList = `${process.env.UPLOAD_ROOT}hotel-lodger/hotel/lodger/manager/homeBanner/readImage/${this.data.id}?token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    }
    if (this.$route.name == 'platformMatter' || this.$route.name === 'groupMatter' || this.$route.name === 'hotelMatter' || this.$route.name === 'managerAdMaterial') {
      this.modalData.upload.material.imgList = `${process.env.UPLOAD_ROOT}hotel-panel/hotel/panel/manager/adMaterial/readImage?path=${this.data.path}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    }

    if (this.name == 'adMaterial') {
      this.modalData.upload.material.imgList = `${process.env.UPLOAD_ROOT}hotel-panel/hotel/panel/manager/adMaterial/readImage?path=${this.data.path}&token=${Cookies.get(TOKEN_KEY)}&temp=${Math.random()}`
    }
    if (this.name === 'homeBannerDetail') {
      // 首页新闻管理编辑器
      this.editorInfo =
        <div class="ant-col-24" style="padding-left: 8px; padding-right: 8px;">
          <div class="ant-row ant-form-item ant-form-item-no-colon">
            <div class="ant-col-3 ant-form-item-label" style="height:365px">
              <label title="内容" class="ant-form-item-required">内容</label>
            </div>
            <div class="ant-col-20 ant-form-item-control-wrapper">
              <div class="ant-form-item-control">
                <span class="ant-form-item-children"><div id="editor" class="editor"></div></span>
              </div>
            </div>
          </div>
        </div>
    }
  },
  mounted () {
    var editor = new Editor('#editor')
    editor.customConfig.uploadImgShowBase64 = true
    editor.create()
    this.editor = editor
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
    if (this.$route.name === 'programNews' && this.title === 'update') {
      editor.txt.html(this.data.text)
    }
    if (this.name === 'homeBannerDetail' && this.title != 'add') {
      editor.txt.html(this.data.text)
    }
  },
  watch: {
    name (val) {

    }
  },
  data () {
    return {
      visible: false,
      formItems: {},
      newData: {},
      modalWidth: '',
      needItem: [],
      modalTitle: '',
      methods: {
        add: '_post',
        del: 'i_delete',
        update: 'i_put'
      },
      confirmLoading: false,
      treeSelectLabel: {},
      wrapperCol: { span: 16 },
      labelCol: { span: 6 },
      wrapperTextCol: { span: 20 },
      labelTextCol: { span: 3 },
      syncData: {},
      delModalDataArr: [],
      isupdate: false,
      disa: false,
      initiMD: '',
      isMding: false,
      editorInfo: ''// 编辑器
    }
  },
  methods: {
    ...mapActions([
      'handleModalData'
    ]),
    getDelModalDataArr () {
      for (let i in baseData[this.name]) {
        const item = baseData[this.name][i]
        if (item.delStatus) this.delModalDataArr.push(i)
      }
    },
    gethotelCardInfo () {

    },
    getParamsName () {
      let plus = ''
      if (uploadTabs.indexOf(this.name) > -1 && this.title != 'check') {
        plus = `${this.title == 'update' ? 'updateOne' : this.title == 'add' ? 'saveOne' : ''}_post`
      }
      // 新增、修改
      if (this.$route.name === 'programActivity') {
        return 'l_activityPage__post'
      } if (this.$route.name === 'programIndex') {
        // if(this.title == 'add'){
        //   return 'l_activityPageHome_saveOne_post'
        // }else{
        //   return 'l_activityPageHome_updateOne_post'
        // }
        return 'l_activityPageHome_saveOne_post'
      } if (this.$route.name === 'programSystem') {
        return 'l_systemImage_saveOne_post'
      } else if (this.$route.name === 'hotel' && this.type === 'main') {
        if (this.title == 'update') {
          return `h_hotel_${this.data.id}_put`
        } else {
          return 'h_hotel__post'
        }
      } else if (this.$route.name === 'programHotelunit' && this.type === 'main') {
        if (this.title == 'update') {
          return `l_creditThreshold_${this.data.id}_put`
        } else {
          return 'l_creditThreshold__post'
        }
      } else if (this.$route.name === 'programUnit' && this.type === 'main') {
        if (this.title == 'update') {
          return `l_creditThresholdDefault_${this.data.id}_put`
        } else {
          return 'l_creditThresholdDefault__post'
        }
      } else if (this.$route.name === 'programCreditGrade' && this.type === 'main') {
        if (this.title == 'update') {
          return `l_hotelCreditGrade_${this.data.id}_put`
        } else {
          return 'l_hotelCreditGrade__post'
        }
      } else if (this.$route.name === 'programCreditPlan' && this.type === 'main') {
        if (this.title == 'update') {
          return `l_hotelCreditPlan_${this.data.id}_put`
        } else {
          return 'l_hotelCreditPlan__post'
        }
      } else if (this.$route.name === 'enviroImage' && this.type === 'main') {
        if (this.title == 'update') {
          return `h_hotelEnviroImage_updateOne_post`
        } else {
          return 'h_hotelEnviroImage_saveOne__post'
        }
      } else if (this.name === 'hotelInfo') {
        if (this.title == 'update') {
          return `h_hotelInfo_${this.data.id}_put`
        } else {
          return 'h_hotelInfo__post'
        }
      } else if (this.name === 'platFormCard') {
        if (this.title == 'update') {
          return `u_goodsCategory_updateOne_post`
        } else {
          return 'u_goodsCategory_addOne_post'
        }
      } else if (this.name === 'groupCard' || this.name === 'groupCardOther') {
        if (this.title == 'update') {
          return `u_consumerGoodsCategory_updateOne_post`
        } else {
          return 'u_consumerGoodsCategory_addCustomer_post'
        }
      } else if (this.name === 'groupCoupTemp' || this.name === 'groupCoupTempOther') {
        if (this.title == 'update') {
          return `u_consumerCouponTemplate__put`
        } else {
          return 'u_consumerCouponTemplate__post'
        }
      } else if (this.name === 'panelEdition') {
        if (this.title == 'update') {
          return `p_version_update_post`
        } else {
          return 'p_version_save_post'
        }
      } else if (this.name === 'programNews') {
        if (this.title == 'update') {
          return `l_homeNews_customerAdd_post`
        } else {
          return 'l_homeNews_customerAdd_post'
        }
      } else if (this.name === 'programCarousel') {
        if (this.title == 'update') {
          return `l_homeBanner_customerAdd_post`
        } else {
          return 'l_homeBanner_customerAdd_post'
        }
      } else if (this.name === 'homeBannerDetail') {
        if (this.title == 'update') {
          return `l_homeBannerDetail__post`
        } else {
          return 'l_homeBannerDetail__post'
        }
      } else if (this.name === 'platformPlan') {
        if (this.title == 'update') {
          return `p_manager_adPlan_update_put`
        } else {
          return 'p_manager_adPlan_systemAdd_post'
        }
      } else if (this.$route.name === 'platformMatter') {
        if (this.title == 'update') {
          return `p_manager_adMaterial_systemAdd_post`
        } else {
          return 'p_manager_adMaterial_systemAdd_post'
        }
      } else if (this.$route.name === 'groupMatter') {
        if (this.title == 'update') {
          return `p_manager_adMaterial_companyAdd_post`
        } else {
          return 'p_manager_adMaterial_companyAdd_post'
        }
      } else if (this.name === 'groupPlan') {
        if (this.title == 'update') {
          return `p_manager_adPlan_update_put`
        } else {
          return 'p_manager_adPlan_companyAdd_post'
        }
      } else if (this.name === 'hotelPlan') {
        if (this.title == 'update') {
          return `p_manager_adPlan_update_put`
        } else {
          return 'p_manager_adPlan_hotelAdd_post'
        }
      } else if (this.$route.name === 'hotelMatter') {
        if (this.title == 'update') {
          return `p_manager_adMaterial_hotelAdd_post`
        } else {
          return 'p_manager_adMaterial_hotelAdd_post'
        }
      } else if (this.name === 'adMaterial') {
        if (this.title == 'update') {
          return `p_manager_adMaterial_save_post`
        } else {
          return 'p_manager_adMaterial_save_post'
        }
      } else {
        return (this.urls && this.urls[this.title]) ? this.urls[this.title] : `${changeFirstUrl(this.name)}_${this.name}_${uploadTabs.indexOf(this.name) > -1 ? plus : this.methods[this.title]}`
      }
    },
    delModalData (values) {
      this.delModalDataArr && this.delModalDataArr.length && this.delModalDataArr.forEach(item => {
        delete values[item]
      })
      return values
    },
    handleOk () {
      // console.log('提交')
      this.form.validateFields((error, values) => {
        // 首页管理新增/编辑时添加关联活动参数activityId
        if (values.activityImgLocation) {
          if (this.title != 'add') {
            if (typeof values.name === 'string') {
              this.modalData.data.name.forEach((item, index) => {
                if (item.name == values.name) {
                  values.activityId = item.id
                }
              })
            } else {
              values.activityId = values.name
            }
          } else {
            values.activityId = values.name
          }
          delete values.name
        }
        if (this.title == 'add') {
          values.flag = 0
        }
        let arr = Object.keys(values)
        if (arr.indexOf('type1') !== -1) {
          this.$set(values, 'type', values['type1'])
        }
        // 酒店环境图展示方式
        if (values.showType) {
          values.hotelId = this.modalData.hotelId
        }
        // 酒店维护酒店类型编码
        if (values.hotelType) {
          values.type = values.hotelType
          delete values.hotelType
        }
        // 集团管理
        if (this.name === 'groupCard' || this.name === 'groupCardOther') {
          values.companyCode = this.modalData.companyCode
          values.systemDefault = 0
        }
        // 首页新闻管理新增编辑器内容
        if (this.name === 'programNews' || this.name === 'homeBannerDetail') {
          if (this.editor.txt.html() == '<p><br></p>') {
            this.$message.info('内容不能为空')
            return false
          }
          values.text = this.editor.txt.html()
        }
        if (this.$route.name === 'platformMatter') {
          values.ownerIdentifier = ''
          if (this.title == 'update') {
            delete this.data.createTime
            delete this.data.updateTime
          }
        }
        if (this.name === 'panelEdition') {
          if (this.title == 'update') {
            delete this.data.createTime
            delete this.data.updateTime
          }
        }
        if (this.$route.name === 'groupMatter') {
          values.ownerIdentifier = JSON.parse(getCompany()).companyCode
          if (this.title == 'update') {
            delete this.data.createTime
            delete this.data.updateTime
          }
        }
        if (this.$route.name === 'hotelMatter') {
          values.ownerIdentifier = JSON.parse(getCompany()).hotelid
          if (this.title == 'update') {
            delete this.data.createTime
            delete this.data.updateTime
          }
        }
        if (this.name === 'platformPlan') {
          values.ownerIdentifier = ''
          if (this.title == 'add') {
            values.status = '0'
          }
          if (this.title == 'update') {
            delete this.data.createTime
            delete this.data.updateTime
          }
        }
        if (this.name === 'groupPlan') {
          values.ownerIdentifier = JSON.parse(getCompany()).companyCode
          if (this.title == 'add') {
            values.status = '0'
          }
          if (this.title == 'update') {
            delete this.data.createTime
            delete this.data.updateTime
          }
        }
        if (this.name === 'hotelPlan') {
          values.ownerIdentifier = JSON.parse(getCompany()).hotelid
          if (this.title == 'add') {
            values.status = '0'
          }
          if (this.title == 'update') {
            delete this.data.createTime
            delete this.data.updateTime
          }
        }
        if (this.name === 'adMaterial') {
          values.planId = this.modalData.data.planId
          if (this.title == 'update') {
            delete this.data.createTime
            delete this.data.updateTime
          }
        }
        if (error) return false
        // 你永远不知道你能被虐到什么程度
        if (this.modalData.treeSelect && !isEmptyObject(this.treeSelectLabel)) {
          for (let i in this.treeSelectLabel) values[i] = this.treeSelectLabel[i]
        }
        if (changeModalTimeData.hasOwnProperty(this.name) && changeModalTimeData[this.name] && changeModalTimeData[this.name].length) {
          changeModalTimeData[this.name].forEach(key => {
            if (baseData[this.name][key].type == 'time') values[key] = moment(values[key]).format(baseData[this.name][key].format || 'yyyy-MM-dd')
          })
        }
        if (this.data.createTime && this.name === 'programNews') {
          delete this.data.createTime
        }
        if (this.data.createTime && this.name === 'programCarousel') {
          delete this.data.createTime
        }
        if (this.data.createTime && this.name === 'homeBannerDetail') {
          delete this.data.createTime
        }
        const add = this.modalData.baseData && this.modalData.baseData[this.title] || {}
        values = this.title == 'add' ? {
          ...values,
          ...add
        } : { ...this.data, ...values }
        if (this.$route.name === 'hotel' && this.type === 'main') {
          if (values.image) {
            values.image = values.image.value[0]
          }
        }
        values = changeUndefined(values)
        values = this.delModalData(values)
        values = this.modalData.sortReturnModalData ? this.modalData.sortReturnModalData(values) : values
        if (values.noSubmitByPage) return false
        if (values.type === 'formData') values = values.data
        const name = this.getParamsName()
        this.confirmLoading = true
        // 活动配置 时间格式转化
        if (values.endtime && values.redirectUrl) {
          values.endtime = getDay(values.endtime)
          values.starttime = getDay(values.starttime)
          if (values.createtime) {
            delete values.createtime
          }
          if (this.title == 'add') {
            values.status = 0
          }
        }
        if (values.publishTime) {
          delete values.publishTime
        }
        // 能耗等级
        if (values.powerRank && this.name != 'brand') {
          values.gradeCode = values.powerRank
          values.hotelId = this.modalData.hotelId
          this.modalData.data.powerRank.forEach(item => {
            if (item.code == values.powerRank) {
              values.gradeName = item.name
            }
          })
          delete values.powerRank
          if (values.minCredit > values.maxCredit) {
            message.error('最低积分不能大于最高积分')
            return false
          }
        }
        // 积分加速
        if (values.endtime && values.rate) {
          values.endtime = getDay(values.endtime)
          values.starttime = getDay(values.starttime)
          values.hotelId = this.modalData.hotelId
        }
        // 券模板管理
        if (this.name === 'groupCoupTemp' || this.name === 'groupCoupTempOther') {
          values.companyCode = this.modalData.companyCode
          if (this.title == 'update') {
            values.tpmId = this.data.tpmId
            values.goodsCategoryIconCode = this.data.goodsCategoryIconCode
            values.tpmCreaterName = this.data.tpmCreaterName
            values.tpmCreaterId = this.data.tpmCreaterId
            values.tpmNum = this.data.tpmNum
          }
          if (values.activeModel == 1) {
            values.activeStarttime = getDay(values.activeStarttime)
            values.activeEndtime = getDay(values.activeEndtime)
          } else {
            values.activeStarttime = ''
            values.activeEndtime = ''
          }
        }
        getData({
          name: name,
          data: values,
          type: uploadTabs.indexOf(this.name) > -1 && 'multipart/form-data;' || ''
        }).then(res => {
          // console.log(res)
          this.confirmLoading = false
          if (res) {
            if (res.showTip) {
              this.formItems[res.data.key].validateStatus = 'error'
              this.formItems[res.data.key].help = res.data.msg
            } else {
              this.visible = false
              this.$emit('hide-modal')
              this.handleModalData({ type: this.type, action: this.title, data: res.data })
            }
          }
        })
      })
    },
    handleCancel () {
      this.$emit('hide-modal')
    },
    // 集团新增配置项
    getSelect (key, item) {
      let children = [], data = this.modalData.data && this.modalData.data[key] || dictData[key].select
      if (item.syncField) this.syncData[key] = {}
      // console.log(data)
      data && data.length && data.forEach((flag) => {
        if (this.syncData[key]) {
          this.syncData[key][flag.title] = flag.value
        }
        // console.log(Number(flag.value))
        children.push(
          item.syncField
            ? <a-select-option value={flag.title} key={`search-select-option-${flag.value}`}>
              {flag.title}
            </a-select-option>
            : <a-select-option value={flag.value} key={`search-select-option-${flag.value}`}>
              {flag.title}
            </a-select-option>
        )
      })
      return children
    },
    inputSelect (item, key) {
      if (item.type == 'input') {
        return (<a-input placeholder='placeholder' disabled={!item.editabled} />)
      } else if (item.type == 'select') {
      }
    },
    changeModalData (key, value) {
      const arr = this.modalData.data[key]
      let id = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title == value) id = arr[i].value
      }
      return { value: id }
    },
    handleChange (val, key, type, item) {
      if (this.name === 'groupCoupTempOther' || this.name === 'groupCoupTemp') {
        if (key == 'activeModel') {
          this.isupdate = true
          if (val == 1) {
            // 指定日期区间
            this.formItems.activeStarttime.modalHidden = false
            this.formItems.activeEndtime.modalHidden = false
            this.formItems.activeDays.modalHidden = true
          } else {
            // 领取X天有效
            this.formItems.activeStarttime.modalHidden = true
            this.formItems.activeEndtime.modalHidden = true
            this.formItems.activeDays.modalHidden = false
          }
        }
        if (key == 'generalizeModel') {
          this.isupdate = true
          if (val == 2) {
            // 等价兑换
            this.formItems.equalModel.modalHidden = false
            this.formItems.equalNum.modalHidden = false
          } else {
            this.formItems.equalModel.modalHidden = true
            this.formItems.equalNum.modalHidden = true
          }
        }
      }
      const plusChange = this.modalData.plusChange
      if (this.formItems[key].validateStatus) {
        this.formItems[key].validateStatus = ''
        this.formItems[key].help = ''
      }
      if (type == 'upload') {
        this.form.setFieldsValue({ [key]: val.value || '' })
      } else if (type == 'selectTree') {
        this.treeSelectLabel[key] = val.label || ''
        this.form.setFieldsValue({ [plusChange.changeKey]: val.value || '' })
      } else {
        if (plusChange && plusChange.key.indexOf(key) > -1) {
          const changeKey = isArray(plusChange.changeKey) ? plusChange.changeKey[plusChange.key.indexOf(key)] : plusChange.changeKey,
            data = this.changeModalData(key, val, changeKey)
          this.form.setFieldsValue({ [changeKey]: data.value })
        }
      }
      if (item && item.syncField && this.syncData[key] && !isEmptyObject(this.syncData[key])) {
        this.syncData[key][val] && this.form.setFieldsValue({ [item.syncField]: this.syncData[key][val] })
      }
      this.modalData.onModalChange && this.modalData.onModalChange(val, key, this.form)
    },
    getDefaultVal () {
      let json = {}
      for (let i in dictData) json[i] = dictData[i].defaultVal || ''
      return json
    },
    getField () {
      const startTimed = getDate(new Date()) + ' 00:00:00'
      const endTimed = getDate(new Date()) + ' 23:59:59'
      const { getFieldDecorator } = this.form, children = [],
        defaultVal = this.getDefaultVal()
      let Basic = [], Exchange = [], Activity = [], Get = [], Use = [], childs = {}
      let formItems = this.formItems
      let data = this.title == 'update' || this.title == 'check' ? this.data : this.modalData.baseData ? this.modalData.baseData[this.title] : {}
      if (this.title == 'add') {
        data = this.modalData.baseData && this.modalData.baseData[this.title] ? { ...data, ...defaultVal, ...this.modalData.baseData[this.title] } : { ...data, ...defaultVal }
      }
      // 编辑展示能耗等级
      if (data.gradeName) {
        data.powerRank = data.gradeName
      }
      // 酒店维护酒店类型编码
      if (data.type) {
        data.hotelType = data.type
      }
      // 编辑展示酒店环境图展示方式
      // console.log(data)
      // if (data.imgtypeName) {
      //   data.imgtype = data.imgtypeName
      // }
      if (this.$route.name === 'groupCoupTempOther' || this.$route.name === 'groupCoupTemp') {
        if (!this.isupdate && this.title == 'update' || this.title == 'check') {
          if (data.activeModel == 1) { // 有效期模式判断
            this.formItems.activeStarttime.modalHidden = false
            this.formItems.activeEndtime.modalHidden = false
            this.formItems.activeDays.modalHidden = true
          } else {
            this.formItems.activeStarttime.modalHidden = true
            this.formItems.activeEndtime.modalHidden = true
            this.formItems.activeDays.modalHidden = false
          }
          if (data.generalizeModel == 2) { // 推广方式
            this.formItems.equalModel.modalHidden = false
            this.formItems.equalNum.modalHidden = false
          } else {
            this.formItems.equalModel.modalHidden = true
            this.formItems.equalNum.modalHidden = true
          }
          formItems = this.formItems
        }
      }
      for (let i in formItems) {
        let key1 = ''
        if (i === 'type1') {
          key1 = 'type'
        } else {
          key1 = i
        }
        // 下拉框字母变中文
        if (this.$route.name === 'groupCoupTemp' || this.$route.name === 'groupCoupTempOther' || this.$route.name === 'enviroImage' ||
        this.$route.name === 'platformMatter' || this.$route.name === 'groupMatter' || this.$route.name === 'hotelMatter') {
          if (this.title == 'check' && data[key1]) {
            data[key1] = data[key1].toString()
          }
          if (this.title == 'update' && data[key1]) {
            data[key1] = data[key1].toString()
          }
        }
        let item = formItems[i], key = i
        if ((key == 'flag' || key == 'flagName') && this.title == 'add') continue
        if (this.$route.name == 'platformPlan' || this.$route.name == 'hotelPlan' || this.$route.name == 'groupPlan') {
          if ((key == 'status' || key == 'statusName' || key == 'auditStatus' || key == 'auditStatusName' || key == 'auditOption' || key == 'auditTime') && this.title == 'add') continue
        }
        if (item.modalHidden) continue
        if (key == 'flag' && (this.$route.name === 'programUnit' || this.$route.name === 'programHotelunit')) {
          data.flag = String(data.flag)
        }
        if (this.$route.name === 'hotelCard' || this.$route.name === 'hotelCardOther') {
          // 用户消费券查询信息分栏
          let inpo =
            <a-col
              span={item.type == 'textarea' || (item.type == 'select' && item.mode == 'multiple') || item.type == 'upload' ? 24 : 12}
              key={`modal-span-${key}`}>
              {item.type == 'cascader'
                ? <a-form-item label={item.name}
                  colon={false}
                  validateStatus={item.validateStatus}
                  help={item.help}
                  labelCol={this.labelCol}
                  wrapperCol={this.wrapperCol}>
                  {getFieldDecorator(key, {
                    rules: [{
                      required: item.isNeed,
                      message: `请输入${item.name}${key}`
                    }],
                    initialValue: this.title == 'add' && item.mode == 'multiple' ? (data[key] || []) : data[key]
                  })(
                    <a-cascader
                      options={this.modalData.data[key]}
                      disabled={!item.editabled || this.title == 'check'}
                      onChange={(val) => this.handleChange(val, key, 'cascader', item)}
                      placeholder={`请选择${item.name}`} />
                  )}
                </a-form-item>
                : item.type == 'upload'
                  ? <a-form-item label={item.name}
                    colon={false}
                    validateStatus={item.validateStatus}
                    help={item.help}
                    class="form-item-upload-self"
                    labelCol={item.mode == 'multiple' ? this.labelTextCol : this.labelCol}
                    wrapperCol={item.mode == 'multiple' ? this.wrapperTextCol : this.wrapperCol}>
                    {getFieldDecorator(key, {
                      rules: [{
                        required: item.isNeed,
                        message: `请输入${item.name}`
                      }]
                      // initialValue: this.title == 'add' && item.mode == 'multiple' ? (data[key] || []) : data[key]
                    })(
                      <uploadSelf
                        onChange={(val) => this.handleChange(val, key, 'upload', item)}
                        disabled={!item.editabled || this.title == 'check'}
                        uploadItem={item}
                        data={data}
                        uploadPlus={this.modalData.upload && this.modalData.upload[key] || ''}
                        // uploadPlus={this.modalData.upload}
                        titleName={this.title}
                        keyCode={key}></uploadSelf>
                    )}
                  </a-form-item>
                  : item.type == 'select'
                    ? <a-form-item label={item.name}
                      colon={false}
                      validateStatus={item.validateStatus}
                      help={item.help}
                      labelCol={item.mode == 'multiple' ? this.labelTextCol : this.labelCol}
                      wrapperCol={item.mode == 'multiple' ? this.wrapperTextCol : this.wrapperCol}>
                      {getFieldDecorator(key, {
                        rules: [{
                          required: item.isNeed,
                          message: `请输入${item.name}`
                        }],
                        initialValue: this.title == 'add' && item.mode == 'multiple' ? ((data[key1]) || []) : (data[key1])
                      })(
                        // 集团维护新增配置项
                        <a-select
                          mode={item.mode || 'default'}
                          allowClear={true}
                          disabled={!item.editabled || this.title == 'check'}
                          placeholder={`请选择${item.name}`}
                          onChange={(val) => this.handleChange(val, key, 'select', item)}>
                          {this.getSelect(key, item)}
                        </a-select>
                      )}
                    </a-form-item>
                    : item.type == 'selectTree'
                      ? <a-form-item label={item.name}
                        colon={false}
                        validateStatus={item.validateStatus}
                        help={item.help}
                        labelCol={this.labelCol}
                        wrapperCol={this.wrapperCol}>
                        {getFieldDecorator(key, {
                          rules: [{
                            required: item.isNeed,
                            message: `请输入${item.name}`
                          }],
                          initialValue: data[key]
                        })(
                          <treeSelect
                            treeSelectJson={this.modalData.treeSelect}
                            initValue={data[key]}
                            keys={key}
                            disabled={!item.editabled || this.title == 'check'}
                            onChange={(json) => this.handleChange(json, key, 'selectTree')}
                          ></treeSelect>
                        )}
                      </a-form-item>
                      : item.type == 'time'
                        ? <a-form-item label={item.name}
                          colon={false}
                          validateStatus={item.validateStatus}
                          help={item.help}
                          labelCol={this.labelCol}
                          wrapperCol={this.wrapperCol}>
                          {getFieldDecorator(key, {
                            rules: [{
                              required: item.isNeed,
                              message: `请输入${item.name}`
                            }],
                            initialValue: moment(data[key] || new Date(), item.format)
                          })(
                            <a-date-picker showTime
                              // defaultValue={moment(data[key] || new Date(), item.format)}
                              format={item.format}
                              disabled={!item.editabled || this.title == 'check'}
                              onChange={(json, str) => this.handleChange(str, key, 'time')} />
                          )}
                        </a-form-item>
                        : item.type == 'textarea'
                          ? <a-form-item label={item.name}
                            colon={false}
                            validateStatus={item.validateStatus}
                            help={item.help}
                            labelCol={this.labelTextCol}
                            wrapperCol={this.wrapperTextCol}>
                            {getFieldDecorator(key, {
                              rules: [{
                                required: item.isNeed,
                                message: `请输入${item.name}`
                              }],
                              initialValue: data[key]
                            })(
                              <a-textarea placeholder={`请输入${item.name}`}
                                disabled={!item.editabled || this.title == 'check'}
                                autosize={true}
                                onChange={() => this.handleChange(key, key)} />
                            )}
                          </a-form-item>
                          : item.type == 'number'
                            ? <a-form-item label={item.name}
                              colon={false}
                              validateStatus={item.validateStatus}
                              help={item.help}
                              labelCol={this.labelCol}
                              wrapperCol={this.wrapperCol}>
                              {getFieldDecorator(key, {
                                rules: [{
                                  required: item.isNeed,
                                  message: `请输入${item.name}`
                                }],
                                initialValue: data[key]
                              })(
                                <a-input-number placeholder={`请输入${item.name}`}
                                  min={item.rule.min} max={item.rule.max}
                                  step={item.rule.step}
                                  formatter={item.rule.formatter}
                                  disabled={!item.editabled || this.title == 'check'}
                                  onChange={() => this.handleChange(key, key, 'number')} />
                              )}
                            </a-form-item>
                            : <a-form-item label={item.name}
                              colon={false}
                              validateStatus={item.validateStatus}
                              help={item.help}
                              labelCol={this.labelCol}
                              wrapperCol={this.wrapperCol}>
                              {getFieldDecorator(key, {
                                rules: [{
                                  required: item.isNeed,
                                  message: `请输入${item.name}`
                                }],
                                initialValue: data[key]
                              })(
                                <a-input placeholder={`请输入${item.name}`}
                                  disabled={!item.editabled || this.title == 'check'}
                                  onChange={() => this.handleChange(key, key)} />
                              )}
                            </a-form-item>

              }
            </a-col>
          if (item.info == 'Basic') {
            Basic.push(inpo)
          }
          if (item.info == 'Exchange' && data.generalizeModelName == '等价兑换') {
            Exchange.push(inpo)
          }
          if (item.info == 'Activity' && data.generalizeModelName == '活动发放领取') {
            Activity.push(inpo)
          }
          if (item.info == 'Get') {
            Get.push(inpo)
          }
          if (item.info == 'Use') {
            Use.push(inpo)
          }
        } else {
          children.push(
            <a-col
              span={item.type == 'textarea' || item.button || (item.type == 'select' && item.mode == 'multiple') || item.type == 'upload' ? 24 : 12}
              key={`modal-span-${key}`}>
              {item.type == 'cascader'
                ? <a-form-item label={item.name}
                  colon={false}
                  validateStatus={item.validateStatus}
                  help={item.help}
                  labelCol={this.labelCol}
                  wrapperCol={this.wrapperCol}>
                  {getFieldDecorator(key, {
                    rules: [{
                      required: item.isNeed,
                      message: `请输入${item.name}${key}`
                    }],
                    initialValue: this.title == 'add' && item.mode == 'multiple' ? (data[key] || []) : data[key]
                  })(
                    <a-cascader
                      options={this.modalData.data[key]}
                      disabled={!item.editabled || this.title == 'check'}
                      onChange={(val) => this.handleChange(val, key, 'cascader', item)}
                      placeholder={`请选择${item.name}`} />
                  )}
                </a-form-item>
                : item.type == 'upload'
                  ? <a-form-item label={item.name}
                    colon={false}
                    validateStatus={item.validateStatus}
                    help={item.help}
                    class="form-item-upload-self"
                    labelCol={item.mode == 'multiple' ? this.labelTextCol : this.labelCol}
                    wrapperCol={item.mode == 'multiple' ? this.wrapperTextCol : this.wrapperCol}>
                    {getFieldDecorator(key, {
                      rules: [{
                        required: item.isNeed,
                        message: `请输入${item.name}`
                      }]
                      // initialValue: this.title == 'add' && item.mode == 'multiple' ? (data[key] || []) : data[key]
                    })(
                      <uploadSelf
                        onChange={(val) => this.handleChange(val, key, 'upload', item)}
                        disabled={!item.editabled || this.title == 'check'}
                        uploadItem={item}
                        data={data}
                        uploadPlus={this.modalData.upload && this.modalData.upload[key] || ''}
                        // uploadPlus={this.modalData.upload}
                        titleName={this.title}
                        keyCode={key}></uploadSelf>
                    )}
                  </a-form-item>
                  : item.type == 'select'
                    ? <a-form-item label={item.name}
                      colon={false}
                      validateStatus={item.validateStatus}
                      help={item.help}
                      labelCol={item.mode == 'multiple' ? this.labelTextCol : this.labelCol}
                      wrapperCol={item.mode == 'multiple' ? this.wrapperTextCol : this.wrapperCol}>
                      {getFieldDecorator(key, {
                        rules: [{
                          required: item.isNeed,
                          message: `请输入${item.name}`
                        }],
                        initialValue: this.title == 'add' && item.mode == 'multiple' ? ((data[key1]) || []) : (data[key1])
                      })(
                        // 集团维护新增配置项
                        <a-select
                          mode={item.mode || 'default'}
                          allowClear={true}
                          disabled={!item.editabled || this.title == 'check'}
                          placeholder={`请选择${item.name}`}
                          onChange={(val) => this.handleChange(val, key, 'select', item)}>
                          {this.getSelect(key, item)}
                        </a-select>
                      )}
                    </a-form-item>
                    : item.type == 'selectTree'
                      ? <a-form-item label={item.name}
                        colon={false}
                        validateStatus={item.validateStatus}
                        help={item.help}
                        labelCol={this.labelCol}
                        wrapperCol={this.wrapperCol}>
                        {getFieldDecorator(key, {
                          rules: [{
                            required: item.isNeed,
                            message: `请输入${item.name}`
                          }],
                          initialValue: data[key]
                        })(
                          <treeSelect
                            treeSelectJson={this.modalData.treeSelect}
                            initValue={data[key]}
                            keys={key}
                            disabled={!item.editabled || this.title == 'check'}
                            onChange={(json) => this.handleChange(json, key, 'selectTree')}
                          ></treeSelect>
                        )}
                      </a-form-item>
                      : item.type == 'time'
                        ? <a-form-item label={item.name}
                          colon={false}
                          validateStatus={item.validateStatus}
                          help={item.help}
                          labelCol={this.labelCol}
                          wrapperCol={this.wrapperCol}>
                          {getFieldDecorator(key, {
                            rules: [{
                              required: item.isNeed,
                              message: `请输入${item.name}`
                            }],
                            initialValue: moment(data[key] || new Date(), item.format)
                          })(
                            <a-date-picker showTime
                              // defaultValue={moment(data[key] || new Date(), item.format)}
                              style="width:302px"
                              format={item.format}
                              disabled={!item.editabled || this.title == 'check'}
                              onChange={(json, str) => this.handleChange(str, key, 'time')} />
                          )}
                        </a-form-item>
                        : item.type == 'startTime'
                          ? <a-form-item label={item.name}
                            colon={false}
                            validateStatus={item.validateStatus}
                            help={item.help}
                            labelCol={this.labelCol}
                            wrapperCol={this.wrapperCol}>
                            {getFieldDecorator(key, {
                              rules: [{
                                required: item.isNeed,
                                message: `请输入${item.name}`
                              }],
                              initialValue: moment(data[key] || startTimed, item.format)
                            })(
                              <a-date-picker showTime
                              // defaultValue={moment(data[key] || new Date(), item.format)}
                                style="width:100%"
                                format={item.format}
                                disabled={!item.editabled || this.title == 'check'}
                                onChange={(json, str) => this.handleChange(str, key, 'time')} />
                            )}
                          </a-form-item>
                          : item.type == 'endTime'
                            ? <a-form-item label={item.name}
                              colon={false}
                              validateStatus={item.validateStatus}
                              help={item.help}
                              labelCol={this.labelCol}
                              wrapperCol={this.wrapperCol}>
                              {getFieldDecorator(key, {
                                rules: [{
                                  required: item.isNeed,
                                  message: `请输入${item.name}`
                                }],
                                initialValue: moment(data[key] || endTimed, item.format)
                              })(
                                <a-date-picker showTime
                                  // defaultValue={moment(data[key] || new Date(), item.format)}
                                  style="width:100%"
                                  format={item.format}
                                  disabled={!item.editabled || this.title == 'check'}
                                  onChange={(json, str) => this.handleChange(str, key, 'time')} />
                              )}
                            </a-form-item>
                            : item.type == 'textarea'
                              ? <a-form-item label={item.name}
                                colon={false}
                                validateStatus={item.validateStatus}
                                help={item.help}
                                labelCol={this.labelTextCol}
                                wrapperCol={this.wrapperTextCol}>
                                {getFieldDecorator(key, {
                                  rules: [{
                                    required: item.isNeed,
                                    message: `请输入${item.name}`
                                  }],
                                  initialValue: data[key]
                                })(
                                  <a-textarea placeholder={`请输入${item.name}`}
                                    disabled={!item.editabled || this.title == 'check'}
                                    autosize={true}
                                    onChange={() => this.handleChange(key, key)} />
                                )}
                              </a-form-item>
                              : item.type == 'number'
                                ? <a-form-item label={item.name}
                                  colon={false}
                                  validateStatus={item.validateStatus}
                                  help={item.help}
                                  labelCol={this.labelCol}
                                  wrapperCol={this.wrapperCol}>
                                  {getFieldDecorator(key, {
                                    rules: [{
                                      required: item.isNeed,
                                      message: `请输入${item.name}`
                                    }],
                                    initialValue: data[key]
                                  })(
                                    <a-input-number placeholder={`请输入${item.name}`}
                                      min={item.rule.min} max={item.rule.max}
                                      step={item.rule.step}
                                      formatter={item.rule.formatter}
                                      disabled={!item.editabled || this.title == 'check'}
                                      onChange={() => this.handleChange(key, key, 'number')} />
                                  )}
                                </a-form-item>
                                : item.button// 生成MD5
                                  ? <a-form-item label={item.name}
                                    colon={false}
                                    validateStatus={item.validateStatus}
                                    help={item.help}
                                    labelCol={this.labelTextCol}
                                    wrapperCol={this.wrapperTextCol}>
                                    {getFieldDecorator(key, {
                                      rules: [{
                                        required: item.isNeed,
                                        message: `请输入${item.name}`
                                      }],
                                      initialValue: this.initiMD || data[key]
                                    })(
                                      <a-input placeholder={`请输入${item.name}`}
                                        style="width:89%"
                                        disabled={!item.editabled || this.title == 'check'}
                                        onChange={() => this.handleChange(key, key)} />
                                    )}
                                    <Button class="ant-btn ant-btn-primary " loading={this.isMding} style="position: relative;overflow: hidden;">生成<input type="file" style="position: absolute;top: 0;left: 0;height: 100%;opacity: 0;" onChange={this.createMd}/></Button>
                                  </a-form-item>
                                  : <a-form-item label={item.name}
                                    colon={false}
                                    validateStatus={item.validateStatus}
                                    help={item.help}
                                    labelCol={this.labelCol}
                                    wrapperCol={this.wrapperCol}>
                                    {getFieldDecorator(key, {
                                      rules: [{
                                        required: item.isNeed,
                                        message: `请输入${item.name}`
                                      }],
                                      initialValue: data[key]
                                    })(
                                      <a-input placeholder={`请输入${item.name}`}
                                        disabled={!item.editabled || this.title == 'check'}
                                        onChange={() => this.handleChange(key, key)} />
                                    )}
                                  </a-form-item>
              }
            </a-col>
          )
        }
      }
      if (this.$route.name === 'hotelCard' || this.$route.name === 'hotelCardOther') {
        childs.Basic = Basic
        childs.Activity = Activity
        childs.Exchange = Exchange
        childs.Get = Get
        childs.Use = Use
        return childs
      } else {
        return children
      }
    },
    // 集团管理从系统导入
    leadings () {
      let leads
      if (this.$route.name == 'groupCard' || this.$route.name == 'groupCardOther' || this.name == 'homeBannerDetail') {
        if (this.title == 'add') {
          leads = <button type="button" class="fromdao ant-btn ant-btn-primary" onClick={this.leadingsClik}>从系统导入</button>
        }
      }
      return leads
    },
    leadingsClik () {
      this.$emit('hide-modal')
      this.modalData.leadClikc()
    },
    // 生成MD5
    createMd (e) {
      if (event.target.files[0].size / 1024 / 1024 > 16) {
        this.$message.info('所选文件大小不能超过16MB')
        return false
      }
      this.isMding = true
      let file = {file: event.target.files[0]}
      let values = this.modalData.sortReturnModalData2 ? this.modalData.sortReturnModalData2(file) : file
      let data = values.data
      getData({
        name: 'p_apkController_getMD5_post',
        data: data,
        type: 'multipart/form-data;'
      }).then(res => {
        if (res.code == 200) {
          this.initiMD = res.data
          this.isMding = false
        }
      })
    }
  },
  render () {
    // 取消确定按钮是否可点击
    if (this.$route.name === 'hotelCardOther' || this.$route.name === 'hotelCard') {
      this.disa = true
    } else if (this.title == 'check') {
      this.disa = true
    } else {
      this.disa = false
    }
    if (this.$route.name === 'hotelCard' || this.$route.name === 'hotelCardOther') {
      let ExchangeForm = '', ActivityForm = ''
      if (this.getField().Exchange.length > 0) {
        ExchangeForm =
        <div>
          <div class="modealTile">兑换信息</div>
          <div class="clearf">{this.getField().Exchange}</div>
        </div>
      }
      if (this.getField().Activity.length > 0) {
        ExchangeForm =
        <div>
          <div class="modealTile">活动信息</div>
          <div class="clearf">{this.getField().Activity}</div>
        </div>
      }
      this.formInfo =
          <div style="margin-top:-20px">
            <div class="modealTile">基本信息</div>
            <div class="clearf">{this.getField().Basic}</div>
            <div class="modealTile">领取信息</div>
            <div class="clearf">{this.getField().Get}</div>
            <div class="modealTile">核销信息</div>
            <div class="clearf">{this.getField().Use}</div>
            {ExchangeForm}
            {ActivityForm}
          </div>
    } else {
      this.formInfo = this.getField()
    }
    return (
      <a-modal
        title={this.modalTitle}
        width={this.modalWidth}
        visible={this.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        maskClosable={false}
        destroyOnClose={true}
        confirmLoading={this.confirmLoading}
        // okButtonProps={{ props: { disabled: this.title == 'check' } }}
        // cancelButtonProps={{ props: { disabled: this.title == 'check' } }}
        okButtonProps={{ props: { disabled: this.disa } }}
        cancelButtonProps={{ props: { disabled: this.disa } }}
        ref="modalSelf"
        class="modalSelf"
      >
        {this.leadings()}
        <a-form class="ant-advanced-search-form" ref="modalForm">
          <a-row gutter={16}>
            {this.formInfo}
          </a-row>
          {this.editorInfo}
        </a-form>

      </a-modal>
    )
  }
}
export default Form.create()(modalForm)
</script>
<style lang="less">
.modalSelf {
  .clearf{overflow: hidden;}
  .modealTile{margin:20px 0}
  .fromdao {
    margin-bottom: 20px;
  }
  .ant-form-item-label {
  }

  .ant-modal-body {
    padding: 28px 50px;
  }

  .ant-modal-footer {
    border-top-width: 0;
    margin-top: 10px;
    padding: 10px 0 20px;
    text-align: center;

    button {
      height: 34px;
      margin-left: 40px;
      width: 100px;
    }
  }

  .ant-form-explain,
  .ant-form-extra {
    position: absolute;
  }

  .ant-modal-close-x {
    color: #fff;
    height: 38px;
    line-height: 38px;
  }

  .ant-modal-close {
    height: 38px;
    line-height: 38px;
  }

  .ant-modal-header {
    background: #0acac7;
    border-bottom-width: 0;
    padding: 8px 24px;

    .ant-modal-title {
      color: #fff;
    }
  }

  .ant-calendar-picker,
  .ant-input-number {
    width: 100%;
  }

  .ant-advanced-search-form .ant-form-item {
    margin-bottom: 0;
  }

  .form-item-upload-self {
    .ant-form-item-label {
      height: 118px;
    }
  }

  .ant-col-24,
  .ant-col-12 {
    border: 1px solid #e6e6e6;
    padding: 0 !important;
    margin-bottom: 10px;

    &:nth-child(even) {
      margin-left: -1px;
    }
  }

  .ant-form-item-label {
    padding: 5px 0;
    background: #f0f2f4;
    color: #666666;

    label {
      font-size: 12px;
    }
  }

  .ant-form-item-control-wrapper {
    margin-top: 4px;
    padding-left: 9px;

    input,
    textarea {
      border-radius: 0 !important;
    }

    textarea {
      margin-bottom: 0 !important;
    }
  }
}
</style>
