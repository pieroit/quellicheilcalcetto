<?php

$server = 'localhost';
$user = 'root';
$pass = 'root';
$database = 'quellicheilcalcetto';

$db = new mysqli($server, $user, $pass, $database);

// Utility to make queries to the db
function queryDB( $query ) {
	global $db;
	$result = $db->query( $query );
	
	while( $row = $result->fetch_assoc() ) {
		$data[] = $row;
	}	
	return $data;
}

function jsonDB( $query ) {
	// Send query to db
	$res = queryDB( $query );
	
	// Output result in JSON
	echo json_encode( $res );
}
