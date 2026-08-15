import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Star, Briefcase, ArrowLeft } from 'lucide-react';

const mockUser = { id: "u1", name: "田中太郎", email: "tanaka@example.com", role: "FREELANCER", avatar: null, bio: "Web デベロッパーとして 5 年の経験があります。React/Next.js を中心に、フルスタック開発が可能です。", skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"], hourlyRate: 5000, rating: 4.9, totalJobs: 15, totalEarnings: 2500000, isVerified: true };

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white"><div className="container mx-auto px-4 py-3"><Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link></div></header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6"><ArrowLeft className="w-4 h-4 mr-1" /> ダッシュボードに戻る</Link>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1"><CardContent className="p-6 text-center"><div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">{mockUser.avatar ? (<img src={mockUser.avatar} alt={mockUser.name} className="w-full h-full rounded-full object-cover" />) : (<User className="w-12 h-12 text-gray-500" />)}</div><h2 className="text-xl font-bold mb-2">{mockUser.name}</h2><p className="text-sm text-gray-600 mb-2">{mockUser.email}</p><Badge className={mockUser.role === 'FREELANCER' ? 'bg-green-600' : 'bg-blue-600'}>{mockUser.role === 'FREELANCER' ? 'フリーランサー' : 'クライアント'}</Badge>{mockUser.isVerified && (<Badge variant="secondary" className="mt-2">認証済み</Badge>)}<div className="mt-6 space-y-3"><div className="flex items-center justify-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span className="font-bold">{mockUser.rating.toFixed(1)}</span></div><div className="flex items-center justify-center gap-2"><Briefcase className="w-5 h-5 text-gray-500" /><span>{mockUser.totalJobs}件</span></div><div className="text-sm text-gray-600">累計 ¥{mockUser.totalEarnings.toLocaleString()}</div></div></CardContent></Card>
          <Card className="md:col-span-2"><CardHeader><CardTitle>プロフィール編集</CardTitle></CardHeader><CardContent><form className="space-y-6"><div><label className="block text-sm font-medium mb-2">お名前</label><Input defaultValue={mockUser.name} required /></div><div><label className="block text-sm font-medium mb-2">自己紹介</label><textarea className="w-full min-h-[150px] p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-600" defaultValue={mockUser.bio} /></div><div><label className="block text-sm font-medium mb-2">スキル</label><div className="flex flex-wrap gap-2 mb-2">{mockUser.skills.map((skill) => (<Badge key={skill} variant="secondary" className="cursor-pointer">{skill} ×</Badge>))}</div><Input placeholder="スキルを追加（カンマ区切り）" /></div><div><label className="block text-sm font-medium mb-2">時間給（円）</label><Input type="number" defaultValue={mockUser.hourlyRate} /></div><div className="flex gap-4"><Button type="button" variant="outline" className="flex-1">キャンセル</Button><Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">保存する</Button></div></form></CardContent></Card>
        </div>
      </main>
    </div>
  );
}
