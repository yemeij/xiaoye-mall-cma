import {App} from 'vue'

import { formatUtcString } from '@/utils/date-format'


const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value: string, format: string = DATE_TIME_FORMAT) {
      return formatUtcString(value, format)
    }
  }
}
