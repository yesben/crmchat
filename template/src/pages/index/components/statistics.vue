<template>
  <div class="statistics">
    <ul class="statistics-ul">
      <li>
        <div class="text">全部客户</div>
        <div class="number-li">
          <countTo :startVal='0' :endVal='statisticsList.all' :duration='durations'></countTo>
          <span>人</span></div>
      </li>
      <li>
        <div class="text">今日新增客户</div>
        <div class="number-li">
          <countTo :startVal='0' :endVal='statisticsList.toDayKefu' :duration='durations'></countTo>
          <span>人</span></div>
      </li>
      <li>
        <div class="text">本月新增客户</div>
        <div class="number-li">
          <countTo :startVal='0' :endVal='statisticsList.month' :duration='durations'></countTo>
          <span>人</span>
        </div>
      </li>
      <li>
        <div class="text">今日游客</div>
        <div class="number-li">
          <countTo :startVal='0' :endVal='statisticsList.toDayTourist' :duration='durations'></countTo>
          <span>人</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {sumApi} from "@/api/index";
import countTo from 'vue-count-to';
export default {
  name: "statistics",
  components: { countTo },
  data () {
    return {
      durations:3000,
      statisticsList:null
    }
  },
  methods:{
    getStatistics(){
      sumApi().then(async res => {
        let da = res.data
        this.statisticsList = da;
      }).catch(res => {
        this.$Message.error(res.msg)
      })
    }
  },
  mounted(){
    this.getStatistics()
  }
}
</script>

<style lang="less">
.statistics{
  width: 100%;
  margin:20px 0;
  .statistics-ul{
    width: 100%;
    list-style: none;
    display: flex;
    li{
      width: 24%;
      list-style: none;
      padding: 28px 8px;
      margin-right: 2%;
      background-color: #FFFFFF;
      .text{
        color: #777777;
        font-size: 14px;
        padding-bottom: 6px;
      }
      .number-li{
        color: #282828;
        font-size: 19px;
        font-weight: 600;
        span{
          font-size: 13px;
        }
        span:first-of-type{font-size: 19px;}
      }
    }
    li:last-of-type{margin-right: 0;}
  }
}
</style>
