import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, User } from 'lucide-react';

const mockConversations = [{ id: "1", user: { id: "u1", name: "田中太郎", avatar: null }, lastMessage: "ご提案ありがとうございます。詳細を伺えますか？", unreadCount: 2, updatedAt: new Date("2026-08-14 10:30") }, { id: "2", user: { id: "u2", name: "株式会社テック", avatar: null }, lastMessage: "納期について相談させてください", unreadCount: 0, updatedAt: new Date("2026-08-13 15:20") }];
const mockMessages = [{ id: "m1", senderId: "u1", content: "はじめまして。Web サイト開発の件で提案させていただきました田中と申します。", createdAt: new Date("2026-08-14 09:00") }, { id: "m2", senderId: "me", content: "ご提案ありがとうございます。詳細を伺えますか？", createdAt: new Date("2026-08-14 09:15") }, { id: "m3", senderId: "u1", content: "もちろんです。React/Next.js で 5 年の開発経験があり、過去に類似のコーポレートサイト制作実績が多数ございます。", createdAt: new Date("2026-08-14 09:30") }, { id: "m4", senderId: "u1", content: "ポートフォリオもご用意できますので、ご確認いただければ幸いです。", createdAt: new Date("2026-08-14 10:30") }];

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white"><div className="container mx-auto px-4 py-3"><Link href="/" className="text-2xl font-bold text-blue-600">FreelanceMarket</Link></div></header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6"><Link href="/dashboard"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link><h1 className="text-2xl font-bold">メッセージ</h1></div>
        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          <Card className="lg:col-span-1"><CardContent className="p-0 h-full flex flex-col"><div className="p-4 border-b"><Input placeholder="検索..." className="w-full" /></div><div className="flex-1 overflow-y-auto">{mockConversations.map((conv) => (<div key={conv.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">{conv.user.avatar ? (<img src={conv.user.avatar} alt={conv.user.name} className="w-full h-full rounded-full object-cover" />) : (<User className="w-5 h-5 text-gray-500" />)}</div><div className="flex-1 min-w-0"><div className="flex items-center justify-between"><h3 className="font-semibold truncate">{conv.user.name}</h3><span className="text-xs text-gray-500">{new Date(conv.updatedAt).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</span></div><p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p></div>{conv.unreadCount > 0 && (<span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">{conv.unreadCount}</span>)}</div></div>))}</div></CardContent></Card>
          <Card className="lg:col-span-2"><CardContent className="p-0 h-full flex flex-col"><div className="p-4 border-b flex items-center gap-3"><div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-gray-500" /></div><div><h3 className="font-semibold">田中太郎</h3><p className="text-xs text-gray-500">Web サイト開発の件</p></div></div><div className="flex-1 overflow-y-auto p-4 space-y-4">{mockMessages.map((msg) => (<div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[70%] rounded-lg p-3 ${msg.senderId === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}><p className="text-sm">{msg.content}</p><p className={`text-xs mt-1 ${msg.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>{new Date(msg.createdAt).toLocaleString('ja-JP')}</p></div></div>))}</div><div className="p-4 border-t"><div className="flex gap-2"><Input placeholder="メッセージを入力..." className="flex-1" /><Button className="bg-blue-600 hover:bg-blue-700"><Send className="w-4 h-4" /></Button></div></div></CardContent></Card>
        </div>
      </main>
    </div>
  );
}
