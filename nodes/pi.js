var Discovery = require('../node_modules/node-discovery').Discovery;

var pinode = new Discovery({
  weight: 1
});

var piname = "FrontDoor";
var picommands = [ "open", "close" ];
var masterNode = "NULL";

pinode.demote(true);

pinode.advertise({
  name: piname,
  commands: picommands

});

pinode.join("commands", handleCommands);


function handleCommands(data) {
  
  if( data.name == piname) {

    if( data.command == "open" ) {
      console.log("Opening door.");
    }
    else if ( data.command == "close" ) {
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
