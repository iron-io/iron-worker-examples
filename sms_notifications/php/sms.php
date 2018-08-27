<?php

require 'vendor/autoload.php';
use Twilio\Rest\Client;

// get Twilio Account SID and Auth Token from env vars
$sid = getenv('TWILIO_SID');
$token = getenv('TWILIO_TOKEN');
$client = new Client($sid, $token);

// get payload (TO, FROM, BODY values)
$payload = IronWorker\Runtime::getPayload(true);

// send message
echo "Sending sms...\n";
$message = $client->messages->create($payload['to'], array(
	'From' => $payload['from'],
	'Body' => $payload['body'],
));

// get actual status of a message from Twilio
echo "Status of the message: " . $client->messages($message->sid)->fetch()->status;