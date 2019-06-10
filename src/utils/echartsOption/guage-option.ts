export const guageOption = {
  title: {text: '电脑cpu监控'},
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
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
  series: [
    {
      name: "电脑监控",
      type: "gauge",
      detail: {
        formatter: "{value}%"
      },
      data: [
        {
          value: 30,
          name: "浏览器cpu占用率"
        }
      ]
    }
  ]
}
