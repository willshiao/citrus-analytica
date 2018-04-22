console.log('Loaded!!')
// const myChart = echarts.init(document.getElementById('container'))
const myGraph = echarts.init(document.getElementById('graphContainer'))

$.getJSON(`${API_URL}/groups`, (res) => {
  const groups = res.data
  groups.forEach(group => {
    $('#chatCollapse').append(`
    <li>
      <a href="navbar.html" class="chat-item" data-id="${group.id}">${group.name}</a>
    </li>`)
  })
})

function loadWordcloud() {
  $.getJSON(`${API_URL}/wordcloud`, (res) => {
    const words = res.data.map(d => [d[0], Math.round(2.5 * Math.sqrt(d[1]))])
    console.log(words)

    const myCloud = WordCloud(document.getElementById('cloudContainer'), {
      list: words
    })

  })
}

setTimeout(loadWordcloud, 3000)

const g2 = echarts.init(document.getElementById('graph2'))
// const data = [
//   [[28604, 77, 17096869, 'Australia', 1990], [31163, 77.4, 27662440, 'Canada', 1990], [1516, 68, 1154605773, 'China', 1990], [13670, 74.7, 10582082, 'Cuba', 1990], [28599, 75, 4986705, 'Finland', 1990], [29476, 77.1, 56943299, 'France', 1990], [31476, 75.4, 78958237, 'Germany', 1990], [28666, 78.1, 254830, 'Iceland', 1990], [1777, 57.7, 870601776, 'India', 1990], [29550, 79.1, 122249285, 'Japan', 1990], [2076, 67.9, 20194354, 'North Korea', 1990], [12087, 72, 42972254, 'South Korea', 1990], [24021, 75.4, 3397534, 'New Zealand', 1990], [43296, 76.8, 4240375, 'Norway', 1990], [10088, 70.8, 38195258, 'Poland', 1990], [19349, 69.6, 147568552, 'Russia', 1990], [10670, 67.3, 53994605, 'Turkey', 1990], [26424, 75.7, 57110117, 'United Kingdom', 1990], [37062, 75.4, 252847810, 'United States', 1990]],
//   [[44056, 81.8, 23968973, 'Australia', 2015], [43294, 81.7, 35939927, 'Canada', 2015], [13334, 76.9, 1376048943, 'China', 2015], [21291, 78.5, 11389562, 'Cuba', 2015], [38923, 80.8, 5503457, 'Finland', 2015], [37599, 81.9, 64395345, 'France', 2015], [44053, 81.1, 80688545, 'Germany', 2015], [42182, 82.8, 329425, 'Iceland', 2015], [5903, 66.8, 1311050527, 'India', 2015], [36162, 83.5, 126573481, 'Japan', 2015], [1390, 71.4, 25155317, 'North Korea', 2015], [34644, 80.7, 50293439, 'South Korea', 2015], [34186, 80.6, 4528526, 'New Zealand', 2015], [64304, 81.6, 5210967, 'Norway', 2015], [24787, 77.3, 38611794, 'Poland', 2015], [23038, 73.13, 143456918, 'Russia', 2015], [19360, 76.5, 78665830, 'Turkey', 2015], [38225, 81.4, 64715810, 'United Kingdom', 2015], [53354, 79.1, 321773631, 'United States', 2015]]
// ]

// const option = {
//   backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
//     offset: 0,
//     color: '#f7f8fa'
//   }, {
//     offset: 1,
//     color: '#cdd0d5'
//   }]),
//   title: {
//     text: '1990 与 2015 年各国家人均寿命与 GDP'
//   },
//   legend: {
//     right: 10,
//     data: ['1990', '2015']
//   },
//   xAxis: {
//     splitLine: {
//       lineStyle: {
//         type: 'dashed'
//       }
//     }
//   },
//   yAxis: {
//     splitLine: {
//       lineStyle: {
//         type: 'dashed'
//       }
//     },
//     scale: true
//   },
//   series: [{
//     name: '1990',
//     data: data[0],
//     type: 'scatter',
//     symbolSize: function (data) {
//       return Math.sqrt(data[2]) / 5e2
//     },
//     label: {
//       emphasis: {
//         show: true,
//         formatter: function (param) {
//           return param.data[3]
//         },
//         position: 'top'
//       }
//     },
//     itemStyle: {
//       normal: {
//         shadowBlur: 10,
//         shadowColor: 'rgba(120, 36, 50, 0.5)',
//         shadowOffsetY: 5,
//         color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
//           offset: 0,
//           color: 'rgb(251, 118, 123)'
//         }, {
//           offset: 1,
//           color: 'rgb(204, 46, 72)'
//         }])
//       }
//     }
//   }, {
//     name: '2015',
//     data: data[1],
//     type: 'scatter',
//     symbolSize: function (data) {
//       return Math.sqrt(data[2]) / 5e2
//     },
//     label: {
//       emphasis: {
//         show: true,
//         formatter: function (param) {
//           return param.data[3]
//         },
//         position: 'top'
//       }
//     },
//     itemStyle: {
//       normal: {
//         shadowBlur: 10,
//         shadowColor: 'rgba(25, 100, 150, 0.5)',
//         shadowOffsetY: 5,
//         color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
//           offset: 0,
//           color: 'rgb(129, 227, 238)'
//         }, {
//           offset: 1,
//           color: 'rgb(25, 183, 207)'
//         }])
//       }
//     }
//   }]
// }

