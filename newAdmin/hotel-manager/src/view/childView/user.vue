<template>
    <treeDbTable
        :treeJson="tree"
        :dbTable="dbTable"
    ></treeDbTable>
</template>
<script>
    import treeDbTable from '@/view/components/treeDbTable/treeDbTable'
    import {getFlag} from "@/api/const";
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
                            url: "s_user_page_get",
                            type: "main",
                            data: {
                                name: "",
                                deptcode: "",
                                flag: "",
                                page_page: "0",
                                page_size: "10"
                            },
                            urls: {
                                add: "s_user_post",
                                del: "s_user_i_delete",
                                update: "s_user_i_put",
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
                                title: '编号',
                                dataIndex: 'code',
                                width: '20%'
                            }, {
                                title: '名称',
                                dataIndex: 'name',
                                width: '20%'
                            }, {
                                title: '部门名称',
                                dataIndex: 'deptname',
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
                            url: "s_user_i_role_page_get",
                            title: "userRole",
                            type: "sub",
                            data: {
                                id: "",
                                page_page: "0",
                                page_size: "10"
                            },
                            choseTrCb: this.choseTrCb,
                            urls: {},
                            baseUrls: {
                                add: "s_user_//_role_post",
                                del: "s_user_//_role_delete",
                                update: "s_user_//_role_put",
                                noJson: {del: true, add: true}
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
                                title: "userRole",
                                plusChange: {
                                    key: ["rolename"],
                                    changeKey: "roleid"
                                },
                                treeSelect: {
                                    type: "sub",
                                    url: "r_author_role_tree_get",
                                    data: "",
                                },
                                baseData: {
                                    add: {}
                                },
                            },
                            columns: [{
                                title: '名称',
                                dataIndex: 'rolename'
                            }]
                        },
                    }
                }
            }
        },
        methods: {
            choseTrCb(json) {
                const data = JSON.parse(json);
                data.rolename = data.roleid.toString();
                return data;
            },
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
            this.tree.data.moduleid = this.$route.query.moduleid;
        },
        computed: {
            ...mapState({
                getChoseTr: state => state.data.choseTr,
                getTree: state => state.data.tree,
                getPegination: state => state.data.pegination,
                getSearch: state => state.data.search,
                getSubPegination: state => state.data.subPegination,
                getSubSearch: state => state.data.subSearch,
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
                this.dbTable.searchTable.table.data = {...this.dbTable.searchTable.table.data, ...{deptcode: val.code}};
                this.dbTable.searchTable.table.modal.baseData.add = {deptcode: val.code, deptname: val.name};
                this.changeStatus({deptcode: val.code});
            },
            getChoseTr(val) {
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
    }
</script>
