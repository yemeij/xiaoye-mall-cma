import { useStore } from '@/store'

/*
*   pageName 要验证那个模块中的权限
*   permissionName 权限的名称
* */
export function usePermission(pageName: string, permissionName: string) {
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  const verifyPermission = `system:${pageName}:${permissionName}`
  // 判断该用户是否具备该权限,如果有则返回true
  // !!语法
  // name = 'coderwhy'
  // !name -> false
  // !!name -> true
  return !!permissions.find(item => item === verifyPermission)
}
