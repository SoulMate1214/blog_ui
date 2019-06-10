export const radarOption = {
    title: {
        text: "文章数 vs 文件数",
        subtext: "图与文"
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        orient: "vertical",
        x: "right",
        y: "bottom",
        data: ["文章数", "文件数"]
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
    polar: [
        {
            indicator: [
                {
                    text: "一二月",
                    max: 100,
                    min: 0,
                },
                {
                    text: "三四月",
                    max: 100,
                    min: 0
                },
                {
                    text: "五六月",
                    max: 100,
                    min: 0
                },
                {
                    text: "七八月",
                    max: 100,
                    min: 0
                },
                {
                    text: "九十月",
                    max: 100,
                    min: 0
                },
                {
                    text: "十一二月",
                    max: 100,
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
                    value: [43, 10, 28, 35, 50, 19],
                    name: "文章数"
                }
            ]
        },
        {
            name: "",
            type: "radar",
            data: [
                {
                    value: [50, 65, 74, 82, 55, 80],
                    name: "文件数"
                }
            ]
        }
    ]
}
