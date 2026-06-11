# parashare-homepage ドキュメント

Parashare（中京大学 学内傘シェアリングシステム）のホームページ／フロントエンド用リポジトリのドキュメント索引です。

| ドキュメント | 内容 |
| --- | --- |
| [overview.md](./overview.md) | 役割・技術スタック・ディレクトリ構成 |
| [setup.md](./setup.md) | 起動方法（Docker / ローカル）・公開設定 |

## 一言まとめ

- Vite + React 18 + TypeScript で作られたシングルページアプリ（SPA）。
- 「マップ」「天気」「情報」の 3 タブで、傘の貸出場所・天気予報・使い方を表示する。
- UI は Tailwind CSS と Radix UI ベースのコンポーネント（shadcn/ui 系）で構築。
- Docker（`docker compose up`）で起動でき、`127.0.0.1:3000` で公開される。
