// import { useEventBus } from '@vueuse/core'
// const bus = useEventBus(redeemCodeName) // 在setup中使用会自动卸载
// bus.on(() => { })
// bus.emit()

export const redeemCodeName = Symbol('兑换码')
