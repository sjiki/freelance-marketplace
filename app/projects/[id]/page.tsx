import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Star, User, MessageCircle, Send } from 'lucide-react';

const mockProject = {
  id: "1",
  title: "Web サイトのデザイン・開発をお願いします",
  description: `企業のコーポレートサイトのデザインから開発まで一貫してお願いできる方を探しています。\n\n【要件】\n- React/Next.js での開発経験 3 年以上\n- デザインセンスがある方\n- コミュニケーションを密に取れる方\n\n【納期】\n- 2026 年 9 月末まで\n\n【予算】\n- 固定報酬：10-30 万円`,
  category: "Web 開発・制作",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  budgetType: "FIXED" as const,
  budgetMin: 100000,
  budgetMax: 300000,
  deadline: new Date("2026-09-30"),
  status: "OPEN" as const,
  views: 245,
  createdAt: new Date("2026-08-10"),
  client: {
    id: "c1",
    name: "株式会社テック",
    avatar: null,
    rating: 4.8,
    totalJobs: 52,
    isVerified: true,
  },
  proposals: [
    {
      id: "p1",
      bidAmount: 250000,
      deliveryDays: 30,
      coverLetter: "はじめまして。React/Next.js で 5 年の開発経験があります。過去に類似のコーポレートサイト制作実績が多数ございます。",
      createdAt: new Date("2026-08-12"),
      freelancer: {
        id: "f1",
        name: "田中太郎",
        avatar: null,
        rating: 4.9,
        hourlyRate: 5000,
      },
    },
  ],
};

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = mockProject;

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.createdAt).toLocaleDateString('ja-JP')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        納期：{new Date(project.deadline).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                  </div>
                  <Badge className={project.status === 'OPEN' ? 'bg-green-600' : ''}>
                    {project.status === 'OPEN' ? '募集中' : project.status}
                  </Badge>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-1">予算</div>
                  <div className="text-2xl font-bold text-blue-600">
                    ¥{project.budgetMin.toLocaleString()}
                    {project.budgetMax ? ` - ¥${project.budgetMax.toLocaleString()}` : ''}
                    {project.budgetType === 'HOURLY' && ' / 時間'}
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-lg font-semibold mb-3">案件の詳細</h2>
                  <p className="whitespace-pre-wrap text-gray-700">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-3">必要なスキル</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  提案 ({project.proposals.length}件)
                </h2>

                {project.proposals.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">まだ提案はありません</p>
                ) : (
                  <div className="space-y-4">
                    {project.proposals.map((proposal) => (
                      <div key={proposal.id} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                              {proposal.freelancer.avatar ? (
                                <img src={proposal.freelancer.avatar} alt={proposal.freelancer.name || ''} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-6 h-6 text-gray-500" />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold">{proposal.freelancer.name || '匿名フリーランサー'}</div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span>{proposal.freelancer.rating.toFixed(1)}</span>
                                {proposal.freelancer.hourlyRate && (
                                  <span>• ¥{proposal.freelancer.hourlyRate.toLocaleString()}/時間</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-blue-600">￥{proposal.bidAmount.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">納期：{proposal.deliveryDays}日</div>
                          </div>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap mb-3">{proposal.coverLetter}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {new Date(proposal.createdAt).toLocaleDateString('ja-JP')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">発注者情報</h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center">
                    {project.client.avatar ? (
                      <img src={project.client.avatar} alt={project.client.name || ''} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{project.client.name || '企業クライアント'}</div>
                    {project.client.isVerified && (
                      <Badge variant="secondary" className="text-xs">認証済み</Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">評価</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{project.client.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">成約件数</span>
                    <span className="font-semibold">{project.client.totalJobs}件</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Button className="w-full mb-3 bg-blue-600 hover:bg-blue-700" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  この案件に提案する
                </Button>
                <p className="text-xs text-gray-500 text-center">提案するにはログインが必要です</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">案件情報</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">カテゴリ</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">予算タイプ</span>
                    <span className="font-medium">{project.budgetType === 'FIXED' ? '固定報酬' : '時間制'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">閲覧数</span>
                    <span className="font-medium">{project.views}回</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">提案数</span>
                    <span className="font-medium">{project.proposals.length}件</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
