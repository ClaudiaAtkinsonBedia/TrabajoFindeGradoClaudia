<?php

include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'register':
        include 'CONTROLADOR/Registrar.php';
        break;
    case 'login':
        include 'CONTROLADOR/IniciarSesion.php';
        break;
    case 'publicarHistorias':
        include 'CONTROLADOR/PublicarHistorias.php';
        break;
    default:
        header('Content-Type: application/json');
        $response = [
            'status' => 'fail',
            'message' => 'Ruta no válida'
        ];
        echo json_encode($response);
        break;
}
?>

