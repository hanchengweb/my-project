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
  import {mapActions} from 'vuex';

  export default {
    components: {
      treeTable
    },
    data() {
      return {
        tree: {
          url: 'r_author_system_list_get',
          data: "",
          type:"list",
          addType: "system"
        },

        searchTable: {
          table: {
            url: "s_mapping_page_get",
            type: "main",
            data: {
              name: "",
              sysid: "",
              flag: "",
              page_page: "0",
              page_size: "10"
            },
            urls: {
              add: "s_mapping_post",
              del: "s_mapping_i_delete",
              update: "s_mapping_i_put"
            },
            buttons: {
              plusData: {
                modulename: []
              },
              actions: [{
                name: "新增",
                type: "add",
                modal: true,
                urlParams: {
                  name: "s_mapping_post",
                  type: "application/json"
                }
              }],
            },
            modal: {
              data: {
                sysname: [],
              },
              urls: {
                add: {
                  name: "s_mapping_post",
                  type: "application/json"
                },
                update: {
                  name: "s_mapping_i_put",
                  type:"application/json"
                }
              },
              baseData: {
                add: {}
              },
            },
            columns: [{
              title: '系统名称',
              dataIndex: 'sysname',
              width: '30%'
            }, {
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
          }
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
      getTree() {
        return this.$store.state.data.tree;
      },
      getPegination() {
        return this.$store.state.data.pegination
      },
      getSearch() {
        return this.$store.state.data.search
      }
    },
    watch: {
      getTree(val) {
        this.searchTable.table.modal.baseData.add={sysid: val.id,sysname:val.name};
        this.changeStatus({sysid: val.id});
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
