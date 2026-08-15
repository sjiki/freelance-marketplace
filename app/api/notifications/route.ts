import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';

const createNotificationSchema = z.object({ type: z.enum(['proposal', 'message', 'payment', 'review', 'project_status']), title: z.string(), message: z.string(), userId: z.string(), metadata: z.record(z.any()).optional() });

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const where: any = { userId: session.user.id };
    if (unreadOnly) where.read = false;
    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({ where, orderBy: { createdAt: 'desc' }, take: 50 }),
      prisma.notification.count({ where: { userId: session.user.id, read: false } }),
    ]);
    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: '通知の取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createNotificationSchema.parse(body);
    const notification = await prisma.notification.create({ data: validated });
    const user = await prisma.user.findUnique({ where: { id: validated.userId }, select: { email: true } });
    if (user?.email) await sendEmail(user.email, validated.title, validated.message);
    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: '通知の作成に失敗しました' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const body = await request.json();
    const { notificationId, markAllAsRead } = body;
    if (markAllAsRead) {
      await prisma.notification.updateMany({ where: { userId: session.user.id, read: false }, data: { read: true } });
      return NextResponse.json({ success: true });
    }
    if (notificationId) {
      await prisma.notification.update({ where: { id: notificationId }, data: { read: true } });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: '無効なリクエストです' }, { status: 400 });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json({ error: '通知の更新に失敗しました' }, { status: 500 });
  }
}
