# 研究室のリモコンシステム


# Clone
```
mkdir ~/workdir
cd workdir
git clone https://github.com/h16110s/lab-remocon
```

# 設定
## irMagitian
irMagitianのリポジトリをクローンしてirmcli.pyを使ってリモコンの赤外線信号を学習する。
学習した信号はirmcli/dataディレクトリに保存

## Hubot
homebot/bin/hubotに`HUBOT_SLACK_TOKEN`を設定
永続的に起動する場合にはforeverモジュールで起動するため、homebot/bin/hubotファイルの
```
exec node_modules/.bin/hubot --name "homebot" "$@"
```
の行をコメントアウトし、

```
forever start -w -c coffee node_modules/.bin/hubot -a slack
```
の行をコメントアウトを外す。


## webcon
`server.js`にGoogleHomeのIPアドレス、webcon/wwwroot/call.htmlにRaspberryPiのIPアドレスを入力



# 起動方法
hubotの起動
```
cd ~/workdir/homebot/
bin/hubot
```

webコントローラの起動
```
cd ~/workdir/webcon
forever start server.js
```

# 構築方法
Docsの`Construction.md`に構築メモは残してある。



# MEMO
画像やIPなどは版権等もあるためアップロードしていない