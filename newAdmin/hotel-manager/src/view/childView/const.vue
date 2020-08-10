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
                        url: "s_config_page_get",
                        type: "main",
                        data: {
                            name: "",
                            sysid: "",
                            flag: "",
                            code: "",
                            page_page: "0",
                            page_size: "10"
                        },
                        urls: {
                            add: "s_config_post",
                            del: "s_config_i_delete",
                            update: "s_config_i_put"
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
                                    name: "s_config_i_cache_post",
                                    type: "application/json",
                                    data: {id: ""}
                                },
                            }],
                        },
                        modal: {
                            data: {
                                sysname: [],
                            },
                            baseData: {
                                add: {}
                            },
                            plusChange: {
                                key: ["sysname"],
                                changeKey: "sysid"
                            },
                        },
                        columns: [{
                            title: '系统名称',
                            dataIndex: 'sysname',
                            width: '20%'
                        }, {
                            title: '编号',
                            dataIndex: 'code',
                            width: '20%'
                        }, {
                            title: '名称',
                            dataIndex: 'name',
                            width: '20%'
                        }, {
                            title: '值',
                            dataIndex: 'value',
                            width: '20%'
                        }, {
                            title: '状态',
                            dataIndex: 'flagname'
                        }]
                    },
                    search: {
                        isShowHigh: false,
                        nameArray: [{
                            name: "系统", type: 'select', span: '4', dataIndex: 'sysname'
                        }, {
                            name: "编号", type: 'input', span: '4', dataIndex: 'code'
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
                    this.searchTable.search.nameArray[2].data = res;
                });
            },
            getSysList() {
                getSysList().then(res => {
                    this.searchTable.search.nameArray[0].data = res;
                    this.searchTable.table.modal.data.sysname = res;
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
            // getChoseTr() {
            //   return this.$store.state.data.choseTr;
            // },
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
                this.searchTable.table.modal.baseData.add = {sysid: val.id, sysname: val.name};
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
            this.getSysList();
        }
    }
</script>
