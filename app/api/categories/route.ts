import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createCategorySchema = z.object({ name: z.string().min(1).max(100), slug: z.string().min(1).max(100), icon: z.string().optional(), parentId: z.string().optional(), order: z.number().default(0) });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parentId');
    const where: any = { isActive: true };
    if (parentId) where.parentId = parentId;
    const categories = await prisma.category.findMany({ where, include: { _count: { select: { projects: true } } }, orderBy: { order: 'asc' } });
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'カテゴリの取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createCategorySchema.parse(body);
    const category = await prisma.category.create({ data: validated });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'カテゴリの作成に失敗しました' }, { status: 500 });
  }
}
