interface IPageQueryInfo {
  currentPage: number,
    size: number
}

export interface ISystemState {
  pageQueryInfo: IPageQueryInfo,
  usersList: any[]
  usersCount: number,
  roleList: any[],
  roleCount: number,
  goodsList: any[],
  goodsCount: number,
  menuList: any[],
  menuCount: number
}
