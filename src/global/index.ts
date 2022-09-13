import { App } from 'vue'

import {registerElement} from './register-element'
import registerProperties from '@/global/register-properties'

export function registerApp(app: App): void {
  // registerElement(app)  // 实现elemen-plus按需引用(使用官方推荐的自动导入的话则不需要实现这个办法)
  app.use(registerProperties)
}
