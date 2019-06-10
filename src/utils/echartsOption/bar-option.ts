export const barOption = {
    title: {text: '文章发布率'},
    tooltip: {},
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: false
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    xAxis: {
        data: ["一月", "二月", "三月", "四月", "五月", "六月","七月","八月","九月","十月","十一月","十二月"]
    },
    yAxis: {},
    series: [{
        name: '文章数',
        type: 'bar',
        data: [1, 3, 2, 5, 8, 9, 3, 2, 5, 6, 7, 3]
    }]
}
