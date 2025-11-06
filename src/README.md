# parashare - 傘シェアリングシステム

学生証で簡単に傘を借りられるキャンパス内シェアリングサービスのウェブアプリケーション

## 主な機能

- **インタラクティブマップ**: キャンパスマップ上で傘の貸し出し場所と在庫状況を確認
- **ズーム機能**: マップを拡大して詳細情報を表示
- **天気情報**: 現在の天気と時間別予報を表示
- **利用案内**: サービスの使い方と注意事項を掲載

## 技術スタック

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Motion (Framer Motion)
- Shadcn UI コンポーネント
- React Zoom Pan Pinch

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを表示します。

## プロジェクト構造

```
├── app/
│   ├── layout.tsx    # ルートレイアウト
│   └── page.tsx      # ホームページ
├── components/
│   ├── MapView.tsx       # マップビュー
│   ├── WeatherView.tsx   # 天気ビュー
│   ├── InfoView.tsx      # 情報ビュー
│   ├── BuildingCard.tsx  # 建物カードコンポーネント
│   └── ui/               # Shadcn UIコンポーネント
└── styles/
    └── globals.css   # グローバルスタイル
```

## ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## カラースキーム

- ベーシックカラー: `#B81C22`
- アクティブカラー: `#E50020`
- サブカラー: `#FFFFFF`, `#005BAC`
