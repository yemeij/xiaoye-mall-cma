class LocalCache {
  // 设置缓存数据
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  // 获取缓存数据
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  // 根据key删除本地缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  // 清空本地缓存数据
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
