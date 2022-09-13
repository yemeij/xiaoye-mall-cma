<template>
  <div class='role'>
    <page-search :search-form-config='searchFormConfig'></page-search>
    <page-content page-name='role' :content-table-config='contentTableConfig' right-add-btn-name='新建角色'
                  @newBtnClick='handleNewData' @editBtnClick='handleEditData'></page-content>
    <page-modal ref='pageModalRef' page-name='role' :modal-config='modalConfig'
                :default-info='defaultInfo' dialog-title='新建角色' :other-info='otherInfo'>
      <div class='menu-tree'>
        <el-tree
          ref='elTreeRef'
          :data='menus'
          show-checkbox
          node-key='id'
          :props="{children: 'children', label: 'name'}"
          @check='handleCheckChange'
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'

import { ElTree } from 'element-plus'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content-config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 1.处理pageModalhooks
    // 拿到pageModal中的menuList数据(为了让el-tree做回显操作)
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      // 等elTree组件的ref挂载后在进行数据的回显
      nextTick(() => {
        console.log(elTreeRef.value)
        // 设置el-tree的回显显示
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    // 新建角色时给角色分配角色名称
    const otherInfo = ref({})
    // 每当选择el-tree中的某个复选框时就会回调此函数
    const handleCheckChange = (data1: any, data2: any) => {
      // data1: 对应的是menus数组被选中的那一个对象
      // data2: 对应的是menus整个数组数据
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      pageModalRef,
      elTreeRef,
      defaultInfo,
      menus,
      otherInfo,
      handleNewData,
      handleEditData,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang='less'>
.menu-tree {
  margin-left: 20px;
}
</style>
