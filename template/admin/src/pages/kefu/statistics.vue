<template>
    <div>
        <div class="i-layout-page-header">
            <div class="i-layout-page-header">
                <span class="ivu-page-header-title">{{ $route.meta.title }}</span>
            </div>
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Form ref="formValidate" :model="formValidate" :label-width="labelWidth" :label-position="labelPosition" class="tabform" @submit.native.prevent>
                <Row :gutter="24" type="flex" justify="end">
                    <Col span="24" class="ivu-text-left">
                        <FormItem label="地区搜索：" label-for="province">
                            <Input search enter-button @on-search="onSearch" placeholder="请输入地区搜索" element-id="province" v-model="formValidate.province" style="width: 30%;display: inline-table;" class="mr" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Table :columns="columns" :data="tableData" :loading="loading" highlight-row no-userFrom-text="暂无数据" class="ivu-mt">
                <template slot-scope="{ row, index }" slot="picture">
                    <img src="" v-viewer>
                </template>
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
import { chatStatistics } from '@/api/setting';
import { mapState } from 'vuex';

export default {
    name: 'kefu_statistics',
    data() {
        return {
            formValidate: {
                province: ''
            },
            columns: [
                {
                    title: 'ID',
                    key: 'id',
                    width: 80
                },
                {
                    title: 'IP',
                    key: 'ip',
                    minWidth: 80
                },
                {
                    title: '网址',
                    key: 'path',
                    minWidth: 80
                },
                {
                    title: '浏览器',
                    key: 'browser',
                    minWidth: 80
                },
                {
                    title: '时间',
                    key: 'create_time',
                    minWidth: 80
                },
                {
                    title: '地区',
                    key: 'region',
                    minWidth: 80
                },
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
            return this.isMobile ? undefined : 80;
        },
        labelPosition() {
            return this.isMobile ? 'top' : 'right';
        }
    },
    created() {
        this.chatStatistics();
    },
    methods: {
        chatStatistics() {
            chatStatistics({
                page: this.page,
                limit: this.limit,
                province: this.formValidate.province
            }).then(res => {
                this.tableData = res.data.data;
                this.total = res.data.count;
            });
        },
        onSearch() {
            this.page = 1;
            this.chatStatistics();
        },
        onChange(index) {
            this.page = index;
            this.chatStatistics();
        }
    }
}
</script>

<style scoped>

</style>