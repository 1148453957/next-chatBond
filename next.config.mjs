/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXT_PUBLIC_RUN_ENV: process.env.NEXT_PUBLIC_RUN_ENV,
    NEXT_PUBLIC_ACC_HOST: process.env.NEXT_PUBLIC_ACC_HOST,
    NEXT_PUBLIC_PAY_HOST: process.env.NEXT_PUBLIC_PAY_HOST,
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  },
};

export default nextConfig;
