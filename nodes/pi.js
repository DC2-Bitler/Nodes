/**
 * pi.js
 *
 * Authors:
 * Cameron Morris
 * Nick St.Pierre
 * Dave Jelley
 * Daniel Saari
 * 
 * This file contains the general pi node.
 * 
 * This example shows the usage for a basic door node which can either open or 
 * close a door.
 */
var Discovery = require('../node_modules/node-discovery').Discovery;

// Message format
var message = {
  type: "request", // Request or Response
  dst: "node1", // Name of node to receive message
  src: "node2", // Name of node origin
  request: "command", // Type of command
  content: "content" // Content of request
}

// Makes sure it can not be master
var pinode = new Discovery({
  weight: 1
});

// Name of this node
var piname = "FrontDoor";
// Commands the node has
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

// Sends a response back to the master of the command
function sendResponse(result, tts) {

  message.type = "response";
  message.dst = "master";
  message.src = piname;
  message.request = result;
  message.content = tts;


  console.log(message);
  pinode.send("commands", message);

}

// Process commands received from other nodes
function handleCommands(data) {
  
  if( data.dst == piname && data.type == "request") {



    if( data.request == "open" ) {
      console.log("Opening door.");

      sendResponse("success", "Door opened.");
    }
    else if ( data.request == "close" ) {
      console.log("Closing door.");

      sendResponse("success", "Door closed.");
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
