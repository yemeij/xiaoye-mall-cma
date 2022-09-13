<template>
  <div class='user'>
    <div class='search'>
      <!--引用自己封装的公用的表单组件: 高级检索-->
      <page-search :search-form-config='searchFormConfig' @resetBtnClick='handleResetClick'
                   @queryBtnClick='handleQueryClick'></page-search>
      <!--  表格展示数据区域-->
      <page-content :contentTableConfig='contentTableConfig' page-name='users' right-add-btn-name='新建用户'
                    ref='pageContentRef' @newBtnClick='handleNewData' @editBtnClick='handleEditData'></page-content>
      <!--  展示新建用户弹出框-->
      <page-modal :defaultInfo='defaultInfo' :modal-config='modalConfigRef' ref='pageModalRef'
                  pageName='users' dialog-title='新建用户'></page-modal>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content-config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // pageModal相关的hooks逻辑,当点击新建按钮时回调newCallback函数将password这一输入框给显示出来
    // 1.处理密码输入框是否显示的逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(item => item.field === 'password')
      passwordItem!.isHidden = false
    }
    // pageModal相关的hooks逻辑,当点击新建按钮时回调newCallback函数将password这一输入框给隐藏起来
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(item => item.field === 'password')
      passwordItem!.isHidden = true
    }

    // 2.动态添加角色列表/部门列表
    const store = useStore()
    // 由于在请求部门/角色列表的数据是异步请求,在页面进行刷新时,请求的数据还没拿到,所以此时部门/角色输入框中展示的还是之前写死的modal.config的配置
    // 所以要将之前modal.config的配置要用computed包裹成一个响应式对象
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(item => item.field === 'departmentId')
      departmentItem!.options = store.state.entireDepartment.map(item => {
        return {title: item.name, value: item.id}
      })
      const roleItem = modalConfig.formItems.find(item => item.field === 'roleId')
      roleItem!.options = store.state.entireRole.map(item => {
        return {title: item.name, value: item.id}
      })
      return modalConfig
    })

    // 3.调用hooks获取公共的变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,   // 搜索栏的配置
      contentTableConfig, // 表格展示的配置
      modalConfigRef,        // 弹出框中的配置
      defaultInfo,
      pageContentRef,
      pageModalRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped lang='less'>
.user {

}
</style>
