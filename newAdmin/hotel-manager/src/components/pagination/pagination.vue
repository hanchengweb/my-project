<template>
	<div class="paginationSelf">
		<div class="fl plusInfo" v-if="pagination">
			<p v-if="pagination.info" class="fl info" :style="pagination.infoStyle">{{pagination.info}}</p>
			<span class="button block fl"
				  v-if="pagination.buttons && pagination.buttons.length && pagination.isSelf"
				  v-for="button in pagination.buttons"
				  :style="button.style"
				  @click="button.onClick(button)"
				  :key="`pagination-button-${button.name}-${Math.random()}`">
				<a-icon :type="button.icon||'-'" v-if="button.icon"/>
				{{button.name}}
			</span>
			<a-button
				v-if="pagination.buttons && pagination.buttons.length && !pagination.isSelf"
				v-for="button in pagination.buttons"
				@click="button.onClick(button)"
				:style="button.style"
				:type="`${button.type||'default'}`"
				:key="`pagination-button-${button.name}-${Math.random()}`">
				{{button.name}}
			</a-button>
			<p v-if="pagination.infoAfter" class="fl info">{{pagination.infoAfter}}</p>

		</div>
		<div class="pagination clearfix fr">
			<a-icon type="reload" class="selfFresh fl" @click="reFresh"/>
			<p class="fl total">共{{total}}条数据</p>
			<div class="fl clearfix" v-if="!table.hidePaginationPart">
				<a-select :defaultValue="pageSize"
						  @change="showSizeChange" class="fl select">
					<a-select-option v-for="option in pageSizeOptions" :key="option" :value="option">{{option}}条/页
					</a-select-option>
				</a-select>
				<a-icon type="vertical-right" @click="toPages('min')" class="fl step"/>
				<a-pagination simple :current="current" :total="total" :pageSize="pageSize" class="fl" size="small"
							  @change="change"/>
				<a-icon type="vertical-left" @click="toPages('max')" class="fl step"/>

			</div>
		</div>

		<!--<a-pagination
			:total="total"
			:current="current"
			:pageSize="pageSize"
			showSizeChanger
			showQuickJumper
			@change="change"
			@showSizeChange="showSizeChange"
			size="small"
			:showTotal="total => `共 ${pages}页/${total} 条数据`"
			class="pagination"/>-->
	</div>

</template>
<script>
import {mapActions} from 'vuex'
import {treeTabs} from '../../api/hotelBaseData'
import {isEmptyObject} from '../../libs/tool'

