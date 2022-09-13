import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routerFiles = require.context('../router/main', true, /\.ts/)  // require.context webpack的函数
  routerFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]) // 对路径进行处理 ./system/user/user.ts处理后/system/user/user
    allRoutes.push(route.default)
  })

  // 2.在根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}

export function pathMapBreadcrumb(userMens: any, currentPath: string) {
  let breadcrumbs: IBreadcrumb[] = []
  pathMapMenu(userMens, currentPath, breadcrumbs)
  return breadcrumbs
}


// 根据当前的url路径获取当前的menu菜单(然后又拿到当前菜单的id作为屏幕加载时要显示的当前页面)
export function pathMapMenu(userMens: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMens) {
    if (menu.type === 1) {
      const findMenu = pathMapMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({name: findMenu.name})
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}


// 这个是做面包屑时查找的menu
// export function pathMapBreadcrumb(userMens: any, currentPath: string) {
//   let breadcrumbs: IBreadcrumb[] = []
//   for (const menu of userMens) {
//     if (menu.type === 1) {
//       const findMenu = pathMapMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         breadcrumbs.push({name: findMenu.name, path: findMenu.url})
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
//   return breadcrumbs
// }
//
//
// // 根据当前的url路径获取当前的menu菜单(然后又拿到当前菜单的id作为屏幕加载时要显示的当前页面)
// export function pathMapMenu(userMens: any[], currentPath: string): any {
//   for (const menu of userMens) {
//     if (menu.type === 1) {
//       const findMenu = pathMapMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

export function mapMenuToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      }else if(menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export function menuMapLeafKeys(menuList: any) {
  const leafKeys: number[] = []

  // 获取在角色菜单点击编辑按钮时展示当前树结构被选中的最后一层的节点
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      }else {
        leafKeys.push(menu.id)
      }
    }
  }
  // 调用递归函数
  _recurseGetLeaf(menuList)

  return leafKeys
}

export { firstMenu }
