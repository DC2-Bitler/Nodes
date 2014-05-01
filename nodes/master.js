var Discovery = require('../node_modules/node-discovery').Discovery;

var master = new Discovery({
  weight: 10
});

master.join("commands", handleCommands);


function handleCommands(data) {
  console.log(data);
}

master.on("promotion", function() {
  console.log("Bitler master started.");

  
  setInterval(function(){
    master.send('commands', { name: "FrontDoor", command: "open" } );

  }, 600);



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
