<template>
  <div class='page-search'>
    <mj-form class='mj-form' :='searchFormConfig' v-model='formData'>
      <template v-slot:header>
        <p class='form-header'>搜索栏</p>
      </template>
      <template v-slot:footer>
        <div class='form-footer'>
          <el-button type='primary' @click='handleResetClick'>
            <el-icon>
              <Refresh />
            </el-icon>
            重置
          </el-button>
          <el-button type='primary' @click='handleQueryClick'>
            <el-icon>
              <Search />
            </el-icon>
            搜索
          </el-button>
        </div>
      </template>
    </mj-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import MjForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    MjForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, {emit}) {
    // 双向绑定的属性应该是由配置文件中的field来决定的
    // 1.优化一: formData中的属性应该动态的决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOrigData: any = {}
    for (const item of formItems) {
      formOrigData[item.field] = ''
    }
    const formData = ref(formOrigData)

    // 2.优化二: 当用户点击重置时清除输入框中的内容
    const handleResetClick = () => {
      // 使用双向绑定解决将formData重置的问题
      // for(const key in formOrigData) {
      //   formData.value[`${key}`] = formOrigData[key]
      // }
      formData.value = formOrigData
      emit('resetBtnClick')
    }

    // 3.优化三: 当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})

</script>

<style scoped lang='less'>
.page-search {
  .form-header {
    margin-left: 25px;
    color: red;
    text-align: left;
  }

  .form-footer {
    text-align: right;
    margin-right: 15px;
    padding-bottom: 15px;
  }
}
</style>
