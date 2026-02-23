# MyMemo1
## 概要
Express + PostgreSQL + JaveScriptで作ったメモアプリ。

バックエンドとデータベースの練習を目的としたプロジェクト。（のはずが、フロントエンドの方が苦戦した。）

---

## 使用した技術
- Node.js
- Express
- PostgreSQL
- TypeScript
- Docker
- HTML / CSS / JavaScript

---

## 感想

- app.jsを書くのが大変でした。formにidをつけ忘れていていました。
- formの理解の浅さを痛感しました。
- PostgreSQLに慣れてないのでもっと学びます。
- 学習目的がExpressとPostgreSQLの基礎に慣れることなので、セキュリティやサイトのUI/UXはまったく考えていません。
- SQLインジェクションとか怖いです。
- APIのエンドポイントのパスはメソッドで区別できることを知りました。これまでは、/memos/updateや/memos/deleteのように書いていました。

---

## ローカル起動方法(Docsのusage.mdにも書いてあります。)

- 1.MyMemo1フォルダのターミナルで以下を実行<br>
```docker compose up -d```
- 2.以下のコマンドでnodeのバージョンを変更(必要なら)<br>
```nvm use 24.0.0```
- 3.一応Nodeのバージョン確認、v24.x.xならOK<br>
```node -v```
- 4.スクリプトでDBのテーブルを作る<br>
```./bin/init-db.sh```
- 5.サーバー起動<br>
```npm run dev```

--- 

## 実装機能
- メモ作成(Create)
- メモ一覧取得(Read)
- メモ更新(Update)
- メモ削除(Delete)

---
## データベースの構造

```mermaid
erDiagram
    MEMOS {
        int id PK
        text title
        text content
        timestamptz created_at
        timestamptz updated_at
    }
