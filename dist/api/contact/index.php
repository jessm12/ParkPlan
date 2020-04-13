<?php
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if ($_POST)
	{

	// set response code - 200 OK
	http_response_code(200);

	// data
	$park = $_POST['park'];

	// Headers

	$headers = "MIME-Version: 1.0\r\n";
	$headers.= "Content-type: text/html; charset=UTF-8\r\n";

	// echo json_encode( $_POST );
	echo json_encode(array(
		"sent" => $park
	));
	}
  else
	{

	// tell the user about error

	echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>