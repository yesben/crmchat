<template>
  <div class="tag_container">
    <div class="tag_container_header">
      <div class="tag_container_header_addItem" @click="handleToAddTagView">
        <span class="iconFont">icon</span>
        <span>新建标签</span>
      </div>
    </div>

    <div class="tag_container_content">
      <tag-content :list="list">
        <template slot-scope="scope">
          <div class="tag_container_content_title">
            <span>{{scope.row.tagClassFly}}</span>
            <span>({{scope.row.tagClassFlyCount}})</span>
          </div>
          <div class="tag_container_content_message">
            <span>{{scope.row.children.join(', ')}}</span>
          </div>
        </template>
      </tag-content>
    </div>

  </div>
</template>

<script>
import tagContent from './component/tagContent';
export default {
  components: {
    tagContent
  },
  data() {
    return {
      list: [
        {
          tagClassFly: '意向客户',
          tagClassFlyCount: 9,
          children: [
            '张越', '张小果'
          ]
        }
      ]
    }
  },
  methods: {
    handleToAddTagView() {
      this.$router.push({ name: 'customerServerSettings' });
    }
  }

}
</script>

<style lang="less" scoped>
.tag_container {
  width: 100%;
  height: 100%;
  &_header {
    height: 1.1rem;
    border-bottom: 1px solid #f0f2f7;
    color: #3875ea;
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    &_addItem {
      font-size: 14px;
      span:nth-child(2) {
        margin-left: 0.07rem;
      }
    }
  }

  &_content {
    &_title {
      color: #282828;
      font-size: 15px;
    }
    &_message {
      color: #999999;
    }
  }
}
</style>