import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Check, Mail, MessageCircle, DollarSign, Star, Briefcase } from 'lucide-react';

const mockNotifications = [{ id: "n1", type: "proposal", title: "新しい提案が届きました", message: "田中太郎さんから「Web サイト制作」に提案が届きました。", read: false, createdAt: new Date("2026-08-15 10:30") }, { id: "n2", type: "message", title: "新しいメッセージ", message: "株式会社テックさんからメッセージが届きました。", read: false, createdAt: new Date("2026-08-15 09:15") }, { id: "n3", type: "payment", title: "決済が完了しました", message: "￥150,000 の入金が完了しました。", read: true, createdAt: new Date("2026-08-14 16:20") }, { id: "n4", type: "review", title: "新しいレビュー", message: "山田花子さんから 5 つ星の評価をもらいました。", read: true, createdAt: new Date("2026-08-14 11:00") }, { id: "n5", type: "project_status", title: "案件のステータスが更新", message: "「ロゴデザイン制作」が進行中になりました。", read: true, createdAt: new Date("2026-08-13 14:30") }];
const notificationIcons = { proposal: Briefcase, message: MessageCircle, payment: DollarSign, review: Star, project_status: Bell };

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white"><div className="container mx-auto px-4 py-3"><Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link></div></header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2"><Bell className="w-6 h-6" /> 通知</h1>
          <Button variant="outline" size="sm"><Check className="w-4 h-4 mr-2" /> すべて既読にする</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {mockNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type as keyof typeof notificationIcons];
              return (
                <Card key={notification.id} className={`hover:shadow-md transition ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notification.read ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}><Icon className="w-5 h-5" /></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className={`font-semibold ${!notification.read ? 'text-blue-900' : ''}`}>{notification.title}</h3>
                          <span className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString('ja-JP')}</span>
                        </div>
                        <p className={`text-sm mb-2 ${!notification.read ? 'text-blue-800' : 'text-gray-600'}`}>{notification.message}</p>
                        {!notification.read && (<Button variant="ghost" size="sm" className="h-8 text-xs"><Mail className="w-3 h-3 mr-1" /> 既読にする</Button>)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="space-y-6">
            <Card><CardContent className="p-6"><h3 className="font-semibold mb-4">通知設定</h3><div className="space-y-3"><label className="flex items-center justify-between"><span className="text-sm">新しい提案</span><input type="checkbox" defaultChecked className="w-4 h-4" /></label><label className="flex items-center justify-between"><span className="text-sm">メッセージ</span><input type="checkbox" defaultChecked className="w-4 h-4" /></label><label className="flex items-center justify-between"><span className="text-sm">決済通知</span><input type="checkbox" defaultChecked className="w-4 h-4" /></label><label className="flex items-center justify-between"><span className="text-sm">レビュー</span><input type="checkbox" defaultChecked className="w-4 h-4" /></label><label className="flex items-center justify-between"><span className="text-sm">案件ステータス</span><input type="checkbox" className="w-4 h-4" /></label></div></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-semibold mb-4">通知履歴</h3><div className="text-center"><div className="text-3xl font-bold text-blue-600 mb-1">{mockNotifications.filter(n => !n.read).length}</div><p className="text-sm text-gray-600">未読の通知</p></div><div className="mt-4 pt-4 border-t"><div className="text-center"><div className="text-3xl font-bold text-blue-600 mb-1">{mockNotifications.length}</div><p className="text-sm text-gray-600">総通知数</p></div></div></CardContent></Card>
          </div>
        </div>
      </main>
    </div>
  );
}
