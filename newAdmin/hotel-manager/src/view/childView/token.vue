<template>
  <treeTable
    :treeJson="tree"
    :searchTableJson="searchTable"
  ></treeTable>
</template>
<script>
  import treeTable from '@/view/components/treeTable/treeTable'
  import {getFlag, getSysList} from "@/api/const";
  import {isEmptyObject} from "@/libs/tool";
  import {mapActions, mapState} from 'vuex';
  import moment from 'moment';
  import {getUserList} from "@/api/const";

  export default {
    components: {
      treeTable
    },
    data() {
      return {
        tree: {
          url: 'r_author_system_list_get',
          data: "",
          type: "list",
          addType: "system"
        },

        searchTable: {
          table: {
            url: "s_token_page_get",
            type: "main",
            data: {
              name: "",
              sysid: "",
              flag: "",
              page_page: "0",
              page_size: "10"
            },
            sortReturnData: this.sortReturnData,
            urls: {
              add: "s_token_post",
              del: "s_token_i_delete",
              update: "s_token_i_put"
            },
            buttons: {
              plusData: {
                modulename: []
              },
              actions: [{
                name: "新增",
                type: "add",
                modal: true,
              }],
              actionsAfter: [{
                name: "缓存同步",
                selfBtn: true,
                urlParams: {
                  name: "s_token_i_cache_post",
                  type: "application/json",
                  data: {id: ""}
                },
              }],
            },
            modal: {
              sortReturnModalData: this.sortReturnModalData,
              data: {
                sysname: [],
                username: []
              },
              baseData: {
                add: {}
              },
              plusChange: {
                key: ["sysname", "username"],
                changeKey: ["sysid", "userid"]
              },
            },
            columns: [{
              title: 'TOKEN值',
              dataIndex: 'name',
              width: '30%'
            }, {
              title: '用户名称',
              dataIndex: 'username',
              width: '15%'
            }, {
              title: '失效时间',
              dataIndex: 'time',
              width: '20%'
            }, {
              title: '系统编码',
              dataIndex: 'sysid',
              width: '10%'
            }, {
              title: '系统名称',
              dataIndex: 'sysname',
              width: '10%'
            }, {
              title: '状态',
              dataIndex: 'flagname',
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
      sortReturnData(list) {
        list.forEach((item, index) => {
          list[index].time = moment(list[index].time).format("YYYY-MM-DD HH:mm:ss")
        });
        return list;
      },
      sortReturnModalData(values) {
        values.time = moment(new Date(values.time)).format("YYYY-MM-DD HH:mm:ss");
        return values;
      },
      getFlag() {
        getFlag().then(res => {
          this.searchTable.search.nameArray[1].data = res;
        });
      },
      getSysList() {
        getSysList().then(res => {
          this.searchTable.table.modal.data.sysname = res;
        })
      },
      getUserList() {
        getUserList({flag: 1}).then(res => {
          this.searchTable.table.modal.data.username = res;
        })
      },
      changeStatus(val) {
        this.searchTable.table.data = {...this.searchTable.table.data, ...val};
        this.handleChangeTableStatus(this.$route.name);
      }
    },
    computed: {
      ...mapState({
        getChoseTr: state => state.data.choseTr,
        getTree: state => state.data.tree,
        getPegination: state => state.data.pegination,
        getSearch: state => state.data.search
      }),
      getChoseTr() {
        return this.$store.state.data.choseTr;
      },
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
      getChoseTr(val) {
        this.searchTable.table.buttons.actionsAfter[0].urlParams.data = {id: val.id};
      },
      getTree(val) {
        this.searchTable.table.modal.baseData.add = {
          sysid: val.id,
          sysname: val.name,
          time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        };
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
      this.getFlag();
      // this.getSysList();
      this.getUserList();
    }
  }
</script>
