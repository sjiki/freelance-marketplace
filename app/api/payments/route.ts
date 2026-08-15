import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const body = await request.json();
    const { contractId, amount } = body;
    if (!contractId || !amount) return NextResponse.json({ error: '無効なリクエストです' }, { status: 400 });
    const paymentSession = await stripe.checkout.sessions.create({ payment_method_types: ['card'], line_items: [{ price_data: { currency: 'jpy', product_data: { name: '契約決済' }, unit_amount: amount * 100 }, quantity: 1 }], mode: 'payment', success_url: `${process.env.NEXTAUTH_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${process.env.NEXTAUTH_URL}/payments/cancel`, metadata: { contractId, userId: session.user.id } });
    const payment = await prisma.payment.create({ data: { contractId, amount, currency: 'JPY', stripePaymentId: paymentSession.id, status: 'PENDING' } });
    return NextResponse.json({ payment, url: paymentSession.url });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ error: '決済の作成に失敗しました' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const payments = await prisma.payment.findMany({ where: { contract: { OR: [{ proposal: { freelancerId: session.user.id } }, { proposal: { project: { clientId: session.user.id } } }] } }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: '決済履歴の取得に失敗しました' }, { status: 500 });
  }
}
