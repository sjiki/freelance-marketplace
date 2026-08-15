import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createContestSchema = z.object({ title: z.string().min(1).max(200), description: z.string().min(50).max(5000), prizeAmount: z.number().positive(), deadline: z.string().datetime(), category: z.string(), skills: z.array(z.string()) });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const where: any = {};
    if (status) where.status = status;
    const contests = await prisma.contest.findMany({ where, include: { client: { select: { id: true, name: true, avatar: true } }, entries: { select: { id: true }, distinct: [freelancerId] } }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ contests });
  } catch (error) {
    console.error('Error fetching contests:', error);
    return NextResponse.json({ error: 'コンペの取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const body = await request.json();
    const validated = createContestSchema.parse(body);
    const contest = await prisma.contest.create({ data: { ...validated, deadline: new Date(validated.deadline), clientId: session.user.id }, include: { client: true } });
    return NextResponse.json(contest, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    console.error('Error creating contest:', error);
    return NextResponse.json({ error: 'コンペの作成に失敗しました' }, { status: 500 });
  }
}
