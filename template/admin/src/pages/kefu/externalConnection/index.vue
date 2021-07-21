<template>
  <div class="redirect_container">
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Cookies from "js-cookie";
import { setSen, getSen } from '@/libs/util'
export default {
  created() {
    this.redirect();
  },
  computed: {
    ...mapState('media', ['isMobile']),
  },
  methods: {
    // 重定向方法，判断是否是移动端环境，跳转对应界面
    redirect() {
      const token = this.$route.query.token;
      setSen('mobile_token', token);
      if(this.$route.query.deviceType == "Mobile") {
        this.$router.push({ name: 'customerServerMobile', query: this.$route.query })
      } else {
        this.$router.push({ name: 'customerServerPc', query: this.$route.query });
      }
    }
  }
}
</script>