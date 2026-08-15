import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Trophy, Clock, Users, Plus, Search } from 'lucide-react';

const mockContests = [{ id: "c1", title: "ロゴデザイン制作", description: "新規サービスのロゴデザインを制作していただける方を募集しています。", prizeAmount: 50000, deadline: new Date("2026-08-30"), entries: 15, client: { name: "株式会社テック" }, status: "OPEN" }, { id: "c2", title: "Web サイトのトップページデザイン", description: "モダンで洗練されたデザインのトップページを制作してください。", prizeAmount: 100000, deadline: new Date("2026-09-15"), entries: 23, client: { name: "スタートアップ A" }, status: "OPEN" }, { id: "c3", title: "キャラクターイラスト制作", description: "ゲームに使用するキャラクターのイラストを 5 点制作してください。", prizeAmount: 80000, deadline: new Date("2026-08-25"), entries: 31, client: { name: "ゲーム会社 B" }, status: "OPEN" }];

export default function ContestsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-50"><div className="container mx-auto px-4 py-3"><div className="flex items-center justify-between"><Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link><nav className="hidden md:flex items-center gap-6"><Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium">案件を探す</Link><Link href="/contests" className="text-blue-600 font-medium">コンペ</Link></nav><div className="flex items-center gap-3"><Link href="/login"><Button variant="ghost">ログイン</Button></Link><Link href="/register"><Button className="bg-blue-600 hover:bg-blue-700">無料登録</Button></Link></div></div></div></header>
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12"><div className="container mx-auto px-4"><div className="max-w-3xl mx-auto text-center"><h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3"><Trophy className="w-8 h-8" /> デザインコンペ</h1><p className="text-lg mb-6">複数のクリエイターから提案を募集。最優秀作品に報酬を支払います。</p><Button className="bg-white text-purple-600 hover:bg-gray-100"><Plus className="w-4 h-4 mr-2" /> 新規コンペを投稿</Button></div></div></section>
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-3 mb-8"><Input placeholder="コンペを検索..." className="max-w-md" /><Button className="bg-blue-600 hover:bg-blue-700"><Search className="w-4 h-4 mr-2" /> 検索</Button></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockContests.map((contest) => (
            <Card key={contest.id} className="hover:shadow-lg transition overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center"><Trophy className="w-16 h-16 text-purple-400" /></div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2"><Link href={`/contests/${contest.id}`}><h3 className="font-semibold hover:text-blue-600">{contest.title}</h3></Link><Badge className="bg-purple-600">募集中</Badge></div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{contest.description}</p>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Trophy className="w-4 h-4 text-yellow-500" /><span className="font-bold text-yellow-600">￥{contest.prizeAmount.toLocaleString()}</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Clock className="w-4 h-4" /><span>締切：{new Date(contest.deadline).toLocaleDateString('ja-JP')}</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4" /><span>{contest.entries}件のエントリー</span></div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">エントリーする</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-8"><Button variant="outline" size="sm" disabled>前へ</Button><Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button><Button variant="outline" size="sm">2</Button><Button variant="outline" size="sm">3</Button><Button variant="outline" size="sm">次へ</Button></div>
      </main>
    </div>
  );
}
