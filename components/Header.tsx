import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  user?: { name: string | null; role: string };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium">案件を探す</Link>
            <Link href="/freelancers" className="text-gray-700 hover:text-blue-600 font-medium">フリーランサーを探す</Link>
            {user && (
              <Link href={user.role === 'CLIENT' ? '/dashboard/client' : '/dashboard/freelancer'} className="text-gray-700 hover:text-blue-600 font-medium">ダッシュボード</Link>
            )}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard"><Button variant="ghost">{user.name}</Button></Link>
                <form action="/api/auth/signout" method="POST"><Button variant="outline" type="submit">ログアウト</Button></form>
              </>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost">ログイン</Button></Link>
                <Link href="/register"><Button className="bg-blue-600 hover:bg-blue-700">無料登録</Button></Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
