import { bizApi } from '../utils/http'
import { filterEmptyProperties } from '@/utils/util'

function handleTemplateId(data) {
  let templateId = ''
  let { templateIdArr } = data
  if (templateIdArr && templateIdArr.length && templateIdArr.length === 2) {
    templateId = templateIdArr[1]
  }
  data.templateId = templateId
}

// 查询短信列表
export function queryEmailSmsList(options = {}) {
  options.method = 'POST'
  handleTemplateId(options.data)
  let obj = filterEmptyProperties(options.data)
  options.data = obj
  for (let key of Object.keys(obj)) {
    if (key !== 'templateIdArr') {
      options.data = obj
    }
  }
  return bizApi('/back/operate/emailSms/list', options)
}

// 查询短信类型
export function queryEmailSmsType(options = {}) {
  return bizApi('/back/operate/emailSms/getCatagoryCodes', options)
}

// 删除短信
export function deleteEmailSms(options = {}) {
  return bizApi('/back/operate/emailSms/delete', options)
}

// 查询黑名单、短信详情
export function queryEmailSmsDetail(options = {}) {
  return bizApi('/back/operate/emailSms/detail', options)
}

// 查询黑名单列表
export function queryBlackList(options = {}) {
  options.method = 'POST'
  options.data = filterEmptyProperties(options.data)
  return bizApi('/back/operate/emailSms/getBlackList', options)
}

// 操作黑名单
export function setBlacList(options = {}) {
  options.method = 'POST'
  return bizApi('/back/operate/emailSms/setBlackList', options)
}

// 详情页特殊说明
export function specialDesc(options = {}) {
  return bizApi('/back/operate/emailSms/getSpecialInfo', options)
}

// 获取模板list
export function getTemplateList(options = {}) {
  return bizApi('/back/operate/emailSms/getTemplateList', options)
}

// 获取模板详情
export function getTemplateDetail(options = {}) {
  return bizApi('/back/operate/emailSms/getTemplateDetail', options)
}

// 发送短信
const handleMsgTemplateParams = form => {
  let {
    title,
    sendType,
    sendTarget,
    groups,
    content,
    catagoryCode,
    receives,
    templateIdArr,
    variableArr
  } = form
  let templateParam = []
  let templateId = ''
  templateId = (templateIdArr && templateIdArr.length && templateIdArr[1]) || ''
  variableArr.length &&
    variableArr.forEach(item => {
      templateParam.push(form[item.name])
    })
  return {
    title,
    sendType,
    sendTarget,
    groups,
    content,
    catagoryCode,
    receives,
    templateId,
    templateParam
  }
}
export function sendMsg(options = {}) {
  options.method = 'POST'
  options.data = filterEmptyProperties(handleMsgTemplateParams(options.data))
  return bizApi('/back/operate/emailSms/send', options)
}

// 保存短信草稿
export function createMsg(options = {}) {
  options.method = 'POST'
  options.data = filterEmptyProperties(handleMsgTemplateParams(options.data))
  return bizApi('/back/operate/emailSms/save', options)
}

// 修改邮件
export function modifyMsg(options = {}) {
  options.method = 'POST'
  options.data = filterEmptyProperties(handleMsgTemplateParams(options.data))
  return bizApi('/back/operate/emailSms/update', options)
}
// 获取az mapping
export function getAzMapping(options = {}) {
  return bizApi('/back/operate/region/getAzMapping', options)
}
// 保存az mapping
export function saveAzMapping(options = {}) {
  return bizApi('/back/operate/region/saveAzMapping', options)
}
// 查询配置列表
export function getMessageList(options = {}) {
  return bizApi('/messageInner/messagePassageConfig/configList', options)
}
// 查询通道策略配置
export function getDescribeConfig(options = {}) {
  return bizApi(`/messageInner/messagePassageConfig/describeConfig/${options.id}`)
}
// 查询通道参数配置
export function getParamList(options = {}) {
  return bizApi('/messageInner/messagePassageConfig/paramList', options)
}
// 删除通道
export function delConfig(options = {}) {
  return bizApi(`/messageInner/messagePassageConfig/delConfig/${options.id}`)
}

// 添加通道策略
export function addConfig(options = {}) {
  options.method = 'POST'
  return bizApi('/messageInner/messagePassageConfig/addConfig', options)
}
// 更新通道策略配置
export function updateConfig(options = {}) {
  options.method = 'POST'
  return bizApi(`/messageInner/messagePassageConfig/updateConfig`, options)
}

// 通道测试
export function channelTesting(options = {}) {
  options.method = 'POST'
  return bizApi(`/messageInner/messagePassageConfig/debug`, options)
}
// 通道测试
export function addParam(options = {}) {
  options.method = 'POST'
  return bizApi(`/messageInner/messagePassageConfig/addParam`, options)
}
// 参数
export function modifyParams(options = {}) {
  options.method = 'POST'
  return bizApi(`/messageInner/messagePassageConfig/modifyParams`, options)
}
