<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'];


switch ($method | $action) {
    /*
    * Path: GET /api/users
    * Task: show all the users
    */
    case ($method == 'POST' && $action == 'register'):
        header('Content-Type: application/json');
        $requestBody = json_decode(file_get_contents('php://input'), true);
        $name = $requestBody['name'];
        if (empty($name)) {
            http_response_code(404);
            echo json_encode(['error' => 'Please add name of the user']);
        }
        $users[] = $name;
        $data = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents($jsonFile, $data);
        echo json_encode(['message' => 'user added successfully']);
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
        break;
    default:
        header('Content-Type: application/json');
        $response = [
            'status' => 'fail',
            'message' => 'Ha habido un error'
        ];
        echo json_encode($response);
        break;
 }

