import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, FolderOpen } from 'lucide-react';

const mockCategories = [{ id: "1", name: "Web 開発・制作", slug: "web-development", icon: "💻", _count: { projects: 120000 }, children: [{ id: "c1", name: "Web サイト制作", slug: "website" }, { id: "c2", name: "Web アプリ開発", slug: "web-app" }] }, { id: "2", name: "デザイン", slug: "design", icon: "🎨", _count: { projects: 85000 }, children: [{ id: "c3", name: "ロゴデザイン", slug: "logo" }, { id: "c4", name: "Web デザイン", slug: "web-design" }] }, { id: "3", name: "ライティング", slug: "writing", icon: "✍️", _count: { projects: 95000 }, children: [{ id: "c5", name: "記事執筆", slug: "article" }, { id: "c6", name: "コピーライティング", slug: "copywriting" }] }, { id: "4", name: "動画・アニメーション", slug: "video", icon: "🎬", _count: { projects: 45000 }, children: [] }, { id: "5", name: "翻訳・通訳", slug: "translation", icon: "🌐", _count: { projects: 38000 }, children: [] }, { id: "6", name: "マーケティング", slug: "marketing", icon: "📈", _count: { projects: 52000 }, children: [] }];

const mockSkills = [{ id: "s1", name: "React", slug: "react", usageCount: 45000 }, { id: "s2", name: "Next.js", slug: "nextjs", usageCount: 32000 }, { id: "s3", name: "TypeScript", slug: "typescript", usageCount: 38000 }, { id: "s4", name: "Python", slug: "python", usageCount: 28000 }, { id: "s5", name: "Figma", slug: "figma", usageCount: 25000 }];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white"><div className="container mx-auto px-4 py-3"><Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link></div></header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">カテゴリ・スキル管理</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <Card><CardContent className="p-6"><div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold flex items-center gap-2"><FolderOpen className="w-5 h-5" /> カテゴリ一覧</h2><Button size="sm" className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" /> 追加</Button></div><div className="space-y-3">{mockCategories.map((cat) => (<div key={cat.id} className="border rounded-lg p-4"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><span className="text-2xl">{cat.icon}</span><div><h3 className="font-semibold">{cat.name}</h3><p className="text-xs text-gray-500">{cat._count.projects.toLocaleString()} 件の案件</p></div></div><Badge variant="secondary">{cat.children.length} サブカテゴリ</Badge></div>{cat.children.length > 0 && (<div className="flex flex-wrap gap-2 mt-2">{cat.children.map((child) => (<Badge key={child.id} variant="outline">{child.name}</Badge>))}</div>)}</div>))}</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">スキル一覧</h2><Button size="sm" className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" /> 追加</Button></div><div className="mb-4"><div className="flex gap-2"><Input placeholder="スキルを検索..." className="flex-1" /><Button size="icon" className="bg-blue-600 hover:bg-blue-700"><Search className="w-4 h-4" /></Button></div></div><div className="space-y-2">{mockSkills.map((skill) => (<div key={skill.id} className="flex items-center justify-between border rounded-lg p-3"><div><h3 className="font-semibold">{skill.name}</h3><p className="text-xs text-gray-500">{skill.slug}</p></div><div className="text-right"><p className="text-sm font-bold text-blue-600">{skill.usageCount.toLocaleString()} 回</p><p className="text-xs text-gray-500">使用数</p></div></div>))}</div></CardContent></Card>
        </div>
      </main>
    </div>
  );
}
