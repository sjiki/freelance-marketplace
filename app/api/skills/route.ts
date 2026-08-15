import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createSkillSchema = z.object({ name: z.string().min(1).max(100), slug: z.string().min(1).max(100), categoryId: z.string().optional() });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const where: any = { isActive: true };
    if (categoryId) where.categoryId = categoryId;
    if (search) where.name = { contains: search, mode: 'insensitive' };
    const skills = await prisma.skill.findMany({ where, orderBy: { usageCount: 'desc' }, take: 100 });
    return NextResponse.json({ skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ error: 'スキルの取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createSkillSchema.parse(body);
    const skill = await prisma.skill.create({ data: validated });
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    console.error('Error creating skill:', error);
    return NextResponse.json({ error: 'スキルの作成に失敗しました' }, { status: 500 });
  }
}
