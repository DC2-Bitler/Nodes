var Discovery = require('../node_modules/node-discovery').Discovery;
var spawn = require('child_process').spawn;

var message = {
  type: "request", // Request or Response
  dst: "node1", // Name of node to receive message
  src: "node2", // Name of node origin
  request: "command", // Type of command
  content: "content" // Content of request
}

var pinode = new Discovery({
  weight: 1
});

var piname = "commpi";
var picommands = [ "voicecommand" ];
var masterNode = "NULL";


pinode.demote(true);

pinode.advertise({
  name: piname,
  commands: picommands


});

pinode.join("commands", handleCommands);


function handleCommands(data) {
  
  if( data.dst == piname && data.request == "command") {



  }
}


function handleVoice(voicetext) {

  console.log(voicetext);
  
  if( voicetext.length != 0 ) {
    // Send to master for parser
    message.type = "request";
    message.dst = "master";
    message.src = piname;
    message.request = "voiceparse";
    message.content = voicetext

    pinode.send( "commands", message);
  }

}


function voiceListener() {

  console.log("Listening...");
  var command = "./voice.sh 2> /dev/null";

  var voice = spawn('sh', ['-c', command]);


  voice.stdout.on('data', function (data) {
    // Encodes to utf8, removes quotes, whitespace
    handleVoice(data.toString('utf8').replace(/(\r\n|\n|\r|\")/gm,""));
  });

  voice.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  voice.on('close', function (code) {
  //  console.log('child process exited with code ' + code);

    voiceListener();

  });


}



pinode.on("promotion", function() {
  console.log("I was promoted.");
});

pinode.on("demotion", function() {
  console.log("I was demoted.");

  pinode.advertise(null);
});

pinode.on("added", function(obj) {
  console.log("Node added; here are all the nodes:");
  for (var id in pinode.nodes)
    console.log(pinode.nodes[id].hostName);
});

pinode.on("removed", function(obj) {
  console.log("Node removed; here are all the nodes:");
  for (var id in pinode.nodes)
    console.log(pinode.nodes[id].hostName);
});

pinode.on("master", function(obj) {
  console.log("Connected to master.");
  masterNode = obj.hostName;

  // Start voice listener
  voiceListener();




});
