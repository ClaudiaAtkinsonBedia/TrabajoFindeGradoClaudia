<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$SECRET_KEY = 'your_jwt_secret_key';

function authorize($requiredRole) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $jwt = $matches[1];
        try {
            $decoded = JWT::decode($jwt, new Key($SECRET_KEY, 'HS256'));
            if ($decoded->role !== $requiredRole) {
                http_response_code(403);
                echo json_encode(['status' => 'error', 'message' => 'Forbidden: You do not have the necessary permissions']);
                exit();
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Access denied', 'error' => $e->getMessage()]);
            exit();
        }
    } else {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Authorization header not found']);
        exit();
    }
}
?>