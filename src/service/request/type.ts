// 定义拦截器的接口
import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface MJRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (config: any) => any
  responseInterceptorsCatch?: (err: any) => any
}

interface MJRequestConfig extends AxiosRequestConfig{
  interceptors?: MJRequestInterceptors
  showLoading?: boolean
}

export {
  MJRequestInterceptors,
  MJRequestConfig
}
