import { Module } from 'vuex'
import { ElMessage } from 'element-plus'

import { accountLoginRequest, requestUserInfoById, requestUserMenuById } from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenuToPermissions } from '@/utils/map-menus'
import router from '@/router'

import { IAccount } from '@/service/login/type'
import { IRootStore } from '../type'
import { ILoginState } from './type'

const loginModule: Module<ILoginState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {      // 修改state中的数据时最好都通过mutations
    changeToken(state, token: string) {
      state.token = token
    },
    // 登录成功后将获取到的用户的数据保存起来
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 保存用户菜单数据
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 获取到userMenus的数据后将userMenu映射到routes中 获取到的数据中只有type=2时才需要做路由的映射
      const routes = mapMenusToRoutes(userMenus)

      // 将routes添加到router.main.children中
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户具备哪些按钮的权限
      const permissions = mapMenuToPermissions(userMenus)
      state.permissions = permissions

    }
  },
  actions: {
    // 实现账号密码登录
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录的逻辑
      const loginResult = await accountLoginRequest(payload)
      if (loginResult.code != 0) {
        return ElMessage.error({
          message: '登录失败'
        })
      }
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 在确定token一定有值的情况下去调用在根的store中的getInitialDataAction办法(store/index.ts/getInitialDataAction)
      // 发送初始化的网络请求(完整的role/department)
      dispatch('getInitialDataAction', null, {root: true})

      // 2.登录成功后请求用户的信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)   // 缓存用户信息

      // 3.获取当前登录的用户拥有哪些权限(首页左侧的菜单)
      const userMenusResult = await requestUserMenuById(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳转到首页中
      router.push('/main')
      ElMessage.success({
        message: '登录成功'
      })
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的网络请求(完整的role/department)
        dispatch('getInitialDataAction', null, {root: true})
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    // 实现手机号码的登录
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行了phoneLoginAction', payload)
    }
  }
}

export default loginModule
