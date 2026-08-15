import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> ホームに戻る
          </Link>

          <Card>
            <CardHeader><CardTitle className="text-2xl text-center">ログイン</CardTitle></CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">メールアドレス</label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">パスワード</label>
                  <Input type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">ログイン</Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600 mb-2">アカウントをお持ちでない方は <Link href="/register" className="text-blue-600 hover:underline ml-1">無料登録</Link></p>
                <Link href="/forgot-password" className="text-blue-600 hover:underline text-xs">パスワードをお忘れの方</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
