<?php

/**
 * nick stpierre
 * 5.7.14
 * script to ask the master node for its node status
 *
 */

	require('lib/unirest.php');

	$response = Unirest::get("http://localhost:1337/nodes",            // url
				  array( "Accept" => "application/json" ), // header
				  array( /*"foo" => "bar"*/)               // body
				);

	echo "<html>http status code is: ";
        echo $response->code; // http status code;

	echo "<br>\n";


	echo "here is the body text: ";
	echo $response->raw_body;
	



?>



























