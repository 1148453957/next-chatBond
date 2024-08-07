const allyFyDomain = new URL(document.currentScript.src).origin
if (!window.location.href.includes('/iframe')) {
  const allyFyIframeChatbotId = document.currentScript.getAttribute('chatbotId')

  const inAllyfy = allyFyIframeChatbotId === 'super'

  window.allyFyIconVisible = false
  window.allyFyIframe = null
  window.allyFyIframeVisible = false
  window.allyFyUserInfo = {
    closeVisible: false,
  }
  const allyFyFetch = async (url) => {
    try {
      const response = await fetch(
        (allyFyDomain.includes('chatbond.co')
          ? 'https://chatbot.chatbond.co'
          : 'https://test-chat-bot.aecoapps.com') + url,
        {
          method: 'POST',
          body: JSON.stringify({
            appId: '102210213',
            baseInfo: {
              clientId: 'z5cn30qnwb15003lxbj25zr6af0yy823',
              pid: '38281',
              channelId: '100000',
              versionCode: 3,
              versionName: '1.0.1.1003',
              locale: navigator.language, // 浏览器语言
              localZone: Math.abs(new Date().getTimezoneOffset()), //和零时区的分钟差
              packageName: 'com.cch.allyfy.webh',
              appId: '102210213',
            },
            botId: inAllyfy ? undefined : allyFyIframeChatbotId,
          }),
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      )

      if (!response.ok) {
        // 提供更详细的错误信息
        const errorText = `Network error: ${response.status} - ${response.statusText}`
        throw new Error(errorText)
      }
      const data = await response.json()
      if (data.code != 1 || !data.data) {
        throw new Error('BotId not available')
      }
      return data
    } catch (error) {
      throw error
    }
  }
  allyFyFetch('/api/v1/bot/getBotChatInterfaceConfig')
    .then((res1) => {
      allyFyFetch('/api/v1/bot/getBotLeadsConfig')
        .then((res2) => {
          // 这里如果id出错，就不会返回数据，生成图标了，所以不用考虑，只需要考虑直接使用链接的时候，id出错的问题就行了
          window.allyFyUserInfo = Object.assign(window.allyFyUserInfo, res1.data, res2.data)
          window.allyFyUserInfo.alignChatButton = window.allyFyUserInfo.alignChatButton || 'right'
          window.allyFyUserInfo.botId = inAllyfy ? undefined : allyFyIframeChatbotId
          let div = document.createElement('div')
          div.id = 'allyFySuperIcon'
          div.style = `width: 64px;height: 64px; overflow: hidden;
                position: fixed;
                ${window.allyFyUserInfo.alignChatButton}: 20px;
                cursor: pointer;
                user-select: none;
                z-index: 2147483645; 
                bottom: 20px;border-radius: 9999px;background: ${window.allyFyUserInfo.buttonColor};`

          if (window.allyFyUserInfo.chatIcon) {
            div.innerHTML = ` <img
                      src="${window.allyFyUserInfo.chatIcon}"
                      style="width: 64px;height: 64px;object-fit: cover;"
                      onclick="addAllyFyIframeFn()"
                    />`
          } else {
            div.innerHTML = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none"
        onclick="addAllyFyIframeFn()"
        xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_147_16694)">
  <circle cx="32" cy="32" r="32" fill="#040608"/>
  <path d="M21.0248 23.715C18.0683 23.715 16.59 23.715 15.6716 24.6334V24.6334C14.7531 25.5519 14.7531 27.0301 14.7531 29.9866V42.524C14.7531 43.9951 14.7531 44.7306 15.0743 45.1518C15.3247 45.4801 15.6946 45.6964 16.1035 45.7537C16.6281 45.8272 17.2691 45.4666 18.5513 44.7453L21.0686 43.3294C21.7805 42.9289 22.1365 42.7287 22.5273 42.6263C22.918 42.524 23.3264 42.524 24.1433 42.524H34.7901C36.5769 42.524 37.4703 42.524 38.1502 42.1705C38.7224 41.8731 39.189 41.4066 39.4864 40.8344C39.8398 40.1545 39.8398 39.2611 39.8398 37.4743H27.2964C24.3399 37.4743 22.8617 37.4743 21.9432 36.5559C21.0248 35.6374 21.0248 32.1592 21.0248 29.2027V23.715Z" fill="#818283"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3755 19.1554C19.457 20.0739 19.457 21.5521 19.457 24.5086V33.1321C19.457 36.0886 19.457 37.5669 20.3755 38.4853C21.294 39.4038 22.7722 39.4038 25.7287 39.4038H38.319C39.178 39.4038 39.6074 39.4038 40.0164 39.5165C40.4254 39.6292 40.7942 39.8492 41.5318 40.2892L41.5319 40.2892L44.5345 42.0803C46.6105 43.3186 47.6485 43.9377 48.436 43.504C48.4479 43.4974 48.4597 43.4907 48.4715 43.4838C49.2474 43.0297 49.2474 41.8211 49.2474 39.4038V24.5086C49.2474 21.5521 49.2474 20.0739 48.329 19.1554C47.4105 18.2369 45.9323 18.2369 42.9758 18.2369H25.7287C22.7722 18.2369 21.294 18.2369 20.3755 19.1554ZM26.5127 31.5642C27.8116 31.5642 28.8645 30.5113 28.8645 29.2124C28.8645 27.9134 27.8116 26.8605 26.5127 26.8605C25.2138 26.8605 24.1608 27.9134 24.1608 29.2124C24.1608 30.5113 25.2138 31.5642 26.5127 31.5642ZM36.7041 29.2124C36.7041 30.5113 35.6511 31.5642 34.3522 31.5642C33.0533 31.5642 32.0004 30.5113 32.0004 29.2124C32.0004 27.9134 33.0533 26.8605 34.3522 26.8605C35.6511 26.8605 36.7041 27.9134 36.7041 29.2124ZM42.1918 31.5642C43.4907 31.5642 44.5437 30.5113 44.5437 29.2124C44.5437 27.9134 43.4907 26.8605 42.1918 26.8605C40.8929 26.8605 39.8399 27.9134 39.8399 29.2124C39.8399 30.5113 40.8929 31.5642 42.1918 31.5642Z" fill="white"/>
  </g>
  <defs>
  <clipPath id="clip0_147_16694">
  <rect width="64" height="64" fill="white"/>
  </clipPath>
  </defs>
  </svg>`
          }
          document.body.appendChild(div)
          window.allyFyIconVisible = true

          let iframe = document.createElement('iframe')
          iframe.id = inAllyfy ? 'allyFySuperBot' : 'allyFy' + allyFyIframeChatbotId
          iframe.style = `width: ${
            window.innerWidth < 400 ? 'calc(100% - 40px)' : '400px'
          };height: 75%;
                      position: fixed;
                      ${window.allyFyUserInfo.alignChatButton}: 20px;
                      z-index: 2147483645;
                      border:1px solid #e6e6e6;
                      overflow:hidden;
                      border-radius: 12px;
                      display:none;
                      bottom: 90px;`
          iframe.src = inAllyfy
            ? `${allyFyDomain}/iframe`
            : `${allyFyDomain}/iframe/${allyFyIframeChatbotId}`
          window.allyFyUserInfo.closeVisible = true
          window.allyFyIframe = iframe
          document.body.appendChild(iframe)
          if (
            (allyFyDomain.includes('chatbond.co') || allyFyDomain.includes('aecoapps.com')) &&
            window.innerWidth >= 640 &&
            Date.now() - localStorage.getItem('allyFySuperMessageTime') > 30 * 60 * 1000 
          ) {
            let message = document.createElement('div')

            message.id = 'allyFySuperMessage'
            message.style = `
  position: fixed; bottom: 90px; border-radius: 10px; font-family: sans-serif; font-size: 16px; z-index: 2147483644; 
cursor: pointer; flex-direction: column; gap: 50px; max-width: 70vw; display: block; ${window.allyFyUserInfo.alignChatButton}: 20px; 
  `
            let str = `
<div onclick="AllyFyMessageFn()" class="close-button" style="position: absolute; top: -7px; right: -7px; font-weight: bold; display: none; justify-content: center; align-items: center; z-index: 2147483643; width: 22px; height: 22px; border-radius: 50%; text-align: center; font-size: 12px; cursor: pointer; background-color: rgb(224, 224, 224); color: black; box-shadow: rgba(150, 150, 150, 0.15) 0px 6px 24px 0px, rgba(150, 150, 150, 0.15) 0px 0px 0px 1px;">✕</div>
`

            for (let index = 0; index < window.allyFyUserInfo.initialMessages.length; index++) {
              str += `<div onclick="addAllyFyIframeFn()" style="display: flex; justify-content: flex-end;"><div style="background-color: white; color: black; box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px; border-radius: 10px; padding: 20px; margin: 8px; font-size: 14px; opacity: 1; transform: scale(1); transition: opacity 0.5s ease 0s, transform 0.5s ease 0s;">${window.allyFyUserInfo.initialMessages[index]}</div></div>`
            }

            message.innerHTML = str

            document.body.appendChild(message)
            let style = document.createElement('style')
            style.innerHTML = `
  #allyFySuperMessage:hover .close-button {
    display: flex!important;
  }
`
            document.head.appendChild(style)
          }
        })
        .catch((error) => {
          console.error('error:', error)
        })
    })
    .catch((error) => {
      console.error('error:', error)
    })
  window.addEventListener('message', function (event) {
    if (event.data === '关闭allyFyIframe') {
      window['closeAllyFyIframeFn']()
    } else if (event.data === '传送allyFyUserInfo') {
      if (window.allyFyIframe) {
        window.allyFyIframe.contentWindow.postMessage(
          { allyFyUserInfo: allyFyUserInfo },
          allyFyDomain,
        )
      }
    }
  })
  window['addAllyFyIframeFn'] = function () {
    if (window.allyFyIframeVisible) {
      return
    }
    const iframe = document.getElementById(
      inAllyfy ? 'allyFySuperBot' : 'allyFy' + allyFyIframeChatbotId,
    )
    if (iframe) {
      iframe.contentWindow.postMessage({ allyFyScrollToBottom: true }, allyFyDomain)
      iframe.style.display = 'block'
      window.allyFyIframeVisible = true
    }
    window.AllyFyMessageFn()

    const div = document.getElementById('allyFySuperIcon')

    if (div) {
      div.innerHTML = `<div onclick="closeAllyFyIframeFn()" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; z-index: 2147483646;">
  <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="white" width="24" height="24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
  </svg>
  </div>`
    }
  }
  window['closeAllyFyIframeFn'] = function () {
    const iframe = document.getElementById(
      inAllyfy ? 'allyFySuperBot' : 'allyFy' + allyFyIframeChatbotId,
    )
    if (iframe) {
      iframe.style.display = 'none'
      window.allyFyIframeVisible = false
    }
    const div = document.getElementById('allyFySuperIcon')

    if (div) {
      if (window.allyFyUserInfo.chatIcon) {
        div.innerHTML = ` <img
                  src="${window.allyFyUserInfo.chatIcon}"
                  style="width: 64px;height: 64px;object-fit: cover;"
                  onclick="addAllyFyIframeFn()"
                />`
      } else {
        div.innerHTML = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none"
    onclick="addAllyFyIframeFn()"
    xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_147_16694)">
<circle cx="32" cy="32" r="32" fill="#040608"/>
<path d="M21.0248 23.715C18.0683 23.715 16.59 23.715 15.6716 24.6334V24.6334C14.7531 25.5519 14.7531 27.0301 14.7531 29.9866V42.524C14.7531 43.9951 14.7531 44.7306 15.0743 45.1518C15.3247 45.4801 15.6946 45.6964 16.1035 45.7537C16.6281 45.8272 17.2691 45.4666 18.5513 44.7453L21.0686 43.3294C21.7805 42.9289 22.1365 42.7287 22.5273 42.6263C22.918 42.524 23.3264 42.524 24.1433 42.524H34.7901C36.5769 42.524 37.4703 42.524 38.1502 42.1705C38.7224 41.8731 39.189 41.4066 39.4864 40.8344C39.8398 40.1545 39.8398 39.2611 39.8398 37.4743H27.2964C24.3399 37.4743 22.8617 37.4743 21.9432 36.5559C21.0248 35.6374 21.0248 32.1592 21.0248 29.2027V23.715Z" fill="#818283"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.3755 19.1554C19.457 20.0739 19.457 21.5521 19.457 24.5086V33.1321C19.457 36.0886 19.457 37.5669 20.3755 38.4853C21.294 39.4038 22.7722 39.4038 25.7287 39.4038H38.319C39.178 39.4038 39.6074 39.4038 40.0164 39.5165C40.4254 39.6292 40.7942 39.8492 41.5318 40.2892L41.5319 40.2892L44.5345 42.0803C46.6105 43.3186 47.6485 43.9377 48.436 43.504C48.4479 43.4974 48.4597 43.4907 48.4715 43.4838C49.2474 43.0297 49.2474 41.8211 49.2474 39.4038V24.5086C49.2474 21.5521 49.2474 20.0739 48.329 19.1554C47.4105 18.2369 45.9323 18.2369 42.9758 18.2369H25.7287C22.7722 18.2369 21.294 18.2369 20.3755 19.1554ZM26.5127 31.5642C27.8116 31.5642 28.8645 30.5113 28.8645 29.2124C28.8645 27.9134 27.8116 26.8605 26.5127 26.8605C25.2138 26.8605 24.1608 27.9134 24.1608 29.2124C24.1608 30.5113 25.2138 31.5642 26.5127 31.5642ZM36.7041 29.2124C36.7041 30.5113 35.6511 31.5642 34.3522 31.5642C33.0533 31.5642 32.0004 30.5113 32.0004 29.2124C32.0004 27.9134 33.0533 26.8605 34.3522 26.8605C35.6511 26.8605 36.7041 27.9134 36.7041 29.2124ZM42.1918 31.5642C43.4907 31.5642 44.5437 30.5113 44.5437 29.2124C44.5437 27.9134 43.4907 26.8605 42.1918 26.8605C40.8929 26.8605 39.8399 27.9134 39.8399 29.2124C39.8399 30.5113 40.8929 31.5642 42.1918 31.5642Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_147_16694">
<rect width="64" height="64" fill="white"/>
</clipPath>
</defs>
</svg>`
      }
    }
  }
  window['allyFyRemoveIcon'] = function () {
    if (window.allyFyIconVisible) {
      const div = document.getElementById('allyFySuperIcon')
      div.style.display = 'none'
      window.allyFyIconVisible = false
    }
    if (window.allyFyIframeVisible) {
      const iframe = document.getElementById('allyFySuperBot')
      iframe.style.display = 'none'
      window.allyFyIframeVisible = false
    }
  }
  window['AllyFyMessageFn'] = function () {
    const div = document.getElementById('allyFySuperMessage')
    if (div) {
      document.body.removeChild(div)
      localStorage.setItem('allyFySuperMessageTime', Date.now())
    }
  }
}
