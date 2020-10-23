import echarts from "echarts";
import Node from "./Node";

export default class Echart extends Node {

    chart = null;
    timeout = null;

    init() {
        // console.warn('this.$el');
        // console.warn(this.$el);
        this.initChart();
        console.warn(this.dragNode);
    }
    initChart() {

        let option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        this.chart = echarts.init(this.$el);
        this.chart.setOption(option);

    }
    onResizeCallback(handle, x, y, width, height) {

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.chart.resize();
        }, 10);

    }

    update() {

    }
}