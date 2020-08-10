<template>

  <div class="searchSelf"
       v-if="nameArray && nameArray.length">
    <!--<a style="margin-left: 8px; font-size: 12px;display: block;line-height: 30px;position: absolute;right: 6px;top: 6px;z-index: 11;"
		   @click="toggle"
		   v-if="isShowHigh">
			高级查询
			<a-icon :type="expand ? 'up' : 'down'"/>
		</a>-->
    <a-badge :count="isHighStatus?1:0"
             dot
             v-if="isShowHigh"
             style="margin-left: 8px; font-size: 12px;display: block;line-height: 30px;position: absolute;right: 6px;top: 6px;z-index: 11;">
      <a @click="changeShowSearchModalStatus">
        高级查询
        <!--<a-icon :type="expand ? 'up' : 'down'"/>-->
      </a>
    </a-badge>
    <a-form class="ant-advanced-search-form "
            :class="[expand?'isAbsolute':'']"
            @submit="submitSearch"
            :form="form"
            layout="inline">
      <a-form-item v-for="item in nameArray"
                   :label='item.name'
                   style="margin-bottom: 0"
                   :key='`search-span-${item.dataIndex}`'
                   class="topInput">
        <a-input v-if="item.type==='input'"
                 v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                 :style="`width:${item.width||width[item.type]||120}px`" />
        <a-select v-else-if="item.type==='select'"
                  @change="(value)=>onChange(value,item)"
                  :dropdownMatchSelectWidth="false"
                  :mode="item.mode||'default'"
                  v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                  :style="`width:${item.width||width[item.type]||120}px`">
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
                    v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                    :placeholder="`请选择${item.name}`"
                    :style="`width:${item.width||width[item.type]||120}px`"
                    changeOnSelect />
        <a-radio-group v-else-if="item.type==='radio'"
                       :options="item.options"
                       v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                       :style="`width:${item.width||width[item.type]||120}px`">
        </a-radio-group>
        <a-checkbox-group v-else-if="item.type==='checkbox'"
                          v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                          :style="`width:${item.width||width[item.type]||120}px`"
                          :options="item.options" />
        <a-date-picker v-else-if="item.type==='date'"
                       :allowClear="false"
                       :disabledDate="item.disabledDate"
                       v-decorator="[item.dataIndex,{initialValue:item.date||moment(new Date()),}]"
                       :style="`width:${item.width||width[item.type]||120}px`">
        </a-date-picker>

        <a-date-picker v-else-if="item.type==='dateStart'"
                       :allowClear="false"
                        @change="changedateStar"
                        :disabledDate="disabledDateStar"
                       v-decorator="[item.dataIndex,{initialValue:dateStartinit||moment(new Date())}]"
                       :style="`width:${item.width||width[item.type]||120}px`">
        </a-date-picker>
        <a-date-picker v-else-if="item.type==='dateEnd'"
                       :allowClear="false"
                        @change="changedateEnd"
                        :disabledDate="disabledDateEnd"
                       v-decorator="[item.dataIndex,{initialValue:dateEndinit||moment(new Date())}]"
                       :style="`width:${item.width||width[item.type]||120}px`">
        </a-date-picker>

        <a-range-picker v-else-if="item.type==='timeRange'"
                        :allowClear="false"
                        :disabledDate="item.disabledDate"
                        v-decorator="[item.dataIndex]"
                        :style="`width:${item.width||width[item.type]||120}px`">
        </a-range-picker>
        <a-input-number v-else-if="item.type==='number'"
                        :step="item.step"
                        :min="item.min"
                        v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                        :style="`width:${item.width||width[item.type]||120}px`"
                        @blur="()=>item.onBlur(item,form)" />
      </a-form-item>
      <a-button-group v-if="originSearch">
        <a-button type='primary'
                  htmlType='submit'
                  :disabled="isHighStatus">
          <a-icon type="search" />
          搜索
        </a-button>
        <a-button @click="handleResetBtn"
                  :disabled="isHighStatus">
          <a-icon type="rollback" />
          重置
        </a-button>
      </a-button-group>
      <a-button-group v-else>
        <a-button type='primary'
                  htmlType='submit'
                  disabled="disabled">
          <a-icon type="search" />
          搜索
        </a-button>
        <a-button @click="handleResetBtn"
                  disabled="disabled">
          <a-icon type="rollback" />
          重置
        </a-button>
      </a-button-group>
      <div class="higiArray"
           v-show="expand && highArray.length">

        <a-form-item v-for="item in highArray"
                     :label='item.name'
                     style="margin-bottom: 0"
                     :key='`search-span-${item.dataIndex}`'
                     class="topInput">
          <a-input v-if="item.type==='input'"
                   v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                   :style="`width:${item.width||width[item.type]||120}px`" />
          <a-select v-else-if="item.type==='select'"
                    @change="(value)=>onChange(value,item)"
                    :dropdownMatchSelectWidth="false"
                    v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                    :mode="item.mode||'default'"
                    :style="`width:${item.width||width[item.type]||120}px`">
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
                      v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                      :style="`width:${item.width||width[item.type]||120}px`"
                      :placeholder="`请选择${item.name}`"
                      changeOnSelect />
          <a-radio-group v-else-if="item.type==='radio'"
                         :options="item.options"
                         v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                         :style="`width:${item.width||width[item.type]||120}px`">
          </a-radio-group>
          <a-checkbox-group v-else-if="item.type==='checkbox'"
                            :style="`width:${item.width||width[item.type]||120}px`"
                            v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                            :options="item.options" />
          <a-date-picker v-else-if="item.type==='date'"
                         :allowClear="false"
                         :disabledDate="item.disabledDate"
                         v-decorator="[item.dataIndex,{initialValue:item.date||moment(new Date())}]"
                         :style="`width:${item.width||width[item.type]||120}px`">
          </a-date-picker>
          <a-range-picker v-else-if="item.type==='timeRange'"
                          :allowClear="false"
                          v-decorator="[item.dataIndex]"
                          :style="`width:${item.width||width[item.type]||120}px`">
          </a-range-picker>
          <a-input-number v-else-if="item.type==='number'"
                          :step="item.step"
                          :min="item.min"
                          :style="`width:${item.width||width[item.type]||120}px`"
                          v-decorator="[item.dataIndex,{initialValue:item.defaultValue}]"
                          @blur="()=>item.onBlur(item,form)" />
        </a-form-item>
      </div>
    </a-form>
    <searchModal class="searchModal"
                 @hide-modal="changeShowSearchModalStatus"
                 @change-highstatus="changeHighStatus"
                 @do-high-search="doHighSearch"
                 @on-change="onChange"
                 @reset-data="resetData"
                 :visible="showSearchModalStatus"
                 :isHighStatus="isHighStatus"
                 :nameArray="nameArray"
                 :highArray="highArray"
                 :tempData="tempData"></searchModal>
  </div>

