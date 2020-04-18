<?php

require('simple_html_dom.php');

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
		$parkID = $data['park_id'];

		$conn = OpenCon();
		
		$stmt = $conn->prepare('SELECT `name`, `url` FROM rides WHERE park_id= ?');
		$stmt->bind_param('i', $parkID);
		$stmt->execute();
		$stmt -> store_result(); 
		$stmt->bind_result($name, $url);

		$rides = array();
		while ($stmt->fetch()) {
			$rides[] = array('name' => $name, 'url' => $url);
	  }

	 	foreach($rides as $ride){
			$name = $ride['name'];	
			$url = $ride['url'];	
			$url .= '/average_by_level';	

			$html = file_get_html($url);

			echo var_dump(strip_tags($html));

			$stmt = $conn->prepare('UPDATE rides SET average_wait_times = ? WHERE name= ?');
			$stmt->bind_param('ss', strip_tags($html), $name);
			$stmt->execute();
		}

		CloseCon($conn);

		// set response code - 200 OK
		http_response_code(200);

		$headers = "MIME-Version: 1.0\r\n";
		$headers.= "Content-type: text/html; charset=UTF-8\r\n";
	}
  else
	{

	// tell the user about error
		echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>