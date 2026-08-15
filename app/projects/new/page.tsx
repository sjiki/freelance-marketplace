import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

const categories = ["Web 開発・制作", "デザイン", "ライティング", "動画・アニメーション", "翻訳・通訳", "マーケティング", "事務・アシスタント", "コンサルティング"];
const skillOptions = ["React", "Next.js", "TypeScript", "JavaScript", "Python", "Illustrator", "Photoshop", "Figma", "After Effects", "ライティング", "SEO", "翻訳", "動画編集", "マーケティング"];

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> ダッシュボードに戻る
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">新規案件を投稿</CardTitle>
            <CardDescription>必要な情報を入力して、フリーランサーからの提案を待ちましょう</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">案件タイトル <span className="text-red-500">*</span></label>
                <Input placeholder="例：Web サイトのデザイン・開発をお願いします" required />
                <p className="text-xs text-gray-500 mt-1">5 文字以上 200 文字以内</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">案件の詳細 <span className="text-red-500">*</span></label>
                <textarea className="w-full min-h-[200px] p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-600" placeholder="必要なスキル、具体的な作業内容、納期などを詳しく記載してください" required />
                <p className="text-xs text-gray-500 mt-1">50 文字以上 10000 文字以内</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">カテゴリ <span className="text-red-500">*</span></label>
                <select className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-600" required>
                  <option value="">選択してください</option>
                  {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">必要なスキル <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" name="skills" value={skill} className="w-4 h-4" />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">予算タイプ <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="budgetType" value="FIXED" className="w-4 h-4 mb-2" defaultChecked />
                    <div className="font-semibold">固定報酬</div>
                    <div className="text-xs text-gray-500">プロジェクト全体で一律の金額</div>
                  </label>
                  <label className="border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="budgetType" value="HOURLY" className="w-4 h-4 mb-2" />
                    <div className="font-semibold">時間制</div>
                    <div className="text-xs text-gray-500">1 時間あたりの単価</div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">予算 <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-4">
                  <Input type="number" placeholder="最小" className="w-full" required />
                  <span className="text-gray-500">-</span>
                  <Input type="number" placeholder="最大（オプション）" className="w-full" />
                </div>
                <p className="text-xs text-gray-500 mt-1">円単位で入力してください</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">納期（オプション）</label>
                <Input type="date" />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1">下書き保存</Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">投稿する</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
