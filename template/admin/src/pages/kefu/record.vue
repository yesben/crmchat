<template>
    <div>
        <div class="i-layout-page-header">
            <div class="i-layout-page-header">
                <span class="ivu-page-header-title">{{ $route.meta.title }}</span>
            </div>
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Form ref="formValidate" :model="formValidate" :label-width="labelWidth" :label-position="labelPosition" class="tabform" @submit.native.prevent>
                <Row :gutter="24">
                    <Col span="10" class="ivu-text-left">
                        <FormItem label="搜索：">
                            <Input v-model="searchValue" placeholder="请输入" clearable search enter-button @on-search="selChange">
                                <Select v-model="searchType" slot="prepend" style="width: 80px">
                                    <Option value="kefu_id">客服</Option>
                                    <Option value="msn">内容</Option>
                                    <Option value="appid">appid</Option>
                                </Select>
                            </Input>
                        </FormItem>
                    </Col>
                        <Col span="24" class="ivu-text-left">
                        <FormItem label="时间：">
                            <RadioGroup v-model="formValidate.time" type="button" @on-change="selectChange(formValidate.time)" class="mr">
                                <Radio :label=item.val v-for="(item,i) in fromList.fromTxt" :key="i">{{item.text}}</Radio>
                            </RadioGroup>
                            <DatePicker :editable="false" @on-change="onchangeTime" :value="timeVal" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="自定义时间" style="width: 200px;"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Table :columns="columns" :data="tableData" :loading="loading" highlight-row no-userFrom-text="暂无数据" class="ivu-mt">
                <template slot-scope="{ row, index }" slot="action">
                    <a @click="onEdit(row)">编辑</a>
                    <Divider type="vertical" />
                    <a @click="onDelete(row, '删除反馈', index)">删除</a>
                </template>
            </Table>
            <div class="acea-row row-right page">
                <Page :total="total" :page-size="limit" show-elevator show-total @on-change="onChange" />
            </div>
        </Card>
    </div>
</template>

<script>
import { chatRecord } from '@/api/setting';
import { mapState } from 'vuex'

export default {
    name: 'kefu_record',
    data() {
        return {
            formValidate: {
                kefu_id: '',
                msn: '',
                time: '',
                appid: ''
            },
            searchType: '',
            searchValue: '',
            fromList: {
                title: '选择时间',
                custom: true,
                fromTxt: [
                { text: '全部', val: '' },
                { text: '今天', val: 'today' },
                { text: '昨天', val: 'yesterday' },
                { text: '最近7天', val: 'lately7' },
                { text: '最近30天', val: 'lately30' },
                { text: '本月', val: 'month' },
                { text: '本年', val: 'year' }
                ]
            },
            timeVal: [],
            columns: [
                {
                    title: 'ID',
                    key: 'id',
                    width: 80
                },
                {
                    title: '内容',
                    key: 'msn',
                    minWidth: 120
                },
                {
                    title: 'APPID',
                    key: 'appid',
                    minWidth: 120
                },
                {
                    title: '时间',
                    key: 'add_time',
                    minWidth: 120
                }
            ],
            tableData: [],
            loading: false,
            total: 0,
            page: 1,
            limit: 15
        };
    },
    computed: {
        ...mapState('media', [
            'isMobile'
        ]),
        labelWidth() {
            return this.isMobile ? undefined : 80
        },
        labelPosition() {
            return this.isMobile ? 'top' : 'right'
        }
    },
    created() {
        this.chatRecord();
    },
    methods: {
        chatRecord() {
            chatRecord({
                page: this.page,
                limit: this.limit,
                kefu_id: this.searchType == 'kefu_id' && this.searchValue || '',
                msn: this.searchType == 'msn' && this.searchValue || '',
                time: this.formValidate.time,
                appid: this.searchType == 'appid' && this.searchValue || ''
            }).then(res => {
                this.tableData = res.data.list;
                this.total = res.data.count;
            });
        },
        onChange(index) {
            this.page = index;
            this.chatRecord()
        },
        selChange() {
            this.page = 1;
            this.chatRecord()
        },
        // 具体日期
        onchangeTime(e) {
            this.timeVal = e
            this.formValidate.time = this.timeVal.join('-')
            this.page = 1
            this.chatRecord()
        },
        // 选择时间
        selectChange(tab) {
            console.log(tab);
            this.formValidate.time = tab
            this.timeVal = []
            this.page = 1
            this.chatRecord()
        },
    }
}
</script>

<style scoped>
.ivu-input-group-append .ivu-btn {
    border-color: #2d8cf0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #2d8cf0;
    color: #fff;
}
</style>