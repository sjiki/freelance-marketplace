import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

const categories = ["すべて", "Web 開発・制作", "デザイン", "ライティング", "動画・アニメーション", "翻訳・通訳", "マーケティング"];
const budgetRanges = ["すべて", "〜1 万円", "1-5 万円", "5-10 万円", "10-30 万円", "30 万円〜"];
const sortOptions = ["新着順", "予算順（高→低）", "予算順（低→高）", "提案数順"];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/projects" className="text-blue-600 font-medium">案件を探す</Link>
              <Link href="/freelancers" className="text-gray-700 hover:text-blue-600 font-medium">フリーランサーを探す</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login"><Button variant="ghost">ログイン</Button></Link>
              <Link href="/register"><Button className="bg-blue-600 hover:bg-blue-700">無料登録</Button></Link>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3">
            <Input placeholder="キーワードで検索（例：React, デザイン）" className="flex-1 max-w-2xl" />
            <Button className="bg-blue-600 hover:bg-blue-700"><Search className="w-4 h-4 mr-2" /> 検索</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card><CardContent className="p-4"><h3 className="font-semibold mb-3 flex items-center gap-2"><Filter className="w-4 h-4" /> カテゴリ</h3><div className="space-y-2">{categories.map((cat) => (<label key={cat} className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="category" className="w-4 h-4" defaultChecked={cat === "すべて"} /><span className="text-gray-700">{cat}</span></label>))}</div></CardContent></Card>
            <Card><CardContent className="p-4"><h3 className="font-semibold mb-3">予算</h3><div className="space-y-2">{budgetRanges.map((range) => (<label key={range} className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="budget" className="w-4 h-4" defaultChecked={range === "すべて"} /><span className="text-gray-700">{range}</span></label>))}</div></CardContent></Card>
            <Card><CardContent className="p-4"><h3 className="font-semibold mb-3">スキル</h3><Input placeholder="スキルを追加" className="mb-2" /><div className="flex flex-wrap gap-2">{["React", "Next.js", "TypeScript", "Figma", "Python"].map((skill) => (<Badge key={skill} variant="secondary" className="cursor-pointer">{skill} ×</Badge>))}</div></CardContent></Card>
            <Card><CardContent className="p-4"><h3 className="font-semibold mb-3 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> その他の絞り込み</h3><div className="space-y-2"><label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" className="w-4 h-4" /><span>新着順</span></label><label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" className="w-4 h-4" /><span>おすすめのみ</span></label><label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" className="w-4 h-4" /><span>即納可能</span></label></div></CardContent></Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">120 件の案件が見つかりました</div>
              <div className="flex items-center gap-3">
                <select className="border rounded-md px-3 py-2 text-sm outline-none">{sortOptions.map((opt) => (<option key={opt}>{opt}</option>))}</select>
                <Button variant="outline" size="sm"><ChevronDown className="w-4 h-4 mr-2" /> 表示形式</Button>
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="hover:shadow-md transition">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <Link href={`/projects/${i}`}><h2 className="text-lg font-semibold hover:text-blue-600">Web サイトのデザイン・開発をお願いします - 事例 {i}</h2></Link>
                      <Badge variant="secondary" className="text-xs">新規</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">企業のコーポレートサイトのデザインから開発まで一貫してお願いできる方を探しています。React/Next.js での開発経験がある方を優先します。</p>
                    <div className="flex flex-wrap gap-2 mb-3">{["React", "Next.js", "TypeScript", "Tailwind CSS"].map((skill) => (<Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>))}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Web 開発・制作 • 2 時間前</div>
                      <div className="text-lg font-bold text-blue-600">￥100,000 - ￥300,000</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-8">
              <Button variant="outline" size="sm" disabled>前へ</Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="text-gray-400">...</span>
              <Button variant="outline" size="sm">10</Button>
              <Button variant="outline" size="sm">次へ</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
