<template>
  <a-directory-tree :loadData="onLoadData"
                    :treeData="data"
                    :checkedKeys="checkedKeys"
                    :expandedKeys="expandedKeys"
                    :selectedKeys="selectedKeys"
                    :loadedKeys="loadedKeys"
                    :expandAction="treeJson.expandAction || false"
                    ref="treeSelf"
                    @load="onLoad"
                    @select="onSelect"
                    @expand="onExpand"
                    id="treeSelf">
  </a-directory-tree>
</template>
<script type="text/jsx">

import { isArray } from '@/libs/tool'
import { getTree } from '@/api/treeData'
import { getData } from '../../api/common'
import { sortTreeData, sortListTreeData, choseTableTr } from '@/libs/util'
import { mapActions, mapState } from 'vuex'
import { updateTreeNode } from '@/libs/util'
import { updateTreeNodeArray } from '@/api/hotelBaseData'
let updateChosed = {}

export default {
  props: {
    treeJson: {}
  },
  data () {
    return {
      data: [],
      checkedKeys: [],
      expandedKeys: [],
      loadedKeys: [],
      selectedKeys: [],
      choseData: {},
      testData: {},
      record: {},

      plusData: {
        system: {
          key: 'tree-top',
          title: '省市',
          name: '省市',
          isTreeTop: true
        }
      }
    }
  },
  watch: {
    choseData (val) {
      let backData = this.treeJson.beforeHandleTree && this.treeJson.beforeHandleTree(val) || {
        status: true,
        message: ''
      }
      if (!backData.status) {
        this.$message.info(backData.message)
        return false
      }
      const data = this.treeJson.sortTreeData ? this.treeJson.sortTreeData(this.choseData) : this.choseData
      !this.treeJson.noHandle && this.handleTree(data)
    },
    getChangeTreeStatus (val) {
      if (val) {
        this.getData('show')
      }
    },
    getUpdateTreeNode (val) {
      updateTreeNodeArray.indexOf(this.$route.name) > -1 && updateTreeNode(val, updateChosed)
    },
    getModalData (val) {
      if (updateTreeNodeArray.indexOf(this.$route.name) > -1 && val.type != 'sub' && val.action == 'update') {
        if (this.record && this.record.dataRef && this.record.dataRef.children) {
          delete this.record.dataRef.children
        }
        this.data = [...this.data]
        this.onLoadData(this.record)
      }
    }
  },
  computed: {
    ...mapState({
      getChangeTreeStatus: state => state.change.changeTreeStatus,
      getUpdateTreeNode: state => state.app.updateTreeNode,
      getModalData: state => state.data.modalData
    })
  },
  methods: {
    ...mapActions([
      'handleTree',
      'handleChangeTreeStatus'
    ]),
    onLoad (loadedKeys, { event, node }) { // 节点加载完毕之后触发
      this.loadedKeys = loadedKeys
    },
    onExpand (key, e) { // 收起节点的时候触发
      this.expandedKeys = key
    },
    defaultSelect () {
      this.$refs.treeSelf && this.$refs.treeSelf.$el && this.$refs.treeSelf.$el.getElementsByClassName && this.$refs.treeSelf.$el.getElementsByClassName('ant-tree-node-content-wrapper').length && this.$refs.treeSelf.$el.getElementsByClassName('ant-tree-node-content-wrapper')[0] && this.$refs.treeSelf.$el.getElementsByClassName('ant-tree-node-content-wrapper')[0].click && this.$refs.treeSelf.$el.getElementsByClassName('ant-tree-node-content-wrapper')[0].click()
    },
    onSelect (key, e) { // 选中子树枝
      if (!e.selected) return false
      this.selectedKeys = key
      let record = e.selectedNodes[0] && e.selectedNodes[0].data ? e.selectedNodes[0].data.props : { key: key }
      this.record = record
      record = record.dataRef || record
      this.choseData = record
      updateChosed = record
      this.treeJson.choseTree && this.treeJson.choseTree(this.choseData)
      this.$emit('chose-tree', this.choseData)
    },
    onLoadData (treeNode) { // 异步加载数据
      return new Promise((resolve) => {
        if (treeNode.dataRef.children || !this.treeJson.loadData) {
          resolve()
          return
        }
        if (this.treeJson.loadData) {
          let data = treeNode.dataRef,
            loadData = this.treeJson.loadData,
            params = { name: loadData.url, data: loadData.data }
          if (loadData.type == 'provice') {
            if (!data.protype) {
              if (!data.isTreeTop) {
                resolve()
                return
              }
              params = {
                name: this.treeJson.load.url,
                data: { protype: 1, procode: '990001' }
              }
            }
            if (data.protype == 2) {
              if (loadData.down == 'hotel' && loadData.url) {
                params = {
                  name: loadData.url,
                  data: { cityCode: data.code, proviceCode: data.procode }
                }
              } else if (loadData.down == 'area') {
                params = {
                  name: this.treeJson.url,
                  data: { protype: 3, procode: data.code }
                }
              } else {
                resolve()
                return false
              }
            } else if (data.protype) {
              params = {
                name: this.treeJson.load.url,
                data: { protype: data.protype + 1, procode: data.code }
              }
            }
          }
          if(this.treeJson.data.companyCode){
            params.data.companyCode=this.treeJson.data.companyCode
          }
          params.data.flag = 1
          getData(params).then(res => {
            if (res.data && isArray(res.data)) {
              let data = isArray(res.data) ? res.data : [res.data],
                sortData = this.treeJson.sortReturnTreeData ? this.treeJson.sortReturnTreeData(data) : data
              treeNode.dataRef.children = sortData
              this.data = [...this.data]
            }
            resolve()
          })
        }
      })
    },
    defaultLoadData () {
      this.$refs.treeSelf && this.$refs.treeSelf.$el && this.$refs.treeSelf.$el.getElementsByClassName && this.$refs.treeSelf.$el.getElementsByClassName('ant-tree-switcher').length && this.$refs.treeSelf.$el.getElementsByClassName('ant-tree-switcher')[0] && this.$refs.treeSelf.$el.getElementsByClassName('ant-tree-switcher')[0].click && this.$refs.treeSelf.$el.getElementsByClassName('ant-tree-switcher')[0].click()
    },
    getData (type) {
      if (type) {
        this.loadedKeys = []
        this.data = [{ ...this.plusData[this.treeJson.addType] }]
        this.expandedKeys = []
      }
      // 获取树状图的数据
      getTree(this.treeJson.url, this.treeJson.data).then(res => {
        let data = isArray(res.data) ? res.data : [res.data],
          sortData = this.treeJson.sortReturnTreeData ? this.treeJson.sortReturnTreeData(data) : data
        this.data = this.treeJson.addType ? [{
          ...this.plusData[this.treeJson.addType],
          children: sortData
        }] : sortData
        this.selectedKeys = []
        if (type && this.data && this.data.length) this.expandedKeys = [this.data[0].key]
        this.handleChangeTreeStatus('')
      }, err => {
        this.handleChangeTreeStatus('')
      })
    }
  },
  created () {
    if (this.treeJson.addType && this.treeJson.noTopSelectable) {
      this.plusData[this.treeJson.addType].selectable = false
    }
    this.data = [{ ...this.plusData[this.treeJson.addType] }]
    if (this.treeJson.title == '集团列表') {
      this.plusData.system.title = '集团'
      this.plusData.system.name = '集团'
    }
  },
  mounted () {
    this.treeJson.defaultSelectedStatue && this.defaultSelect()
    this.treeJson.defaultLoadTreeStatus && this.defaultLoadData()
  }
}
</script>

<style lang="less">
#treeSelf {
  background-color: #fff;
  text-align: left;
  font-size: 12px;
  color: #333;
  overflow-y: hidden;
  overflow-x: hidden;

  &:hover {
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
