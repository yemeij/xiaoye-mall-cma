<template>
  <div class='login-panel'>
    <h1 class='title'>后台管理系统</h1>
    <el-tabs type='border-card' class='demo-tabs' stretch v-model='currentTab'>
      <el-tab-pane name='account'>
        <template #label>
        <span class='custom-tabs-label'>
          <el-icon><UserFilled /></el-icon>
          <span>账号登录</span>
        </span>
        </template>
        <login-account ref='accountRef'></login-account>
      </el-tab-pane>
      <el-tab-pane name='phone'>
        <template #label>
        <span class='custom-tabs-label'>
          <el-icon><PhoneFilled /></el-icon>
          <span>手机登录</span>
        </span>
        </template>
        <login-phone ref='phoneRef'></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class='account-controller'>
      <el-checkbox v-model='isKeepPassword'>记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type='primary' size='large' class='loginButton' @click='handleLoginClick'>立即登录</el-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import LoginAccount from '@/views/login/cpns/LoginAccount.vue'
import LoginPhone from '@/views/login/cpns/LoginPhone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()   // 可以获取一个组件导出的对象类型(可以拿到导出的组件)
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()   // 可以获取一个组件导出的对象类型(可以拿到导出的组件)
    const currentTab = ref('account')

    // 2.定义办法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      }else {
        phoneRef.value?.phoneLogin(isKeepPassword.value)
      }
    }

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})

</script>

<style scoped lang='less'>
.login-panel {
  width: 320px;
  margin-bottom: 120px;

  .title {
    text-align: center;
  }
  .account-controller {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .loginButton {
    width: 100%;
    margin-top: 5px;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

</style>
