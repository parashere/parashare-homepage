# 概要

## 役割

`parashare-homepage` は、Parashare（中京大学の学内傘シェアリングシステム）のホームページ／フロントエンドを提供するリポジトリです。`website/src/App.tsx` のヘッダーに「parashare / 傘シェアリングシステム」と表示し、利用者向けに以下の情報を 1 つの画面（モバイル幅 `max-w-md` 中央寄せ）で提供します。

- **マップ**: 貸出/返却スタンドの位置と傘の在庫数
- **天気**: 現在地の天気予報（雨確率など）
- **情報**: サービスの使い方・利用条件

画面下部の固定タブ（`Tabs`）で 3 つのビューを切り替えます。

## 表示内容（タブ別）

| タブ | コンポーネント | 表示内容 |
| --- | --- | --- |
| マップ | `MapView` (`src/components/MapView.tsx`) | キャンパスマップ画像上に貸出場所をプロット。ズーム/パン操作（`react-zoom-pan-pinch`）に対応。各拠点の在庫は `BuildingCard` で表示。場所・在庫数はソース内に定義された静的データ（例: 「セブンイレブン前」「人工知能研究棟」「8号館入口」）。 |
| 天気 | `WeatherView` (`src/components/WeatherView.tsx`) | ブラウザの位置情報（`navigator.geolocation`）を取得し、Open‑Meteo API（`api.open-meteo.com`）から気温・湿度・風速・降水確率を取得して表示。 |
| 情報 | `InfoView` (`src/components/InfoView.tsx`) | 使い方の手順（学生証タッチで貸出）、無料・利用時間などのサービス情報。 |

## 技術スタック

| 区分 | 採用技術 |
| --- | --- |
| ビルドツール | Vite 6.3.5 |
| フレームワーク | React 18.3 + TypeScript |
| React プラグイン | `@vitejs/plugin-react-swc`（SWC） |
| スタイリング | Tailwind CSS v4（`src/index.css` にビルド済み出力） |
| UI コンポーネント | Radix UI 各種 + shadcn/ui 系（`src/components/ui/`） |
| アイコン | `lucide-react` |
| アニメーション | `motion`（Framer Motion） |
| 地図操作 | `react-zoom-pan-pinch` |
| 天気データ | Open‑Meteo API（外部、キーなし） |
| 実行環境 | Node.js 20.11.0（Docker イメージ） |

> 補足: `package.json` に `next`、`src/app/`・`src/next.config.ts` 等の Next.js 由来ファイルが残存していますが、実際のエントリポイントは `website/index.html` → `src/main.tsx` → `src/App.tsx` の Vite 構成です（`main` / `dev` / `build` スクリプトはすべて Vite を使用）。

## ディレクトリ構成（website/）

| パス | 内容 |
| --- | --- |
| `website/index.html` | エントリ HTML。`#root` に React をマウント。 |
| `website/vite.config.ts` | Vite 設定。エイリアス、`outDir: build`、開発サーバー（port 4173, allowedHosts）を定義。 |
| `website/package.json` | 依存関係とスクリプト（`dev` / `build`）。 |
| `website/src/main.tsx` | React のエントリ。`App` を `createRoot` で描画。 |
| `website/src/App.tsx` | ルートコンポーネント。ヘッダーと 3 タブ（マップ/天気/情報）。 |
| `website/src/index.css` | ビルド済み Tailwind CSS。 |
| `website/src/components/` | 画面コンポーネント（`MapView` / `WeatherView` / `InfoView` / `BuildingCard`）。 |
| `website/src/components/ui/` | Radix UI ベースの汎用 UI 部品（shadcn/ui 系）。 |
| `website/src/components/figma/` | Figma 由来の補助コンポーネント（`ImageWithFallback`）。 |
| `website/src/assets/` | 画像アセット（キャンパスマップ画像など）。 |
| `website/src/app/` `website/src/*next*` | Next.js 由来の残存ファイル（現構成では未使用）。 |
