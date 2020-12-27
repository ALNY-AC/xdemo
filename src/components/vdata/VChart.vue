
<template>
  <div class="v-chart">
    <div class="chart-box" :id="id"></div>
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: {
    option: {
      type: Object,
      default() {
        return null;
      },
    }
  },
  watch: {
    option: {
      handler(v) {
        if (!!v) {
          this.buildChart();
        }
      },
      deep: true,
      immediate: true,
    }
  },
  name: 'VChart',
  data() {
    return {
      id: 'chart_' + (parseInt(Math.random() * 10000)),
      chart: null,
    }
  },
  mounted() {
  },
  methods: {
    async buildChart() {
      await this.$nextTick();
      if (!this.chart) {
        this.init();
      }
      this.chart.setOption(this.option);
    },
    init() {
      this.chart = echarts.init(document.getElementById(this.id));
    }
  }
}
</script>
<style lang="scss" scoped>
.v-chart {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .chart-box {
    height: 100%;
    width: 100%;
  }
}
</style>