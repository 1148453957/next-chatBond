import { base_info, http } from './index'
const botDomain = process.env.NEXT_PUBLIC_API_HOST

// 智能体模板
export const getAgentTemplate = (params = {}) => {
  return http.post(botDomain + '/v2/agent/getAgentTemplate', params)
}

// 删除资源
export const deleteFileApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/deleteFileResource', params)
}
// 创建智能体
export const createRobotApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/createBot', params)
}
export const trainBotApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/trainBot', params)
}
// 智能体列表
export const robotListApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/getBotList', params)
}
// 智能体详情
export const getBotInfoApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/getBotDetail', params)
}
// 智能体详情里提示词分类
export const getBotInfoConfigApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/instructions/config', params)
}
/**智能体弹窗各种详情,不需要session check */
export const getSuperBotInfoApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/getBotChatInterfaceConfig', params)
}
/**智能体弹窗leads详情 */
export const getLeadsBotInfoApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/getBotLeadsConfig', params)
}
/**智能体弹窗新增leads数据 */
export const addLeadsApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/addLeads', params)
}
/** help页面 问题分类接口 */
export const supportConfigApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/support/config', params)
}
/** help页面 表单提交接口 */
export const supportSubmitApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/support/submit', params)
}
// 智能体详情
export const getBotSourceApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/getBotSources', params)
}
/**训练智能体，上传网站接口 */
export const websiteAnalysis = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/websiteAnalysis', params)
}
/**训练智能体，获取notion回答结果 */
export const getNotionList = (params = {}) => {
  return http.post(botDomain + '/nt/notion/resource', params)
}

// 修改智能体
export const updateBotApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/updateBot', params)
}
// 删除智能体
export const deleteBotApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/deleteBot', params)
}
// 聊天记录
export const chatHistoryApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/message/message/list', params)
}
// 会话列表
export const getMessageListApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/message/session/list', params)
}
// 报表
export const getDashboardApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/message/message/dashboard', params)
}

// 用户信息
export const getUserInfoApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/account/query', {
    ...params,
    baseInfo: base_info,
  })
}
/**用户界面，新增apikey */
export const addApiKeyApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/account/create/apiKey', {
    ...params,
    baseInfo: base_info,
  })
}

// 对话导出
export const exportLogsList = (data: any) => {
  return http.post(botDomain + '/api/v1/message/export', data, { responseType: 'blob' })
}
// leads导出
export const exportLeadsList = (data: any) => {
  return http.post(botDomain + '/api/v1/bot/leads/export', data, { responseType: 'blob' })
}
// leads列表
export const getLeadsListApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/bot/queryLeadsList', params)
}

/**聊天请求接口 */
export const fetchChatApi = (source: string, opts = {} as any, cb = (() => { }) as any) => {
  let requestUrl: any, referrer: any
  if (source === 'chatbot') {
    // 官网chatbot页面调用获取文本回答
    requestUrl = `${botDomain}/api/v1/message/stream/instation/chat`
    referrer = window.location.origin
  } else if (source === 'super') {
    // 官网右下角超级机器人获取文本回答
    requestUrl = `${botDomain}/api/v1/message/stream/super/chat`
    referrer = window.location.origin
  } else if (source === 'iframe') {
    // 被分享出去，在别人的网站中使用的时候，调用的接口
    requestUrl = `${botDomain}/api/v1/message/stream/chat`
    referrer = document.referrer
  }
  fetch(
    new Request(requestUrl, {
      method: 'POST',
      body: JSON.stringify({
        ...opts,
        baseInfo: base_info,
      }),
      credentials: 'include',
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'application/json;charset=utf-8',
        referrer, // 在这里设置 referrer
      },
    }),
  )
    .then((res) => {
      if (res.status !== 200) throw res
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let resAllStr = '' // 返回的所有字符串
      const readFn = () => {
        reader?.read().then(({ value, done }) => {
          let str = '', // 页面展示的字符串
            sessionId = '', //会话id
            sessionName = '', //会话名称
            messageId = '', //聊天id
            code = '' //code状态码
          if (value) {
            const dstr = decoder.decode(value).trim()
            resAllStr += dstr
          }
          if (resAllStr) {
            const lines = resAllStr.split('data:')
            for (const line of lines) {
              if (line != '[DONE]') {
                const strObj = line.trim()
                if (strObj) {
                  let content = ''
                  let data
                  try {
                    data = JSON.parse(strObj)
                  } catch (error) {
                    console.log('解析出错了-----', strObj)
                  }
                  content = data?.content ?? ''
                  if (content && content !== '[DONE]') {
                    str += content
                  }
                  sessionId = data?.sessionId
                  sessionName = data?.sessionName
                  messageId = data?.messageId
                  code = data?.code
                }
              }
            }
          }
          // 每次流解析完显示  或者流结束
          cb(done, {
            text:
              str.trim() ||
              (done ? 'The intelligent model is currently busy, please try again later' : ''),
            sessionId,
            sessionName,
            messageId,
            code,
          })
          if (!done) {
            readFn()
          }
        })
      }
      readFn()
    })
    .catch((err) => {
      console.log('err: ', err)
      if (err?.name === 'AbortError') {
        // 停止生成
        return
      }
      cb(true, { text: 'Request interface failed, please try again later' })
    })
}

export const installSlackApi = (params = {}) => {
  return http.post(botDomain + '/slk/install', params)
}

/**获取changelog列表 */
export const getChangelogListApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/changelog/list', params)
}

/**获取blog列表 */
export const getBlogListApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/blog/list', params)
}

/**获取某篇blog详情 */
export const getBlogDetailApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/blog/detail', params)
}

/**兑换码兑换 */
export const exchangeApi = (params = {}) => {
  return http.post(botDomain + '/api/v1/exchange', params)
}