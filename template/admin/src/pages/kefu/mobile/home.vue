<template>
  <div class="container">
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      <footer-content></footer-content>
    </div>
  </div>
</template>
<script>
import footerContent from '../components/chatFooterList';
export default {
  components: {
    footerContent
  }
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .content {
    flex: 1;
    overflow: hidden;
  }
}
</style>