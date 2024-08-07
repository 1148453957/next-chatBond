import PinyinMatch from 'pinyin-match'
import md5 from 'md5'
import dayjs from 'dayjs'

import type { SelectProps } from 'ant-design-vue'

export const upImg = {
  AppID: '27d69495',
  AppKey: 'e748a17565aad2210b872e868b6e69e7',
}

export const uuid = () => Number(Math.random().toString().substring(2) + Date.now()).toString(36)

export const uuid2 = (len = 10) => {
  const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let id = ''
  for (let l = 0; l < len; l++) id += c.charAt(~~(Math.random() * 62))
  return id
}

export const filterLableFn: SelectProps['filterOption'] = (input, option) => {
  const res = PinyinMatch.match(option?.label ?? option?.value, input)
  return Boolean(res)
}

type FilterOptionType = Parameters<Exclude<SelectProps['filterOption'], boolean | undefined>>[1]
export const selectFilterFn = (input: string, option: FilterOptionType, labelKey: string) => {
  return filterLableFn(input, { label: option![labelKey] })
}

export const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)

export const scrollToId = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      block: 'start',
      inline: 'center',
      behavior: 'smooth',
    })
  }
}

const generateRandomAlphaNum = (len: number) => {
  let rdmString = ''
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substring(2));
  return rdmString.substring(0, len)
}

export const sign = (key: string) => {
  const now = new Date().getTime()
  const salt = generateRandomAlphaNum(6)
  const signature = md5(now + key + salt)
  return `${signature},${now},${salt}`
}

export const placeImg =
  'data:image/png;base64,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'

export const copyText = (text = '') => {
  return new Promise((resolve, reject) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text)
        resolve(text)
        return
      }
      const input = document.createElement('textarea')
      input.setAttribute('readonly', 'readonly')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      resolve(text)
    } catch (error) {
      reject(error)
    }
  })
}

export const datePresetsFn = ({ showToday = false } = {}) => {
  const subDay = showToday ? 0 : 1
  const end = dayjs().subtract(subDay, 'day')
  return [
    ...(showToday ? [{ label: '今天', value: [dayjs(), dayjs()] }] : []),
    { label: '昨天', value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')] },
    { label: '最近七天', value: [dayjs(end).subtract(6, 'day'), end] },
    {
      label: '上周',
      value: [dayjs().startOf('week').subtract(7, 'day'), dayjs().endOf('week').subtract(7, 'day')],
    },
    { label: '最近一月', value: [dayjs(end).subtract(1, 'month').add(1, 'day'), end] },
    {
      label: '上月',
      value: [
        dayjs().subtract(1, 'month').startOf('month'),
        dayjs().subtract(1, 'month').endOf('month'),
      ],
    },
    ...(dayjs().day() === 1 && !showToday
      ? []
      : [{ label: '本月', value: [dayjs().startOf('month'), end] }]),
    { label: '最近三月', value: [dayjs(end).subtract(3, 'month').add(1, 'day'), end] },
  ]
}

export const kvToOptions: (kv: AnyObject) => NonNullable<SelectProps['options']> = (kv) => {
  return Object.keys(kv).map((key) => ({ label: kv[key], value: key }))
}
//转换md5
export function getDataMd5(bytes: any) {
  try {
    const md6 = md5(bytes)
    return md6
  } catch (error) {
    return null
  }
}

//转换字节数组
export function to_butter(str: any) {
  const bytes = []
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i))
  }
  return bytes
}

//获取上传签名
export function getSignatureButter(params: any) {
  const sortedKeys = Object.keys(params).sort()
  let builder = ''

  for (const key of sortedKeys) {
    builder += key + '=' + params[key]
  }

  builder += '1q2w3e4r5t6y7u8i9o0p'

  return getDataMd5(builder)
}
//获取上传签名
export function getSignature(params: any) {
  const sortedKeys = Object.keys(JSON.parse(params)).sort()

  let builder = ''

  for (const key of sortedKeys) {
    builder += key + '=' + JSON.stringify(JSON.parse(params)[key])
  }

  builder += '1q2w3e4r5t6y7u8i9o0p'
  console.log(builder, 'builder')

  return getDataMd5(builder)
}

export const getSignatureParams = (params: AnyObject) => {
  const data = Object.assign({}, params)
  const keys = Object.keys(data).sort()
  const signArr: string[] = []
  keys.forEach((key) => {
    const val = data[key]
    if (val !== undefined && key !== 'baseInfo') {
      signArr.push(`${key}=${data[key]}`)
    }
  })
  data.signature = md5(signArr.join('&'))
  return data
}

export const yhSetLocalStorage = (params: object) => {
  const currentInfo = JSON.parse(localStorage.getItem('yhxs_custom_info') + '')
  localStorage.setItem('yhxs_custom_info', JSON.stringify({ ...currentInfo, ...params }))
}

export const yhGetLocalStorage = () => {
  return JSON.parse(localStorage.getItem('yhxs_custom_info') + '') || {}
}

export const yhRemoveLocalStorage = (key: string) => {
  const snapInfo = JSON.parse(localStorage.getItem('yhxs_custom_info') + '')
  delete snapInfo[key]
  localStorage.setItem('yhxs_custom_info', JSON.stringify(snapInfo))
}

export const getUrlParam = (name: string) => {
  const hash = location?.hash.split('#')[1] ?? location.search
  const qs = hash.substring(1)
  const searchParams = new URLSearchParams(qs)
  return searchParams.get(name) ?? ''
}
/**生成独一无二的state，用于重定向回来的时候比较使用，防止csrf攻击 */
export function generateCryptoRandomState(): string {
  const randomValues = new Uint8Array(16) // 生成 16 字节的随机值
  window.crypto.getRandomValues(randomValues)

  // 使用直接转换字符的方式避免类型问题
  const utf8String = Array.from(randomValues, (byte) => String.fromCharCode(byte)).join('')

  // Base64 编码
  const base64String = btoa(utf8String)

  // 清理 Base64 编码后的字符串，以符合 URL 安全的要求
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
