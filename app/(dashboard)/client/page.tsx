import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MessageCircle, Plus } from 'lucide-react';

const mockProjects = [{ id: "1", title: "Web サイトのデザイン・開発", status: "OPEN", proposals: 12, createdAt: new Date("2026-08-10") }, { id: "2", title: "ロゴデザイン制作", status: "IN_PROGRESS", proposals: 8, createdAt: new Date("2026-08-05") }];

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">クライアントダッシュボード</h1>
          <Link href="/projects/new"><Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" /> 新規案件を投稿</Button></Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Briefcase className="w-6 h-6 text-blue-600" /></div><div><div className="text-2xl font-bold">5</div><div className="text-gray-600">公開中の案件</div></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><MessageCircle className="w-6 h-6 text-green-600" /></div><div><div className="text-2xl font-bold">23</div><div className="text-gray-600">提案数</div></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"><Briefcase className="w-6 h-6 text-purple-600" /></div><div><div className="text-2xl font-bold">12</div><div className="text-gray-600">成約件数</div></div></div></CardContent></Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">私の案件</h2>
            <div className="space-y-4">
              {mockProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-2">
                    <Link href={`/projects/${project.id}`} className="font-semibold hover:text-blue-600">{project.title}</Link>
                    <Badge className={project.status === 'OPEN' ? 'bg-green-600' : 'bg-blue-600'}>{project.status === 'OPEN' ? '募集中' : '進行中'}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>投稿：{new Date(project.createdAt).toLocaleDateString('ja-JP')}</span>
                    <span>提案：{project.proposals}件</span>
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
