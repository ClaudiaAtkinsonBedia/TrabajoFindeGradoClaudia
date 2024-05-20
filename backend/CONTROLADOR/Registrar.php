<?php
include '../config.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Manejar la solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Si es una solicitud OPTIONS, detener la ejecución y devolver una respuesta vacía
    http_response_code(200);
    exit;
}


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

echo json_encode($input);
//echo json_encode($response);
?>

