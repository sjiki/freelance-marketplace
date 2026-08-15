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
    const { contractId } = body;
    const contract = await prisma.contract.findUnique({ where: { id: contractId }, include: { project: { include: { client: true } }, proposal: { include: { freelancer: true } } } } });
    if (!contract) return NextResponse.json({ error: '契約が見つかりません' }, { status: 404 });
    if (contract.project.clientId !== session.user.id) return NextResponse.json({ error: '権限がありません' }, { status: 403 });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: contract.amount * 100,
      currency: 'jpy',
      payment_method_types: ['card'],
      metadata: { contractId: contract.id, clientId: session.user.id, freelancerId: contract.proposal.freelancerId },
      capture_method: 'manual',
    });

    const escrow = await prisma.escrow.create({ data: { contractId: contract.id, amount: contract.amount, status: 'PENDING', stripePaymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret! } });
    return NextResponse.json({ escrow, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating escrow:', error);
    return NextResponse.json({ error: 'エスクローの作成に失敗しました' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const body = await request.json();
    const { escrowId, action } = body;
    const escrow = await prisma.escrow.findUnique({ where: { id: escrowId }, include: { contract: { include: { project: { include: { client: true } }, proposal: { include: { freelancer: true } } } } } } });
    if (!escrow) return NextResponse.json({ error: 'エスクローが見つかりません' }, { status: 404 });

    if (action === 'release') {
      await stripe.paymentIntents.capture(escrow.stripePaymentIntentId);
      await prisma.escrow.update({ where: { id: escrowId }, data: { status: 'RELEASED', releasedAt: new Date() } });
      await prisma.payment.create({ data: { contractId: escrow.contractId, amount: escrow.amount, currency: 'JPY', status: 'COMPLETED', stripePaymentId: escrow.stripePaymentIntentId } });
      await prisma.user.update({ where: { id: escrow.contract.proposal.freelancerId }, data: { totalEarnings: { increment: escrow.amount }, totalJobs: { increment: 1 } } });
      return NextResponse.json({ success: true, message: '入金しました' });
    }

    if (action === 'refund') {
      await stripe.paymentIntents.cancel(escrow.stripePaymentIntentId);
      await prisma.escrow.update({ where: { id: escrowId }, data: { status: 'REFUNDED', refundedAt: new Date() } });
      return NextResponse.json({ success: true, message: '返金しました' });
    }

    return NextResponse.json({ error: '無効なアクションです' }, { status: 400 });
  } catch (error) {
    console.error('Error processing escrow:', error);
    return NextResponse.json({ error: 'エスクローの処理に失敗しました' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || session.user.id;
    const escrows = await prisma.escrow.findMany({
      where: { contract: { OR: [{ proposal: { freelancerId: userId } }, { project: { clientId: userId } }] } },
      include: { contract: { include: { project: { select: { title: true } }, proposal: { include: { freelancer: { select: { name: true } } } } } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ escrows });
  } catch (error) {
    console.error('Error fetching escrows:', error);
    return NextResponse.json({ error: 'エスクローの取得に失敗しました' }, { status: 500 });
  }
}
