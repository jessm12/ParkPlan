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
		
		$stmt = $conn->prepare('SELECT name, very_quiet_wait, moderately_quiet_wait,
		 moderately_busy_wait, very_busy_wait, tags, info_text FROM rides WHERE park_id = ? AND TAGS <> "interactive"');
		$stmt->bind_param('i', $parkID);
		$stmt->execute();

		$stmt->bind_result($name, $veryquiet, $moderatelyquiet, $moderatelybusy,
		$verybusy, $tags, $infotext);

		$rides = array();
		while ($stmt->fetch()) {
			$rides[] = array('name' => $name, 'very_quiet_wait' => $veryquiet,
			 'moderately_quiet_wait' => $moderatelyquiet, 'moderately_busy_wait' => $moderatelybusy,
			 'very_busy_wait' => $verybusy, 'tags' => $tags, 'info_text' => $infotext,);
		}
		
		$stmt = $conn->prepare('SELECT name, very_quiet_wait, moderately_quiet_wait,
		moderately_busy_wait, very_busy_wait, tags, info_text FROM rides WHERE park_id = ? AND TAGS = "interactive"');
		$stmt->bind_param('i', $parkID);
		$stmt->execute();

		$stmt->bind_result($name, $veryquiet, $moderatelyquiet, $moderatelybusy,
		$verybusy, $tags, $infotext);

		$interactive = array();
		while ($stmt->fetch()) {
			$interactive[] = array('name' => $name, 'very_quiet_wait' => $veryquiet,
				'moderately_quiet_wait' => $moderatelyquiet, 'moderately_busy_wait' => $moderatelybusy,
				'very_busy_wait' => $verybusy, 'tags' => $tags, 'info_text' => $infotext,);
		}

		CloseCon($conn);

		// set response code - 200 OK
		http_response_code(200);

		$headers = "MIME-Version: 1.0\r\n";
		$headers.= "Content-type: text/html; charset=UTF-8\r\n";

		echo json_encode([
			'rides' => $rides,
			'interactive' => $interactive
		]);
	}
  else
	{

	// tell the user about error

		echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>