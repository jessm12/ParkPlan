<?php

function OpenCon()
{
	$dbhost = "localhost";
	$dbuser = "cojlm";
	$dbpass = "46iitaSgul";
	$db = "cojlm";
	$conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);

	return $conn;
}

function CloseCon($conn)
{
	$conn -> close();
}

// Takes raw data from the request
$json = file_get_contents('php://input');
// Converts it into a PHP object
$data = json_decode($json, true);
header("Access-Control-Allow-Origin: *");

if (true)
	{
		$parkID = $data;

		$conn = OpenCon();
		
		$stmt = $conn->prepare('SELECT name, average_wait_times, tags FROM rides WHERE park_id = ?');
		$stmt->bind_param('i', $parkID);
		$stmt->execute();

		$stmt->bind_result($name, $averagewaits, $tags);

		$rides = array();
		while ($stmt->fetch()) {
			$rides[] = array('name' => $name, 'average_waits' => $averagewaits, 'tags' => $tags);
	  }

		CloseCon($conn);

		// set response code - 200 OK
		http_response_code(200);

		$headers = "MIME-Version: 1.0\r\n";
		$headers.= "Content-type: text/html; charset=UTF-8\r\n";

		echo json_encode(
			$rides
		);
	}
  else
	{

	// tell the user about error

		echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>