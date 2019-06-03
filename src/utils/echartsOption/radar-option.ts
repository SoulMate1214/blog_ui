export const radarOption = {
    title: {
        text: "预算 vs 开销",
        subtext: "纯属虚构"
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        orient: "vertical",
        x: "right",
        y: "bottom",
        data: ["预算分配", "实际开销"]
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
    polar: [  //雷达图必须设置polar
        {
            indicator: [
                {
                    text: "销售",
                    max: 6000,
                    min: 0,
                },
                {
                    text: "管理",
                    max: 16000,
                    min: 0
                },
                {
                    text: "信息技术",
                    max: 30000,
                    min: 0
                },
                {
                    text: "客服",
                    max: 38000,
                    min: 0
                },
                {
                    text: "研发",
                    max: 52000,
                    min: 0
                },
                {
                    text: "市场",
                    max: 25000,
                    min: 0
                }
            ]
        }
    ],
    calculable: true,
    series: [
        {
            name: "",
            type: "radar",
            data: [
                {
                    value: [4300, 10000, 28000, 35000, 50000, 19000],
                    name: "预算分配"
                }
            ]
        },
        {
            name: "",
            type: "radar",
            data: [
                {
                    value: [5000, 14000, 28000, 31000, 42000, 21000],
                    name: "实际开销"
                }
            ]
        }
    ]
}
