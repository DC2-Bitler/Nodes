/**
 * master.js
 *
 * Authors:
 * Cameron Morris
 * Nick St.Pierre
 * Dave Jelley
 * Daniel Saari
 * 
 * This file contains the master node.
 * The master node processes all commands from the web interface and voice nodes
 * and sends the requests to the correct node that has the functionality.
 */

var Discovery = require('../node_modules/node-discovery').Discovery;


/*****************************************************************************/
// NRS 5/5/14
// this block adapted from http://webandphp.com/IntegratingNode.jswithPHP
// make an http server that can accept commands, and report node JSON
var http      = require('http'),
    urlParser = require('url');

http.createServer(function (req, res) {

  // these args are objects created by the server:
  // req is http://nodejs.org/api/http.html#http_http_incomingmessage
  // res is http://nodejs.org/api/http.html#http_class_http_serverresponse

  /* these vars will be used later to handle different requests */
  var urlObj = urlParser.parse(req.url, true);


  // only allow GET requests for simplicity's sake
  if( req.method !== 'GET' ) // http methods: 'GET', 'POST, or 'DELETE' etc
  {
      res.writeHead(300, {'Content-Type': 'text/plain'});
      res.end("unsupported request type");
  }
  else 
  {
      /* request for the master's known nodes: reply with json text */
      if ( urlObj.pathname === "/nodes" )
      {  
	  res.writeHead(200, {'Content-Type': 'text/json'});
	  res.end( JSON.stringify(master.nodes) );
      }
      /* if we see a command, run the command and report success/fail */
      else if ( urlObj.pathname === "/command" )
      {
	  /******** @TODO ********/

	  // parse the query text for the comand
	  // urlObj.query contains an object of query name-value pairs

	  // run the command or report illegal command

	  // reply with status of command (if not illegal)

	  /***********************/

	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end("command feature @todo");
      }
      else
      {
      	  res.writeHead(404, {'Content-Type': 'text/plain'});
	  res.end("requested resource "+ urlObj.pathname +" not found.");
      }
  }

  console.log("the master node's http server is serving a request...");

    }).listen(1337, '127.0.0.1'); // end of createServer() call

console.log('Server running at http://127.0.0.1:1337/');

/*****************************************************************************/

// Message format
var message = {
  type: "request", // Request or Response
  dst: "node1", // Name of node to receive message
  src: "node2", // Name of node origin
  request: "command", // Command being run
  content: "content" // Content of request
}

// Ensures master status
var master = new Discovery({
  weight: 10
});

// Add self to commands channel
master.join("commands", handleCommands);

// Process any commands send to the master
function handleCommands(data) {
  
  console.log(data);

  if( data.dst == "master") {
 
  // A node is requesting a command
  if( data.type == "request" ) {

    // Handle master commands here

    // Find node with this command
    if( data.request == "voiceparse") {
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


  // Send to voice nodes
  if( data.type == "response" ) {

    for (var i in master.nodes) {
      
        for( var j in master.nodes[i].info.commands) {

          if( master.nodes[i].info.commands[j] == "tts" ) {

            message.dst = master.nodes[i].info.name;
            message.src = "master";
            message.request = "tts";
            message.content = data.content;
            console.log(message);

            master.send('commands', message );


          }

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

});

master.on("removed", function(obj) {
  console.log("Node removed; here are all the nodes:");
  for (var id in master.nodes)
    console.log(master.nodes[id]);
});

master.on("master", function(obj) {
  console.log("I'm not master?");
});
