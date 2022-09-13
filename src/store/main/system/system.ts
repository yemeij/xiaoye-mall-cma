import { Module } from 'vuex'
import { IRootStore } from '@/store/type'
import { ISystemState } from './types'

import { getPageListData, deletePageData, createPageData, editPageData } from '@/service/main/system/system'


const systemModule: Module<ISystemState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      // page-search搜索栏中的条件查询信息
      pageQueryInfo: {
        currentPage: 1,
        size: 10
      },
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    // 获取表格所需要展示的数据
    pageListData(state) {
      return (pageName: string) => {
        // 根据传递过来的pageName再去state中返回相对应pageName的数据
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   break
        //   case 'role':
        //     return state.roleList
        //     break
        // }
      }
    },
    // 获取表格要展示的总数据条数
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 请求数据的地方
    async getPageListActions({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.对获取到的结果进行处理存储到state中
      const { list, totalCount } = pageResult.data

      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)

      // switch (pageName) {
      //   case 'users':
      //     commit(`changeUserList`, list)
      //     commit(`changeUserCount`, totalCount)
      //     break
      //   case 'role':
      //     commit(`changeRoleList`, list)
      //     commit(`changeRoleCount`, totalCount)
      //     break
      // }
    },

    // 删除数据操作
    async deletePageDataAction({ state, dispatch }, payload: any) {
      // 1.获取pageName和id
      // pageName -> /users
      // id ->/users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 2.调用网络请求
      await deletePageData(pageUrl)

      // 3.根据pageQueryInfo重新获取表格中的列表数据
      dispatch('getPageListActions', {
        pageName,
        queryInfo: {
          offset: (state.pageQueryInfo.currentPage - 1) * state.pageQueryInfo.size,
          size: state.pageQueryInfo.size
        }
      })
    },
    // 新建用户的网络请求
    async createPageDataAction({ state, dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      // 2.重新获取表格中的列表数据
      dispatch('getPageListActions', {
        pageName,
        queryInfo: {
          offset: (state.pageQueryInfo.currentPage - 1) * state.pageQueryInfo.size,
          size: state.pageQueryInfo.size
        }
      })
    },
    // 编辑用户的网络请求
    async editPageDataAction({state, dispatch}, payload: any) {
      // 1.编辑数据的请求
      const {pageName, editData, id} = payload
      console.log(editData)
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      // 2.重新获取表格中的列表数据
      dispatch('getPageListActions', {
        pageName,
        queryInfo: {
          offset: (state.pageQueryInfo.currentPage - 1) * state.pageQueryInfo.size,
          size: state.pageQueryInfo.size
        }
      })
    }
  }
}

export default systemModule
