<template>
  <div class="my_container">
    <div class="header_container">
      <div class="header_container_title">我的</div>

      <div class="header_container_message">
        <div class="header_container_message_area">
          <img :src="customerData.avatar" alt="">
        </div>
        <div class="header_container_message_item">
          <div class="customerServer_name">
            {{customerData.nickname}}
          </div>
          <div class="customerServer_item">
            <div class="customerServer_item_label">
              手机号：
            </div>
            <div class="customerServer_item_value">
              {{customerData.phone}}
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="handle_box">

      <div class="handle_box_item" @click="handleToSettingView">

        <div class="handle_box_item_label">
          <img src="@/assets/images/my/setting.png" alt="">
          <span>设置</span>
        </div>

        <div class="handle_box_item_value">
          <span class="iconfont">&#xe6d5;</span>
        </div>

      </div>
    </div>

  </div>
</template>
<script>

import { kefuUserInfo } from '@/api/kefu';
export default {
  data() {
    return {
      customerData: {}
    }
  },
  created() {
    this.initData();
  },
  methods: {
    handleToSettingView() {
      this.$router.push({ name: 'customerServerSettings', query: this.customerData });
    },
    // 获取当前登录的客服信息
    initData() {
      kefuUserInfo().then(res => {
        if(res.status == 200) {
          this.customerData = res.data;
          console.log(this.customerData);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.my_container {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
}
.header_container {
  background: url("../../../../assets/images/my/bg.png") center center no-repeat;
  background-size: cover;
  font-family: PingFang SC;
  position: relative;
  height: 2.48rem;
  margin-bottom: 0.82rem;
  &_title {
    padding: 0.2rem 0 0.61rem 0;
    font-size: 16px;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }

  &_message {
    position: absolute;
    left: 0;
    right: 0;
    width: 95%;
    margin: auto;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 6px;
    padding: 0.4rem 0.34rem;
    &_area {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.2rem;
    }
    &_item {
      .customerServer_name {
        color: #282828;
        font-size: 15px;
        font-weight: bold;
      }

      .customerServer_item {
        display: flex;
        color: #999999;
        margin-top: 0.08rem;
        &_label {
          margin-right: 0.08rem;
        }
      }
    }
  }
}

.handle_box {
  margin: auto;
  width: 90%;
  background: #fff;
  border-radius: 6px;
  padding: 0.27rem 0.19rem;
  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_label {
      display: flex;
      align-items: center;
      img {
        margin-right: 0.1rem;
        width: 0.33rem;
        height: 0.33rem;
      }
      span {
        font-size: 15px;
        color: #282828;
        font-weight: bold;
      }
    }
  }
}
</style>