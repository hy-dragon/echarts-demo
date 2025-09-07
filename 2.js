const monthLabelSeries = {
  name: 'monthLabels',
  type: 'custom',
  coordinateSystem: 'cartesian2d',
  data: Array.from({ length: 12 }, (_, index) => {
    const monthStart = new Date(2025, index, 1)
    const monthEnd = new Date(2025, index + 1, 1)
    const midTime = (monthStart.getTime() + monthEnd.getTime()) / 2
    return {
      value: [new Date(midTime), 0],
      monthIndex: index + 1,
      monthStart: monthStart,
      monthEnd: index < 11 ? monthEnd : new Date(2025, 11, 31)
    }
  }),
  renderItem: function (params, api) {
    const currentPoint = api.coord([params.value[0], params.value[1]])
    const { monthStart, monthEnd, monthIndex } = params.dataItem
    
    // 计算月份区间的实际像素宽度
    const startPixel = api.coord([monthStart, 0])
    const endPixel = api.coord([monthEnd, 0])
    const intervalWidth = Math.abs(endPixel[0] - startPixel[0])
    
    return {
      type: 'group',
      children: [
        // 背景矩形
        {
          type: 'rect',
          position: [currentPoint[0] - intervalWidth/2, currentPoint[1] - 35],
          shape: {
            width: intervalWidth - 2,
            height: 25
          },
          style: {
            fill: '#E0B2ED',
            opacity: 0.8,
            borderRadius: 5
          }
        },
        // 文本标签
        {
          type: 'text',
          position: [currentPoint[0], currentPoint[1] - 22],
          style: {
            text: `${monthIndex}月`,
            fontSize: 13,
            fontWeight: 'bold',
            fill: '#000',
            align: 'center',
            verticalAlign: 'middle'
          }
        }
      ]
    }
  },
  silent: true, // 禁用交互
  z: 10
}

// 将这个系列添加到 series 数组中
const series = [monthLabelSeries, ...projectSeries]
