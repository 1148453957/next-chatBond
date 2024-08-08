import { base_info, signKey } from '@/api'
import CryptoJS from 'crypto-js'
import jsrsasign from 'jsrsasign'

export const CryptoEncrypt = (message: any) => {
  const encrypted = CryptoJS.DES.encrypt(message, CryptoJS.enc.Utf8.parse(getHttpDesKey()), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}

const getHttpDesKey = () => {
  const var1 = new Uint8Array([97, 35, 112, 36, 117, 94, 115, 38])
  const var0 = new TextDecoder().decode(var1)
  return var0
}

export const baseEncryption = () => {
  const info: any = base_info
  let builder = ''
  for (const key of Object.keys(info)) {
    builder += key + '=' + info[key] + '&'
  }
  builder = builder.slice(0, -1)
  const oneStep = CryptoEncrypt(builder)
  const threeStep = oneStep.replace(/\+/g, ' ')
  const fourStep = encodeURI(threeStep)
  return fourStep
}

export const encodeSign = (data: any) => {
  let str = ''
  for (const key of Object.keys(data).sort()) {
    str += key + '=' + data[key]
  }
  const key = signKey
  const snapSign = '-----BEGIN PRIVATE KEY-----\n' + key + '/n' + '-----END PRIVATE KEY-----'
  const rsa = jsrsasign.KEYUTIL.getKey(snapSign) // 创建Signature对象，设置签名编码算法
  // let rsa = KEYUTIL.getKey(snapSign) // 创建Signature对象，设置签名编码算法
  const sig = new jsrsasign.KJUR.crypto.Signature({ alg: 'SHA1withRSA' })
  // var sig = new KJUR.crypto.Signature({ alg: 'SHA1withRSA' })
  sig.init(rsa)
  sig.updateString(str)
  const hSig = jsrsasign.hextob64(sig.sign())
  return hSig
}
