import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Upload, File, Check, Download, Trash2, Clock, MessageSquare } from 'lucide-react';

const mockSubmissions = [{ id: "s1", contractId: "c1", message: "第 1 回提出：トップページのデザインとコーディング", files: [{ name: "homepage.zip", url: "#", size: 2500000 }], status: "PENDING", submittedAt: new Date("2026-08-14 15:30") }, { id: "s2", contractId: "c1", message: "第 2 回提出：下ページとレスポンシブ対応", files: [{ name: "inner-pages.zip", url: "#", size: 3200000 }, { name: "preview.pdf", url: "#", size: 1500000 }], status: "APPROVED", submittedAt: new Date("2026-08-13 10:00") }];

interface SubmissionsPageProps { params: Promise<{ contractId: string }>; }

export default async function SubmissionsPage({ params }: SubmissionsPageProps) {
  const { contractId } = await params;
  const submissions = mockSubmissions;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white"><div className="container mx-auto px-4 py-3"><Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link></div></header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6"><Link href="/dashboard" className="text-sm text-blue-600 hover:underline">← ダッシュボードに戻る</Link></div>
        <h1 className="text-2xl font-bold mb-6">提出物管理</h1>
        <Card className="mb-6">
          <CardHeader><CardTitle className="flex items-center gap-2"><Upload className="w-5 h-5" /> 新しい提出物をアップロード</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-2">メッセージ（任意）</label><Input placeholder="提出物の説明を入力..." /></div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">ファイルをドラッグ＆ドロップまたはクリックしてアップロード</p>
                <p className="text-xs text-gray-500">最大 50MB まで（zip, pdf, png, jpg, mp4 など）</p>
                <Input type="file" className="hidden" id="file-upload" multiple />
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700"><Upload className="w-4 h-4 mr-2" /> ファイルを選択</Button>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">提出する</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>提出履歴（{submissions.length}件）</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${submission.status === 'APPROVED' ? 'bg-green-100 text-green-600' : submission.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                        {submission.status === 'APPROVED' ? <Check className="w-5 h-5" /> : submission.status === 'PENDING' ? <Clock className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold">{submission.message}</p>
                        <p className="text-xs text-gray-500">{new Date(submission.submittedAt).toLocaleString('ja-JP')}</p>
                      </div>
                    </div>
                    <Badge className={submission.status === 'APPROVED' ? 'bg-green-600' : submission.status === 'PENDING' ? 'bg-yellow-600' : 'bg-red-600'}>
                      {submission.status === 'APPROVED' ? '承認済み' : submission.status === 'PENDING' ? '承認待ち' : '修正依頼'}
                    </Badge>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium mb-2">添付ファイル（{submission.files.length}件）</p>
                    <div className="space-y-2">
                      {submission.files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white rounded p-2">
                          <div className="flex items-center gap-2"><File className="w-4 h-4 text-blue-600" /><span className="text-sm">{file.name}</span><span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span></div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1"><MessageSquare className="w-4 h-4 mr-2" /> コメントする</Button>
                    {submission.status === 'PENDING' && (<><Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700"><Check className="w-4 h-4 mr-2" /> 承認する</Button><Button size="sm" variant="outline" className="flex-1">修正を依頼</Button></>)}
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
