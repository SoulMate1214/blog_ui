export const guageOption = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  series: [
    {
      name: "业务指标",
      type: "gauge",
      detail: {
        formatter: "{value}%"
      },
      data: [
        {
          value: 50,
          name: "工作比"
        }
      ]
    }
  ]
}
