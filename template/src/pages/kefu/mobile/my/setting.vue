<template>
  <div class="setting_container">
    <div class="setting_container_header">
      <div class="iconfont" @click="handleToPrevious">&#xe6d6;</div>
      <div class="setting_container_header_title">设置</div>
      <div></div>
    </div>

    <div class="setting_container_content">

      <div class="setting_container_content_item">
        <div class="setting_container_content_item_label">
          <span>头像</span>
        </div>
        <div class="setting_container_content_item_value">
          <img :src="avatar ? avatar : personalCenter.avatar" alt="" class="area_img">
          <input type="file" class="file_input" @change="getTypeFile">
        </div>
      </div>

      <div class="setting_container_content_item">
        <div class="setting_container_content_item_label">
          <span>名称</span>
        </div>
        <div class="setting_container_content_item_value">
          <input v-model="personalCenter.nickname" type="text" class="input" placeholder="请输入客服名称">
        </div>
      </div>

      <div class="setting_container_content_item">
        <div class="setting_container_content_item_label">
          <span>手机号</span>
        </div>
        <div class="setting_container_content_item_value">
          <input v-model="personalCenter.phone" type="text" class="input" placeholder="请输入手机号">
        </div>
      </div>

      <div class="setting_container_content_item">
        <div class="setting_container_content_item_label">
          <span>密码</span>
        </div>
        <div class="setting_container_content_item_value">
          <input v-model="personalCenter.password" type="text" class="input" placeholder="请输入密码">
        </div>
      </div>

    </div>

    <div class="setting_container_handle">

      <div class="setting_container_handle_button primary" @click="handleEdit">
        保存修改
      </div>

      <div class="setting_container_handle_button info">
        退出登录
      </div>
    </div>

  </div>
</template>
<script>
import { userUserInfo } from '@/api/kefu';
export default {
  data() {
    return {
      personalCenter: {}, // 客服详细信息
      avatar: '',
      selectAvatarFile: '' // 选中的头像文件
    }
  },
  created() {
    if(Object.keys(this.$route.query).length) {
      this.personalCenter = this.$route.query;
    }
  },
  methods: {
    // 返回上层
    handleToPrevious() {
      this.$router.go(-1);
    },
    // 选择文件后，获取文件
    getTypeFile(e) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.avatar = reader.result; //获取到base64格式图片
        this.selectAvatarFile = e.target.files[0]
      };
    },
    // 保存修改客服信息
    handleEdit() {
      let formData = new FormData();
      let postObj = {
        nickname: '',
        password: '',
        phone: ''
      };
      Object.keys(postObj).forEach(item => {
        postObj[item] = this.personalCenter[item]
      });

      Object.keys(postObj).forEach(item => {
        formData.append(item, postObj[item])
      });
      formData.append('avatar', this.selectAvatarFile);
      userUserInfo(formData).then(res => {
        console.log(res);
        if(res.status == 200) {
          this.$Message.success(res.msg);
          setTimeout(() => {
            this.$router.go(-1);
          }, 500)
        }
      })

    }
  }

}
</script>
<style lang="less" scoped>
.setting_container {
  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.96rem;
    background: #eeeeee;
    padding: 0 0.3rem;
    > div {
      flex: 1;
    }
    &_title {
      text-align: center;
    }
  }

  &_content {
    &_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.21rem 0 0.3rem;
      height: 1.45rem;
      font-size: 16px;
      border-bottom: 1px solid #f2f2f2;
      &_value {
        position: relative;
        .area_img {
          width: 0.88rem;
          height: 0.88rem;
        }
        .input {
          border: none;
          outline: none;
          text-align: right;
        }

        .file_input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  &_handle {
    margin-top: 0.5rem;
    &_button {
      padding: 0.22rem 0;
      width: 90%;
      margin: auto;
      margin-bottom: 0.3rem;
      text-align: center;
      font-size: 16px;
      border-radius: 45px;
    }
    .primary {
      background: #3875ea;
      color: #fff;
    }

    .info {
      border: 1px solid #3875ea;
      color: #3875ea;
    }
  }
}
</style>