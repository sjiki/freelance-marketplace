import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const sendMessageSchema = z.object({ receiverId: z.string(), content: z.string().min(1).max(5000), contractId: z.string().optional() });

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    if (conversationId) {
      const messages = await prisma.message.findMany({ where: { OR: [{ senderId: session.user.id, receiverId: conversationId }, { senderId: conversationId, receiverId: session.user.id }] }, orderBy: { createdAt: 'asc' } });
      return NextResponse.json({ messages });
    }
    const conversations = await prisma.message.groupBy({ by: ['senderId', 'receiverId'], where: { OR: [{ senderId: session.user.id }, { receiverId: session.user.id }] } });
    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'メッセージの取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const body = await request.json();
    const validated = sendMessageSchema.parse(body);
    const message = await prisma.message.create({ data: { senderId: session.user.id, receiverId: validated.receiverId, content: validated.content, contractId: validated.contractId } });
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'メッセージの送信に失敗しました' }, { status: 500 });
  }
}