// myChart.setOption(option)

$.getJSON(`${API_URL}/conversations`, (res) => {
  $.getJSON(`${API_URL}/groups`, (res2) => {
    const groups = res2.data
    const url = new URL(window.location);
    const currentUser = url.searchParams.get('user') || 'William Shiao'
    const d = res.data
    const nodes = []
    const linkMap = {}
    const links = []
    d.forEach(conv => {
      nodes.push({
        id: conv._id.toString(),
        name: groups.find((item) => item.id === conv._id).name,
        itemStyle: null,
        symbolSize: 4 * Math.log(conv.value.messages),
        value: conv.value.messages,
        y: null,
        x: null,
        draggable: true
      })
    })
    // console.log(nodes)
    let count = 0
    const sharedUsers = parseInt(url.searchParams.get('sharedUsers'), 10)
    const shareAmount = isNaN(sharedUsers) ? 2 : sharedUsers
    d.forEach(conv => {
      const part1 = conv.value.participants;
      d.forEach(conv2 => {
        if(conv === conv2) return false
        const part2 = conv2.value.participants
        let shared = 0

        for(let participant in part1) {
          if(participant === currentUser) continue
          if(participant in part2 && shared <= (shareAmount - 1)) {
            shared++;
          } else if(participant in part2) {
            links.push({
              id: (count++).toString(),
              source: conv._id.toString(),
              target: conv2._id.toString()
            })
          }
        }
      })
    })
    // console.log(linkMap)
    // for(let target in linkMap) {
    //   links.push({
    //     id: (count++).toString(),
    //     source: target,
    //     target: linkMap[target]
    //   })
    // }
    // console.log(nodes)
    const graphOptions = {
      title: {
        text: 'Conversation Graph',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [{
        data: []
      }],
      animation: false,
      series: [
        {
          name: 'Conversation Graph',
          type: 'graph',
          layout: 'force',
          data: nodes,
          links,
          roam: true,
          label: {
            normal: {
              position: 'right'
            }
          },
          force: {
            repulsion: 100
          }
        }
      ]
    }
    myGraph.setOption(graphOptions)
    
  })
})

// Justin's added

$.getJSON(`${API_URL}/timeseries/day`, (res) => {
    const data = res.data
    const graphOptions2 = {
        title: {
            // text: 'Messages Over Time Graph',
            // subtext: 'Default layout',
            // top: 'bottom',
            // left: 'right'
        },
        tooltip: {
            position: 'top',
            formatter: function (p) {
                var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
                return format + ': ' + p.data[1];
            }
        },
        visualMap: {
            min: 0,
            max: 1000,
            calculable: true,
            orient: 'vertical',
            left: '670',
            top: 'center'
        },

        calendar: [
            {
                orient: 'vertical',
                cellSize: [20, 'auto'],
                bottom: 10,
                range: '2016'
            },
            {
                left: 300,
                cellSize: [20, 'auto'],
                bottom: 10,
                orient: 'vertical',
                range: '2017'
            },
            {
                left: 520,
                cellSize: [20, 'auto'],
                bottom: 10,
                orient: 'vertical',
                range: '2018',
                dayLabel: {
                    margin: 5
                }
            }],

        series: [{
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: timeseries(2016, data)
        }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 1,
            data: timeseries(2017, data)
        }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 2,
            data: timeseries(2018, data)
        }]
    }
    g2.setOption(graphOptions2)
})

function timeseries(year, data) {
    // var date = +echarts.number.parseDate(year + '-01-01');
    // var end = +echarts.number.parseDate((+year + 1) + '-01-01');

    var dayTime = 3600 * 24 * 1000;
    var d = []
    console.log('data:', data)
    data.forEach(day => {
        if(day._id.year !== year) return false
        d.push([`${day._id.year}-${day._id.month}-${day._id.day}`, day.count])
    })
    return d
    // for (let y in data) {
    //     if (y == year) {
    //         let dd = data[y]
    //         console.log(dd)
    //         for (var time = date; time < end; time += dayTime) {
    //             // let dd = []
    //             // dd = data[y]//.map(entry => entry.count)
    //             // let m = dd.map(entry => entry.count)
    //             // for (let i in dd) {
    //                 d.push([
    //                     echarts.format.formatTime('yyyy-MM-dd', time),
    //                     dd.count
    //                 ]);
    //             // }
    //             // d.push([
    //             //     echarts.format.formatTime('yyyy-MM-dd', time),
    //             //     data[y].count
    //             // ]);
    //         }
    //         return d;
    //     }
    // }
}