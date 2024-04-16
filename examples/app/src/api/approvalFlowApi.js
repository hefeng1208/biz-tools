import { bizApi } from '../utils/http'
import { transferFormData } from '@/utils/util'

// 获取审批流列表
export function getFlow(options = {}) {
  options.method = 'POST'
  options.data = transferFormData(options.data)
  return bizApi('/pbs/workflow/definitions', options)
}

// 修改流程状态
export function modifyFlowStatus(options = {}) {
  options.method = 'POST'
  options.data = transferFormData(options.data)
  return bizApi('/pbs/workflow/updateProcessDefinitionStatus', options)
}
