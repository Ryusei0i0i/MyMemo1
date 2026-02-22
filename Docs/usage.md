## 自分用ローカル使用方法
### 環境
- Windows11
- DockerDesktop
- PostgreSQL v16
- nvm
- Node v24
- Express v5
#### 手順
- 1.MyMemo1フォルダのターミナルで以下を実行<br>
```docker compose up -d```
- 2.以下のコマンドでnodeのバージョンを変更(必要なら)<br>
```nvm use 24.0.0```
- 3.一応Nodeのバージョン確認、v24.x.xならOK<br>
```node -v```
- 4.スクリプトでDBのテーブルを作る<br>
```./bin/init-db.sh```
- 5.実行<br>
```npm run dev```