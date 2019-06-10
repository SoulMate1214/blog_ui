let xAxisData = [];
let data1 = [];
let data2 = [];
for (let i = 0; i < 100; i++) {
  xAxisData.push(i);
  data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
}

export const guageOption = {
  title: {
    text: 'log日志增长率'
  },
  legend: {
    data: ['周', '季度'],
    align: 'left'
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack', 'tiled']
      },
      dataView: {},
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  tooltip: {},
  xAxis: {
    data: xAxisData,
    silent: false,
    splitLine: {
      show: false
    }
  },
  yAxis: {
  },
  series: [{
    name: '周',
    type: 'bar',
    data: data1,
    animationDelay: function (idx:any) {
      return idx * 10;
    }
  }, {
    name: '季度',
    type: 'bar',
    data: data2,
    animationDelay: function (idx:any) {
      return idx * 10 + 100;
    }
  }],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function (idx:any) {
    return idx * 5;
  }
}

