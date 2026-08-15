import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createProposalSchema = z.object({
  projectId: z.string(),
  bidAmount: z.number().positive(),
  deliveryDays: z.number().positive(),
  coverLetter: z.string().min(50).max(5000),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const where: any = { freelancerId: session.user.id };
    if (projectId) where.projectId = projectId;

    const proposals = await prisma.proposal.findMany({
      where,
      include: { project: { select: { id: true, title: true, category: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ proposals });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json({ error: '提案の取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const body = await request.json();
    const validated = createProposalSchema.parse(body);

    const existing = await prisma.proposal.findUnique({
      where: { projectId_freelancerId: { projectId: validated.projectId, freelancerId: session.user.id } },
    });

    if (existing) return NextResponse.json({ error: '既に提案しています' }, { status: 409 });

    const proposal = await prisma.proposal.create({
      data: { ...validated, freelancerId: session.user.id },
      include: { project: { select: { id: true, title: true, clientId: true } } },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    console.error('Error creating proposal:', error);
    return NextResponse.json({ error: '提案の作成に失敗しました' }, { status: 500 });
  }
}
