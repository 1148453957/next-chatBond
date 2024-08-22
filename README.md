
1. 翻译成中文，然后页面报错，html的lang变成了zh-cn，alt的翻译也报错了
2. 无论是在服务端请求数据，还是在客户端请求数据，中间都得loading，没差啊感觉？如果在服务端渲染页面，这个时候报错了怎么办？返回500的页面？
3. `<Link>`标签，并且是跳转本网站的链接，如header里面的，都会在页面加载的时候进行预加载的，`?_rsc=xxx`

# chatbond

- 开发环境地址：https://dev-bot.aecoapps.com/
- 测试环境地址：https://test-bot.aecoapps.com/
- 生产环境地址：https://www.chatbond.co/

本地开发连测试接口

1. 修改本地host 127.0.0.1 test-bot.aecoapps.com
2. 本地地址 http://test-bot.aecoapps.com/

## public

1. doc文档说明

- `doc/*` doc文档的协议，原版，内容更改后转成html的
- doc协议在线转成html：https://convertio.co/zh/

2. 脚本说明

- `iframeBefore.js` 客服网站里机器人分享时，生成script标签用的
- `wordPressBefore.js` wordPress制作的网页里，右下角直接加载机器人用的
- `wordPressSpecialBefore.js` wordPress相关代码，应后端要求添加的，他们自己使用
- 在线代码混淆地址：https://obfuscator.io/#code





This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
