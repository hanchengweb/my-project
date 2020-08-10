<template>
	<div class="searchSelf" v-if="nameArray && nameArray.length">
		<a style="margin-left: 8px; font-size: 12px;display: block;line-height: 30px;position: absolute;right: 6px;top: 6px;z-index: 11;"
		   @click="toggle"
		   v-if="isShowHigh">
			高级查询
			<a-icon :type="expand ? 'up' : 'down'"/>
		</a>
		<a-form class="ant-advanced-search-form " :class="[expand?'isAbsolute':'']"
				@submit="submitSearch" :autoFormCreate="(form)=>{this.form = form}">
			<a-row :gutter="12">
				<a-col :span="`${item.spans && parseInt(item.spans)||(nameArray.length<4?5:4)}`"
					   :key='`search-span-${item.dataIndex}`'
					   class='topInput' v-for="item in nameArray">
					<a-form-item :label='item.name' :fieldDecoratorId="item.dataIndex" style="margin-bottom: 0">
						<a-input
							v-if="item.type==='input'"
						/>
						<a-select v-else-if="item.type==='select'"
								  @change="(value)=>onChange(value,item)"
								  :dropdownMatchSelectWidth="false"
								  :mode="item.mode||'default'" style="height: 28px;">
							<a-select-option
								:value="flag.value" v-for="flag in item.data"
								:dropdownMatchSelectWidth="false"
								:key="`search-select-${flag.key}`">
								{{flag.title}}
							</a-select-option>
						</a-select>

						<a-cascader
							v-else-if="item.type==='cascader'"
							:options="item.data"
							:expandTrigger="'hover'"
							:placeholder="`请选择${item.name}`"
							changeOnSelect/>
						<a-radio-group
							v-else-if="item.type==='radio'"
							:options="item.options"
							:defaultValue="item.defaultValue"/>
						<a-checkbox-group
							v-else-if="item.type==='checkbox'"
							:options="item.options"
						/>
						<a-date-picker
							v-else-if="item.type==='date'"
							:allowClear="false"
							:defaultValue="item.date||moment(new Date())"
						/>
						<a-range-picker
							v-else-if="item.type==='timeRange'"
							:allowClear="false"
							:defaultValue="[item.start||moment(new Date(), item.dateFormat), item.end||moment(new Date(), item.dateFormat)]"
						/>
						<a-input-number
							v-else-if="item.type==='number'"
							:step="item.step"
							:min="item.min"
							@blur="()=>item.onBlur(item,form)"
						/>
					</a-form-item>
				</a-col>
				<a-col :span='5' style="text-align: center;padding-left: 5px;">
					<a-button-group>
						<a-button type='primary' htmlType='submit'>
							<a-icon type="search"/>
							搜索
						</a-button>
						<a-button @click="handleResetBtn">
							<a-icon type="rollback"/>
							重置
						</a-button>
					</a-button-group>
				</a-col>
				<!--<a-col :span='2' style="text-align: right;">-->
				<!--<a style="margin-left: 8px; font-size: 12px;display: block;line-height: 30px" @click="toggle"-->
				<!--v-if="isShowHigh">-->
				<!--高级查询-->
				<!--<a-icon :type="expand ? 'up' : 'down'"/>-->
				<!--</a>-->
				<!--</a-col>-->
			</a-row>
			<a-row :gutter='16' class="higiArray" v-show="expand && highArray.length">
				<a-col :span="`${item.spans && parseInt(item.spans)||6}`" :key='`search-span-${item.dataIndex}`'
					   class='topInput' v-for="item in highArray">
					<a-form-item :label='item.name' :fieldDecoratorId="item.dataIndex" style="margin-bottom: 0">
						<a-input
							v-if="item.type==='input'"
						/>
						<a-select v-else-if="item.type==='select'" @change="(value)=>onChange(value,item)">
							<a-select-option :value="flag.value" v-for="flag in item.data"
											 :key="`search-select-${flag.key}`">
								{{flag.title}}
							</a-select-option>
						</a-select>
						<a-cascader
							v-else-if="item.type==='cascader'"
							:options="item.data"
							:expandTrigger="'hover'"
							:placeholder="`请选择${item.name}`"
							changeOnSelect/>
						<a-radio-group
							v-else-if="item.type==='radio'"
							:options="item.options"
							:defaultValue="item.defaultValue"/>
						<a-checkbox-group
							v-else-if="item.type==='checkbox'"
							@change="(value)=>onChange(value,item)"
							v-decorator="[item.dataIndex]"
							:options="item.options"
							:defaultValue="item.defaultValue"
						/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</div>
