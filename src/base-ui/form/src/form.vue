<template>
  <div class='mj-form'>
    <div class='header'>
      <slot name='header'></slot>
    </div>
    <el-form :label-width='labelWidth'>
      <el-row>
        <template v-for='item in formItems' :key='item.label'>
          <el-col v-bind:='colLayout'>
            <el-form-item :label='item.label' :rules-='item.rules' :style='itemStyle' v-if='!item.isHidden'>
              <template v-if='item.type === "input" || item.type === "password"'>
                <el-input :placeholder='item.placeholder' :show-password='item.type === "password"'
                          v-bind='item.otherOptions' :model-value='modelValue[`${item.field}`]'
                          @update:modelValue='handleValueChange($event, item.field)'
                ></el-input>
              </template>
              <template v-else-if='item.type === "select"'>
                <!--item.otherOptions如果有其它的属性的话全部绑定到输入框中-->
                <el-select :placeholder='item.placeholder' v-bind='item.otherOptions' style='width: 100%'
                           :model-value='modelValue[`${item.field}`]' @update:modelValue='handleValueChange($event, item.field)'>
                  <el-option v-for='option in item.options'  :value='option.value' :key='option.value'
                  >{{option.title}}</el-option>
                </el-select>
              </template>
              <template v-else-if='item.type ===  "datepicker"'>
                <el-date-picker v-bind='item.otherOptions' style='width: 100%'
                                :model-value='modelValue[`${item.field}`]' @update:modelValue='handleValueChange($event, item.field)'
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class='footer'>
      <slot name='footer'></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { IFormItem } from '../types/index'

export default defineComponent({
  name: 'mj-form',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    // 根据传入的配置来生成input，select等输入框
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 根据传入的el-form-item来决定padding
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 30px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920的屏幕上显示四个输入框
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 使用组件之间的双向绑定
    // const formData = ref({ ...props.modelValue })
    //
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //   },
    //   { deep: true }
    // )

    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', {...props.modelValue, [field]: value})
    }
    return {
      // formData
      handleValueChange
    }
  }
})

</script>

<style scoped lang='less'>
.mj-form {
  padding-top: 22px;
}

</style>
