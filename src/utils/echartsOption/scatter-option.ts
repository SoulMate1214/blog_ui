export const scatterOption = {
    title: {
        text: "图片上传率与文章发表率",
        subtext: "调查来自: 冫soul丶博客站2019.06.06"
    },
    tooltip: {
        trigger: "axis",
        showDelay: 0,
        axisPointer: {
            type: "cross",
            lineStyle: {
                type: "dashed",
                width: 1
            }
        }
    },
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
    legend: {
        data: ["图片上传率", "文章发表率"]
    },
    xAxis: [
        {
            type: "value",
            power: 1,
            precision: 2,
            scale: true
        }
    ],
    yAxis: [
        {
            type: "value",
            power: 1,
            precision: 2,
            scale: true
        }
    ],
    series: [
        {
            name: "图片上传率",
            type: "scatter",
            data: [[16.2, 51.6], [17.9, 62.5], [15.4, 42], [16, 50], [14.2, 49.8], [16.2, 49.2], [17, 73.2], [15, 47.8], [16.6, 68.8], [15.5, 50.6], [17, 82.5], [16.8, 57.2], [17.5, 87.8], [17.2, 72.8], [17, 54.5], [17, 59.8], [17.9, 67.3], [17.5, 67.8], [16.6, 61.4]]
        },
        {
            name: "文章发表率",
            type: "scatter",
            data: [[17, 65.6], [16.1, 55.2], [16, 57], [17.5, 61.4], [18.2, 76.8], [17, 86.8], [18, 72], [16, 64.6], [17.8, 74.8], [18.3, 93.2], [18.3, 82.7], [17.8, 58], [17.8, 79.5], [17.8, 78.6], [17.8, 71.8], [17.8, 72], [17.8, 81.8], [18.3, 83.2]]
        }
    ]
}
