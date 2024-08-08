import { http } from './index'
const botDomain = process.env.NEXT_PUBLIC_API_HOST
const iapDomain = process.env.NEXT_PUBLIC_PAY_HOST

/**获取商品列表 */
export const getGoodsListApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/subscriptions/queryProductList', params)
}
/**stripe下单 */
export const createOrderApi = (params = {}) => {
  return http({
    url: `${iapDomain}/stripe/createOrder`,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    withoutBaseInfo:true
  })
}
/**stripe订阅 */
export const createPortalSessionApi = (params = {}) => {
  return http({
    url: `${iapDomain}/stripe/createPortalSession`,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    withoutBaseInfo:true
  })
}

/**paypal支付 */
export const createOrderPaypal = async (params: any) => {
  return http({
    url: `${iapDomain}/paypal/createSubscription`,
    method: 'post',
    data: params,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/x-www-form-urlencoded',
    },
    withoutBaseInfo:true
  })
}
/**paypal退订 */
export const unsubsribeOrderPaypal = async (params: any) => {
  return http.post(botDomain + '/api/v1/subscriptions/paypal/cancel', params)
}
