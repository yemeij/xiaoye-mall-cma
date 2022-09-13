import { App } from 'vue'

import { ElButton } from 'element-plus'
import { ElInput } from 'element-plus'

const components = [
  ElButton,
  ElInput
]

export function registerElement(app: App): void {
  for (let component of components) {
    app.component(component.name, component)
  }
}

