import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const mockProjects = [
  {
    id: "1",
    title: "Web サイトのデザイン・開発をお願いします",
    description: "企業のコーポレートサイトのデザインから開発まで一貫してお願いできる方を探しています...",
    category: "Web 開発・制作",
    skills: ["React", "Next.js", "TypeScript"],
    budgetMin: 100000,
    budgetMax: 300000,
    budgetType: "FIXED" as const,
    createdAt: new Date("2026-08-14"),
  },
  {
    id: "2",
    title: "ロゴデザイン制作",
    description: "新規サービスのロゴデザインを制作していただけるデザイナーの方を探しています...",
    category: "デザイン",
    skills: ["Illustrator", "Photoshop", "Figma"],
    budgetMin: 50000,
    budgetMax: 100000,
    budgetType: "FIXED" as const,
    createdAt: new Date("2026-08-13"),
  },
  {
    id: "3",
    title: "ブログ記事のライティング（週 5 記事）",
    description: "テック系ブログの記事を週 5 本執筆していただけるライターの方を探しています...",
    category: "ライティング",
    skills: ["ライティング", "SEO", "リサーチ"],
    budgetMin: 10000,
    budgetMax: 20000,
    budgetType: "HOURLY" as const,
    createdAt: new Date("2026-08-12"),
  },
];

const categories = ["すべて", "Web 開発・制作", "デザイン", "ライティング", "動画・アニメーション", "翻訳・通訳", "マーケティング"];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Input placeholder="キーワードで検索" className="flex-1" />
                  <Button size="icon" className="bg-blue-600 hover:bg-blue-700"><Search className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Filter className="w-4 h-4" /> カテゴリ</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link key={cat} href={`/projects?category=${encodeURIComponent(cat)}`} className="block text-sm text-gray-700 hover:text-blue-600">{cat}</Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">予算</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input type="number" placeholder="最小" className="w-full" />
                    <span>-</span>
                    <Input type="number" placeholder="最大" className="w-full" />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">適用</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">案件一覧</h1>
              <div className="text-sm text-gray-600">{mockProjects.length}件の案件が見つかりました</div>
            </div>

            <div className="space-y-4">
              {mockProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <Link href={`/projects/${project.id}`}>
                        <h2 className="text-lg font-semibold hover:text-blue-600">{project.title}</h2>
                      </Link>
                      <Badge variant="secondary" className="text-xs">新規</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">{project.category} • {new Date(project.createdAt).toLocaleDateString('ja-JP')}</div>
                      <div className="text-lg font-bold text-blue-600">
                        ¥{project.budgetMin.toLocaleString()}{project.budgetMax ? ` - ¥${project.budgetMax.toLocaleString()}` : ''}{project.budgetType === 'HOURLY' && ' / 時間'}
                      </div>
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
              <Button variant="outline" size="sm">次へ</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
