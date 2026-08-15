import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, Award, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockTests = [{ id: "t1", skillName: "React", description: "React の基礎知識を問うテスト", questions: 20, passingScore: 70, timeLimit: 30, attempts: 1250, difficulty: "中級" }, { id: "t2", skillName: "TypeScript", description: "TypeScript の型システムと機能", questions: 15, passingScore: 75, timeLimit: 25, attempts: 890, difficulty: "上級" }, { id: "t3", skillName: "Web デザイン", description: "UI/UX デザインの基礎知識", questions: 25, passingScore: 65, timeLimit: 35, attempts: 2100, difficulty: "初級" }, { id: "t4", skillName: "Python", description: "Python programming の基礎", questions: 20, passingScore: 70, timeLimit: 30, attempts: 1560, difficulty: "中級" }];

export default function SkillTestsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-50"><div className="container mx-auto px-4 py-3"><div className="flex items-center justify-between"><Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link><nav className="hidden md:flex items-center gap-6"><Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium">案件を探す</Link><Link href="/skill-tests" className="text-blue-600 font-medium">スキルテスト</Link></nav><div className="flex items-center gap-3"><Link href="/login"><Button variant="ghost">ログイン</Button></Link><Link href="/register"><Button className="bg-blue-600 hover:bg-blue-700">無料登録</Button></Link></div></div></div></header>
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12"><div className="container mx-auto px-4"><div className="max-w-3xl mx-auto text-center"><h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3"><Award className="w-8 h-8" /> スキル認定テスト</h1><p className="text-lg mb-6">スキルを証明して、信頼性を高めよう。合格者はバッジを獲得できます。</p></div></div></section>
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-3 mb-8"><Input placeholder="スキルを検索..." className="max-w-md" /><Button className="bg-blue-600 hover:bg-blue-700"><Search className="w-4 h-4 mr-2" /> 検索</Button></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div><h3 className="font-semibold text-lg">{test.skillName}</h3><Badge variant={test.difficulty === '初級' ? 'secondary' : test.difficulty === '中級' ? 'default' : 'destructive'} className="mt-1">{test.difficulty}</Badge></div>
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-4">{test.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Star className="w-4 h-4" /><span>{test.questions}問</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Clock className="w-4 h-4" /><span>{test.timeLimit}分</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4" /><span>{test.attempts.toLocaleString()}人が受験</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Award className="w-4 h-4" /><span>合格点：{test.passingScore}%</span></div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">テストを受ける</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
