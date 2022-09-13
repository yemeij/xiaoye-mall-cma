import * as echarts from 'echarts'
import {EChartsOption} from 'echarts'

import ChinaMapData from '../data/china.json'

// 注册绘制中国地图
echarts.registerMap('china', ChinaMapData)

export default function(el: HTMLElement) {
  // 创建echart实列
  const echartInstance = echarts.init(el, 'light', {renderer: 'svg'})

  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  // 监听浏览器中宽度(窗口)变化的办法
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  // 使用元组的方式导出的话[a, b, c] 在导入时也要一一对应的导入[a, b, c] 而使用对象的话则直接结构出来想要的就行
  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
