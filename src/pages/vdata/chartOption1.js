export default {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        }
    },
    grid: {
        top: '10px',
        bottom: '25px',
        right: '10px',
        left: '10px',
        containLabel: true,
    },
    textStyle: {
        color: '#fff',
    },
    legend: {
        data: ['完成数', '完成率'],
        bottom: '0',
        textStyle: {
            color: '#9BDEF0',
        }
    },
    xAxis: [
        {
            type: 'category',
            data: new Array(6).fill('2020').map((el, i) => el + '.' + (i + 1)),
            //控制刻度线
            axisTick: { show: false, },
            //控制轴线
            axisLine: { show: false, },
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '完成数',
            axisLabel: {
                // formatter: '{value} %'
            },
            //控制刻度线
            axisTick: { show: false, },
            //控制轴线
            axisLine: { show: false, },
            //控制分割线
            splitLine: {
                lineStyle: {
                    color: 'rgb(155 222 240 / 0.2)'
                }
            },
        },
        {
            type: 'value',
            name: '完成率',
            min: 0,
            max: 100,
            interval: 25,
            axisLabel: { formatter: '{value} %' },
            //控制轴线
            axisLine: { show: false, },
            //控制刻度线
            axisTick: { show: false, },
            splitLine: {
                lineStyle: {
                    color: 'rgb(155 222 240 / 0.2)'
                }
            }
        }
    ],
    series: [
        {
            name: '任务总数',
            type: 'custom',
            data: new Array(6).fill('').map(() => parseInt(Math.random() * 1000)),
        },
        {
            name: '完成数',
            type: 'bar',
            data: new Array(6).fill('').map(() => parseInt(Math.random() * 1000)),
            color: 'rgba(91, 143, 249, 1)',
        },
        {
            name: '完成率',
            type: 'line',
            data: new Array(6).fill('').map(() => parseInt(Math.random() * 100)),
            color: '#5AD8A6',
        }
    ]
}