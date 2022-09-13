<template>
  <div class='page-modal'>
    <el-dialog v-model='dialogVisible' :title='dialogTitle' width='30%' center destroy-on-close>
      <mj-form v-bind='modalConfig' v-model='formData'></mj-form>
      <slot></slot>
      <template #footer>
            <span class='dialog-footer'>
              <el-button @click='dialogVisible = false'>取消</el-button>
              <el-button type='primary' @click='handleConfirmClick'>确定</el-button>
            </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import {useStore} from 'vuex'

import MjForm from '@/base-ui/form'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    dialogTitle: {
      type: String,
      default: ''
    }
  },
  components: {
    MjForm
  },
  setup(props) {
    let dialogVisible = ref(false)    // 控制弹出对话框是否可见
    const formData = ref<any>({})           // 弹出框中双向绑定的表单对象

    watch(() => props.defaultInfo, (newValue) => {
      for (const item of props.modalConfig.formItems) {
        formData.value[`${item.field}`] = newValue[`${item.field}`]
      }
    })

    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      // 区分是否是新建用户的按钮还是编辑按钮的确定
      if (Object.keys(props.defaultInfo).length) {
        // 如果有值的情况下则是编辑功能
        console.log('编辑用户')
        store.dispatch('systemModule/editPageDataAction', {
          pageName: props.pageName,
          editData: {...formData.value, ...props.otherInfo},
          id: props.defaultInfo.id
        })
      }else {
        // 新建功能
        console.log('新建用户')
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          newData: {...formData.value, ...props.otherInfo}
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})

</script>

<style scoped>

</style>