</template>
<script type="text/jsx">

	import {mapActions, mapState} from 'vuex'
	import {isEmptyObject} from '@/libs/tool'
	import {clearData} from '@/libs/util'
	import {treeTabs} from '../../api/hotelBaseData'
	import moment from 'moment'

	export default {
		props: {
			search: {},
			toResetStatus: false
		},
		data () {
			return {
				nameArray: [],
				highArray: [],
				popupVisible: false,
				data: {},
				expand: false,
				isShowHigh: false,
				isExtra: false,//与主附表无关,用于一些特殊 this.search.type==='extra'
			}
		},
		computed: {
			...mapState({
				getTabs: state => state.data.tabs,
				getTree: state => state.data.tree,
				getChoseTr: state => state.data.choseTr,
			}),
		},
		watch: {
			toResetStatus (status) {
			},
			getTree (val) {
				if (val && !isEmptyObject(val)) {
					!this.isExtra && this.resetForm()
					//this.form && this.form.resetFields && this.form.resetFields()
				}
			},
			getChoseTr (val) {
				if (this.search.type === 'sub' && !isEmptyObject(val)) {
					!this.isExtra && this.resetForm()
					//this.form && this.form.resetFields && this.form.resetFields()
				}
			},
			getTabs (val) {
				if (this.search.type === 'sub') {
					this.nameArray = this.search[val] && this.search[val].nameArray || []
					this.isShowHigh = this.search[val] && this.search[val].isShowHigh || false
					if (this.isShowHigh) this.highArray = this.search[val] && this.search[val].highArray || []
				}
				this.getResetData()

			}

		},
		created () {
			if (this.search.type === 'sub' && this.search[this.getTabs]) {
				this.nameArray = this.search[this.getTabs].nameArray || []
				this.isShowHigh = this.search[this.getTabs].isShowHigh || false
				if (this.isShowHigh) this.highArray = this.search[this.getTabs].highArray || []
			} else {
				this.nameArray = this.search.nameArray
				this.isShowHigh = this.search.isShowHigh
				this.highArray = this.search.highArray
			}
			this.isExtra = this.search.type === 'extra'
			this.getResetData()
		},
		beforeDestroy () {
			//this.toResetStatus && this.handleReset()
		},
		mounted () {
			setTimeout(() => {
				if (this.search.defaultVals && !isEmptyObject(this.search.defaultVals)) {
					const defaultVals = this.search.defaultVals
					for (let i in defaultVals) {
						this.form && this.form.setFieldsValue && this.form.setFieldsValue({[i]: defaultVals[i]})
					}
				}
			}, 0)
		},
		methods: {
			moment,
			onChange (value, item) {
				this.search.onFieldChange && this.search.onFieldChange(value, item, this.form)
			},
			toggle () {
				this.expand = !this.expand
			},
			...mapActions([
				'handleSearch',
				'handleSubSearch'
			]),
			getResetData () {
				const data = {}
				this.nameArray && this.nameArray.length && this.nameArray.forEach((item) => {
					data[item.dataIndex] = ''
				})
				this.highArray && this.highArray.length && this.highArray.forEach((item) => {
					data[item.dataIndex] = ''
				})
				this.data = {...data}
				if (this.search.defaultVals) {
					this.data = {...this.data, ...this.search.defaultVals}
				}
			},
			resetForm () {
				this.form && this.form.resetFields && this.form.resetFields()
				if (this.search.defaultVals && !isEmptyObject(this.search.defaultVals)) {
					const defaultVals = this.search.defaultVals
					for (let i in defaultVals) {
						this.form && this.form.setFieldsValue && this.form.setFieldsValue({[i]: defaultVals[i]})
					}
				}
			},
			handleReset () {
				this.resetForm()
				let values = this.data || {}, formVals = this.form.getFieldsValue()
				values = clearData(values)
				values = {...values, ...this.changeUndefined(formVals)}
				this.search.sortReturnSearchResetData && this.search.sortReturnSearchResetData(values)
				if (this.isExtra) return false
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
					if (typeof(values[key]) === 'undefined') values[key] = ''
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
					values = this.search.sortReturnSearchData ? this.search.sortReturnSearchData(values) : values
					if (this.isExtra || this.search.noSearch) return false
					this.expand = false
					this.search.type === 'sub' ? this.handleSubSearch(values) : this.handleSearch(values)
				})
			},
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
		.ant-btn-group > .ant-btn:first-child:not(:last-child), .ant-btn-group > span:first-child:not(:last-child) > .ant-btn {
			border-bottom-left-radius: 15px;
			border-top-left-radius: 15px;
		}
		.ant-btn-group > .ant-btn:last-child:not(:first-child), .ant-btn-group > span:last-child:not(:first-child) > .ant-btn {
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
			display: flex;
		}

		.ant-advanced-search-form .ant-form-item-control-wrapper {
			flex: 1;
		}
	}


</style>
