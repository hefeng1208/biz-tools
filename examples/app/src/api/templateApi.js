import { bizApi } from '../utils/http'
import { filterEmptyProperties } from '@/utils/util'

// 查询业务编码列表
export function describeSmsMessageSourceList(options = {}) {
  return bizApi('/ucmanage/message/describeSmsMessageSourceList', options)
}

// 查询消息类型列表
export function describeSmsAccountConfigList(options = {}) {
  return bizApi('/ucmanage/message/describeSmsAccountConfigList', options)
}

// 查询消息类型列表
export function describeDomesticSmsAccountConfigList(options = {}) {
  return bizApi('/ucmanage/message/describeDomesticSmsAccountConfigList', options)
}

// 根据条件查询消息列表
export function describeSmsTemplateByConditions(options = {}) {
  return bizApi('/ucmanage/message/describeSmsTemplateByConditions', options)
}

// 查询消息详情
export function describeSmsMessageTemplateDetail(options = {}) {
  return bizApi('/ucmanage/message/describeSmsMessageTemplateDetail', options)
}

// 更新模板内容
export function updateSmsMessageTemplate(options = {}) {
  options.method = 'POST'
  return bizApi('/ucmanage/message/updateSmsMessageTemplate', options)
}

// 添加模板内容
export function createSmsMessageTemplate(options = {}) {
  options.method = 'POST'
  options.data = filterEmptyProperties(options.data)
  return bizApi('/ucmanage/message/createSmsMessageTemplate', options)
}

// 查询通知名称列表
export function describeCategoryNameList(options = {}) {
  return bizApi('/ucmanage/message/describeCategoryNameList', options)
}

// 查询父级通知名称列表
export function describeParentCategoryNameList(options = {}) {
  return bizApi('/ucmanage/message/describeParentCategoryNameList', options)
}

// 根据条件查询通知列表
export function describeCategoryByConditions(options = {}) {
  return bizApi('/ucmanage/message/describeCategoryByConditions', options)
}

// 查询通知详情
export function describeCategoryDetail(options = {}) {
  return bizApi('/ucmanage/message/describeCategoryDetail', options)
}

// 更新通知模板
export function updateMessageCategory(options = {}) {
  options.method = 'POST'
  return bizApi('/ucmanage/message/updateMessageCategory', options)
}

// 添加通知模板
export function createMessageCategory(options = {}) {
  options.method = 'POST'
  options.data = filterEmptyProperties(options.data)
  return bizApi('/ucmanage/message/createMessageCategory', options)
}

// 启用通知模板
export function enabledMessageCategory(options = {}) {
  options.method = "PUT"
  return bizApi('/ucmanage/message/enabledMessageCategory', options)
}

// 禁用通知模板
export function disabledMessageCategory(options = {}) {
  options.method = "DELETE"
  return bizApi('/ucmanage/message/disabledMessageCategory', options)
}
