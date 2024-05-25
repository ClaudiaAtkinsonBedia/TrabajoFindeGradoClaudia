<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Verificar que el método de solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificar los datos JSON recibidos del cliente
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar los datos recibidos
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    file_put_contents('php://stderr', print_r($data, TRUE));
    
    $pdo = new PDO('mysql:host=localhost;dbname=your_db', 'your_user', 'your_password');
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username');
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) { // Assuming password is hashed
        echo json_encode(['status' => 'success', 'message' => 'Inicio de sesión exitoso']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Credenciales incorrectas']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>