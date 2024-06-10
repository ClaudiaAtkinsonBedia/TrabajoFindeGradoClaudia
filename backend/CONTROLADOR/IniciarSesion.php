<?php
// Mostramos todos los errores de PHP (para desarrollo)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluimos los archivos de configuración y autoload de Composer
require_once 'config.php';
require_once '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Dotenv\Dotenv;

// Configuración de encabezados HTTP
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Cargamos las variables de entorno
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Utilizamos la variable de entorno para la clave secreta
$SECRET_KEY = $_ENV['JWT_SECRET_KEY'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificamos los datos JSON del cuerpo de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    // Obtenemos los valores de username y password del JSON decodificado
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    // Verificamos si los campos username y password están presentes
    if (empty($username) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        exit();
    }

    try {
        // Preparamos la consulta SQL para buscar al usuario y su rol
        $stmt = $conn->prepare('
            SELECT users.*, roles.role_name as role
            FROM users
            JOIN user_roles ON users.id = user_roles.user_id
            JOIN roles ON user_roles.role_id = roles.id
            WHERE users.username = :username
        ');
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();

        // Verificamos si el usuario existe y si la contraseña es correcta
        if ($user && password_verify($password, $user['password'])) {
            // Generamos el JWT
            $issuedAt = time();
            $expirationTime = $issuedAt + 3600; // JWT válido por 1 hora
            $payload = [
                'username' => $user['username'],
                'role' => $user['role'],
                'iat' => $issuedAt,
                'exp' => $expirationTime
            ];

            $jwt = JWT::encode($payload, $SECRET_KEY, 'HS256');
            // Devolvemos el JWT y el rol del usuario en la respuesta JSON
            echo json_encode(['status' => 'success', 'token' => $jwt, 'role' => $user['role'], 'username' => $user['username']]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Credenciales incorrectas']);
        }
    } catch (PDOException $e) {
        // Manejo de errores de la base de datos
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    } catch (Exception $e) {
        // Manejo de otros errores
        echo json_encode(['status' => 'error', 'message' => 'Unexpected error: ' . $e->getMessage()]);
    }
} else {
    // Respuesta para métodos HTTP no permitidos
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>