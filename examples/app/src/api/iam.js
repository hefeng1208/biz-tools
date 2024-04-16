import { openApi } from '@/utils/http'

const PREFIX = '/iam/'
export default {
  // detachSubUserPolicy(options = {}) {
  //   options.method = 'DELETE'
  //   return openApi(PREFIX + 'detachSubUserPolicy', options)
  // },
  detachGroupPolicy(options = {}) {
    options.method = 'DELETE'
    return openApi(`${PREFIX}detachGroupPolicy`, options)
  },
  detachRolePolicy(options = {}) {
    options.method = 'DELETE'
    return openApi(PREFIX + `detachRolePolicy`, options)
  },
  describeSubUsers(options = {}) {
    return openApi(PREFIX + 'describeSubUsers', options)
  },
  // describeGroups(options = {}) {
  //   return openApi(PREFIX + 'describeGroups', options)
  // },
  // describeRoles(options = {}) {
  //   return openApi(PREFIX + 'describeRoles', options)
  // },
  // describePolicies(options = {}) {
  //   return openApi(PREFIX + 'describePolicies', options)
  // },
  // describeAttachedSubUserPoliciesScope(options = {}) {
  //   options.method = 'POST'
  //   return openApi(PREFIX + 'describeAttachedSubUserPoliciesScope', options)
  // },
  // describeAttachedGroupPoliciesScope(options = {}) {
  //   options.method = 'POST'
  //   return openApi(PREFIX + 'describeAttachedGroupPoliciesScope', options)
  // },
  // describeRolePoliciesScope(options = {}) {
  //   options.method = 'POST'
  //   return openApi(PREFIX + 'describeRolePoliciesScope', options)
  // }
}
