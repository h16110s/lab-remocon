// 変数の初期化と宣言 ************************************
var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
app.use(express.static('wwwroot'));
var exec = require('child_process').exec;
const language = 'ja';

// ルートディレクトリの設定*******************************
//app.use(express.static('wwwroot'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/wwwroot/index.html');
});
// *******************************************************
 
// 起動時の処理
http.listen(port, function () {
    console.log("サーバーがポート%dで起動しました。モード%s", port, app.settings.env)
});