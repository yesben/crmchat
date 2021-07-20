<template>
  <div class="addTag_container">

    <div class="addTag_container_header">
      <div class="header_cancel">取消</div>
      <div class="header_title">新建标签</div>
      <div class="header_finish">完成</div>
    </div>

    <div class="tag_title">
      标签名称
    </div>
    <div class="tag_name_content">
      <div class="input_box">
        <input type="text">
      </div>
    </div>

    <div class="tag_title">
      标签成员
    </div>

    <div class="tag_name_content add_user">
      <div class="iconfont">icon</div>
      <div class="tag_name_content_message">添加成员</div>
    </div>

    <div class="addTag_container_user">
      <div class="addTag_container_user_view" v-for="(item, index) in orderByList" :key="index">

        <div class="addTag_container_user_view_orderby">{{item.byIndex}}</div>

        <tag-content :list="item.classFly">
          <template slot-scope="scope">

            <div class="user_message">

              <div class="user_message_area">
                <img :src="scope.row.image" alt="">
              </div>

              <div class="user_message_niceName">
                {{scope.row.nickName}}
              </div>

            </div>

          </template>
        </tag-content>

      </div>

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
      orderByList: [
        {
          byIndex: 'A',
          classFly: [
            {
              image: require('@/assets/images/head.gif'),
              nickName: '剃头小公举'
            }
          ]
        },
        {
          byIndex: 'B',
          classFly: [
            {
              image: require('@/assets/images/head.gif'),
              nickName: '剃头小公举'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.addTag_container {
  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.96rem;
    padding: 0 0.3rem;
    background: #eeeeee;

    .header_title {
      font-size: 16px;
      font-weight: bold;
    }
    .header_finish {
      width: 0.92rem;
      height: 0.56rem;
      background: #3875ea;
      border-radius: 4px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .tag_name_content {
    height: 0.88rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    border: 1px solid #f0f2f7;
    padding: 0 0.13rem;

    .input_box {
      width: 100%;
      height: 100%;
      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding: 0.3rem;
        box-sizing: border-box;
        font-size: 14px;
      }
    }

    &_message {
      margin-left: 0.12rem;
    }
  }

  .add_user {
    color: #3875ea;
  }

  &_user {
    &_view {
      &_orderby {
        height: 0.54rem;
        background: #eeeeee;
        padding: 0 0.1rem;
        display: flex;
        align-items: center;
      }

      .user_message {
        height: 0.94rem;
        display: flex;
        align-items: center;
        &_area {
          margin-right: 0.2rem;
          img {
            width: 0.64rem;
            height: 0.64rem;
          }
        }
      }
    }
  }

  .tag_title {
    height: 0.61rem;
    background: #eeeeee;
    opacity: 1;
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
  }
}
</style>