<template>
  <div class="echarts-wrap1">
    <mpvue-echarts :echarts="echarts"
                   :onInit="onInit"
                   canvasId="demo-canvas1" />
  </div>
</template>

<script>
import echarts from '../../static/js/echarts.min'
import mpvueEcharts from 'mpvue-echarts'

let chart = null

function initChart (canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  let curveData = wx.getStorageSync('curveData')
  let data
  let threshold
  if (curveData) {
    data = curveData.data
    threshold = curveData.threshold
  }
  let one = 0
  let two = 0
  let three = 0
  if (threshold) {
    one = threshold[0]
    two = threshold[1]
  }
  let xa = []
  let ya = []
  for (let key in data) {
    if (key) {
      xa.push(key)
      ya.push(data[key])
    }
  }
  if (ya.length > 0) {
    ya.sort(function (a, b) {
      return a - b
    })
    three = ya[ya.length - 1]
    if (three <= two) {
      three = two - one + two
    }
  }
  var option = {
    xAxis: {
      type: 'category',
      data: xa
    },
    yAxis: {
      type: 'value',
      name: '单位:(度)',
      nameLocation: 'end'
    },
    grid: {
      left: '50',
      top: '30'
    },
    visualMap: {// 区间内控制显示颜色
      show: false,
      dimension: 1,
      pieces: [
        { gte: two, lte: three, color: '#ff9137' },
        { gte: one, lte: two, color: '#fef472' },
        { gte: 0, lte: one, color: '#77bf66' }
      ]
    },
    series: [{
      data: ya,
      type: 'line',
      areaStyle: {},
      symbol: 'none'
    },
    {
      type: 'line',
      data: [one],
      color: '#77bf66',
      markLine: {
        data: [
          { type: 'average' }
        ]
      }
    },
    {
      type: 'line',
      data: [two],
      color: '#fef472',
      markLine: {
        data: [
          { type: 'average' }
        ]
      }
    },
    {
      type: 'line',
      data: [three],
      color: '#ff9137',
      markLine: {
        data: [
          { type: 'average' }
        ]
      }
    }]
  } // ECharts 配置项

  chart.setOption(option)

  return chart // 返回 chart 后可以自动绑定触摸操作
}

export default {
  components: {
    mpvueEcharts
  },
  data () {
    return {
      echarts,
      onInit: initChart
    }
  }
}
</script>

<style scoped>
.echarts-wrap1 {
  width: 100%;
  height: 600rpx;
}
</style>