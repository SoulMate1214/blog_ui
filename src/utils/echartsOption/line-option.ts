export const lineOption = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['近七日收益']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },

    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["1","2","3","4","5"]

    },
    yAxis: {
        type: 'value'
    },

    series: [{
        name: '近七日收益',
        type: 'line',
        stack: '总量',
        data: ["3", "2", "4", "4", "5"]
    }]
}
