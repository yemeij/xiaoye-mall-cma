import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MJRequestConfig, MJRequestInterceptors } from './type'
import { ElLoading, ElMessage } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true //根据这个常量的值判断showLoading是否显示

class MJRequest {
  // 每次实列化axios时同时创建一个新的axios的实列
  instance: AxiosInstance
  interceptors?: MJRequestInterceptors
  // showLoading?: boolean // 不确定用户有没有传递过来showLoading的值的情况下(值为undefined)
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: MJRequestConfig) {
    // 创建axios实列
    this.instance = axios.create(config)

    // 保存基本的信息
    // this.showLoading = config.showLoading  // 不确定用户有没有传递过来showLoading的值的情况下(值为undefined)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING   // 不确定用户有没有传递过来showLoading的值的情况下,直接给showLoading赋值为true(默认为true)
    this.interceptors = config.interceptors

    // 从config中取出的拦截器都是对应的实列中才有的拦截器
    this.instance.interceptors.request.use(this.interceptors?.requestInterceptors, this.interceptors?.requestInterceptorsCatch)
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptors, this.interceptors?.responseInterceptorsCatch)

    // 全局拦截器(所有的实列都有拦截器)
    this.instance.interceptors.request.use((config) => {
      console.log('所有的实列都有的拦截器: 请求成功拦截')
      // 根据用户传递过来的showLoading来决定是否显示加载动画
      if (this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: '数据请求中...',
          background: 'rgba(0, 0, 0, 0.5)'
        })
      }
      return config
    }, (err) => {
      console.log('所有的实列都有的拦截器: 请求失败拦截')
      return err
    })

    this.instance.interceptors.response.use((res) => {
      console.log('所有的实列都有的拦截器: 响应成功拦截')
      // 将loading给移除掉
      this.loading?.close()
      const data = res.data
      // 根据返回的数据判断数据是否能正确的返回
      // if (data.code != '0') {
      //   ElMessage.error({
      //     message: '数据请求失败!'
      //   })
      // } else {
      //   if (data.data.token) {
      //     ElMessage.success({
      //       message: '登录成功'
      //     })
      //   } else {
      //     ElMessage.success({
      //       message: '数据请求成功~'
      //     })
      //   }
      //   return data
      // }
      return data
    }, (err) => {
      console.log('所有的实列都有的拦截器: 响应失败拦截')
      // 将loading给移除掉
      this.loading?.close()
      // 列子: 判断不同的HttpErroeCode显示不同的错误信息
      if (err.response.status === 404) {
        console.log('404错误~')
      }
      return err
    })
  }

  // 封装请求函数
  request<T = any>(config: MJRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 这个是每一次请求都有自己的请求拦截(通常用不到)
      // if (config.interceptors?.requestInterceptors) {
      //   config = config.interceptors.requestInterceptors(config)
      // }
      // 判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance.request<any, T>(config).then(res => {
        // 单个请求对数据的处理
        // 这个是每一次请求都有自己的响应拦截(通常用不到)
        if (config.interceptors?.responseInterceptors) {
          res = config.interceptors.responseInterceptors(res)
        }
        // 将showLoading设置为默认值(不然影响下次请求)
        this.showLoading = DEFAULT_LOADING
        resolve(res)
      }).catch(err => {
        // 将showLoading设置为默认值(不然影响下次请求)
        this.showLoading = DEFAULT_LOADING
        reject(err)
        return err
      })
    })
  }

  // get请求
  get<T = any>(config: MJRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  // post请求
  post<T = any>(config: MJRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  // delete请求
  delete<T = any>(config: MJRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  // patch请求
  patch<T = any>(config: MJRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MJRequest
