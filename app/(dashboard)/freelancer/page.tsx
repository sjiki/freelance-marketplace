import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Star, MessageCircle } from 'lucide-react';

const mockProposals = [{ id: "1", projectTitle: "Web サイトのデザイン・開発", status: "PENDING", bidAmount: 250000, submittedAt: new Date("2026-08-12") }, { id: "2", projectTitle: "ロゴデザイン制作", status: "ACCEPTED", bidAmount: 80000, submittedAt: new Date("2026-08-08") }];

export default function FreelancerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">フリーランサーダッシュボード</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Briefcase className="w-6 h-6 text-blue-600" /></div><div><div className="text-2xl font-bold">8</div><div className="text-gray-600">提案数</div></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><Star className="w-6 h-6 text-green-600" /></div><div><div className="text-2xl font-bold">4.9</div><div className="text-gray-600">評価</div></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"><Briefcase className="w-6 h-6 text-purple-600" /></div><div><div className="text-2xl font-bold">15</div><div className="text-gray-600">成約件数</div></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"><MessageCircle className="w-6 h-6 text-yellow-600" /></div><div><div className="text-2xl font-bold">3</div><div className="text-gray-600">メッセージ</div></div></div></CardContent></Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">私の提案</h2>
            <div className="space-y-4">
              {mockProposals.map((proposal) => (
                <div key={proposal.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-2">
                    <Link href={`/projects/${proposal.id}`} className="font-semibold hover:text-blue-600">{proposal.projectTitle}</Link>
                    <Badge variant={proposal.status === 'ACCEPTED' ? 'default' : 'secondary'} className={proposal.status === 'ACCEPTED' ? 'bg-green-600' : ''}>{proposal.status === 'PENDING' ? '審査中' : '採用'}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>提案日：{new Date(proposal.submittedAt).toLocaleDateString('ja-JP')}</span>
                    <span className="font-bold text-blue-600">￥{proposal.bidAmount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
