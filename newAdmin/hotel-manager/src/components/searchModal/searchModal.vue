<template>
  <a-modal :visible="visible"
           class="modalSelf searchModalSelf"
           title="高级搜索"
           @cancel="handleCancel"
           :width="modalWidth"
           :footer="null"
           :style="!visible?'overflow:hidden':''"
           :mask="visible"
           :maskClosable="false">
    <a-form class="ant-advanced-search-form"
            :form="form"
            ref="searchModal">
      <a-row :gutter="16">
        <a-col :span="12"
               v-for="item in searchArray"
               :key='`searchModal-spanCol-${item.dataIndex}`'>
          <a-form-item :label="item.name"
                       :labelCol="labelCol"
                       :wrapperCol="wrapperCol"
                       :key='`searchModal-spanFormItem-${item.dataIndex}`'>
            <a-input v-if="item.type==='input'"
                     v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"></a-input>
            <a-select v-else-if="item.type==='select'"
                      @change="(value)=>onChange(value,item)"
                      :dropdownMatchSelectWidth="false"
                      v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                      :mode="item.mode||'default'">
              <a-select-option :value="flag.value"
                               v-for="flag in item.data"
                               :dropdownMatchSelectWidth="false"
                               :key="`search-select-${flag.key}`">
                {{flag.title}}
              </a-select-option>
            </a-select>
            <a-cascader v-else-if="item.type==='cascader'"
                        :options="item.data"
                        :expandTrigger="'hover'"
                        :placeholder="`请选择${item.name}`"
                        v-decorator="[item.dataIndex,item.formOptions||{}]"
                        changeOnSelect />
            <a-radio-group v-else-if="item.type==='radio'"
                           v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                           :options="item.options">
            </a-radio-group>
            <a-checkbox-group v-else-if="item.type==='checkbox'"
                              v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                              :options="item.options" />
            <a-date-picker v-else-if="item.type==='date'"
                           :allowClear="false"
                           v-decorator="[item.dataIndex,{initialValue:item.date||moment(new Date())}]"></a-date-picker>
            <a-range-picker v-else-if="item.type==='timeRange'"
                            :allowClear="false"
                            v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"></a-range-picker>
            <a-input-number v-else-if="item.type==='number'"
                            :step="item.step"
                            :min="item.min"
                            v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                            @blur="()=>item.onBlur(item,form)" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <a-row type="flex"
           justify="center"
           class="ant-modal-footer"
           style="padding:30px 0 0 ;margin-bottom:-10px;">
      <a-button type="primary"
                @click="changeHighStatusBtn">切换至普通搜索</a-button>
      <a-button type="primary"
                @click="onSearch(true)">搜索</a-button>
      <!--<a-button @click="backForm">还原</a-button>-->
      <a-button @click="resetForm">重置</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </a-row>
  </a-modal>
</template>
<script>
import moment from 'moment'
import { isEmptyObject } from '../../libs/tool'
import { treeTabs } from '../../api/hotelBaseData'

export default {
  data () {
    return {
      searchArray: [],
      wrapperCol: { span: 16 },
      labelCol: { span: 6 },
      timeKeys: [],
      baseVisible: true,
      modalWidth: 0,
      highTempData: {}
    }
  },
  props: {
    nameArray: {
      type: Array,
      default: () => []
    },
    highArray: {
      type: Array,
      default: () => []
    },
    visible: false,
    tempData: {},
    isHighStatus: false

  },
  watch: {
    nameArray (val) {
      this.getSearchArray()
    },
    highArray (val) {
      this.getSearchArray()
    },
    visible (val) {
      // this.modalWidth = val ? (document.getElementById('app').clientWidth * .8 + 'px') : 0
      // val && this.setBaseData()
      if (val) {
        this.$nextTick(() => {
          this.setBaseData()
        })
      }
    },
    tempData (data) {
      // if (!isEmptyObject(data)) {
      // 	Object.keys(data).map(item => {
      // 		this.form.setFieldsValue({[item]: data[item]})
      // 	})
      // }
    },
    isHighStatus () {

    }
  },
  methods: {
    moment,
    onChange (value, item) {
      // this.search.onFieldChange && this.search.onFieldChange(value, item, this.form)
      this.$emit('on-change', value, item, this.form)
    },
    setBaseData () {
      let val = this.visible, data = this.tempData
      if (!this.$refs.searchModal) return false
      this.baseVisible = val
      if (this.isHighStatus) return false
      if (val && !isEmptyObject(data)) {
        !data.toResetStatus && Object.keys(data).map(item => {
          if (this.timeKeys.length && this.timeKeys.indexOf(item) > -1) {
            data[item] = moment(data[item])
          }
          this.form.setFieldsValue({ [item]: data[item] })
        })
        data.toResetStatus && this.form.resetFields()
      }
    },
    handleCancel () {
      //! isEmptyObject(this.highTempData) && this.backForm()
      this.$emit('hide-modal')
    },
    getSearchArray () {
      this.searchArray = [...this.nameArray, ...this.highArray]
      this.getTimeKeys()
    },
    backForm () {
      let data = this.highTempData
      Object.keys(data).map(item => {
        this.form.setFieldsValue({ [item]: data[item] })
      })
    },
    resetForm () {
      // this.$emit('change-highstatus', false)
      this.form && this.form.resetFields && this.form.resetFields()
    },

    changeUndefined (values) {
      for (let key in values) {
        if (typeof (values[key]) === 'undefined') values[key] = ''
      }
      return values
    },
    onSearch (status) {
      if (treeTabs.indexOf(this.$route.name) > -1) {
        if (!this.$store.state.data.tree || (this.$store.state.data.tree && isEmptyObject(this.$store.state.data.tree))) {
          this.$message.info('请选择左侧树内容!')
          return false
        }
      }
      this.$emit('change-highstatus', status)
      let data = this.form.getFieldsValue()
      let arr = Object.keys(data)
      arr.forEach(item => {
        if (item.indexOf(',') !== -1) {
          // setTimeout(() => {
          let arr1 = item.split(',')
          if (arr1[0] === 'checkinBeginTime') {
            let date1 = moment(data[item][0]).format('YYYY-MM-DD')
            let date2 = moment(data[item][1]).format('YYYY-MM-DD')
            this.$set(data, arr1[0], date1)
            this.$set(data, arr1[1], date2)
          }
          if (arr1[0] === 'checkoutBeginTime') {
            let date1 = moment(data[item][0]).format('YYYY-MM-DD')
            let date2 = moment(data[item][1]).format('YYYY-MM-DD')
            this.$set(data, arr1[0], date1)
            this.$set(data, arr1[1], date2)
          }
          // })
        }
      })
      this.highTempData = data
      this.$emit('do-high-search', this.changeUndefined(data))
      this.handleCancel()
    },

    changeHighStatusBtn () {
      this.resetForm()
      this.$emit('reset-data', true)
      // this.$emit('change-highstatus', false)
      this.onSearch(false)
    },
    getTimeKeys () {
      let arr = this.searchArray
      this.timeKeys = []
      arr && arr.length && arr.forEach(item => {
        item.type === 'date' && this.timeKeys.push(item.dataIndex)
      })
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {})
  },
  created () {
    this.getSearchArray()
    this.modalWidth = document.getElementById('app').clientWidth * 0.8 + 'px'
  },
  mounted () {
    this.setBaseData()
  },
  updated () {
    // this.setBaseData()
  }
}
</script>
<style lang="less">
@import url(../modal/modal);
.searchModalSelf {
  .ant-modal-footer {
    button {
      border-radius: 34px;
      width: auto !important;
      min-width: 100px !important;
    }
  }
}
</style>
