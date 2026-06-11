# セットアップ・起動方法

## 前提

- リポジトリルート（`parashare-homepage/`）に `Dockerfile` と `docker-compose.yml` があります。
- アプリ本体はサブディレクトリ `website/` に配置されています。
- Docker を使う場合 Node.js のローカルインストールは不要です。

## Docker で起動（推奨）

リポジトリルートで以下を実行します。

```bash
docker compose up --build
```

`docker-compose.yml` の定義に基づき、次のように動作します。

- サービス名: `website`、コンテナ名: `parashare-homepage-website-1`
- ポート公開: `127.0.0.1:3000` → コンテナ内 `4173`
  - ブラウザでは `http://127.0.0.1:3000` にアクセス
- `restart: unless-stopped`（明示的に停止するまで自動再起動）

### Dockerfile の処理内容

| 手順 | 内容 |
| --- | --- |
| ベースイメージ | `node:20.11.0` |
| 作業ディレクトリ | `/usr/src/app` |
| 依存インストール | `website/package*.json` をコピーして `npm install` |
| ソースコピー | `website` 配下をコピー |
| ビルド | `npm run build`（= `vite build`、出力先は `build/`） |
| 公開ポート | `EXPOSE 4173` |
| 起動コマンド | `npm run dev -- --host 0.0.0.0 --port 4173` |

> 注意: 起動コマンドはビルド成果物の配信ではなく Vite 開発サーバー（`vite dev`）を `0.0.0.0:4173` で起動します。ビルド（`vite build`）はイメージ作成時に実行されますが、実行時に配信されるのは開発サーバーです。

## ローカル（Docker なし）で起動

`website/` ディレクトリ内で実行します。

```bash
cd website
npm install
npm run dev      # Vite 開発サーバー（http://localhost:4173）
# または
npm run build    # 本番ビルド（出力先: website/build/）
```

開発サーバーのポートとホストは `vite.config.ts` の `server` 設定（`host: 0.0.0.0`, `port: 4173`）に従います。

## 公開・デプロイ設定

- `vite.config.ts` の `server.allowedHosts` に本番ドメインが許可されています。
  - `www.chukyo-parashare.com`
  - `chukyo-parashare.com`
- Docker のポートは `127.0.0.1` のみにバインドされているため、コンテナ単体では外部公開されません。実際の公開はリバースプロキシ等（リポジトリ外の構成）を介して `chukyo-parashare.com` で配信される想定と考えられます。

## 注意点

- 天気タブはブラウザの位置情報許可と Open‑Meteo API（`api.open-meteo.com`）への外部通信が必要です。位置情報を拒否すると天気は読み込み中のまま表示されません。
- ビルド成果物 `build/`、`dist/`、`node_modules/` 等は `.gitignore` で除外されています。
