<template>
  <div class="container_mail">

    <div class="container_mail_header">
      <div></div>
      <div class="container_mail_header_title">
        {{title}}
      </div>
      <div class="container_mail_header_handle" @click.stop="handleToTagView">
        <span class="iconfont"></span>
        <span>标签</span>
      </div>
    </div>

    <div class="container_mail_search">
      <div class="container_mail_search_item">
        <span class="iconFont search">icon</span>
        <input type="text" v-model="searchValue" placeholder="搜索用户名称">
        <span class="clear">icon_clear</span>
      </div>

    </div>

    <div class="container_mail_mailList">
      <div class="container_mail_mailList_item" v-for="(item, index) in mailList" :key="index">
        <div class="container_mail_mailList_item_classFly">
          <span>{{item.classFily}}</span>
        </div>

        <div class="container_mail_mailList_item_list">
          <div class="container_mail_mailList_item_list_item" v-for="(valI, i) in item.children" :key="i">
            <div class="container_mail_mailList_item_list_item_area">
              <img :src="valI.nickArea" alt="">
            </div>
            <div class="container_mail_mailList_item_list_item_nickname">{{valI.nickName}}</div>
          </div>
        </div>

      </div>
    </div>

    <div class="tips">
      <div v-for="(item, index) in mailList">{{item.classFily}}</div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      searchValue: '',
      mailList: [
        {
          classFily: 'A',
          children: [
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头老鼠'
            },
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头耗子'
            }
          ]
        },
        {
          classFily: 'B',
          children: [
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头老鼠'
            },
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头耗子'
            }
          ]
        },
        {
          classFily: 'B',
          children: [
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头老鼠'
            },
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头耗子'
            }
          ]
        },
        {
          classFily: 'B',
          children: [
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头老鼠'
            },
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头耗子'
            }
          ]
        },
        {
          classFily: 'B',
          children: [
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头老鼠'
            },
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头耗子'
            }
          ]
        },
        {
          classFily: 'B',
          children: [
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头老鼠'
            },
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头耗子'
            }
          ]
        },
        {
          classFily: 'c',
          children: [
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头老鼠'
            },
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头耗子'
            },
            {
              nickArea: require('@/assets/images/head.gif'),
              nickName: '剃头耗子'
            }
          ]
        }
      ]
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  },
  methods: {
    handleToTagView() {
      this.$router.push({ name: 'customerServiceTag' });
    }
  }
}
</script>
<style lang="less" scoped>
.container_mail {
  font-family: PingFang SC;
  background: #eeeeee;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.96rem;
    padding: 0 0.33rem;
    position: relative;
    background: linear-gradient(90deg, #3875ea 0%, #1890fc 100%);
    &_title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #ffffff;
      font-weight: bold;
    }
    &_handle {
      font-size: 12px;
      color: #fff;
      position: absolute;
      right: 0.33rem;
      top: 0;
      height: 100%;
      z-index: 10;
      display: flex;
      align-items: center;
    }
  }
  &_search {
    background: #ffffff;
    height: 1.08rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &_item {
      width: 90%;
      background: #f5f6f9;
      height: 0.68rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.2rem;
      box-sizing: border-box;
      border-radius: 0.6rem;
      font-size: 14px;
      input {
        flex: 1;
        margin-left: 0.4rem;
        border: none;
        outline: none;
        background: none;
      }
    }
  }

  &_mailList {
    flex: 1;
    overflow-y: auto;
    overflow-scrolling: touch;
    &_item {
      &_classFly {
        padding: 0.08rem 0.3rem;
      }
      &_list {
        &_item {
          padding: 0.15rem 0.3rem;
          display: flex;
          align-items: center;
          background: #fff;
          border-bottom: 1px solid #f0f2f7;
          &_area {
            width: 0.64rem;
            height: 0.64rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &_nickname {
            font-size: 15px;
            margin-left: 0.2rem;
            font-weight: bold;
          }
        }
      }
    }
  }
}
.tips {
  position: fixed;
  right: 0.3rem;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
}
</style>