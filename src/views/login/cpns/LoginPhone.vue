<template>
  <div class='login-phone'>
    <el-form
      ref='phoneLoginFormRef'
      :model='phoneLoginForm'
      :rules='phoneRulesForm'
      label-width='80px'
      class='demo-ruleForm'
    >
      <el-form-item label='手机号' prop='phone'>
        <el-input v-model='phoneLoginForm.phone' />
      </el-form-item>
      <el-form-item label='验证码' prop='code'>
        <el-row :gutter='10'>
          <el-col :span='11'>
            <el-input size='large' v-model='phoneLoginForm.code'></el-input>
          </el-col>
          <el-col :span='12'>
            <el-button type='primary' size='large'>获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'


export default defineComponent({
  setup() {
    // 手机登录表单
    const store = useStore()
    const phoneLoginForm = reactive({
      phone: '',
      code: ''
    })
    const phoneLoginFormRef = ref<InstanceType<typeof ElForm>>() // ElForm的组件实列

    const phoneLogin = (isKeepPassword: boolean) => {
      phoneLoginFormRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch('loginModule/phoneLoginAction', { ...phoneLoginForm })
        }
      })
    }

    // 手机登录的验证规则
    const phoneRulesForm = {
      phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        {
          pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
          message: '格式不正确',
          trigger: 'blur'
        }
      ],
      code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '请输入长度为6位的验证码', trigger: 'blur' }
      ]
    }

    return {
      phoneLoginForm,
      phoneRulesForm,
      phoneLoginFormRef,
      phoneLogin
    }
  }
})

</script>

<style scoped>

</style>
