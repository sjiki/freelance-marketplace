import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'projects';
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const skills = searchParams.get('skills')?.split(',');
    const budgetMin = searchParams.get('budgetMin');
    const budgetMax = searchParams.get('budgetMax');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;
    const where: any = {};

    if (type === 'projects') {
      where.status = 'OPEN';
      if (category) where.category = category;
      if (skills) where.skills = { hasSome: skills };
      if (budgetMin) where.budgetMin = { gte: parseInt(budgetMin) };
      if (budgetMax) where.budgetMax = { lte: parseInt(budgetMax) };
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      const [projects, total] = await Promise.all([
        prisma.project.findMany({
          where,
          include: { client: { select: { id: true, name: true, avatar: true, rating: true, isVerified: true } }, proposals: { select: { id: true } } },
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: limit,
        }),
        prisma.project.count({ where }),
      ]);

      return NextResponse.json({ results: projects, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
    }

    if (type === 'freelancers') {
      where.role = 'FREELANCER';
      if (skills) where.skills = { hasSome: skills };
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { bio: { contains: search, mode: 'insensitive' } },
        ];
      }

      const freelancers = await prisma.user.findMany({
        where,
        include: { portfolio: { select: { id: true, title: true, thumbnailUrl: true }, take: 3 }, reviews: { select: { id: true, rating: true }, take: 5 } },
        orderBy: { rating: 'desc' },
        skip,
        take: limit,
      });

      return NextResponse.json({ results: freelancers, pagination: { page, limit, total: freelancers.length } });
    }

    return NextResponse.json({ error: '無効な検索タイプです' }, { status: 400 });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json({ error: '検索に失敗しました' }, { status: 500 });
  }
}
