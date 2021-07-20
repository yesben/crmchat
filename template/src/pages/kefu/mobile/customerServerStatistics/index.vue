<template>
  <div class="statistics_container">

    <div class="statistics_container_header">
      <div class="statistics_container_header_title">
        统计
      </div>
      <div class="statistics_container_header_content">

        <div class="statistics_container_header_content_item">
          <div class="statistics_container_header_content_item_value">82423</div>
          <div class="statistics_container_header_content_item_label">全部客户</div>
        </div>

        <div class="statistics_container_header_content_item">
          <div class="statistics_container_header_content_item_value">136</div>
          <div class="statistics_container_header_content_item_label">今日客户</div>
        </div>

        <div class="statistics_container_header_content_item">
          <div class="statistics_container_header_content_item_value">1246</div>
          <div class="statistics_container_header_content_item_label">本月客户</div>
        </div>

        <div class="statistics_container_header_content_item">
          <div class="statistics_container_header_content_item_value">458</div>
          <div class="statistics_container_header_content_item_label">今日游客</div>
        </div>

      </div>
    </div>

    <div class="oView_content">
      <div class="oView_content_search">

        <div class="select_mounth">
          <div class="select_mounth_item" @click="selectMounth(item)" v-for="(item, index) in mouthList" :key="index" :class="{'selectMounth' :item.id == selectMounthId }">
            {{item.label}}
          </div>
        </div>

        <div class="select_year" @click="selectYears">
          <div class="iconfont">ico</div>
        </div>

      </div>
      <div class="charts">
        <div id="echarts" style="height: 300px;"></div>
      </div>

    </div>

    <awesome-picker ref="picker" :data="picker.data" :anchor="picker.anchor" :textTitle="picker.textTitle" :textConfirm="picker.textConfirm" :textCancel="picker.textCancel" :colorTitle="picker.colorTitle" :colorConfirm="picker.colorConfirm" :colorCancel="picker.colorCancel" :swipeTime="picker.swipeTime" @cancel="handlePickerCancel" @confirm="handlePickerConfirm">
    </awesome-picker>

  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {

      picker: {
        data: [
          ['2021', '2020', '2019']
        ],
        anchor: [0],
        textTitle: '测试文案',
        textConfirm: '确定',
        textCancel: '取消',
        colorTitle: '#000',
        colorConfirm: '3875EA',
        colorCancel: '#999999',
        swipeTime: 1800
      },

      selectMounthId: 0,
      mouthList: [
        {
          id: 0,
          label: '当月'
        },
        {
          id: 1,
          label: '上月'
        },
        {
          id: 2,
          label: '5月'
        },
        {
          id: 3,
          label: '4月'
        },
        {
          id: 4,
          label: '3月'
        },
        {
          id: 5,
          label: '2月'
        },
        {
          id: 6,
          label: '1月'
        },
        {
          id: 0,
          label: '当月'
        },
        {
          id: 1,
          label: '上月'
        },
        {
          id: 2,
          label: '5月'
        },
        {
          id: 3,
          label: '4月'
        },
        {
          id: 4,
          label: '3月'
        },
        {
          id: 5,
          label: '2月'
        },
        {
          id: 6,
          label: '1月'
        }
      ],

      charts: ''
    }
  },
  mounted() {

    this.$nextTick(() => {
      this.handleSetVisitChart();
      window.addEventListener('resize', this.wsFunc);
    })
  },
  methods: {
    // 选择年份
    selectYears() {
      this.$refs.picker.show();

    },
    // 取消选择
    handlePickerCancel() { },
    // 确认选择
    handlePickerConfirm(val) {
      console.log(val);
    },
    // 选择月份
    selectMounth(item) {
      this.selectMounthId = item.id;
    },
    // 重新渲染图表
    wsFunc() {
      this.myChart.resize()
    },
    // 初始化图表数据
    handleSetVisitChart() {
      this.charts = echarts.init(document.getElementById('echarts'));
      var option;
      option = {
        title: {
          text: '每日新增(人)',
          textStyle: {
            fontSize: '12px',
            color: '#CCCCCC'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [
            '客户',
            '游客'],
          show: true,
          left: 'right',
          orient: 'horizontal',
          icon: 'pie',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 50,
          zoomOnMouseWheel: false,
          zoomLock: true,
        }],
        toolbox: {

        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: {
            lineStyle: {
              color: '#E5E5E5',
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#E5E5E5',
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666'
            }
          }
        },
        series: [
          {
            name: '客户',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              normal: {
                color: '#3875EA',
                lineStyle: {
                  color: '#3875EA'
                }
              }
            },
            areaStyle: {
              normal: {
                //右，下，左，上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(244, 247, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(244, 247, 255)'
                  }
                ], false)
              }
            }
          },
          {
            name: '游客',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            itemStyle: {
              normal: {
                color: '#3FC7A9',
                lineStyle: {
                  color: '#3FC7A9'
                }
              },
            }
          },
        ]
      }
      if(option && typeof option === 'object') {
        this.charts.setOption(option);
      }
    }
  }
}
</script>
<style lang="less" scoped>
.statistics_container {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  &_header {
    height: 2.91rem;
    position: relative;
    &_title {
      height: 2.01rem;
      background: linear-gradient(85deg, #3875ea 0%, #1890fc 100%);
      font-size: 16px;
      text-align: center;
      color: #fff;
      padding-top: 0.2rem;
    }
    &_content {
      display: flex;
      justify-content: space-between;
      width: 90%;
      background: #fff;
      margin: auto;
      margin-top: 0.44rem;
      padding: 0.43rem 0.3rem;
      border-radius: 10px;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 0;
      &_item {
        flex: 1;
        text-align: center;

        &_value {
          font-size: 20px;
        }
        &_label {
          font-size: 12px;
          margin-top: 0.04rem;
        }
      }
    }
  }

  .oView_content {
    width: 90%;
    margin: 0.2rem auto;
    padding: 0.34rem 0.26rem;
    box-sizing: border-box;
    border-radius: 10px;
    background: #fff;
    &_search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0;

      .select_mounth {
        flex: 1;
        display: flex;
        font-size: 15px;
        justify-content: space-between;
        overflow-x: auto;
        margin-right: 10px;
        .selectMounth {
          font-weight: bold;
          color: #3875ea;
          border-bottom: 2px solid #3875ea;
        }
        &_item {
          white-space: nowrap;
          margin-right: 0.54rem;
        }
      }
      .select_year {
      }
    }
    .charts {
      padding-right: 0.4rem;
    }
  }
}
</style>