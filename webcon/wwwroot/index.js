const log = require('electron-log');
const exec = require('child_process').exec;
const button = document.querySelector('js-button');

button.addEventListener('click', function (clickEvent) {
		exec('ls ./', (err, stdout, stderr) => {
				if (err) { console.log(err); }
				console.log(stdout);
				});  
})

