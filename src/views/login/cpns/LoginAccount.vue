<template>
  <div class='login-account'>
    <el-form
      ref='ruleLoginFormRef'
      :rules='rulesLoginForm'
      :model='loginForm'
      label-width='60px'
      class='demo-ruleForm'
      status-icon
    >
      <el-form-item label='账号:' prop='name'>
        <el-input v-model='loginForm.name' />
      </el-form-item>
      <el-form-item label='密码:' prop='password'>
        <el-input v-model='loginForm.password' show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'   // 这里的ElForm主要是为了拿到它的类型
import localCache from '@/utils/cache'

import { rulesLoginForm } from '../config/account-config'

export default defineComponent({
  setup() {
    const store = useStore()

    // 登录表单
    const loginForm = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const ruleLoginFormRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      ruleLoginFormRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否要记住密码的操作
          if (isKeepPassword) {
            // 对账号和密码进行本地缓存
            localCache.setCache('name', loginForm.name)
            localCache.setCache('password', loginForm.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.开始进行登录验证
          store.dispatch('loginModule/accountLoginAction', { ...loginForm })
        }
      })
    }

    return {
      loginForm,
      rulesLoginForm,
      loginAction,
      ruleLoginFormRef
    }
  }
})

</script>

<style scoped>

</style>
