<template>
    <div>
        <div class="i-layout-page-header">
            <div class="i-layout-page-header">
                <span class="ivu-page-header-title">{{ $route.meta.title }}</span>
            </div>
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
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
export default {
    name: 'kefu_record',
    data() {
        return {
            columns: [],
            tableData: [],
            loading: false,
            total: 0,
            limit: 15,
            page: 1,
        };
    },
    created() {},
    methods: {
        onChange(index) {
            this.page = index;
        }
    }
}
</script>

<style scoped>

</style>