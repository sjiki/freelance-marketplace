import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, XCircle, Clock, DollarSign, ArrowRight } from 'lucide-react';

const mockEscrow = { id: "e1", contractId: "c1", amount: 150000, status: "PENDING", createdAt: new Date("2026-08-14"), contract: { project: { title: "Web サイト制作" }, proposal: { freelancer: { name: "田中太郎" } } } };

interface EscrowPageProps { params: Promise<{ contractId: string }>; }

export default async function EscrowPage({ params }: EscrowPageProps) {
  const { contractId } = await params;
  const escrow = mockEscrow;
  const statusConfig = { PENDING: { icon: Clock, color: 'bg-yellow-500', label: '仮払い待ち' }, HELD: { icon: Shield, color: 'bg-blue-500', label: '仮払い済み' }, RELEASED: { icon: CheckCircle, color: 'bg-green-500', label: '入金済み' }, REFUNDED: { icon: XCircle, color: 'bg-red-500', label: '返金済み' } };
  const StatusIcon = statusConfig[escrow.status as keyof typeof statusConfig].icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white"><div className="container mx-auto px-4 py-3"><Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link></div></header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6"><Link href="/dashboard" className="text-sm text-blue-600 hover:underline">← ダッシュボードに戻る</Link></div>
        <Card className="mb-6">
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-6 h-6 text-blue-600" /> エスクロー（仮払い）システム</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div><p className="text-sm text-gray-600 mb-1">案件名</p><h3 className="font-semibold">{escrow.contract.project.title}</h3></div>
                <div className="text-right"><p className="text-sm text-gray-600 mb-1">フリーランサー</p><p className="font-semibold">{escrow.contract.proposal.freelancer.name}</p></div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div><p className="text-sm text-gray-600 mb-1">金額</p><p className="text-2xl font-bold text-blue-600">￥{escrow.amount.toLocaleString()}</p></div>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-8 h-8 ${statusConfig[escrow.status as keyof typeof statusConfig].color.replace('bg-', 'text-')}`} />
                  <Badge className={`${statusConfig[escrow.status as keyof typeof statusConfig].color}`}>{statusConfig[escrow.status as keyof typeof statusConfig].label}</Badge>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2"><DollarSign className="w-5 h-5" /> エスクローの流れ</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center ${escrow.status !== 'PENDING' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>1</div><span className={escrow.status !== 'PENDING' ? 'text-green-600 font-semibold' : ''}>クライアントが仮払い</span></div>
                  <div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center ${['HELD', 'RELEASED', 'REFUNDED'].includes(escrow.status) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>2</div><span className={['HELD', 'RELEASED', 'REFUNDED'].includes(escrow.status) ? 'text-green-600 font-semibold' : ''}>金額をエスクローで保管</span></div>
                  <div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center ${escrow.status === 'RELEASED' ? 'bg-green-500 text-white' : escrow.status === 'REFUNDED' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>3</div><span className={escrow.status === 'RELEASED' ? 'text-green-600 font-semibold' : escrow.status === 'REFUNDED' ? 'text-red-600 font-semibold' : ''}>完了後にフリーランサーへ入金（または返金）</span></div>
                </div>
              </div>
              {escrow.status === 'PENDING' && (<div className="flex gap-4"><Button className="flex-1 bg-blue-600 hover:bg-blue-700"><Shield className="w-4 h-4 mr-2" /> 仮払いする（￥{escrow.amount.toLocaleString()}）</Button><Button variant="outline" className="flex-1">キャンセル</Button></div>)}
              {escrow.status === 'HELD' && (<div className="flex gap-4"><Button className="flex-1 bg-green-600 hover:bg-green-700"><CheckCircle className="w-4 h-4 mr-2" /> 入金を解放する</Button><Button variant="outline" className="flex-1"><XCircle className="w-4 h-4 mr-2" /> 返金する</Button></div>)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">エスクローのメリット</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-blue-600" /> クライアント側</h4>
                <ul className="text-sm space-y-1 text-gray-600"><li>• 完了前に支払い済みになることを防止</li><li>• 成果物の品質を確認してから入金</li><li>• トラブル時に返金可能</li></ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-green-600" /> フリーランサー側</h4>
                <ul className="text-sm space-y-1 text-gray-600"><li>• 支払い能力が保証される</li><li>• 完了後の未払いリスクを防止</li><li>• 確実な入金を保証</li></ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
