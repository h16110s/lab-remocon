# 研究室のリモコンシステム


# Clone
```
git clone https://github.com/h16110s/lab-remocon workdir
```

# 設定
## irMagitian
irMagitian用のリポジトリを取得
```
cd workdir/irmcli
git clone https://github.com/h16110s/irmcli.git
```

動かすのに必要なパッケージをインストール
```
$ sudo apt-get install python3-pip git
$ sudo pip install pyserial
```


irMagitianのリポジトリをクローンしてirmcli.pyを使ってリモコンの赤外線信号を学習する。
学習した信号はirmcli/dataディレクトリに保存


## webcon

### npm & node をインストール
```bash
$ sudo apt update
$ sudo apt install -y nodejs npm libavahi-compat-libdnssd-dev
```

モジュールをインストール
```bash
$ npm install
```

### `google-tts-api`のバージョン変更
google-tts-apiのバージョンを変更しないと
```
Error: get key failed from google
```
が発生する（Googleくんのtts-apiの返値が変更されたため？）

`node_modules/google-home-notifier/package.json`の一部を編集
```bash:node_modules/google-home-notifier/package.json
  "dependencies": {
    "body-parser": "^1.15.2",
    "castv2-client": "^1.1.2",
    "express": "^4.14.0",
    "google-tts-api": "0.0.3", // ここを0.0.6に書き換える
    "mdns": "^2.3.3",
    "ngrok": "^2.2.4"
  },
```

編集後、`google-tts-api`モジュールのバージョンをアップデート
```
$ cd node_modules/google-home-notifier
$ npm update google-tts-api
```

### Google home notifierが動いているかのテスト
`googlehome.js`にGoogleHomeのIPアドレスを追加

以下のコマンドを実行
```
$ cd $HOME/workdir/webcon
$ npm googlehome.js
```

「Google Homeです」って喋れば成功

## webサーバの起動
まず `server.js`にGoogleHomeのIPアドレスを追加

それから以下のコマンドで動作するかテスト
```bash
npm server.js
```

問題なければforeverモジュールで永続化
```
sudo npm install -g forever
forever start server.js
```

自動起動の設定は'crontab'を使う
```bash
crontab -e
```
でファイルを編集して以下を追記
```
@reboot /usr/local/bin/forever start --workingDir ${HOME}/workdir/webcon/  -c "node server.js" ./
```

リブートして実行されてればOK

# MEMO
画像やIPなどは版権等もあるためアップロードしていない

リモコン用RaspberryPiのOSは公式？からダウンロード
- http://www.lcdwiki.com/7inch_HDMI_Display-C