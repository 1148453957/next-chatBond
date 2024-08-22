/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXT_PUBLIC_RUN_ENV: process.env.NEXT_PUBLIC_RUN_ENV,
    NEXT_PUBLIC_ACC_HOST: process.env.NEXT_PUBLIC_ACC_HOST,
    NEXT_PUBLIC_PAY_HOST: process.env.NEXT_PUBLIC_PAY_HOST,
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  },
  reactStrictMode: false,// 关闭严格模式，避免渲染两次
  eslint: {
    ignoreDuringBuilds: true, // 忽略构建时的 ESLint 错误
  },
  typescript: {
    ignoreBuildErrors: true, // 忽略构建时的 typescript 错误
  },
};

export default nextConfig;
