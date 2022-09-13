import axios from 'axios'

// axios的实列对象
axios.get('http://123.207.32.32:8000/home/multidata').then(res => {
  console.log(res)
})

axios.defaults.baseURL = 'http://httpbin.org'

axios.all([
  axios.get('/get', {params: {name: 'why', age: 18}}),
  axios.post('/post', {data: {name: 'why', age: 18}})
]).then(res => {
  console.log(res)
})

// axios拦截器
// fn1: 请求发送成功时会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use((config) => {
  // 做想做的操作
  // 1.给请求添加token
  // 2.isLoading动画
  console.log('请求发生成功的拦截')
  return config
}, (err) => {
  console.log('请求发生错误')
})

// fn1: 数据响应成功(服务正常的返回了数据, 20x)
// fn2: 数据响应失败()
axios.interceptors.response.use((res) => {
  console.log('响应成功的拦截')
  return res
}, (err) => {
  console.log('服务器响应失败')
  return err
})
