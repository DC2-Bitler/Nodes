var Discovery = require('../node_modules/node-discovery').Discovery;

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

var piname = "FrontDoor";
var picommands = [ "open", "close" ];
var masterNode = "NULL";

// NRS 5.7.14 adding this in, soon, to help ui auto-generate options
//var piType = "door";

pinode.demote(true);

pinode.advertise({
  name: piname,
  //nodeType: piType,
  commands: picommands

});

pinode.join("commands", handleCommands);


function sendResponse(result, tts) {

  message.type = "response";
  message.dst = "master";
  message.src = piname;
  message.request = result;
  message.content = tts;


  console.log(message);
  pinode.send("commands", message);

}

function handleCommands(data) {
  
  if( data.dst == piname && data.type == "request") {



    if( data.request == "open" ) {
      console.log("Opening door.");

      sendResponse("success", "Door opened.");
    }
    else if ( data.request == "close" ) {
      console.log("Closing door.");
    }
    else {
      console.log("Bad command");
    }




  }


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





});
