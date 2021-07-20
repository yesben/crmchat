<template>
  <div class="container">
    <ul>
      <li class="list-item " v-for="(item,index) in list " data-type="0" :key="index">
        <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
          <div class="list-content">
            <slot :row="item"></slot>
          </div>
        </div>
        <div class="delete" @click="deleteItem" :data-index="index">删除</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      startX: 0,
      endX: 0
    }
  },
  methods: {
    // 点击
    skip() {
      // if(this.checkSlide()) {
      //   this.restSlide()
      // } else {
      //   this.$router.push({
      //     path: '/detail'
      //   })
      // }
    },
    // 滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX
    },
    // 滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX
      // 左滑
      if(parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide()
        parentElement.dataset.type = 1
      }
      // 右滑
      if(parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide()
        parentElement.dataset.type = 0
      }
      this.startX = 0
      this.endX = 0
    },
    // 判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll('.list-item')
      for(let i = 0; i < listItems.length; i++) {
        if(listItems[i].dataset.type == 1) {
          return true
        }
      }
      return false
    },
    // 复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll('.list-item')
      // 复位
      for(let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0
      }
    },
    // 删除
    deleteItem(e) {
      // 当前索引
      let index = e.currentTarget.dataset.index;
      // 复位
      this.restSlide();
      // 删除
      this.list.splice(index, 1)
    }
  }
}
</script>
<style scoped lang="less">
.container {
  // padding-bottom: 80px;
}
.page-title {
  text-align: center;
  font-size: 17px;
  padding: 10px 15px;
  position: relative;
}
.page-title:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-item {
  position: relative;
  height: 1.18rem;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.list-item[data-type="0"] {
  transform: translate3d(0, 0, 0);
}
.list-item[data-type="1"] {
  transform: translate3d(-2rem, 0, 0);
}
.list-item:after {
  content: " ";
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.list-item .list-img {
  display: block;
  width: 1rem;
  height: 1rem;
}
.list-item .list-content {
  // padding: 0.1rem 0 0.1rem 0.2rem;
  // position: relative;
  // flex: 1;
  // flex-direction: column;
  // align-items: flex-start;
  // justify-content: center;
  // overflow: hidden;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 0.3rem;
}
.list-item .title {
  display: block;
  color: #333;
  overflow: hidden;
  font-size: 15px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .tips {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item .time {
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0.1rem;
  color: #666;
}
.list-item .delete {
  width: 1.3rem;
  height: 1.18rem;
  background: #ff4949;
  font-size: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: -2rem;
}
</style>