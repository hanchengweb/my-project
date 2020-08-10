<template>
    <treeTable
        :treeJson="tree"
        :searchTableJson="searchTable"
    ></treeTable>
</template>
<script>
    import treeTable from '@/view/components/treeTable/treeTable'
    import {getFlag, getScope, getAccess, getModuleListId} from "@/api/const";
    import {isEmptyObject, isJson, isArray} from "@/libs/tool";
    import {mapActions, mapState} from 'vuex';
    import {getUrlData} from "@/api/common";


    export default {
        components: {
            treeTable
        },
        data() {
            return {
                tree: {
                    url: 'r_author_menu_tree_get',
                    data: "",
                    addType: "system"
                },
                searchTable: {
                    table: {
                        url: "s_menu_page_get",
                        type: "main",
                        choseTrCb: this.choseTrCb,
                        data: {
                            name: "",
                            sysid: "",
                            pid: "",
                            flag: "",
                            page_page: "0",
                            page_size: "10"
                        },
                        urls: {
                            add: "s_menu_post",
                            del: "s_menu_i_delete",
                            update: "s_menu_i_put"
                        },
                        buttons: {
                            plusData: {
                                modulename: []
                            },
                            url: {
                                add: "s_menu_post",
                                del: "s_menu_i_delete",
                                update: "s_menu_i_put"
                            },
                            actions: [{
                                name: "新增",
                                type: "add",
                                modal: true,
                                urlParams: {
                                    name: "s_menu_post",
                                    type: "application/json"
                                }
                            }],
                        },
                        modal: {
                            sortReturnModalData: this.sortReturnModalData,
                            data: {
                                modulename: [],
                            },
                            urls: {
                                add: {
                                    name: "s_menu_post",
                                    type: "application/json"
                                },
                                update: {
                                    name: "s_menu_i_put",
                                    type: "application/json"

                                }
                            },
                            baseData: {
                                add: {}
                            },
                            plusChange: {
                                key: ["modulename"],
                                changeKey: "moduleid"
                            },
                            treeSelect: {
                                dataStatus: true,
                                url: "s_module_list_get",
                                data: "",
                                type: "sub",
                                treeDefaultHiddenAll: true,
                                sortReturnData: this.sortReturnSelectTreeData
                            },

                        },
                        columns: [{
                            title: '名称',
                            dataIndex: 'name',
                            width: '20%'
                        }, {
                            title: '路由名',
                            dataIndex: 'route',
                            width: '20%'
                        }, {
                            title: '路由地址',
                            dataIndex: 'uri',
                            width: '20%'
                        }, {
                            title: '模块',
                            dataIndex: 'modulename',
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


            }
        },
        methods: {
            ...mapActions([
                'handleChangeTableStatus',
                'handleModalData'
            ]),
            sortReturnModalData(data) {
                if (this.$store.state.data.choseTr.moduleid == data.moduleid) data.modulename = this.$store.state.data.choseTr.modulename;
                if (!data.moduleid && data.modulename == "取消关联") data.modulename = "";
                return data;
            },
            loopSelf(array, name) {
                let newArr = [];
                isArray(array) && array.length && array.forEach((item) => {
                    newArr.push({
                        label: name + "-" + item.name,
                        value: item.id.toString(),
                        key: item.id.toString()
                    })
                });
                return newArr;
            },
            sortReturnSelectTreeData(data) {
                let json = {}, arr = [];
                data && data.length && data.forEach((item, index) => {
                    data[index].label = data[index].sort ? (data[index].sort + "-" + data[index].name) : data[index].name;
                    data[index].title = data[index].sort ? (data[index].sort + "-" + data[index].name) : data[index].name;
                    data[index].value = data[index].id;
                    data[index].key = data[index].id;
                    const sort = data[index].sort;
                    if (sort) {
                        if (!json[sort]) json[sort] = [data[index]];
                        else json[sort].push(data[index]);
                    } else {
                        if (data[index].name && !json[data[index].name]) json[data[index].name] = data[index]
                    }
                });
                for (let i in json) {
                    if (isJson(json[i])) {
                        arr.push({
                            label: json[i].name,
                            value: json[i].id.toString(),
                            key: json[i].id.toString()
                        });
                    } else if (isArray(json[i])) {
                        arr.push({
                            label: i,
                            value: i,
                            key: i,
                            disabled: true,
                            children: this.loopSelf(json[i], i)
                        });
                    }
                }
                arr.unshift({
                    label: "取消关联",
                    value: "",
                    key: "none",
                });
                return arr;
            },
            choseTrCb(json) {
                const data = JSON.parse(json);
                if (data.moduleid) data.modulename = data.moduleid.toString();
                return data;
            },
            getFlag() {
                getFlag().then(res => {
                    this.searchTable.search.nameArray[1].data = res;
                });
            },
            changeModalData(key, value, changeKey) {
                const arr = this.searchTable.table.modal.data.modulename;
                let id = "";
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].title == value) {
                        id = arr[i].value;
                    }
                }
                return {name: changeKey, value: id};
            },
            changeStatus(val) {
                this.searchTable.table.data = {...this.searchTable.table.data, ...val};
                this.handleChangeTableStatus(this.$route.name);
            },
            getModuleList(data) {
                getModuleListId(data).then(res => {
                    this.searchTable.table.modal.treeSelect.data = res;
                })
            }
        },
        computed: {
            ...mapState({
                getTree: state => state.data.tree,
                getPegination: state => state.data.pegination,
                getSearch: state => state.data.search,
                getChoseTr: state => state.data.choseTr,
            }),
        },
        watch: {
            getTree(val) {
                if (!isEmptyObject(val)) {
                    const data = val.typename == "Menu" ? {pid: val.id, sysid: val.sysid} : {sysid: val.id, pid: "0"};
                    this.searchTable.table.modal.treeSelect.data = {flag: 1, ...data};
                    this.searchTable.table.modal.baseData.add = data;
                    this.changeStatus(data);
                }

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
        }
    }
</script>
