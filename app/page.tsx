import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Briefcase, Users, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              FreelanceMarket
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium">
                案件を探す
              </Link>
              <Link href="/freelancers" className="text-gray-700 hover:text-blue-600 font-medium">
                フリーランサーを探す
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">
                使い方
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">ログイン</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">無料登録</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              日本最大級のフリーランスマーケットプレイス
            </h1>
            <p className="text-lg mb-8 text-blue-100">
              300 万人以上のフリーランサーと、あらゆるスキルを持つ専門家が見つかります
            </p>
            
            {/* 検索バー */}
            <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="スキル、サービス、またはキーワードを検索"
                className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-md"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-5 h-5 mr-2" />
                検索
              </Button>
            </div>

            {/* 人気キーワード */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-blue-200">人気:</span>
              {['Web 開発', 'デザイン', 'ライティング', '動画編集', '翻訳', 'マーケティング'].map((tag) => (
                <Link
                  key={tag}
                  href={`/projects?skill=${encodeURIComponent(tag)}`}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 統計セクション */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">300 万+</div>
              <div className="text-gray-600 mt-2">登録フリーランサー</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">35 万+</div>
              <div className="text-gray-600 mt-2">登録企業</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">500 万+</div>
              <div className="text-gray-600 mt-2">成約件数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">4.8/5</div>
              <div className="text-gray-600 mt-2">平均評価</div>
            </div>
          </div>
        </div>
      </section>

      {/* カテゴリセクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">カテゴリから探す</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Briefcase, name: 'Web 開発・制作', count: '120,000+' },
              { icon: Star, name: 'デザイン', count: '85,000+' },
              { icon: Users, name: 'ライティング', count: '95,000+' },
              { icon: Briefcase, name: '動画・アニメーション', count: '45,000+' },
              { icon: Star, name: '翻訳・通訳', count: '38,000+' },
              { icon: Users, name: 'マーケティング', count: '52,000+' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/projects?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <category.icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 text-sm">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500">{category.count} 件</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 新着案件セクション */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">新着の案件</h2>
            <Link href="/projects" className="text-blue-600 hover:underline flex items-center gap-2 font-medium">
              すべて見る <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-base line-clamp-2">
                      Web サイトのデザイン・開発をお願いします
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      新規
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    企業のコーポレートサイトのデザインから開発まで一貫してお願いできる方を探しています...
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">Web 開発</Badge>
                    <Badge variant="outline" className="text-xs">デザイン</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-blue-600">
                      ¥100,000 - ¥300,000
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      提案する
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 使い方セクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">使い方</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                クライアントの方
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <div>
                    <div className="font-semibold">無料で会員登録</div>
                    <div className="text-gray-600 text-sm">
                      基本機能はすべて無料でご利用いただけます
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <div>
                    <div className="font-semibold">案件を投稿</div>
                    <div className="text-gray-600 text-sm">
                      必要なスキル、予算、納期を明記して投稿
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <div>
                    <div className="font-semibold">フリーランサーを選定</div>
                    <div className="text-gray-600 text-sm">
                      提案内容とプロフィールから最適な人材を選択
                    </div>
                  </div>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                フリーランサーの方
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <div>
                    <div className="font-semibold">無料で会員登録</div>
                    <div className="text-gray-600 text-sm">
                      スキルや経歴を登録してプロフィールを作成
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <div>
                    <div className="font-semibold">案件に提案</div>
                    <div className="text-gray-600 text-sm">
                      気になる案件にカバーレターと共に提案
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <div>
                    <div className="font-semibold">仕事を完了</div>
                    <div className="text-gray-600 text-sm">
                      納品して評価をもらい、次の仕事へ
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">FreelanceMarket</h4>
              <p className="text-sm">
                日本最大級のフリーランスマーケットプレイス
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">サービス</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/projects" className="hover:text-white">案件を探す</Link></li>
                <li><Link href="/freelancers" className="hover:text-white">フリーランサーを探す</Link></li>
                <li><Link href="/enterprise" className="hover:text-white">法人向け</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">サポート</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-white">ヘルプ</Link></li>
                <li><Link href="/contact" className="hover:text-white">お問い合わせ</Link></li>
                <li><Link href="/terms" className="hover:text-white">利用規約</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">会社情報</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">会社概要</Link></li>
                <li><Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link></li>
                <li><Link href="/press" className="hover:text-white">プレスリリース</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © 2026 FreelanceMarket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
