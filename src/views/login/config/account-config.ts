// 登录的验证表单
export const rulesLoginForm = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-z0-9]{5,10}$/, message: '长度在 5 ~ 10 个字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 ~ 12 个字符之间', trigger: 'blur' }
  ]
}

