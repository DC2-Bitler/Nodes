var Discovery = require('../node_modules/node-discovery').Discovery;

var pinode = new Discovery({
  weight: 1
});

pinode.demote(true);

pinode.advertise({
  type: "door",
  commands: [
    "open",
    "close"
  ]

});


function handleCommands(data) {
  console.log(data);
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

  pinode.join("commands", handleCommands);




});
