<?php
include 'config.php';
include_once 'cors.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$username = $input['username'];
$name = $input['name'];
$surname = $input['surname'];
$email = $input['email'];
$dateBorn = $input['dateBorn'];
$password = $input['password'];
$escritor = $input['escritor'];
$editor = $input['editor'];
$lector = $input['lector'];

$response = [
    'status' => 'success',
    'message' => 'Te has registrado correctamente'
];

echo json_encode($response);
?>

