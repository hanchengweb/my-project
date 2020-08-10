<template>
  <div class="singleTableSelf">
    <!-- 表格操作 -->
    <buttonSearch :table="table"
                  :search="search"
                  :data="choseTr"
                  :name="name"
                  @show-modal="showModal"
                  v-if="!table.hideButtonSearch"></buttonSearch>
    <tabsLine :tabsJson="table.tabs"
              :table="table"
              v-if="table.showTableTabs"
              style="margin:0"></tabsLine>
    <!-- 表格内容 -->
    <tableSelf class="table"
               :table="table"
               @get-pegination="getPegination"
               @get-choseTr="getChoseTr"
               @show-modal="showModal"></tableSelf>
    <!-- 分页 -->
    <pagination class="paginationSelf"
                :data="total"
                :type="table.type"
                v-if="!table.hidePegination"
                :pagination="table.pagination"
                :table="table"></pagination>
    <!-- 弹框 -->
    <modalSelf :modalVisible="modalVisible"
               :urls="table.urls"
               :data="choseTr"
               :type="table.type"
               :modalData="table.modal"
               :title="modalTitle"
               :name="name"
               @hide-modal="hideModal"
               v-if="modalVisible && table.modal"></modalSelf>
  </div>
</template>
<script>
import pagination from '@/components/pagination/pagination'
import buttonLine from '@/components/buttonLine/buttonLine'
import tableSelf from '@/components/table/table'
import tabsLine from '@/components/tabsLine/tabsLine'
import modalSelf from '@/components/modal/modaleTest'
import buttonSearch from '@/components/buttonSearch/buttonSearch'
import { getData } from '../../api/common'
import { mapState } from 'vuex'

export default {
  props: {
    table: {},
    search: {}
  },
  components: {
    pagination,
    buttonLine,
    tableSelf,
    modalSelf,
    buttonSearch,
    tabsLine
  },
  computed: {
    ...mapState({
      getTabs: state => state.data.tabs
    })
  },
  watch: {
    getTabs (val) {
      if (this.table.type == 'sub' && this.table.multiple && val) {
        this.name = val
      }
    }
  },
  methods: {
    getPegination (total) {
      this.total = total
    },
    getChoseTr (choseTr) {
      let _this = this
      if (this.$route.name === 'hotelCardOther' || this.$route.name === 'hotelCard') {
        if (choseTr.id) {
          getData({
            name: 'u_consumerCoupon_find_' + choseTr.id + '_get',
            data: {},
            type: ''
          }).then(res => {
            res.data.codes = res.data.goodsCategoryIconCode
            _this.choseTr = res.data
          })
        }
      } else if (this.$route.name === 'groupCoupTempOther' || this.$route.name === 'groupCoupTemp') {
        if (choseTr.id && this.table.nameLog == 'consumerCouponTemplate') {
          getData({
            name: 'u_consumerCouponTemplate_find_' + choseTr.id + '_get',
            data: {},
            type: ''
          }).then(res => {
            let datas = res.data
            datas.couponTypeName = choseTr.couponTypeName
            datas.couponOwnerTypeName = choseTr.couponOwnerTypeName
            datas.generalizeModelName = choseTr.generalizeModelName
            datas.goodsCategoryName = choseTr.goodsCategoryName
            datas.giveChannelName = choseTr.giveChannelName
            _this.choseTr = datas
          })
        }
      } else {
        _this.choseTr = choseTr
      }
    },
    showModal (data) {
      this.modalVisible = true
      this.modalTitle = data
    },
    hideModal () {
      this.modalVisible = false
      this.modalTitle = ''
    }
  },
  data () {
    return {
      total: {},
      choseTr: {},
      modalVisible: false,
      modalTitle: '',
      name: ''
    }
  },
  created () {
    this.name = this.table.name || this.table.title || this.$route.name
    console.log(this.name)
  }
}
</script>
<style lang="less">
.singleTableSelf {
  position: relative;
  overflow: hidden;
  .table {
    height: calc(100% - 80px);
  }
  .paginationSelf {
    position: absolute;
    bottom: 0;
    text-align: left;
  }
}
</style>
