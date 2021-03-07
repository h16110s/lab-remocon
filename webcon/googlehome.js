const googlehome = require('google-home-notifier');
const language = 'ja';

googlehome.device('google-Home', language);
googlehome.ip('');　 //Google Home 

googlehome.notify('GoogleHomeです', function(res) {
  console.log(res);
});
