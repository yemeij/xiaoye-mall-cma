import mjRequest from '../index'

import { IAccount, ILoginResult } from './type'
import { IDataType } from '@/service/types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',  // 用法: /users/id(动态id)
  UserMenus = '/role/'   // 用法: role/id(动态id)/menu
}

export function accountLoginRequest(account: IAccount) {
  return mjRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
    showLoading: false
  })
}

export function requestUserInfoById(id: number) {
  return mjRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenuById(id: number) {
  return mjRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
