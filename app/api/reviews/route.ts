import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createReviewSchema = z.object({ contractId: z.string(), rating: z.number().min(1).max(5), comment: z.string().min(10).max(1000).optional() });

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const body = await request.json();
    const validated = createReviewSchema.parse(body);
    const existing = await prisma.review.findUnique({ where: { contractId: validated.contractId, reviewerId: session.user.id } });
    if (existing) return NextResponse.json({ error: '既にレビューしています' }, { status: 409 });
    const contract = await prisma.contract.findUnique({ where: { id: validated.contractId }, include: { proposal: { select: { freelancerId: true } } } });
    const review = await prisma.review.create({ data: { ...validated, reviewerId: session.user.id, revieweeId: contract?.proposal.freelancerId || '' }, include: { reviewee: { select: { id: true, name: true, rating: true } } } });
    const reviews = await prisma.review.findMany({ where: { revieweeId: review.revieweeId } });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await prisma.user.update({ where: { id: review.revieweeId }, data: { rating: avgRating } });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'レビューの作成に失敗しました' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId が必要です' }, { status: 400 });
    const reviews = await prisma.review.findMany({ where: { revieweeId: userId }, include: { reviewer: { select: { id: true, name: true, avatar: true } } }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'レビューの取得に失敗しました' }, { status: 500 });
  }
}
