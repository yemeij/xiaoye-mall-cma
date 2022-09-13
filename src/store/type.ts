import { ILoginState } from './login/type'
import { ISystemState } from '@/store/main/system/types'
import {IDashboardState} from './main/analysis/type'

// 规定RootState中的类型
export interface IRootStore {
  name: string,
  age: number,
  entireDepartment: any[],
  entireRole: any[],
  entireMenu: any[]
}

// 这个是为了能够知道当前模块的类型（如LoginModule模块的类型）
export interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
  dashboardModule: IDashboardState
}

export type IStoreType = IRootStore & IRootWithModule
