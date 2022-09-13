/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any

// 声明/views/main/system/user/User.vue下的组件
declare let userPath = '@/views/main/system/user/user.vue'
declare let rolePath = '@/views/main/system/role/role.vue'

// 为了让ts能够识别文件的类型模块,先声明文件
declare module '*.json'


