<?php

/**
 * nick stpierre
 * 5.7.14
 * script to ask the master node for its node status
 *
 */

	// we need unirest to make http requests to our master node
	require('lib/unirest.php');


	// make a get request to our server
	$response = Unirest::get("http://localhost:1337/nodes",            // url
				  array( "Accept" => "application/json" ), // header
				  array( /*"foo" => "bar"*/)               // body
				);

	// check status code
	echo "<html><div>http status code is: ";
        echo $response->code; // http status code;

	echo "</div><br>\n";

	echo "<div>here is the body text: ";
	echo   $response->raw_body;
	echo "</div><br>\n";

	$nodes = json_decode($response->raw_body);

	foreach( $nodes as $name => $node )
	{
		echo "$name<br>";
		print_r($node);
		echo "<br>";

	}








?>
