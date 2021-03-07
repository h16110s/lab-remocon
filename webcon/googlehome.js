const googlehome = require('google-home-notifier');
const language = 'ja';

googlehome.device('google-Home', language);
googlehome.ip('');　 //サーバIPアドレス

googlehome.notify('GoogleHomeです', function(res) {
  console.log(res);
});
