import { createStore, Store, useStore as useVuexStore } from 'vuex'

import loginModule from './login/login'
import systemModule from '@/store/main/system/system'
import dashboardModule from '@/store/main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

import { IRootStore, IStoreType } from './type'

const store = createStore<IRootStore>({
  state() {
    return {
      name: 'coderwhy',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    // 1.发送网络请求所有的部门数据和角色数据哈角色数据
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', { offset: 0, size: 1000 })
      const {list: departmentList} = departmentResult.data
      const roleResult = await getPageListData('/role/list', { offset: 0, size: 1000 })
      const {list: roleList} = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const {list: menuList} = menuResult.data

      // 2.保存请求到的部门和员工的数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginModule,
    systemModule,
    dashboardModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')

  // 这个办法调用是要一定在token先拿到后去请求数据(有时可能会出现token还没保存起来就去请求初始化数据就会请求不到数据)
  // store.dispatch('getInitialDataAction')
}

// vuex与ts类型检测的办法
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}


export default store
