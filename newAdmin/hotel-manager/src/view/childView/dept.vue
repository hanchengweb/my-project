<template>
    <treeDbTable
        :treeJson="tree"
        :dbTable="dbTable"
    ></treeDbTable>
</template>
<script>
    import treeDbTable from '@/view/components/treeDbTable/treeDbTable'
    import {getFlag, getDeptTypeList} from "@/api/const";
    import {isEmptyObject} from "@/libs/tool";
    import {mapActions, mapState} from 'vuex';
    import {changeUrl, getChangeUrl} from "@/libs/util";

    export default {
        components: {
            treeDbTable
        },
        data() {
            return {
                tree: {
                    url: 'r_author_dept_tree_get',
                    data: {moduleid: ""},
                },
                dbTable: {
                    searchTable: {
                        table: {
                            url: "s_dept_page_get",
                            type: "main",
                            data: {
                                pid: "",
                                name: "",
                                flag: "",
                                page_page: "0",
                                page_size: "10"
                            },
                            urls: {
                                add: "s_dept_post",
                                del: "s_dept_i_delete",
                                update: "s_dept_i_put",
                            },
                            buttons: {
                                actions: [{
                                    name: "新增",
                                    type: "add",
                                    modal: true
                                }],
                                actionsAfter: [{
                                    name: "缓存同步",
                                    selfBtn: true,
                                    urlParams: {
                                        name: "s_dept_i_cache_post",
                                        type: "application/json",
                                        data: {id: ""}
                                    },
                                }],
                            },
                            modal: {
                                baseData: {
                                    add: {}
                                },
                            },
                            columns: [{
                                title: '编号',
                                dataIndex: 'code',
                                width: '20%'
                            }, {
                                title: '名称',
                                dataIndex: 'name',
                                width: '20%'
                            }, {
                                title: '权限码',
                                dataIndex: 'aucode',
                                width: '20%'
                            }, {
                                title: '行业名称',
                                dataIndex: 'tradename',
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
                    tabsTable: {
                        table: {
                            url: "s_dept_i_type_page_get",
                            title: "deptType",
                            type: "sub",
                            data: {
                                id: "",
                                page_page: "0",
                                page_size: "10"
                            },
                            choseTrCb: this.choseTrCb,
                            urls: {},
                            baseUrls: {
                                add: "s_dept_//_type_post",
                                del: "s_dept_//_type_delete",
                                update: "s_dept_//_type_put",
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
                                title: "deptType",
                                baseData: {
                                    add: {}
                                },
                                data: {
                                    name: [],
                                },
                                plusChange: {
                                    key: ["name"],
                                    changeKey: "value"
                                },
                            },
                            columns: [{
                                title: '类型名称',
                                dataIndex: 'name'
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
            getDeptTypeList(code) {
                getDeptTypeList(code).then(res => {
                    this.dbTable.tabsTable.table.modal.data.name = res;
                });
            },
            changeStatus(type) {
                type == "sub" ? this.handleChangeSubTableStatus("sub") : this.handleChangeTableStatus(this.$route.name);
            },
            choseTrCb(record) {
                const data = JSON.parse(record);
                return {...data, oldvalue: data.value}
            }
        },
        created() {
            this.tree.data.moduleid = this.$route.query.moduleid;
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
            // }
        },
        watch: {
            getTree(val) {
                this.dbTable.searchTable.table.data = {...this.dbTable.searchTable.table.data, ...{pid: val.id}};
                this.dbTable.searchTable.table.modal.baseData.add = {
                    pid: val.id,
                    tradecode: val.tradecode,
                    tradename: val.tradename
                };
                this.changeStatus({pid: val.id});
            },
            getChoseTr(val) {
                this.dbTable.searchTable.table.buttons.actionsAfter[0].urlParams.data = {id: val.id};
                this.dbTable.tabsTable.table.data = {...this.dbTable.tabsTable.table.data, ...{id: val.id}};
                this.dbTable.tabsTable.table.modal.baseData.add = {deptid: val.id};
                !isEmptyObject(val) && this.getDeptTypeList(val.tradecode);
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
