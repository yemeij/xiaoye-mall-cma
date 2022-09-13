import mjRequest from '@/service'

import { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return mjRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return mjRequest.delete<IDataType>({
    url: url
  })
}

// 新建用户
export function createPageData(url: string, newData: any) {
  return mjRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑用户
export function editPageData(url: string, editData: any) {
  return mjRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
