var ServiceDiscovery = require('../node_modules/node-discovery');
var Discovery = ServiceDiscovery.Discovery;

var d = new ServiceDiscovery({
	weight: 2 // Make me a master
});

// advertise the service
d.advertise({
  name: 'service.bitlermaster',
  ready: false
});

d.promote();

d.on('ready', function() {
  /**
   * ServiceDiscovery has discovered all services needed.
   *
   * Things to do:
   *   Start http server listening on configured port.
   *   Let the load balancers know we're ready for connections.
   */
  d.advertise({
    name: 'service.bitlermaster',
    ready: true
  });
});

d.on('promotion', function() {
  /**
   * Launch things this master process should do.
   *
   * For example:
   *  - Monitior your redis servers and handle failover by issuing slaveof
   *    commands then notify other node instances to use the new master
   *  - Make sure there are a certain number of nodes in the cluster and
   *    launch new ones if there are not enough
   *  - whatever
   */
  console.log('I was promoted to a master.');
});

d.on('demotion', function() {
  /**
   * End all master specific functions or whatever you might like.
   */
  console.log('I was demoted from being a master.');
});

d.on('master', function(obj) {
  /**
   * A new master process has been selected
   *
   * Things we might want to do:
   *  - Review what the new master is advertising use its services
   *  - Kill all connections to the old master
   */
  console.log('A new master is in control');
});


d.on("added", function(obj) {
  console.log("Node added; here are all the nodes:");
  for (var id in d.nodes)
    console.log(d.nodes[id]);
});

d.on("removed", function(obj) {
  console.log("Node removed; here are all the nodes:");
  for (var id in d.nodes)
    console.log(d.nodes[id]);
});