</template>

<script type="text/jsx">
// This file is for Mr.Huang
// But I can not understand it

import { mapActions, mapState } from 'vuex'
import { isEmptyObject } from '@/libs/tool'
import { clearData } from '@/libs/util'
import { treeTabs } from '../../api/hotelBaseData'
import moment from 'moment'
import searchModal from '../searchModal/searchModal'
import { getDate } from '../../libs/date'
import { getData } from '@/api/common'

export default {
  components: {
    searchModal
  },
  props: {
    search: {},
    toResetStatus: false
  },
  data () {
    return {
      showSearchModalStatus: false,
      isHighStatus: false,
      width: {
        input: 120,
        timeRange: 210,
        number: 80,
        checkbox: 290
      },
      nameArray: [],
      highArray: [],
      popupVisible: false,
      data: {},
      tempData: {},
      expand: false,
      isShowHigh: false,
      originSearch: true,
      halfTime: false, // 时间间隔为半个月
      // form: this.$form.createForm(this),
      isExtra: false // 与主附表无关,用于一些特殊 this.search.type==='extra'
    }
  },
  computed: {
    ...mapState({
      getTabs: state => state.data.tabs,
      getTree: state => state.data.tree,
      getChoseTr: state => state.data.choseTr
    })
  },
  watch: {
    toResetStatus (status) {
      // if (status) {
      // 	if (treeTabs.indexOf(this.$route.name) > -1) {
      // 		!isEmptyObject(this.$store.state.data.tree) && this.handleReset()
      // 	} else {
      // 		this.handleReset()
      // 	}
      // }
      status && ((treeTabs.indexOf(this.$route.name) > -1 && !isEmptyObject(this.$store.state.data.tree)) || !(treeTabs.indexOf(this.$route.name) > -1)) && this.handleReset()
    },
    getTree (val) {
      if (val && !isEmptyObject(val)) {
        !this.isExtra && this.resetForm()
        // this.form && this.form.resetFields && this.form.resetFields()
      }
    },
    getChoseTr (val) {
      if (this.search.type === 'sub' && !isEmptyObject(val)) {
        !this.isExtra && this.resetForm()
        // this.form && this.form.resetFields && this.form.resetFields()
      }
    },
    getTabs (val) {
      // console.log(val)
      if (this.search.type === 'sub') {
        this.nameArray = this.search[val] && this.search[val].nameArray || []
        this.isShowHigh = this.search[val] && this.search[val].isShowHigh || false
        if (this.isShowHigh) this.highArray = this.search[val] && this.search[val].highArray || []
      }
      this.getResetData()
    }
  },
  created () {
    // 默认开始时间、结束时间
    if (this.$route.name == 'programUser') {
      this.halfTime = true
    } else {
      this.halfTime = false
    }
    if (this.halfTime) {
      this.dateStartinit = moment(getDate(new Date().getTime() - 365 / 2 * 24 * 3600 * 1000))
      this.dateEndinit = moment(getDate(new Date()))
    } else {
      this.dateStartinit = ''
      this.dateEndinit = ''
    }
    // debugger
    if (this.search.type === 'sub' && this.search[this.getTabs]) {
      this.nameArray = this.search[this.getTabs].nameArray || []
      this.isShowHigh = this.search[this.getTabs].isShowHigh || false
      if (this.isShowHigh) this.highArray = this.search[this.getTabs].highArray || []
    } else {
      this.nameArray = this.search.nameArray
      this.isShowHigh = this.search.isShowHigh
      this.highArray = this.search.highArray
    }
    // console.log(this.search)
    this.isExtra = this.search.type === 'extra'
    if (this.search.namePagin == 'companylist' && this.$route.name == 'groupPlan') {
      this.originSearch = false
    }
    this.getResetData()
  },
  beforeDestroy () {
    // this.toResetStatus && this.handleReset()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {})
  },
  mounted () {
    setTimeout(() => {
      if (this.search.defaultVals && !isEmptyObject(this.search.defaultVals)) {
        const defaultVals = this.search.defaultVals, baseFormData = this.form.getFieldsValue()
        for (let i in defaultVals) {
          baseFormData.hasOwnProperty(i) && this.form && this.form.setFieldsValue && this.form.setFieldsValue({ [i]: defaultVals[i] })
        }
      }
    }, 0)
  },
  methods: {
    moment,
    changedateStar (e) {
      if (this.halfTime) {
        this.times = e
        this.dateEndinit = moment(getDate(new Date(e).getTime() + 365 / 2 * 24 * 3600 * 1000))
      }
    },
    changedateEnd (e) {
      if (this.halfTime) {
        this.times = e
        this.dateStartinit = moment(getDate(new Date(e).getTime() - 365 / 2 * 24 * 3600 * 1000))
      }
    },
    disabledDateStar (current) {
      let _this = this
      return current && current && current < moment(getDate(new Date(_this.times).getTime() - 365 / 2 * 24 * 3600 * 1000))
      // return current && current && current > moment(_this.times).subtract(6, 'months')
    },
    disabledDateEnd (current) {
      let _this = this
      return current && current && current > moment(getDate(new Date(_this.times).getTime() + 365 / 2 * 24 * 3600 * 1000))
      // return current && current && current > moment(_this.times).subtract(6, 'months')
    },
    changeShowSearchModalStatus () {
      this.showSearchModalStatus = !this.showSearchModalStatus
    },
    doHighSearch (data) {
      if (treeTabs.indexOf(this.$route.name) > -1) {
        if (!this.$store.state.data.tree || (this.$store.state.data.tree && isEmptyObject(this.$store.state.data.tree))) {
          this.$message.info('请选择左侧树内容!')
          return false
        }
      }

      let values = this.changeUndefined(data)

      for (let i in values) {
        this.form && this.form.setFieldsValue && this.form.setFieldsValue({ [i]: values[i] })
      }
      if (this.search.timeSearch) {
        values.Highopen = true
        values = this.search.sortReturnSearchData ? this.search.sortReturnSearchData(values) : values
      } else {
        values = this.search.sortReturnSearchData ? this.search.sortReturnSearchData(values) : values
      }
      if (this.isExtra || this.search.noSearch) return false
      this.expand = false
      this.search.type === 'sub' ? this.handleSubSearch(values) : this.handleSearch(values)
    },
    changeHighStatus (val) {
      this.isHighStatus = val
    },
    onChange (value, item, form) {
      // 选择省份时更新市区选择框
      if (this.search.changeStatus && item.dataIndex == 'proviceCode') {
        getData({
          name: 'h_common_proviceCity__get',
          data: {protype: 2, flag: 1, procode: value},
          type: ''
        }).then(res => {
          res.data.forEach(item => {
            item.value = item.code
            item.title = item.name
          })
          this.search.nameArray[1].data = res.data
        })
      }
      this.search.onFieldChange && this.search.onFieldChange(value, item, form || this.form)
    },
    toggle () {
      this.expand = !this.expand
    },
    ...mapActions([
      'handleSearch',
      'handleSubSearch'
    ]),
    getResetData () {
      // console.log('00')
      const data = {}
      this.nameArray && this.nameArray.length && this.nameArray.forEach((item) => {
        data[item.dataIndex] = ''
      })
      this.highArray && this.highArray.length && this.highArray.forEach((item) => {
        data[item.dataIndex] = ''
      })
      this.data = { ...data }
      if (this.search.defaultVals) {
        this.data = { ...this.data, ...this.search.defaultVals }
      }
    },
    resetForm () {
      this.form && this.form.resetFields && this.form.resetFields()
      if (this.search.defaultVals && !isEmptyObject(this.search.defaultVals)) {
        const defaultVals = this.search.defaultVals
        for (let i in defaultVals) {
          this.form && this.form.setFieldsValue && this.form.setFieldsValue({ [i]: defaultVals[i] })
        }
      }
    },
    // from 高级搜索
    resetData (status) {
      if (status) this.tempData = { toResetStatus: true }
    },
    handleReset () {
      this.resetForm()
      let values = this.data || {}, formVals = this.form.getFieldsValue()
      values = clearData(values)
      values = { ...values, ...this.changeUndefined(formVals) }
      this.tempData = { toResetStatus: true }

      if (this.search.namePagin) {
        values.namePagin = this.search.namePagin
      }
      this.search.sortReturnSearchResetData && this.search.sortReturnSearchResetData(values)
      if (this.$route.name != 'platformPlan' && this.$route.name != 'platformSearch' && this.$route.name != 'managerAdMaterial' &&
         this.$route.name != 'managerPlan' && this.$route.name != 'groupPlan' && this.$route.name != 'groupSearch') {
        if (this.isExtra) return false
      }
      this.search.type === 'sub' ? this.handleSubSearch(values) : this.handleSearch(values)
    },
    handleResetBtn () {
      if (treeTabs.indexOf(this.$route.name) > -1) {
        if (!this.$store.state.data.tree || (this.$store.state.data.tree && isEmptyObject(this.$store.state.data.tree))) {
          this.$message.info('请选择左侧树内容!')
          return false
        }
      }
      this.expand = false
      this.handleReset(this.data)
    },
    changeUndefined (values) {
      for (let key in values) {
        if (typeof (values[key]) === 'undefined') values[key] = ''
      }
      return values
    },
    submitSearch (e) {
      if (treeTabs.indexOf(this.$route.name) > -1) {
        if (!this.$store.state.data.tree || (this.$store.state.data.tree && isEmptyObject(this.$store.state.data.tree))) {
          this.$message.info('请选择左侧树内容!')
          return false
        }
      }
      e.preventDefault()
      this.form.validateFields((error, data) => {
        let values = this.changeUndefined(data)
        this.tempData = values
        if (this.search.timeSearch) {
          values.open = true// 查询收起后删除时间
          values = this.search.sortReturnSearchData ? this.search.sortReturnSearchData(values) : values
        } else {
          values = this.search.sortReturnSearchData ? this.search.sortReturnSearchData(values) : values
        }
        if (this.search.namePagin) {
          values.namePagin = this.search.namePagin
        }
        if (this.$route.name != 'platformPlan' && this.$route.name != 'platformSearch' && this.$route.name != 'managerAdMaterial' &&
         this.$route.name != 'managerPlan' && this.$route.name != 'groupPlan' && this.$route.name != 'groupSearch') {
          if (this.isExtra || this.search.noSearch) return false
        }
        this.expand = false
        this.search.type === 'sub' ? this.handleSubSearch(values) : this.handleSearch(values)
      })
    }
  }
}

