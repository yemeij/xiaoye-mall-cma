<template>
  <div class='user-info-dropdown'>
    <el-dropdown>
    <span class='el-dropdown-link'>
      <el-avatar class='avatar' :size="20" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <span class='username'>{{name}}</span>
      <el-icon class='el-icon--right'>
        <arrow-down />
      </el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Avatar /></el-icon>
            <span>用户信息</span>
          </el-dropdown-item>
          <el-dropdown-item @click='logoutClick'>
            <el-icon><CircleClose /></el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import {useStore} from '@/store'
import { ElMessage } from 'element-plus'

import localCache from '@/utils/cache'

export default defineComponent({
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.loginModule.userInfo.name)

    const logoutClick = () => {
      localCache.deleteCache('token')
      router.push({
        path: '/login'
      })
      ElMessage.warning({
        message: '你已退出登录~'
      })
    }
    return {
      name,
      logoutClick
    }
  }
})

</script>

<style scoped lang='less'>
.el-dropdown-link {
  display: flex;
  align-items: center;
  .username {
    margin-left: 3px;
  }
}
</style>
