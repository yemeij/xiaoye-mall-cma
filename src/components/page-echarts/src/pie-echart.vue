<template>
  <div class='pie-echart'>
    <base-echaret :options='options'></base-echaret>
  </div>
</template>

<script lang='ts' setup>
// defineExpose函数让父组件拿到子组件中的函数进行调用
import { defineProps, defineExpose, computed } from 'vue'
import BaseEcharet from '@/base-ui/echart'
import {IDataType} from '../types'

const props = defineProps<{
  pieData: IDataType[]
}>()

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})

</script>

<style scoped>

</style>
