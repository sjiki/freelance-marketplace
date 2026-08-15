import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createTestSchema = z.object({ skillName: z.string().min(1).max(100), questions: z.array(z.object({ question: z.string(), options: z.array(z.string()), correctAnswer: z.number() })), passingScore: z.number().min(0).max(100), timeLimit: z.number().positive() });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skill = searchParams.get('skill');
    const where: any = { isActive: true };
    if (skill) where.skillName = skill;
    const tests = await prisma.skillTest.findMany({ where, include: { _count: { select: { attempts: true } } } });
    return NextResponse.json({ tests });
  } catch (error) {
    console.error('Error fetching skill tests:', error);
    return NextResponse.json({ error: 'スキルテストの取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const body = await request.json();
    const { testId, answers } = body;
    const test = await prisma.skillTest.findUnique({ where: { id: testId }, include: { questions: true } });
    if (!test) return NextResponse.json({ error: 'テストが見つかりません' }, { status: 404 });
    let correctCount = 0;
    test.questions.forEach((q, idx) => { if (answers[idx] === q.correctAnswer) correctCount++; });
    const score = Math.round((correctCount / test.questions.length) * 100);
    const passed = score >= test.passingScore;
    const attempt = await prisma.skillTestAttempt.create({ data: { testId, userId: session.user.id, score, passed, answers: answers.map((a: number) => ({ questionIndex: answers.indexOf(a), selectedAnswer: a })) } });
    if (passed) {
      const user = await prisma.user.findUnique({ where: { id: session.user.id } });
      const certifiedSkills = user?.certifiedSkills || [];
      if (!certifiedSkills.includes(test.skillName)) {
        await prisma.user.update({ where: { id: session.user.id }, data: { certifiedSkills: { push: test.skillName } } });
      }
    }
    return NextResponse.json({ attempt, passed, score });
  } catch (error) {
    console.error('Error submitting test:', error);
    return NextResponse.json({ error: 'テストの送信に失敗しました' }, { status: 500 });
  }
}
