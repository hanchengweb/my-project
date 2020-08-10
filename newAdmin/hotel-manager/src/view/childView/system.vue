<template>
    <searchTable :searchTableJson="searchTable"></searchTable>
</template>
<script>
    import searchTable from '@/components/searchTable/searchTable';
    import {mapActions, mapState} from 'vuex';
    import {getFlag, getTradeList} from "@/api/const";

    export default {
        name: "system",
        components: {
            searchTable
        },
        data() {
            return {
                searchTable: {
                    table: {
                        url: "s_system_page_get",
                        type: "main",
                        data: {
                            name: "",
                            flag: "",
                            page_page: "0",
                            page_size: "10"
                        },
                        urls: {
                            add: "s_system_post",
                            del: "s_system_i_delete",
                            update: "s_system_i_put"
                        },
                        buttons: {
                            url: {
                                add: "s_system_post",
                                del: "s_system_i_delete",
                                update: "s_system_i_put"
                            },
                            actions: [{
                                name: "新增",
                                type: "add",
                                modal: true,
                                urlParams: {
                                    name: "s_system_post",
                                    type: "application/json"
                                }
                            }],
                        },
                        modal: {
                            plusChange: {
                                key: ["tradename"],
                                changeKey: "tradecode"
                            },
                            data: {
                                tradename: [],
                            },
                            urls: {
                                add: {
                                    name: "s_system_post",
                                    type: "application/json"
                                },
                                update: {
                                    name: "s_system_i_put",
                                    type: "application/json"
                                }
                            },
                        },
                        columns: [{
                            title: '编号',
                            dataIndex: 'code',
                            width: '15%'
                        }, {
                            title: '名称',
                            dataIndex: 'name',
                            width: '15%'
                        }, {
                            title: '行业编号',
                            dataIndex: 'tradecode',
                            width: '15%'
                        }, {
                            title: '行业名称',
                            dataIndex: 'tradename',
                            width: '15%'
                        }, {
                            title: '说明',
                            dataIndex: 'remark',
                            width: '20%'
                        }, {
                            title: '状态',
                            dataIndex: 'flagname'
                        }]
                    },
                    search: {
                        isShowHigh: false,
                        nameArray: [{
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
                    this.searchTable.search.nameArray[0].data = res;
                });
            },
            getTradeList() {
                getTradeList().then(res => {
                    this.searchTable.table.modal.data.tradename = res;
                })
            },
            changeStatus(val) {
                this.searchTable.table.data = {...this.searchTable.table.data, ...val};
                this.handleChangeTableStatus(this.$route.name);
            }
        },
        computed: {
            ...mapState({
                getPegination: state => state.data.pegination,
                getSearch: state => state.data.search
            }),
            // getPegination() {
            //   return this.$store.state.data.pegination
            // },
            // getSearch() {
            //   return this.$store.state.data.search
            // }
        },
        watch: {
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
            this.getTradeList();
        },
        mounted() {
            this.handleChangeTableStatus(this.$route.name);
        }
    }
</script>
