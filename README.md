# フリーランスマーケットプレイス（Lancers クローン）

日本最大級のクラウドソーシングサイト「ランサーズ」に相当するフリーランスマーケットプレイスの実装例です。

## 主要機能

- ユーザー登録・認証（クライアント/フリーランサー）
- 案件投稿・検索・入札システム
- メッセージング機能
- 決済・エスクロー機能
- レビュー・評価システム
- ポートフォリオ管理

## 技術スタック

### フロントエンド
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui

### バックエンド
- Node.js + Express.js / Next.js API Routes
- PostgreSQL (Supabase / Prisma)
- Redis (キャッシュ・セッション)

### 認証・決済
- NextAuth.js (認証)
- Stripe (決済)

## プロジェクト構造

```
freelance-marketplace/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── client/
│   │   └── freelancer/
│   ├── projects/
│   │   ├── [id]/
│   │   └── new/
│   ├── messages/
│   └── api/
├── components/
│   ├── ui/
│   ├── projects/
│   ├── messages/
│   └── layout/
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
└── public/
```

## セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/sjiki/freelance-marketplace.git
cd freelance-marketplace

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local

# データベースのマイグレーション
npx prisma migrate dev

# 開発サーバーの起動
npm run dev
```

## 環境変数 (.env.local)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/freelance_db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## ライセンス

MIT
