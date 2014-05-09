<?php
/******************************************************************************
 * nick st.pierre
 * 5.7.14
 *
 * script to ask the master node for its node status,
 * or issue commands.
 *
 * 
 */


// we need unirest to make http requests to our master node
require_once('lib/unirest.php');

// location of our master node's server
$masterHttpUrl = "http://localhost:1337";

// makes a request to the master node
// returns an object describing all the nodes the master knows about.
// returns false on failure
function getNodesInfo()
{
	global $masterHttpUrl;

	// make a get request to our server
	$response = Unirest::get( "$masterHttpUrl/nodes",                  // url
				  array( "Accept" => "application/json" )  // header
				  //array( /*"foo" => "bar"*/)               // body
				);

	// check status code
        //echo $response->code; // http status code;

	$nodes = json_decode($response->raw_body);

	return $nodes;

}

// sends a command to the master. returns false on failure, or true otherwise.
function sendCommandToMasterNode($command)
{
	global $masterHttpUrl;

	// make a get request to our server
	$response = Unirest::get( "$masterHttpUrl/command",                // url
				  array( "Accept" => "application/json" ), // header
				  "$command"                               // body
				);
	if( $response->code == 200 )
	{
		return true;
	}
	else
	{
	 return false;
	}
}
