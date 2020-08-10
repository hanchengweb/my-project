<template>
  <div class="echarts-wrap2">
    <mpvue-echarts :echarts="echarts"
                   :onInit="onInit"
                   canvasId="demo-canvas" />
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
  let powerData = wx.getStorageSync('powerData')
  let data
  let xa = []
  let ya = []
  data = powerData
  for (let key in data) {
    if (key) {
      xa.push(key.substring(11, 16))
      ya.push(data[key])
    }
  }

  var option = {
    xAxis: {
      type: 'category',
      data: xa
    },
    yAxis: {
      type: 'value',
      name: '单位:(kw)'
    },
    grid: {
      left: '40',
      top: '30'
    },
    series: [{
      data: ya,
      type: 'line',
      color: 'blue',
      symbol: 'none'
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
.echarts-wrap2 {
  width: 94%;
  padding: 0 3%;
  height: 600rpx;
}
</style>