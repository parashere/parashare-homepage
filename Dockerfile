FROM node:20.11.0

# コンテナ内の作業ディレクトリ
WORKDIR /usr/src/app

# 1. 依存関係だけ先にコピーしてインストール
#    ホスト側の Vite プロジェクトは parashare-homepage/website 配下にある想定
COPY website/package*.json ./
RUN npm install

# 2. 残りのソースコードをコピー
COPY website ./

# 3. 本番ビルド（Vite）
RUN npm run build

# 4. ビルド済みを配信する preview サーバを起動
#    preview はデフォルトで 4173 番ポートを使う
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
