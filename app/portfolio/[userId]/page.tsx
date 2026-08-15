import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, User, ExternalLink, Heart, Eye } from 'lucide-react';

const mockPortfolio = [{ id: "p1", title: "EC サイト制作（ファッション）", description: "React/Next.js を使用した EC サイトの制作。決済機能、在庫管理、会員機能を搭載。", thumbnailUrl: null, images: [], projectUrl: "https://example.com", tags: ["React", "Next.js", "Stripe"], views: 1250, likes: 89, isFeatured: true }, { id: "p2", title: "コーポレートサイト（医療系）", description: "医療機関向けのコーポレートサイト。予約システム、お問い合わせフォームを実装。", thumbnailUrl: null, images: [], projectUrl: "https://example2.com", tags: ["Vue.js", "Nuxt", "Firebase"], views: 890, likes: 67, isFeatured: false }, { id: "p3", title: "Web アプリ開発（タスク管理）", description: "チーム向けタスク管理アプリ。リアルタイム更新、通知機能を搭載。", thumbnailUrl: null, images: [], projectUrl: null, tags: ["React", "TypeScript", "Supabase"], views: 2100, likes: 156, isFeatured: true }];
const mockUser = { id: "u1", name: "田中太郎", avatar: null, rating: 4.9, totalJobs: 15, skills: ["React", "Next.js", "TypeScript", "Node.js"] };

interface PortfolioPageProps { params: Promise<{ userId: string }>; }

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { userId } = await params;
  const portfolio = mockPortfolio;
  const user = mockUser;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white"><div className="container mx-auto px-4 py-3"><Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link></div></header>
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8"><CardContent className="p-6"><div className="flex items-start gap-6"><div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">{user.avatar ? (<img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />) : (<User className="w-12 h-12 text-gray-500" />)}</div><div className="flex-1"><h1 className="text-2xl font-bold mb-2">{user.name}</h1><div className="flex items-center gap-4 mb-3"><div className="flex items-center gap-1"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span className="font-bold">{user.rating.toFixed(1)}</span></div><span className="text-gray-600">成約 {user.totalJobs}件</span></div><div className="flex flex-wrap gap-2">{user.skills.map((skill) => (<Badge key={skill} variant="secondary">{skill}</Badge>))}</div></div><Button className="bg-blue-600 hover:bg-blue-700">連絡する</Button></div></CardContent></Card>
        <h2 className="text-xl font-bold mb-6">ポートフォリオ（{portfolio.length}件）</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">{item.thumbnailUrl ? (<img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />) : (<div className="text-gray-400">No Image</div>)}</div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2"><h3 className="font-semibold line-clamp-2">{item.title}</h3>{item.isFeatured && (<Badge className="bg-yellow-500">おすすめ</Badge>)}</div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">{item.tags.map((tag) => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500"><span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.views.toLocaleString()}</span><span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {item.likes.toLocaleString()}</span></div>
                  {item.projectUrl && (<Link href={item.projectUrl} target="_blank" className="text-blue-600 hover:underline text-sm flex items-center gap-1">見る <ExternalLink className="w-3 h-3" /></Link>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
