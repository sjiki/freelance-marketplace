import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const data = await resend.emails.send({ from: 'FreelanceMarket <noreply@yourdomain.com>', to, subject, html });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendProposalNotification(clientEmail: string, freelancerName: string, projectTitle: string) {
  const html = `<h1>新しい提案が届きました</h1><p>${freelancerName} さんから「${projectTitle}」に提案が届きました。</p><a href="https://yourdomain.com/dashboard">ダッシュボードを確認</a>`;
  return sendEmail(clientEmail, `[FreelanceMarket] 新しい提案が届きました`, html);
}

export async function sendProjectAcceptedNotification(freelancerEmail: string, clientName: string, projectTitle: string) {
  const html = `<h1>提案が採用されました！</h1><p>${clientName} さんの「${projectTitle}」の提案が採用されました。</p><a href="https://yourdomain.com/messages">メッセージを確認</a>`;
  return sendEmail(freelancerEmail, `[FreelanceMarket] 提案が採用されました！`, html);
}

export async function sendNewMessageNotification(userEmail: string, senderName: string) {
  const html = `<h1>新しいメッセージ</h1><p>${senderName} さんから新しいメッセージが届きました。</p><a href="https://yourdomain.com/messages">メッセージを確認</a>`;
  return sendEmail(userEmail, `[FreelanceMarket] 新しいメッセージ`, html);
}

export async function sendPaymentNotification(userEmail: string, amount: number, type: 'received' | 'sent') {
  const html = `<h1>決済が完了しました</h1><p>￥${amount.toLocaleString()} の${type === 'received' ? '入金' : '出金'}が完了しました。</p><a href="https://yourdomain.com/payments">決済履歴を確認</a>`;
  return sendEmail(userEmail, `[FreelanceMarket] 決済完了のお知らせ`, html);
}
