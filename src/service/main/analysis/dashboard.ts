// 获取商品统计的数据
import mjRequest from '@/service'

enum DashboardApi {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor  = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale',
}

export function getCategoryGoodsCount() {
  return mjRequest.get({
    url: DashboardApi.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return mjRequest.get({
    url: DashboardApi.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return mjRequest.get({
    url: DashboardApi.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return mjRequest.get({
    url: DashboardApi.addressGoodsSale
  })
}
