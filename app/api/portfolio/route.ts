import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createPortfolioSchema = z.object({ title: z.string().min(1).max(200), description: z.string().max(5000).optional(), thumbnailUrl: z.string().url().optional(), images: z.array(z.string().url()).optional(), projectUrl: z.string().url().optional(), tags: z.array(z.string()).optional() });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const featured = searchParams.get('featured');
    const where: any = {};
    if (userId) where.freelancerId = userId;
    if (featured === 'true') where.isFeatured = true;
    const portfolio = await prisma.portfolio.findMany({ where, include: { freelancer: { select: { id: true, name: true, avatar: true, rating: true } } }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json({ error: 'ポートフォリオの取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const body = await request.json();
    const validated = createPortfolioSchema.parse(body);
    const portfolio = await prisma.portfolio.create({ data: { ...validated, freelancerId: session.user.id }, include: { freelancer: { select: { id: true, name: true, avatar: true } } } });
    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    console.error('Error creating portfolio:', error);
    return NextResponse.json({ error: 'ポートフォリオの作成に失敗しました' }, { status: 500 });
  }
}
