import { openApi } from '../utils/http'

const PREFIX = '/user/'
// 查询注册可用区配置（运营后台使用）
export function queryRegRegion(options = {}) {
  return openApi(`${PREFIX}queryRegRegion`, options)
}
// 新增/修改注册可用区配置
export function saveRegAzMapping(options = {}) {
  options.method = 'POST'
  return openApi(PREFIX +`saveRegAzMapping`, options)
}
// 查询注册可用区详情
export function queryRegAzMappingDetail(options = {}) {
  return openApi(PREFIX +'queryRegAzMappingDetail', options)
}
// 查询地域
export function queryRegion(options = {}) {
  return openApi('/resourcecenter/queryAzMappingForUc', options)
}
// 用户可用区配置详情
export function queryUserAzDetail(options = {}) {
  return openApi('/user/queryUserAzDetail', options)
}
export function saveUserAzMapping(options = {}) {
  options.method = 'POST'
  return openApi('/user/saveUserAzMapping', options)
}
