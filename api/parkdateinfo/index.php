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
		$visitingDay = strval($data['day']);
		$visitingMonth = strval($data['month']);
		
		if (strlen($visitingDay) < 2)
		$visitingDay = '0'.$visitingDay;
	
		if (strlen($visitingMonth) < 2)
			$visitingMonth = '0'.$visitingMonth;
	
		$visitingDate = $visitingDay.'/'.$visitingMonth.'/2019';

		$parkID = $data['parkID'];
		$park = $data['park'];

		$conn = OpenCon();
		
		$stmt = $conn->prepare('SELECT open_time, actual_crowd_level FROM crowd_calendar WHERE park_id = ? AND open_date = ?');
		$stmt->bind_param('is', $parkID,$visitingDate);
		$stmt->execute();

		$stmt->bind_result($data[0], $data[1]);

		while ($stmt->fetch()) {
			$opentime = $data[0];
			$crowdlevel = $data[1];
	 }

		CloseCon($conn);

		// set response code - 200 OK
		http_response_code(200);

		$headers = "MIME-Version: 1.0\r\n";
		$headers.= "Content-type: text/html; charset=UTF-8\r\n";

		echo json_encode(array(
			"sent" => $park,
			"crowdlevel" => $crowdlevel,
			"opentime" => $opentime
		));
	}
  else
	{

	// tell the user about error

		echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>