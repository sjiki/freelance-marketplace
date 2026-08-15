import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateUploadUrl } from '@/lib/storage';
import { z } from 'zod';

const uploadSchema = z.object({ fileName: z.string(), contentType: z.string(), fileSize: z.number().max(50 * 1024 * 1024) });

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const body = await request.json();
    const validated = uploadSchema.parse(body);
    const { uploadUrl, fileUrl, key } = await generateUploadUrl(validated.fileName, validated.contentType, session.user.id);
    return NextResponse.json({ uploadUrl, fileUrl, key, fileName: validated.fileName });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '無効なファイルです', details: error.errors }, { status: 400 });
    console.error('Error generating upload URL:', error);
    return NextResponse.json({ error: 'アップロード URL の生成に失敗しました' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get('contractId');
    const submissions = await prisma.submission.findMany({ where: contractId ? { contractId } : { freelancerId: session.user.id }, include: { freelancer: { select: { id: true, name: true, avatar: true } }, files: true }, orderBy: { submittedAt: 'desc' } });
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: '提出物の取得に失敗しました' }, { status: 500 });
  }
}
