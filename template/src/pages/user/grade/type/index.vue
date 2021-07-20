<template>
    <div>
        <div class="i-layout-page-header">
            <div class="i-layout-page-header">
                <span class="ivu-page-header-title">{{ $route.meta.title }}</span>
            </div>
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Table
                class="mt25"
                :columns="thead"
                :data="tbody"
                :loading="loading"
                highlight-row
                no-userFrom-text="暂无数据"
                no-filtered-userFrom-text="暂无筛选结果"
            >
                <template slot-scope="{ row, index }" slot="is_del">
                    <i-switch
                            v-model="row.is_del"
                            :value="row.is_del"
                            :true-value="0"
                            :false-value="1"
                            @on-change="onchangeIsShow(row)"
                            size="large"
                    >
                        <span slot="open">启用</span>
                        <span slot="close">禁用</span>
                    </i-switch>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <a href="javascript:" @click="editType(row)">编辑</a>
                </template>
            </Table>
        </Card>
        <Modal v-model="modal" :title="`编辑${rowEdit && rowEdit.title}会员`" footer-hide @on-cancel="cancel">
            <form-create v-model="fapi" :rule="rule" @on-submit="onSubmit"></form-create>
        </Modal>
    </div>
</template>

<script>
import { userMemberShip, memberShipSave, memberCard } from "@/api/user";

export default {
    name: "list",
    data() {
        return {
            thead: [
                {
                    title: "ID",
                    key: "id"
                },
                {
                    title: "会员名",
                    key: "title"
                },
                {
                    title: "有限期（天）",
                    key: "vip_day",
                    render: (h, params) => {
                        return h("span", params.row.vip_day === -1 ? "永久" : params.row.vip_day);
                    }
                },
                {
                    title: "原价",
                    key: "price"
                },
                {
                    title: "优惠价",
                    key: "pre_price"
                },
                {
                    title: "排序",
                    key: "sort"
                },
                {
                    title: "是否开启",
                    slot: "is_del"
                },
                {
                    title: "操作",
                    slot: "action"
                }
            ],
            tbody: [],
            loading: false,
            modal: false,
            rowEdit: null,
            rule: [
                {
                    type: "hidden",
                    field: "id",
                    value: ""
                },
                {
                    type: "hidden",
                    field: "title",
                    value: ""
                },
                {
                    type: "hidden",
                    field: "type",
                    value: ""
                },
                {
                    type: "InputNumber",
                    field: "vip_day",
                    title: "有限期（天）",
                    value: 1,
                    props: {
                        min: 0,
                        max: 1000000,
                        disabled: false
                    },
                    validate:[
                        {type:'number',max:1000000,min:0,message:'最大只能输入1000000,最小为0',requred:true}
                    ]
                },
                {
                    type: "InputNumber",
                    field: "price",
                    title: "原价",
                    value: 1,
                    props: {
                        min: 0,
                        precision: 2,
                        disabled: false
                    },
                    validate:[
                        {type:'number',max:1000000,min:0,message:'最大只能输入1000000,最小为0',requred:true}
                    ]
                },
                {
                    type: "InputNumber",
                    field: "pre_price",
                    title: "优惠价",
                    value: 1,
                    props: {
                        min: 0,
                        precision: 2,
                        disabled: false
                    },
                    validate:[
                        {type:'number',max:1000000,min:0,message:'最大只能输入1000000,最小为0',requred:true}
                    ]
                },
                {
                    type: "InputNumber",
                    field: "sort",
                    title: "排序",
                    value: 1,
                    props: {
                        min: 1,
                        max: 1000000,
                        disabled: false
                    },
                    validate:[
                        {type:'number',max:1000000,min:0,message:'最大只能输入1000000,最小为0',requred:true}
                    ]
                }
            ],
            fapi:{}
        };
    },
    created() {
        this.getMemberShip();
    },
    mounted() {},
    methods: {
        onchangeIsShow (row){
            let data = {
                id:row.id,
                is_del:row.is_del
            };
            memberCard(data).then(res=>{
                this.$Message.success(res.msg);
                this.getMemberShip();
            }).catch(err=>{
                this.$Message.error(err.msg);
            })
        },
        cancel (){
            this.fapi.resetFields();
        },
        getMemberShip() {
            this.loading = true;
            userMemberShip()
                .then(res => {
                    this.loading = false;
                    const { count, list } = res.data;
                    this.total = count;
                    this.tbody = list;
                })
                .catch(err => {
                    this.loading = false;
                    this.$Message.error(err.msg);
                });
        },
        editType(row) {
            this.modal = true;
            this.rowEdit = row;
            this.rule.forEach(item => {
                for (const key in row) {
                    if (row.hasOwnProperty(key)) {
                        if (item.field === key) {
                            if (key === "vip_day") {
                                if (row[key] === -1) {
                                    item.props.disabled = true;
                                    item.props.min = row[key];
                                    item.validate = [];
                                } else {
                                    item.props.disabled = false;
                                    item.props.min = 1;
                                    item.validate = [
                                        {type:'number',max:1000000,min:0,message:'最大只能输入1000000,最小为0',requred:true}
                                    ];
                                }
                            }
                            if(["price"].includes(key)){
                                row[key] = parseFloat(row[key]);
                            }
                            if (["pre_price"].includes(key)) {
                                row[key] = parseFloat(row[key]);
                                if (row[key]) {
                                    item.props.disabled = false;
                                } else {
                                    item.props.disabled = true;
                                }
                            }
                            item.value = row[key];
                        }
                    }
                }
            });
        },
        onSubmit(formData) {
            memberShipSave(this.rowEdit.id, formData)
                .then(res => {
                    this.modal = false;
                    this.$Message.success(res.msg);
                    this.getMemberShip();
                })
                .catch(err => {
                    this.$Message.error(err.msg);
                });
        }
    }
};
</script>
<style scoped>
   /deep/ .ivu-modal{
        top:20%!important;
    }
</style>
