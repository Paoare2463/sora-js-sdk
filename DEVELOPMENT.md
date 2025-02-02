# 開発

**この資料は SDK 開発者向けです**

## 開発環境

- Node.js
    - v16.13.0 以上
- npm
    - v8.1.0 以上
- npm install
    - これで事前に利用するライブラリをインストールする

## 開発準備

**lerna でパッケージ管理していた時代に yarn install した状態の場合はトップディレクトリと packages 以下のすべての node_modules を削除すること**

- `npm install` を実行
- `npm run start` でローカルサーバを起動する

## 開発
sora-js-sdk のトップディレクトリでコマンドを実行することによりビルドやフォーマットを行う

- `npm run build` packages 以下をビルドする
- `npm run lint` packages 以下のコードに lint を実行する
- `npm run fmt` packages 以下のコードに formatter を実行する
- `npm run test` packages 以下のテストを実行する

## パッケージ更新
sora-js-sdk の package 更新
- `npx ncu -u` を実行する
- `npm update` を実行する

sora-js-sdk/packages の package 更新
- `npx --workspaces ncu -u` を実行する
- `npm update` を実行する
- `npm run build` を実行する
- `npm run lint` を実行する
- `npm run test` を実行する

## ドキュメント作成
- `npm run doc` を実行する
