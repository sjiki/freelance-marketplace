import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({ email: z.string().email(), password: z.string().min(8), name: z.string().min(1), role: z.enum(['CLIENT', 'FREELANCER']) });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = registerSchema.parse(body);
    const user = await registerUser(validated.email, validated.password, validated.name, validated.role);
    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: '入力内容が不正です', details: error.errors }, { status: 400 });
    if (error instanceof Error && error.message.includes('既に登録')) return NextResponse.json({ error: error.message }, { status: 409 });
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'ユーザー登録に失敗しました' }, { status: 500 });
  }
}
