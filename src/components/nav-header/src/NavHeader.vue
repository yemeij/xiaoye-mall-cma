<template>
  <div class='nav-header'>
    <div class='fold-menu'>
      <template v-if='isFold'>
        <el-icon @click='handleFoldClick'>
          <Expand />
        </el-icon>
      </template>
      <template v-else>
        <el-icon @click='handleFoldClick'>
          <Fold />
        </el-icon>
      </template>
    </div>
    <div class='content'>
      <!--面包屑-->
      <div>
        <mj-breadcrumb :breadcrumb='breadcrumbs'></mj-breadcrumb>
      </div>
      <div class='user-info'>
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useStore } from '@/store'
import UserInfo from '@/components/nav-header/src/user-info.vue'
import MjBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumb } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    MjBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, context) {
    let isFold = ref(false)

    // 面包屑的数据 [{name: '', path: ''}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const useMenus = store.state.loginModule.userMenus
      const route = useRoute()
      const currentPath = route.path
     return pathMapBreadcrumb(useMenus, currentPath)
    })

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      context.emit('foldChange', isFold.value)
    }
    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})

</script>

<style scoped lang='less'>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    display: flex;
  }

  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
  }
}
</style>
