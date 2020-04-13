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
		$parkID = $data['parkID'];
		$conn = OpenCon();

		$sql = "SELECT * FROM `crowd_calendar` WHERE `park_id`=$parkID AND `open_date`='01/01/2019'";
		$result = $conn->query($sql);

		if (!$result) {
			trigger_error('Invalid query: ' . $conn->error);
		}

		if ($result->num_rows > 0) {
				// output data of each row
				while($row = $result->fetch_assoc()) {
						$opentime = $row["open_time"];
						$crowdlevel = $row["actual_crowd_level"];
				}
		}

		CloseCon($conn);
		// set response code - 200 OK
		http_response_code(200);

		// data
		$park = $data["park"];

		// Headers
		$headers = "MIME-Version: 1.0\r\n";
		$headers.= "Content-type: text/html; charset=UTF-8\r\n";

		// echo json_encode( $_POST );
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