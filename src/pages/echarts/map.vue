
<template>
  <div id="map">
    <div class="chart-box" :id="id"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 贵州省 from './贵州省.json'

export default {
  layout: 'root',
  data() {
    return {
      id: 'chart_' + (parseInt(Math.random() * 10000)),
      chart: null,
    }
  },
  mounted() {
    this.init();
    this.initEvent();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  deactivated() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    initEvent() {
      window.addEventListener('resize', this.resize);
    },
    resize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    async init() {

      let map = 贵州省;

      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.showLoading();
      this.chart.hideLoading();
      echarts.registerMap('CN', map);
      this.chart.setOption({
        grid: {
          top: '0',
          bottom: '0',
          right: '0',
          left: '0',
          containLabel: true,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        textStyle: {
          color: '#fff',
        },
        series: [
          {
            name: '省市区县',
            type: 'map',
            mapType: 'CN', // 自定义扩展图表类型
            label: {
              show: true,
              color: '#fff',
              fontSize: 20,
            },
            itemStyle: {
              areaColor: "rgb(51,118,190)",
              borderColor: '#fff',
              borderType: 'dotted',
            },
            left: '40px',
            top: '40px',
            right: '40px',
            bottom: '100px',
            // 自定义名称映射
            // nameMap: {
            //   'Central and Western': '中西区',
            //   'Eastern': '东区',
            //   'Islands': '离岛',
            //   'Kowloon City': '九龙城',
            //   'Kwai Tsing': '葵青',
            //   'Kwun Tong': '观塘',
            //   'North': '北区',
            //   'Sai Kung': '西贡',
            //   'Sha Tin': '沙田',
            //   'Sham Shui Po': '深水埗',
            //   'Southern': '南区',
            //   'Tai Po': '大埔',
            //   'Tsuen Wan': '荃湾',
            //   'Tuen Mun': '屯门',
            //   'Wan Chai': '湾仔',
            //   'Wong Tai Sin': '黄大仙',
            //   'Yau Tsim Mong': '油尖旺',
            //   'Yuen Long': '元朗'
            // }
          }
        ]
      });
    }
  }
}
</script>
<style lang="scss" scoped>
#map {
  background-color: rgb(31, 31, 31);
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
.chart-box {
  width: 100%;
  height: 100vw;
}
</style>