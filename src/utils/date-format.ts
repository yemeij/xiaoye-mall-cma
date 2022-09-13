import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'  // 支持utc时间格式的转换要导入的包

dayjs.extend(utc)

// 将utc时间格式化
export function formatUtcString(utcString: string, format: string) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
