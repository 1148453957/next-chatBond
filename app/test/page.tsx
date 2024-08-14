import { auth, signOut } from '@/auth';

export default async function UserPage() {

  // 从session中获取登录信息
  const session = await auth();

  return (
    <div>
      这是测试页面
    </div>
  )
}