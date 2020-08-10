<template>
  <treeTable
    :treeJson="tree"
    :searchTableJson="searchTable"
  ></treeTable>
</template>
<script>
  import treeTable from '@/view/components/treeTable/treeTable'
  import {getFlag} from "@/api/const";
  import {isEmptyObject} from "@/libs/tool";
  import {mapActions, mapState} from 'vuex';

  export default {
    components: {
      treeTable
    },
    data() {
      return {
        tree: {
          url: 'r_author_role_tree_get',
          data: ""
        },
        searchTable: {
          table: {
            url: "s_role_page_get",
            type: "main",
            data: {
              name: "",
              pid: "",
              flag: "",
              page_page: "0",
              page_size: "10"
            },
            urls: {
              add: "s_role_post",
              del: "s_role_i_delete",
              update: "s_role_i_put"
            },
            buttons: {
              url: {
                add: "s_role_post",
                del: "s_role_i_delete",
                update: "s_role_i_put"
              },
              actions: [{
                name: "新增",
                type: "add",
                modal: true,
                urlParams: {
                  name: "s_role_post",
                  type: "application/json"
                }
              }],
            },
            modal: {
              urls: {
                add: {
                  name: "s_role_post",
                  type: "application/json"
                },
                update: {
                  name: "s_role_i_put",
                  type: "application/json"
                }
              },
              baseData: {
                add: {}
              },
            },
            columns: [{
              title: '名称',
              dataIndex: 'name',
              width: '30%'
            }, {
              title: '状态',
              dataIndex: 'flagname'
            }]
          },
          search: {
            isShowHigh: false,
            nameArray: [{
              name: "名称", type: 'input', span: '4', dataIndex: 'name'
            }, {
              name: "状态", type: 'select', data: [], span: '6', dataIndex: 'flag'
            }]
          },
        },
      }
    },
    methods: {
      ...mapActions([
        'handleChangeTableStatus'
      ]),
      getFlag() {
        getFlag().then(res => {
          this.searchTable.search.nameArray[1].data = res;
        });
      },
      changeStatus(val) {
        this.searchTable.table.data = {...this.searchTable.table.data, ...val};
        this.handleChangeTableStatus(this.$route.name);
      }
    },
    computed: {
      ...mapState({
        getTree: state => state.data.tree,
        getPegination: state => state.data.pegination,
        getSearch: state => state.data.search
      }),
      // getTree() {
      //   return this.$store.state.data.tree;
      // },
      // getPegination() {
      //   return this.$store.state.data.pegination
      // },
      // getSearch() {
      //   return this.$store.state.data.search
      // }
    },
    watch: {
      getTree(val) {
        this.searchTable.table.modal.baseData.add = {pid: val.id};
        this.changeStatus({pid: val.id});
      },
      getPegination(val) {
        if (!val.reset) this.changeStatus(val);
        else this.searchTable.table.data = {...this.searchTable.table.data, ...val};
      },
      getSearch(val) {
        if (!val.reset) this.changeStatus(val);
        else this.searchTable.table.data = {...this.searchTable.table.data, ...val};
      }
    },
    created() {
      this.getFlag()
    }
  }
</script>
