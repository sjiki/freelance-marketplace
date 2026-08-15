import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
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
            <CardHeader><CardTitle className="text-2xl text-center">無料登録</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button variant="outline" className="border-blue-600 bg-blue-50 hover:bg-blue-100">クライアントとして登録</Button>
                <Button variant="outline">フリーランサーとして登録</Button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">メールアドレス</label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">お名前</label>
                  <Input type="text" placeholder="山田太郎" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">パスワード</label>
                  <Input type="password" placeholder="8 文字以上" minLength={8} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">パスワード（確認）</label>
                  <Input type="password" placeholder="もう一度入力してください" required />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">会員登録する</Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">すでにアカウントをお持ちの方は <Link href="/login" className="text-blue-600 hover:underline ml-1">ログイン</Link></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
