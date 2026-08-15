import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreelanceMarket - 日本最大級のフリーランスマーケットプレイス",
  description: "300 万人以上のフリーランサーと、あらゆるスキルを持つ専門家が見つかります",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