</script>

<style lang="less">
.searchSelf {
  /*width: 100%;*/
  height: 44px;
  position: relative;
  text-align: left;

  .higiArray {
    padding: 20px 0 10px;
  }

  .ant-btn {
    height: 28px;
    line-height: 28px;
    /*-webkit-border-radius: 15px;*/
    /*-moz-border-radius: 15px;*/
    /*border-radius: 15px;*/
    font-size: 12px;
    min-width: 70px;

    &.ant-btn-primary:hover {
      color: #fff;
    }
  }

  .ant-input-number {
    height: 28px;
    width: 100%;
    position: relative;
    top: -1px;

    .ant-input-number-input {
      height: 100%;
    }
  }

  .ant-radio-group {
    border: 1px solid #ddd;
    border-radius: 5px;
    height: 28px;
    margin-top: 1px;
    padding: 0 10px;
    width: 100%;
  }

  .ant-checkbox-group {
    border: 1px solid #ddd;
    border-radius: 5px;
    height: 28px;
    margin-top: 1px;
    padding: 0 10px;

    .ant-checkbox-group-item {
      margin-top: 3px;
    }
  }

  .ant-input {
    height: 28px;
  }

  .ant-calendar-picker-input {
    padding: 0 11px;
    height: 28px;
  }

  .ant-select-selection__rendered {
    height: 28px;
    line-height: 26px;
  }

  .ant-select {
    margin-top: 2px;
  }

  .ant-select-selection--single {
    height: 28px;
  }

  .ant-btn-group > .ant-btn:first-child:not(:last-child),
  .ant-btn-group > span:first-child:not(:last-child) > .ant-btn {
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
  }

  .ant-btn-group > .ant-btn:last-child:not(:first-child),
  .ant-btn-group > span:last-child:not(:first-child) > .ant-btn {
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
  }

  .isAbsolute {
    position: absolute;
    /*width: 100%;*/
    z-index: 10;
    -moz-box-shadow: 2px 2px 8px #ddd;
    -webkit-box-shadow: 2px 2px 8px #ddd;
    box-shadow: 2px 2px 8px #ddd;
  }

  .topInput {
    .ant-form-item-label {
      line-height: 28px;
      font-size: 12px;
    }

    .ant-form-item-children {
      display: block;
      height: 28px;
      line-height: 28px;
      margin-top: -1px;
    }
  }

  .ant-advanced-search-form {
    padding: 7px 24px;
    background: #fff;
    width: 100%;
  }

  .ant-advanced-search-form .ant-form-item {
    //display: flex;
  }

  .ant-advanced-search-form .ant-form-item-control-wrapper {
    //flex: 1;
  }
}
</style>
