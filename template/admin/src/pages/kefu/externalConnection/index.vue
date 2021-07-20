<template>
  <div class="redirect_container"></div>
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
      const token = 'eyJpdiI6Im1oNThXdWZSY250QkhuTm4wdXJkeFE9PSIsInZhbHVlIjoiM2lDMEFNdERZYWlLZmJhRnBMVVE4NG1IbTIwRlBEU3MxajdVSEplUHNYWDlEbHdCdHJsUWFSY0pIRlpIMjN4NHhneXpGaXJ4ZzYxTDRSdVJWVWJVdWxWcndmaGNnRWd1L1l2NmJ3U0VQQ0V2Ry96ZmNLeDNKRWtjVVFLZkVSbzgzd21pWVlCcjAxaUhmNEpSUC9aUGkzMm1VR3I2ZCtUc2pLamcrNGpVL29RPSIsIm1hYyI6IjlmMWFhZDlhY2UxYjRjYzFhMTAwODE5MzJjNDM3MWMxNGJiZjJjZjhhZTI5ODc3OWMxMDZlODRiYjFkZTI3M2EifQ=='
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