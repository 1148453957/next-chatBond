import { defineConfig, presetUno, presetAttributify } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import { presetScrollbarHide } from 'unocss-preset-scrollbar-hide'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx(),
    presetScrollbar(),
    presetScrollbarHide(),
  ],
  transformers: [transformerDirectives()],
  shortcuts: {
    fcc: 'flex justify-center items-center',
  },
})
