// 1.方式一: 手动切换不同的环境
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'
//
// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

// 2.方式二: 根据process.env.NODE_ENV
// 开发环境下的值: development
// 生成环境时的值: production
// 测试花环境时值: test
let BASE_URL = ''
const TIME_OUT = 1000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
}else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/production'
}else {
  BASE_URL = 'http://coderwhy.org/test'
}

export {
  BASE_URL,
  TIME_OUT
}
