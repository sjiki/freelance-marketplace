# デプロイガイド

## 1. Vercel へのデプロイ

### 手順

1. [Vercel](https://vercel.com) にログイン
2. "New Project" をクリック
3. GitHub リポジトリ `freelance-marketplace` をインポート
4. 環境変数を設定（下記参照）
5. "Deploy" をクリック

### 必要な環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `DATABASE_URL` | PostgreSQL 接続 URL | `postgresql://...` |
| `NEXTAUTH_URL` | アプリ URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | 認証シークレット（32 文字以上） | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth クライアント ID | |
| `GOOGLE_CLIENT_SECRET` | Google OAuth シークレット | |
| `STRIPE_SECRET_KEY` | Stripe シークレットキー | `sk_live_xxx` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe 公開キー | `pk_live_xxx` |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook シークレット | `whsec_xxx` |
| `S3_ENDPOINT` | S3/R2 エンドポイント | `https://xxx.r2.cloudflarestorage.com` |
| `S3_BUCKET` | バケット名 | `freelance-marketplace` |
| `S3_ACCESS_KEY` | S3 アクセスキー | |
| `S3_SECRET_KEY` | S3 シークレットキー | |
| `S3_REGION` | リージョン | `auto` (R2) |
| `RESEND_API_KEY` | メール API キー | `re_xxx` |

## 2. データベース設定

### Supabase (推奨)

1. [Supabase](https://supabase.com) でプロジェクト作成
2. Connection String をコピー
3. `DATABASE_URL` に設定

### Neon (推奨)

1. [Neon](https://neon.tech) でプロジェクト作成
2. Connection String をコピー
3. `DATABASE_URL` に設定

### Prisma マイグレーション

```bash
# ローカル
npx prisma migrate dev

# 本番
npx prisma migrate deploy
```

## 3. Stripe 設定

1. [Stripe Dashboard](https://dashboard.stripe.com) で Webhook 設定
2. エンドポイント：`https://your-app.vercel.app/api/webhooks/stripe`
3. イベントを選択：`checkout.session.completed`, `payment_intent.succeeded`

## 4. S3/R2 設定

### Cloudflare R2 (推奨)

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → R2
2. バケット作成：`freelance-marketplace`
3. API トークン作成
4. エンドポイント：`https://<account-id>.r2.cloudflarestorage.com`

### AWS S3

1. S3 バケット作成
2. IAM ユーザー作成（S3 権限）
3. アクセスキー/シークレットキーを取得

## 5. Google OAuth 設定

1. [Google Cloud Console](https://console.cloud.google.com)
2. 認証情報 → 作成 → OAuth クライアント ID
3. 認可済みのリダイレクト URI：`https://your-app.vercel.app/api/auth/callback/google`

## 6. ドメイン設定

1. Vercel プロジェクト → Settings → Domains
2. カスタムドメインを追加
3. DNS 設定を更新

## 7. 本番環境チェックリスト

- [ ] 環境変数をすべて設定
- [ ] データベースマイグレーションを実行
- [ ] Stripe Webhook を設定
- [ ] Google OAuth のリダイレクト URI を更新
- [ ] S3/R2 のバケット設定
- [ ] NEXTAUTH_SECRET を生成
- [ ] ドメイン設定
- [ ] SSL 証明書（Vercel が自動設定）

## 8. トラブルシューティング

### ビルドエラー

```bash
# ローカルでビルド確認
npm run build
```

### データベース接続エラー

- 接続文字列を確認
- 許可 IP アドレスを確認（Supabase/Neon）

### 認証エラー

- NEXTAUTH_URL が正しいか確認
- NEXTAUTH_SECRET が 32 文字以上か確認

## 9. パフォーマンス最適化

- [ ] 画像最適化（Next.js Image）
- [ ] 静的生成（ISR）
- [ ] CDN 設定
- [ ] データベースインデックス

## 10. モニタリング

- [ ] Vercel Analytics
- [ ] Sentry（エラー追跡）
- [ ] Logtail（ログ管理）
