// my name is dave and i did this
var spawn = require('child_process').spawn;
function shspawn(command) {
   console.log("SAY THINGS NOW");
   tits = spawn('sh', ['-c', command]);
 

tits.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

tits.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

tits.on('close', function (code) {
  console.log('child process exited with code ' + code);

  shspawn('./voice.sh 2> /dev/null');

});

}


shspawn('./voice.sh 2> /dev/null');
