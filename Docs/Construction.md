# Raspi リモコン

## 今回使う物
- Raspberry pi 3
- [irMagician](https://www.switch-science.com/catalog/2150/)
- Google Home / Google Home mini
- IFTTT
- Hubot
- Slack


## RaspiにirMagicianを接続
主に[こちら](http://www.omiya-giken.com/?page_id=889) をベースに進める。

Linuxの接続方法は`screen`コマンドを用いるが、Raspberry Pi OSにはデフォルトでは行っていないので以下のコマンドでインストール
```bash
$ sudo apt -y install screen
```


あとは説明通りに
```bash
$ screen /dev/ttyACM0 9600
```
で直接モニタリングして、`Ready`が表示されてれば利用可能。終了するときは`Ctrl+a`を押したあと、`k`を入力すればscreenが終了できる。

`c`+`Enter`で`...`が表示されたらキャプチャモード
`p`+`Enter`で`Done`が表示されたら送信完了


詳細は[ここ](http://www.omiya-giken.com/?page_id=889)で確認できる


## irMagicianをコマンドで実行する
前述の方法ではインタラクティブな送受信はできるが自動化するには不便。そこでコマンドで実行できるようにする。

まず必要なアプリケーションをインストール

（もしかしたらもう入ってるかも）
- python-pip
- git
```bash
$ sudo apt-get install python-pip git
$ sudo pip install pyserial
```

次にirmcliのリポジトリをクローンしてつかう
```bash
$ git clone https://github.com/butadora3/irmcli.git
$ cd irmcli  
```

### 赤外線信号の受信
以下のコマンドを実行後、irMagicianのセンサに向けてリモコンの赤外線信号を送る
```bash
$ python irmcli.py -c
Capturing IR...
```
正しく受信できていれば数字が出てくる。うまくできていなければ`Time Out!`とかって出力が出てくる。

### 学習した赤外線データのファイル出力
以下のコマンドでデータがJSON形式でファイルに出力される。

<FILE_NAME>には任意のファイル名を入力する。
```bash
$ python irmcli.py -s -f <FILE_NAME>.json
Saving IR data to sw_on.json ...
Done !
```
上だとうまくうごかない可能性ある
```bash
$ python irmcli.py -c -f <FILE_NAME>.json
Saving IR data to sw_on.json ...
Done !
```

### 出力ファイルを元に赤外線データを送信
以下のコマンドで保存したデータを送信できる

```bash
$ python irmcli.py -p -f <FILE_NAME>.json  
```

### コマンドをシェルにまとめておく
コマンドをシェルにまとめておくと後々便利
記録したデータはirmcli下のdataディレクトリに保存するためディレクトリを作成する。

```sh:send.sh
#!/bin/sh
python $HOME/workdir/irmcli/irmcli.py -p -f $HOME/workdir/irmcli/data/$1.json
```

```sh:learn.sh
#!/bin/sh
python $HOME/workdir/irmcli/irmcli.py -s -f $HOME/workdir/irmcli/data/$1.json
```

## Nodejsをインストール
以下のコマンドでNodejsとパッケージ管理のnpmをインストールする。

### nodejs とnpm のデフォルトパッケージのインストール
※apt-getでインストールしたNode.jsとnpmは、nをインストールするためだけに使用する
```bash
$ sudo apt update
$ sudo apt install -y nodejs npm
```

### npmでnをインストール
※念のためnpmのキャッシュを削除してからnをインストールする
```bash 
$ sudo npm cache clean
$ sudo npm install n -g
```

### nで任意のバージョンのNode.jsをインストール
今回は長期サポート版をインストール
```bash
$ sudo n lts
```




＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

## リモコン用Webサイトの作成（学園生活部）
リモコン操作用のウェブページを作成する。まずはディレクトリから
```bash
$ mkdir webcon
$ cd webcon
```


### npmモジュールのインストール
次にnpmの初期化をする。いろいろ聞かれるけど特になければ全部EnterでOK
```bash
$ npm init
```

webフレームワーク`express`とbashコマンドを実行するための`child_process`モジュールをインストールする
```bash
$ npm install -s express
$ npm install -s child_process
```




### webサーバの構築   
今回は`wwwroot`ディレクトリを作成してHTMLコンテンツはそこに保存する。
```bash
$ mkdir wwwroot
```

また、webサーバの設定を書き込むための`server-simple.js`を作成して、以下のコマンドでサーバを起動させてみる。

```bash
$ node server-simple.js
サーバーがポート3000で起動しました。
```
問題がなければ3000番ポートでサーバが立ち上がる。`http://<IPアドレス>:3000`でアクセスして`wwwroot`のコンテンツが表示されてれば問題なし

`Ctrl + c`で終了できる。


### Raspberry Pi からGoogleHomeへのメッセージ（GoogleHomeに喋らせる）
Google Homeをしゃべらせるには、google-home-notifierというnpmモジュールが必要になる。

```bash
$ sudo apt-get install libavahi-compat-libdnssd-dev
$ npm install -s google-home-notifier
```

インストールできたら`server.js`に`googlehomeのIPアドレス`と`ウェブサイトのURL`を適当な物に置き換えて
```bash
$ node googlehome.js
```


＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝


## Hubotの導入
とりあえずディレクトリ作成
```bash
$ mkdir homebot
$ cd homebot
```

必要なモジュールのインストール。多分コマンドをいろいろするのでsudo付けないと権限足りないって怒られるかもしれん
```bash 
$ sudo npm install -g yo
$ sudo npm install -g generator-hubot
$ sudo npm install -g coffee-script
$ sudo npm install -g forever
```

そしたらモジュールを使ってhubotの雛形を作成する
```bash
 $ yo hubot
 ? Owner          # メールアドレスなどを入力（デフォルトのままでOK）
 ? Bot name       # 「homebot」と入力
 ? Description
 ? Bot adapter    # 「slack」と入力
```

その中から不要な`hubot-scripts.json `を削除
```bash
rm hubot-scripts.json
```

あと、`external-scripts.json`の一部を書き換え
```bash:external-scripts.json 
[
  "hubot-heroku-keepalive",           # この1行を削除
]
```

### 起動
```bash
$ bin/hubot
[Thu Sep 03 2020 02:20:58 GMT+0900 (GMT+09:00)] INFO hubot-redis-brain: Using default redis on localhost:6379
homebot>
```
もしかするとコンソールがバグって`homebot>`が先に出てる時がある。Enter押せば似たような感じになる

### 終了
終了するときは`Crtl + d`で終了できる。

### 動作確認
homebotが起動している状態で`homebot ping`を打って`PONG`と返ってくれば問題なく雛形ができてる。
```hubot
homebot> homebot ping
homebot> PONG         #出力
```


## hubot-broadlink-rmを導入
hubotを拡張するためのモジュールをインストールする。
```
$ npm install -s hubot-broadlink-rm
```

モジュールの有効化のため、`external-scripts.json`の一部を編集
```bash:external-scripts.json 
[
  "hubot-broadlink-rm",       # この1行を追加
]
```

## hubotにコマンド登録

コマンド保存可能にするためのソフトをインストールする。
```bash
$ sudo apt install redis-server
```


`bin/hubot`コマンドでhubotを開いて、irMagicianで作成したシェルをコマンド登録しておく

```homebot
homebot> homebot command pi:learn ~/workdir/irmcli/learn.sh '#'
set !pi:learn to ~/workdir/irmcli/learn.sh '#'
```
```homebot
homebot> homebot command pi:send ~/workdir/irmcli/send.sh '#'
set !pi:send to ~/workdir/irmcli/send.sh '#'
```


これをするとhubot内にて学習と送信ができるようになる。

*学習*
```homebot
homebot> homebot send pi:learn(<COMMAND_NAME>)

homebot> ~/workdir/irmcli/learn.sh '<COMMAND_NAME>'
Saving IR data to /home/pi/workdir/irmcli/data/<COMMAND_NAME>.json ...
Done !
```

*送信*
```homebot
homebot> homebot send pi:send(<COMMAND_NAME>)

homebot> ~/workdir/irmcli/send.sh '<COMMAND_NAME>'
Playing IR with /home/pi/workdir/irmcli/data/<COMMAND_NAME>.json ...
... Done !
```


## hubotとSlackを連携
slackアカウントを登録して新しいチャンネルを作成する。

Slackの「App」管理画面で`hubot`を検索してアプリをインストール。（名前などは任意）

### HUBOT_SLACK_TOKENを取得
Slack の Hubok アプリをインストールすると、アプリの設定画面に `HUBOT_SLACK_TOKEN` が表示される．
>  HUBOT_SLACK_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
後で必要になるので，このトークンをメモしておく．


### HUBOT_SLACK_TOKENをhubotに設定
`homebot/bin/hubot`を編集して以下の行を追加する。

```
 export PATH= ...
 export HUBOT_SLACK_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"    # この1行を追加
 exec ...
```


### hubotを永続起動（バックグラウンドで）
`homebot/bin/hubot`を編集して以下の行を追加する。

```bash
#exec node_modules/.bin/hubot --name "homebot" "$@"       ←今まで書いてあった方
forever start -w -c coffee node_modules/.bin/hubot -a slack         # この１行を追加
```
起動方法は今までと同じ


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




# 困ったときは・・・

## server.jsを起動させようとしたら

```
Error: Cannot find module '../build/Release/dns_sd_bindings'
```
を含むエラーが出たら
```bash
$ npm install --unsafe-perm mdns 
$ npm rebuild --unsafe-perm
```
を実行すればいいらしい

```
Error: get key failed from google
```
が出たら
`node_modules/google-home-notifier/package.json`のなかの
`google-tts-api`の項目を`0.0.6`に変更し、`google-home-notifer`下のディレクトリで
```bash
$ npm install
```
を実行し、`google-tts-api`のバージョンを上げると解決する。
