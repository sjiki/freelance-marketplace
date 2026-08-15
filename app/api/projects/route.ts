import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createProjectSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(50).max(10000),
  category: z.string(),
  skills: z.array(z.string()).min(1),
  budgetType: z.enum(['FIXED', 'HOURLY']),
  budgetMin: z.number().positive(),
  budgetMax: z.number().positive().optional(),
  deadline: z.string().datetime().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const skill = searchParams.get('skill');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;
    const where: any = { status: 'OPEN' };

    if (category) where.category = category;
    if (skill) where.skills = { has: skill };
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          client: { select: { id: true, name: true, avatar: true, rating: true, isVerified: true } },
          proposals: { select: { id: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({ projects, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: '案件の取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const body = await request.json;
    const validated = createProjectSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user?.role !== 'CLIENT') {
      return NextResponse.json({ error: 'クライアントアカウントが必要です' }, { status: 403 });
    }

    const project = await prisma.project.create({
      data: { ...validated, deadline: validated.deadline ? new Date(validated.deadline) : undefined, clientId: session.user.id },
      include: { client: { select: { id: true, name: true, avatar: true, rating: true } } },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    }
    console.error('Error creating project:', error);
    return NextResponse.json({ error: '案件の作成に失敗しました' }, { status: 500 });
  }
}
