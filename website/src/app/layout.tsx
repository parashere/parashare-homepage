import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "parashare - 傘シェアリングシステム",
  description: "学生証で簡単に傘を借りられるキャンパス内シェアリングサービス",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
