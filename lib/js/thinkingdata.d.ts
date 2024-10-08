declare module 'thinkingdata-browser' {
  function init(param: object): void
  function trackLink(dom: any, eventName: String, eventProperties: any): void
  function track(eventName: String): void
  function track(eventName: String, eventProperties: object): void
  function track(eventName: String, eventProperties: object, eventTime: any): void
  function track(eventName: String, eventProperties: object, eventTime: any, callback: any): void
  function initInstance(name: String, param: object): void
  function login(accountId: String): void
  function setPageProperty(obj: any): void
  function getPageProperty(): any
  function getPresetProperties(): PresetProperties
  function logout(): void
  function logout(isChangeId: boolean): void
  function userSet(userProperties: any, callback, any): void
  function userSet(userProperties: any): void
  function userSetOnce(userProperties: any, callback: any): void
  function userSetOnce(userProperties: any): void
  function userUnset(property: any, callback: any): void
  function userUnset(property: any): void
  function userAdd(userProperties: any, callback: any): void
  function userAdd(userProperties: any): void
  function userAppend(userProperties: any, callback: any): void
  function userAppend(userProperties: any): void
  function userUniqAppend(userProperties: any, callback: any): void
  function userUniqAppend(userProperties: any): void
  function flush(): void
  function userDel(callback: any): void
  function userDel(): void
  function trackUpdate(taEvent: any): void
  function trackOverwrite(taEvent: any): void
  function trackFirstEvent(taEvent: any): void
  function identify(id: any): void
  function getDistinctId(): String
  function getDeviceId(): String
  function setSuperProperties(superProperties: any): void
  function getSuperProperties(): any
  function clearSuperProperties(): void
  function unsetSuperProperty(propertyName: String): void
  function setDynamicSuperProperties(dynamicProperties: any): void
  function timeEvent(eventName: String): void
  function quick(type: String, properties: any): void
  function quick(type: String): void
  function enableTracking(enabled: boolean): void
  function optOutTracking(): void
  function optInTracking(): void
  function setTrackStatus(config: any): void
}

declare class PresetProperties {
  toEventPresetProperties(): any
}
