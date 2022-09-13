import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

// 引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
// 引入element-plus图标
import * as Elicons from '@element-plus/icons-vue'


import App from './App.vue'

import router from './router/index'
import store from './store/index'
import { setupStore } from './store'
import { registerApp } from './global/index'
// import './service/axios_demo'
import mjRequest from './service/index'
import { AxiosResponse } from 'axios'


const app = createApp(App)

//全局注册elementplus icon
Object.keys(Elicons).forEach((key) => {
  app.component(key, Elicons[key as keyof typeof Elicons])
})


registerApp(app)    // 按需引入注册element-plus组件(element-plus官方推荐的插件会自动按需导入)
app.use(store)
setupStore()
app.use(router)


app.mount('#app')










// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// 对单独的请求进行拦截
// mjRequest.request({
//   url: 'home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptors: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptors: (res) => {
//       console.log('单独响应的res')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any,
//   returnCode: string,
//   success: boolean
// }
//
// mjRequest.get<DataType>({
//   url: 'home/multidata'
// }).then(res => {
//   console.log(res.data)
// })


