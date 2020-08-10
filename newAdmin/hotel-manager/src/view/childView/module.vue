<template>
  <treeTable
    :treeJson="tree"
    :searchTableJson="dbTable.searchTable"
  ></treeTable>
</template>
<script>
  import treeTable from '@/view/components/treeTable/treeTable'
  import {getFlag, getMappingList, getModuleList} from "@/api/const";
  import {isEmptyObject} from "@/libs/tool";
  import {mapActions, mapState} from 'vuex';
  import {changeUrl, getChangeUrl} from "@/libs/util";

  export default {
    components: {
      treeTable
    },
    data() {
      return {
        sysid: "",
        tree: {
          url: 'r_author_system_list_get',
          data: "",
          type: "list",
          addType: "system"
        },
        searchTable: {
          table: {
            url: "s_module_page_get",
            type: "main",
            data: {
              sysid: "",
              name: "",
              flag: "",
              page_page: "0",
              page_size: "10"
            },
            urls: {
              add: "s_module_post",
              del: "s_module_i_delete",
              update: "s_module_i_put",
            },
            buttons: {
              actions: [{
                name: "新增",
                type: "add",
                modal: true
              }],
            },
            modal: {
              baseData: {
                add: {}
              },
            },
            columns: [{
              title: '系统ID',
              dataIndex: 'sysid',
              width: '20%'
            }, {
              title: '系统名称',
              dataIndex: 'sysname',
              width: '20%'
            }, {
              title: '名称',
              dataIndex: 'name',
              width: '20%'
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
        dbTable: {
          searchTable: {
            table: {
              url: "s_module_page_get",
              type: "main",
              data: {
                sysid: "",
                name: "",
                flag: "",
                page_page: "0",
                page_size: "10"
              },
              urls: {
                add: "s_module_post",
                del: "s_module_i_delete",
                update: "s_module_i_put",
              },
              buttons: {
                actions: [{
                  name: "新增",
                  type: "add",
                  modal: true
                }],
              },
              modal: {
                baseData: {
                  add: {}
                },
                data: {
                  sort: []
                }
              },
              columns: [{
                title: '系统ID',
                dataIndex: 'sysid',
                width: '20%'
              }, {
                title: '系统名称',
                dataIndex: 'sysname',
                width: '20%'
              }, {
                title: '名称',
                dataIndex: 'name',
                width: '20%'
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
                name: "状态", type: 'select', data: [], span: '4', dataIndex: 'flag'
              }, {
                name: "模块组", type: 'select', data: [], spans: '6', dataIndex: 'sort'
              }]
            }
          },
          tabsTable: {
            table: {
              url: "s_module_i_mapping_page_get",
              title: "moduleMapping",
              type: "sub",
              sortReturnData: this.sortReturnData,
              data: {
                id: "",
                page_page: "0",
                page_size: "10"
              },
              urls: {},
              baseUrls: {
                add: "s_module_//_mapping_post",
                del: "s_module_//_mapping_delete",
                update: "s_module_//_mapping_put",
                noJson: {del: true, add: true, update: true}
              },
              buttons: {
                hideFlag: true,
                actions: [{
                  name: "新增",
                  type: "add",
                  modal: true,
                }, {
                  name: "删除",
                  type: "del",
                }],
              },
              modal: {
                title: "moduleMapping",
                baseData: {
                  add: {}
                },
                plusChange: {
                  key: ["mappingname"],
                  changeKey: "mappingid"
                },
                data: {
                  mappingname: [],
                },
              },
              columns: [{
                title: '资源名称',
                dataIndex: 'mappingname'
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
      sortReturnData(arr) {
        const newArr = [];
        arr.forEach(item => {
          const json = {
            ...item,
            mappingname: item.mapping.name,
            mappingid: item.mapping.id,
            oldid: item.id
          };
          json.mapping = "";
          newArr.push(json);
        })
        return newArr;
      },
      getFlag() {
        getFlag().then(res => {
          this.dbTable.searchTable.search.nameArray[1].data = res;
        });
      },
      getModuleList(id) {
        if (!id) return false;
        const data = {sysid: id};
        getModuleList(data).then(res => {
          this.dbTable.searchTable.search.nameArray[2].data = res;
        });
      },
      getMappingList(id) {
        if (!id) return false;
        const data = {flag: 1, sysid: id};
        getMappingList(data).then(res => {
          //this.dbTable.searchTable.search.nameArray[1].data = res;
          this.dbTable.tabsTable.table.modal.data.mappingname = res;
        });
      },
      changeStatus(type) {
        type == "sub" ? this.handleChangeSubTableStatus("sub") : this.handleChangeTableStatus(this.$route.name);
      },
    },
    created() {
      //this.tree.data.moduleid = this.$route.query.moduleid;
      this.getFlag();
    },
    computed: {
      ...mapState({
        getChoseTr: state => state.data.choseTr,
        getTree: state => state.data.tree,
        getPegination: state => state.data.pegination,
        getSearch: state => state.data.search,
        getSubSearch:state => state.data.subSearch,
        getSubPegination:state => state.data.getSubPegination,
        getChangeTableStatus:state => state.change.changeTableStatus,
      }),
      // getTree() {
      //   return this.$store.state.data.tree;
      // },
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
      // },
      // getChangeTableStatus() {
      //   return this.$store.state.change.changeTableStatus
      // }
    },
    watch: {
      getChangeTableStatus(val) {
        if (!val) this.getModuleList(this.sysid);
      },
      getTree(val) {
        this.dbTable.searchTable.table.data = {...this.dbTable.searchTable.table.data, ...{sysid: val.id}};
        this.dbTable.searchTable.table.modal.baseData.add = {sysid: val.id, sysname: val.name};
        //this.getMappingList(val.id)
        //this.getModuleList(val.id);
        this.sysid = val.id;
        this.changeStatus({sysid: val.id});
      },
      getChoseTr(val) {
        this.dbTable.tabsTable.table.data = {...this.dbTable.tabsTable.table.data, ...{id: val.id}};
        this.dbTable.tabsTable.table.modal.baseData.add = {moduleid: val.id};
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
  }
</script>
