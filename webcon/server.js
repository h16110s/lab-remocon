// 変数の初期化と宣言 ************************************
var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
app.use(express.static('wwwroot'));
var exec = require('child_process').exec;
const googlehome = require('google-home-notifier');
const language = 'ja';
googlehome.device("Google-Home", language);
googlehome.ip(''); //　GoogleHomeIPアドレス
// *******************************************************
 
// ルートディレクトリの設定*******************************
//app.use(express.static('wwwroot'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/wwwroot/index.html');
});
// *******************************************************
 
 
// Postデータの処理 *************************************
app.post('/', function(req, res) {
    sendData(req,res, '/');
});
// ****************************************************

// Postデータの処理 *************************************
app.post('/app.html', function(req, res){
    sendData(req,res, '/app.html');
});
// ****************************************************

function sendData(req, res, redirect_page){
    console.log("postnow");
    var data = '';
    req.on('data', function (chunk) { data += chunk }).on('end', function () {
        console.log(data);
        if (data == 'submit1=1') {
            exec('~/workdir/irmcli/send.sh num1', (err) => {
                if (err) { console.log(err); }
            });
            googlehome.notify('入力をウィンドウズに切り替えます', function (res) {
                console.log(res);
            });
        } else if (data == 'submit2=2') {
            exec('~/workdir/irmcli/send.sh num2', (err) => {
                if (err) { console.log(err); }
            });
            googlehome.notify('入力をHDMIに切り替えます', function (res) {
                console.log(res);
            });
        } else if (data == 'submit3=3') {
            exec('~/workdir/irmcli/send.sh num3', (err) => {
                if (err) { console.log(err); }
            });
            googlehome.notify('入力をクロームキャストに切り替えます', function (res) {
                console.log(res);
            });
        } else if (data == 'submit4=4') {
            exec('~/workdir/irmcli/send.sh num4', (err) => {
                if (err) { console.log(err); }
            });
            googlehome.notify('入力をApple TVに切り替えます', function (res) {
                console.log(res);
            });
        } else if (data == 'submit5=5') {
            exec('~/workdir/irmcli/send.sh num5', (err) => {
                if (err) { console.log(err); }
            });
            googlehome.notify('入力を切り替えます', function (res) {
                console.log(res);
            });
        } else if (data == 'submit6=6') {
            exec('~/workdir/irmcli/send.sh pow', (err) => {
                if (err) { console.log(err); }
            });
            googlehome.notify('電源を操作します', function (res) {
                console.log(res);
            });
        } else if (data == 'submit7=7') {
            exec('~/workdir/irmcli/send.sh', (err) => {
                if (err) { console.log(err); }
            });
            googlehome.notify('音量を上げます', function (res) {
                console.log(res);
            });
        } else if (data == 'submit8=8') {
            exec('~/workdir/irmcli/send.sh', (err) => {
                if (err) { console.log(err); }
            });
            googlehome.notify('音量を下げます', function (res) {
                console.log(res);
            });
        } else if (data == 'submit9=9') {
            googlehome.notify('研究室の扉を開けてください', function (res) {
                console.log(res);
            });
        } else {
        }
    })
    res.redirect(redirect_page);
    res.end();
}
 
// 起動時の処理
http.listen(port, function () {
    console.log("サーバーがポート%dで起動しました。モード%s", port, app.settings.env)
});
