var Discovery = require('../node_modules/node-discovery').Discovery;

var message = {
  type: "request", // Request or Response
  dst: "node1", // Name of node to receive message
  src: "node2", // Name of node origin
  request: "command", // Command being run
  content: "content" // Content of request
}


var master = new Discovery({
  weight: 10
});

master.join("commands", handleCommands);


function handleCommands(data) {
  
  // A node is requesting a command
  if( data.dst == "master" && data.type == "request" ) {

    // Handle master commands here

    // Find node with this command
    for (var i in master.nodes) {
      
      for( var j in master.nodes[i].info.commands) {

        if( master.nodes[i].info.commands[j] == data.content ) {
          
          message.dst = master.nodes[i].info.name;
          message.src = "master";
          message.request = master.nodes[i].info.commands[j];
          message.content = "";
          console.log(message);

          master.send('commands', message );


        }

      }


    }

  }


}

master.on("promotion", function() {
  console.log("Bitler master started.");





});

master.on("demotion", function() {
  console.log("I was demoted.");

  master.advertise(null);
});

master.on("added", function(obj) {
  console.log("Node added; here are all the nodes:");
  for (var id in master.nodes)
    console.log(master.nodes[id]);

  master.send('commands','update');
});

master.on("removed", function(obj) {
  console.log("Node removed; here are all the nodes:");
  for (var id in master.nodes)
    console.log(master.nodes[id]);
});

master.on("master", function(obj) {
  console.log("I'm not master?");
});
