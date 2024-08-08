import { appId } from './index'
import qs from 'qs'
const accountDomain = process.env.NEXT_PUBLIC_ACC_HOST
import axios from 'axios'
const http = axios.create({
  withCredentials: true,
})
const randomStr = (length = 8) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

/**谷歌登录 */
export const loginByGoogle = (params = {}) => {
  return http.post(
    `${accountDomain}/v2/user/register`,
    qs.stringify({
      ...params,
      app_id: appId,
      cr: randomStr(16),
    }),
  )
}

/**邮箱注册,获取验证码 */
export function emailRegister(params: any) {
  return http.post(
    `${accountDomain}/v2/user/register`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
      cr: randomStr(16),
    }),
  )
}
/**邮箱注册,验证验证码 */
export function emailVerifyCode(params: any) {
  return http.post(
    `${accountDomain}/v2/user/verifycode`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
    }),
  )
}

/**邮箱登录 */
export function emailLogin(params: any) {
  return http.post(
    `${accountDomain}/v2/user/login`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
      cr: randomStr(16),
    }),
  )
}

/**重置密码,获取验证码 */
export function resetPassword(params: any) {
  return http.post(
    `${accountDomain}/v2/user/forget_pwd`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
      cr: randomStr(16),
    }),
  )
}
/**重置密码,验证验证码 */
export function resetPasswordVerifyCode(params: any) {
  return http.post(
    `${accountDomain}/v2/user/reset_pwd`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
    }),
  )
}
/**退出登录 */
export const logout = (params = {}) => {
  return http.post(
    `${accountDomain}/v2/user/logout`,
    qs.stringify({
      ...params,
      account_type: 7,
      app_id: appId,
    }),
  )
}
/**修改用户信息 */
export const updateAccountApi = (params = {}) => {
  return http.post(`${accountDomain}/api/v1/account/update`, params)
}
/**删除用户 */
export const deleteAccountApi = (params = {}) => {
  return http.post(`${accountDomain}/api/v1/account/delete`, params)
}
