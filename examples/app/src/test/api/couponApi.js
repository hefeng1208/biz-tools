import { openApi } from '@/utils/http'
import { filterEmptyProperties } from '@/utils/utils'
import { handleCouponSubmitParams } from '@/hooks/useParameterProcessing'
import { openApiMethodPreHook } from '@/utils/helper'
export function createCoupon(params) {
  const { discount, contractCompany, customerType, payType } = params
  let supplementData = {
    discount,
    contractCompany,
    customerType,
    payType
  }
  let resultData = handleCouponSubmitParams(params)
  resultData = { ...resultData, ...supplementData }
  resultData = filterEmptyProperties(resultData)
  const data = openApiMethodPreHook({
    couponBatchVo: {
      ...resultData
    }
  })
  return openApi('/coupon/createCouponBatch', data)
}
export function applyCouponBatch(params) {
  const { discount, contractCompany, customerType, payType } = params
  let supplementData = {
    discount,
    contractCompany,
    customerType,
    payType
  }
  let resultData = handleCouponSubmitParams(params)
  resultData = { ...resultData, ...supplementData }
  resultData = filterEmptyProperties(resultData)
  const data = openApiMethodPreHook({
    couponBatchVo: {
      ...resultData
    }
  })
  return openApi('/coupon/applyCouponBatch', data)
}
export function describeProjectsInfo(params) {
  const data = openApiMethodPreHook({
    businessId: params
  })
  return openApi('/coupon/describeProjectsInfo', data)
}
export function describeProductsByCode(params) {
  const data = openApiMethodPreHook({
    projectCode: params
  })
  return openApi('/coupon/describeProductsByCode', data)
}
export function describeContractListByCrmId(params) {
  const data = openApiMethodPreHook({
    crmId: params
  })
  return openApi('/coupon/describeContractListByCrmId', data)
}
export function queryCouponDetail(number) {
  const data = openApiMethodPreHook({
    couponInfoVo: {
      number
    }
  })
  return openApi('/coupon/queryCouponDetail', data)
}
