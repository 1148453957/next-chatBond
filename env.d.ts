declare module "*.less";
interface ImportMetaEnv {
  readonly VITE_RUN_ENV: 'local' | 'test' | 'prod'| 'dev'
  readonly VITE_ACC_HOST: 'local' | 'test' | 'prod'| 'dev'
  readonly VITE_PAY_HOST: 'local' | 'test' | 'prod'| 'dev'
  readonly VITE_API_HOST: 'local' | 'test' | 'prod'| 'dev'
}

declare module 'vditor/dist/method.min'
declare module 'vue'
declare module 'ant-design-vue'

declare type AnyObject = Record<string, any>
declare module 'seedrandom'
declare module 'jsrsasign'
declare module 'crypto-js'
declare module '@lk77/vue3-color'
declare module '@tiptap/extension-text-align'
declare module '@tiptap/extension-underline'
declare module '@tiptap/extension-link'
declare module 'markdown-it-deflist'
import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    withoutBaseInfo?: boolean;
    headers?: AxiosHeaders & {
      appId?: string;
      packageName?: string;
    };
  }
}