export default {
  props: {
    data: {},
    pagination: {},
    table: {},
    type: {
      type: String,
      default: 'main'
    }
  },
  data () {
    return {
      total: 0,
      pages: 0,
      pageSize: 10,
      isExtra: false,
      pageData: {
        page: 0,
        size: 10
      },
      current: 1,
      pageSizeOptions: [5, 10, 20, 30, 40]
    }
  },
  watch: {
    data (val) {
      this.total = val.total
      this.pages = val.pages
    },
    getPegination (val) {
      if (val.reset) {
        this.current = 1
        this.pageData = val
      }
    },
    getSubPegination (val) {
      if (val.reset && this.type == 'sub') {
        this.current = 1
        this.pageData = val
      }
    }
  },
  computed: {
    getPegination () {
      return this.$store.state.data.pegination
    },
    getSubPegination () {
      return this.$store.state.data.subPegination
    }
  },
  methods: {
    ...mapActions([
      'handlePegination',
      'handleSubPegination',
      'handleChangeTableStatus',
      'handleChangeSubTableStatus'
    ]),
    message () {
      if (treeTabs.indexOf(this.$route.name) > -1) {
        if (!this.$store.state.data.tree || (this.$store.state.data.tree && isEmptyObject(this.$store.state.data.tree))) {
          this.$message.info('请选择左侧树内容!')
          return false
        }
      }
    },
    reFresh () {
      if (treeTabs.indexOf(this.$route.name) > -1) {
        if (!this.$store.state.data.tree || (this.$store.state.data.tree && isEmptyObject(this.$store.state.data.tree))) {
          this.$message.info('请选择左侧树内容!')
          return false
        }
      }
      if (this.isExtra) {
        this.pagination && this.pagination.sortReturnPagination && this.pagination.sortReturnPagination({})
        return false
      }
      this.type == 'sub' ? this.handleChangeSubTableStatus(this.$route.name) : this.handleChangeTableStatus(this.$route.name)
    },
    toPegination (data) {
      if (this.pagination && this.pagination.namePagin) {
        data.namePagin = this.pagination.namePagin
	  }
      this.type == 'sub' ? this.handleSubPegination(data) : this.handlePegination(data)
    },
    toPages (type) {
      this.change(type == 'min' ? 1 : this.pages)
    },
    change (page) {
      if (treeTabs.indexOf(this.$route.name) > -1) {
        if (!this.$store.state.data.tree || (this.$store.state.data.tree && isEmptyObject(this.$store.state.data.tree))) {
          this.$message.info('请选择左侧树内容!')
          return false
        }
      }
      if (page == this.current) return false

      this.current = page
      let data = {page: --page, size: this.pageSize}
	  data = this.pagination && this.pagination.sortReturnPagination && this.pagination.sortReturnPagination(data) || data
      if (this.isExtra) return false
      this.toPegination(data)
    },
    showSizeChange (size) {
      if (treeTabs.indexOf(this.$route.name) > -1) {
        if (!this.$store.state.data.tree || (this.$store.state.data.tree && isEmptyObject(this.$store.state.data.tree))) {
          this.$message.info('请选择左侧树内容!')
          return false
        }
      }
      this.pageSize = size
      this.current = 1
      let value = {page: 0, size: size}
	  value = this.pagination && this.pagination.sortReturnPagination && this.pagination.sortReturnPagination(value) || value
      if (this.isExtra) return false
      this.toPegination(value)
    }

  },
  created () {
    this.pageSize = this.pagination && this.pagination.pageSize || 10
    this.pageData.size = this.pageSize
    const data = {...this.pageData, reset: true}
    this.isExtra = this.pagination && this.pagination.type === 'extra'
    if (!this.isExtra) {
      this.type == 'sub' ? this.handleSubPegination(data) : this.handlePegination(data)
    }
  }
}
</script>
<style lang="less">
	.paginationSelf {
		height: 38px;
		border-top: 1px solid #F0F2F4;
		width: 100%;
		background-color: #fff;
		.plusInfo {
			padding: 7px 50px;
			color: #666;
			font-size: 12px;
			.info {
				display: block;
				line-height: 24px;
				margin-right: 30px;
			}
			.button {
				background-color: #F0F2F4;
				line-height: 24px;
				height: 24px;
				margin-right: 26px;
				padding: 0 8px;
				cursor: pointer;
			}
		}
		.selfFresh {
			cursor: pointer;
			color: rgba(0, 0, 0, .65);
			font-size: 16px;
			margin-top: 4px;
			margin-right: 20px;

		}
		.pagination {
			margin: 6px 0 0 16px;
			height: 26px;
			font-size: 12px;
			color: #666;
			padding-right: 10px;
			.ant-pagination {
				input {
					width: 40px;
				}
			}
			.select {
				height: 24px;
				line-height: 24px;
				margin-right: 10px;
				margin-top: 1px;
				.ant-select-selection--single {
					height: 26px;
				}
				.ant-select-selection__rendered {
					line-height: 24px;
				}
			}
			.total {
				display: block;
				line-height: 24px;
				font-size: 14px;
				margin-right: 10px;
			}
			.step {
				font-size: 14px;
				color: #666;
				cursor: pointer;
				margin-top: 5px;
			}
			.ant-select-selection-selected-value {
				font-size: 12px;
			}
			.ant-pagination-total-text {
				//float: right;
				padding-right: 20px;
			}
			/*text-align: center;*/
		}
	}
</style>
