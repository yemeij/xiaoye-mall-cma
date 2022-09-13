// service统一的出口
import MJRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

// axios实列
const mjRequest = new MJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {     // 实列的拦截器
    requestInterceptors: (config) => {
      console.log('请求成功的拦截')
      let token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptors: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorsCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

// axios实列
// export const mjRequest2 = new MJRequest()

export default mjRequest
