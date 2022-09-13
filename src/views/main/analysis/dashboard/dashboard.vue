<template>
  <div class='dashboard'>
    <el-row :gutter='10'>
      <el-col :span='7'>
        <mj-card title='分类商品数量(饼图)'>
          <pie-echart :pie-data='categoryGoodsCount'></pie-echart>
        </mj-card>
      </el-col>
      <el-col :span='10'>
        <mj-card title='不同城市商品销量'>
          <map-echart :map-data='addressGoodsSale'></map-echart>
        </mj-card>
      </el-col>
      <el-col :span='7'>
        <mj-card title='分类商品数量(玫瑰图)'>
          <rose-echart :rose-data='categoryGoodsCount'></rose-echart>
        </mj-card>
      </el-col>
    </el-row>
    <el-row :gutter='10' class='content-row'>
      <el-col :span='12'>
        <mj-card title='分类商品销量'>
          <line-echart v-bind='categoryGoodsSale'></line-echart>
        </mj-card>
      </el-col>
      <el-col :span='12'>
        <mj-card title='分类商品收藏)'>
          <bar-echart v-bind='categoryGoodsFavor'></bar-echart>
        </mj-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import MjCard from '@/base-ui/card/index'

import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from '@/components/page-echarts/index'


export default defineComponent({
  name: 'dashboard',
  components: {
    MjCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboardModule/getDashboardDataAction')
    // 饼图数据/ 玫瑰图数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboardModule.categoryGoodsCount.map((item: any) => {
        return {name: item.name, value: item.goodsCount}
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboardModule.categoryGoodsSale
      for(const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return {xLabels, values}
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboardModule.categoryGoodsFavor
      for(const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return {xLabels, values}
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboardModule.addressGoodsSale.map((item: any) => {
        return {name: item.address, value: item.count}
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
