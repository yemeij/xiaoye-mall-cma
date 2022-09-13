<template>
  <div class='base-echart'>
    <div ref='echartDivRef' :style='{width: width, height: height}'></div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

// 在setup中怎样定义props,并且使用ts中的类型检测
// withDefaults用来设置在props中传入的数据的默认值
const props = withDefaults(defineProps<{
  options: EChartsOption
  width?: string
  height?: string
}>(), {
  width: '100%',
  height: '360px'
})

const echartDivRef = ref<HTMLElement>()

// 初始化echart实列
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})

</script>

<style scoped>

</style>
