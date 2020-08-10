<template>
  <dbTable
    :dbTable="dbTable"
  ></dbTable>
</template>
<script>

  import dbTable from '@/view/components/dbTable/dbTable';
  import {getFlag} from "@/api/const";
  import {isEmptyObject} from "@/libs/tool";
  import {mapActions, mapState} from 'vuex';
  import {changeUrl, getChangeUrl} from "@/libs/util";

  export default {
    components: {
      dbTable
    },
    data() {
      return {
        dbTable: {
          searchTable: {
            table: {
              url: "s_dict_page_get",
              type: "main",
              data: {
                name: "",
                code: "",
                flag: "",
                page_page: "0",
                page_size: "10"
              },
              urls: {
                add: "s_dict_post",
                del: "s_dict_i_delete",
                update: "s_dict_i_put",
              },
              buttons: {
                url: {
                  add: "s_dict_post",
                  del: "s_dict_i_delete",
                  update: "s_dict_i_put"
                },
                actions: [{
                  name: "新增",
                  type: "add",
                  modal: true,
                  urlParams: {
                    name: "s_dict_post",
                    type: "application/json"
                  }
                }],
                actionsAfter: [{
                  name: "缓存同步",
                  selfBtn: true,
                  urlParams: {
                    name: "s_dict_i_cache_post",
                    type: "application/json",
                    data: {id: ""}
                  },
                }],
              },
              modal: {
                urls: {
                  add: {
                    name: "s_dict_post",
                    type: "application/json"
                  },
                  update: {
                    name: "s_dict_i_put",
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
                width: '40%'
              }, {
                title: '编号',
                dataIndex: 'code',
                width: '30%'
              }, {
                title: '状态',
                dataIndex: 'flagname'
              }]
            },
            search: {
              isShowHigh: false,
              nameArray: [{
                name: "编号", type: 'input', span: '4', dataIndex: 'code'
              }, {
                name: "状态", type: 'select', data: [], span: '6', dataIndex: 'flag'
              }]
            }
          },
          tabsTable: {
            table: {
              url: "s_dict_i_value_page_get",
              title: "dictVal",
              type: "sub",
              data: {
                id: "",
                page_page: "0",
                page_size: "10"
              },
              urls: {},
              baseUrls: {
                add: "s_dict_//_value_post",
                del: "s_dict_//_value_delete",
                update: "s_dict_//_value_put",
                noJson: {del: true}
              },
              buttons: {
                actions: [{
                  name: "新增",
                  type: "add",
                  modal: true,
                  urlParams: {
                    name: "s_dict_{}_value_post",
                    type: "application/json"
                  }
                }],
              },
              modal: {
                title: "dictVal",
                urls: {
                  add: {
                    name: "s_dict_{}_value_post",
                  },
                  update: {
                    name: "s_dict_{}_value_put"
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
          }
        }
      }
    },
    methods: {
      ...mapActions([
        'handleChangeTableStatus',
        'handleChangeSubTableStatus',
      ]),
      getFlag() {
        getFlag().then(res => {
          this.dbTable.searchTable.search.nameArray[1].data = res;
        });
      },
      changeStatus(type) {
        type == "sub" ? this.handleChangeSubTableStatus("sub") : this.handleChangeTableStatus(this.$route.name);
      },
    },
    created() {
      this.getFlag();
    },
    computed: {
      ...mapState({
        getChoseTr: state => state.data.choseTr,
        getTree: state => state.data.tree,
        getPegination: state => state.data.pegination,
        getSearch: state => state.data.search,
        getSubSearch: state => state.data.subSearch,
        getSubPegination: state => state.data.getSubPegination,
      }),
      // getChoseTr() {
      //   return this.$store.state.data.choseTr;
      // },
      // getPegination() {
      //   return this.$store.state.data.pegination;
      // },
      // getSearch() {
      //   return this.$store.state.data.search;
      // },
      // getSubSearch() {
      //   return this.$store.state.data.subSearch;
      // },
      // getSubPegination() {
      //   return this.$store.state.data.subPegination;
      // }
    },
    watch: {
      getChoseTr(val) {
        this.dbTable.searchTable.table.buttons.actionsAfter[0].urlParams.data = {id: val.id};
        this.dbTable.tabsTable.table.data = {...this.dbTable.tabsTable.table.data, ...{id: val.id}};
        this.dbTable.tabsTable.table.modal.baseData.add = {pid: val.id};
        if (!isEmptyObject(val)) {
          this.dbTable.tabsTable.table.baseUrls = changeUrl(this.dbTable.tabsTable.table.baseUrls, val.id);
          this.dbTable.tabsTable.table.urls = getChangeUrl(this.dbTable.tabsTable.table.baseUrls);
          this.changeStatus("sub");
        }
      },
      getPegination(val) {
        this.dbTable.searchTable.table.data = {...this.dbTable.searchTable.table.data, ...val};
        if (!val.reset) this.changeStatus();
      },
      getSearch(val) {
        this.dbTable.searchTable.table.data = {...this.dbTable.searchTable.table.data, ...val};
        if (!val.reset) this.changeStatus();
      },
      getSubPegination(val) {
        this.dbTable.tabsTable.table.data = {...this.dbTable.tabsTable.table.data, ...val};
        if (!val.reset) this.changeStatus("sub");
      },
      getSubSearch(val) {
        this.dbTable.tabsTable.table.data = {...this.dbTable.tabsTable.table.data, ...val};
        if (!val.reset) this.changeStatus("sub");
      },
    },
    mounted() {
      this.handleChangeTableStatus(this.$route.name);
    }
  }
</script>
