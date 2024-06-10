<?php
// Mostrar todos los errores de PHP (para desarrollo)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir archivos de configuración y autoload de Composer
require 'config.php';
require '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Dotenv\Dotenv;

// Configuración de encabezados HTTP
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Cargar variables de entorno
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Utilizar la variable de entorno para la clave secreta
$SECRET_KEY = $_ENV['JWT_SECRET_KEY'];

// Obtener los encabezados HTTP
$headers = getallheaders();

// Verificar si el encabezado de autorización está presente
if (!isset($headers['Authorization'])) {
    echo json_encode(['status' => 'error', 'message' => 'No se ha proporcionado un token de autorización.']);
    exit();
}

// Obtener el token JWT del encabezado de autorización
$authHeader = $headers['Authorization'];
list($jwt) = sscanf($authHeader, 'Bearer %s');

if (!$jwt || count(explode('.', $jwt)) !== 3) {
    echo json_encode(['status' => 'error', 'message' => 'No se ha proporcionado un token de autorización válido.']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificar el token JWT
    try {
        $decoded = JWT::decode($jwt, new Key($SECRET_KEY, 'HS256'));

        // Aquí asumimos que tu token tiene una estructura donde el ID de usuario está en `$decoded->username`
        // Si tu estructura es diferente, ajusta esto según sea necesario
        $user_id = $decoded->username;  // ajusta según sea necesario

        // Decodificar datos JSON del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        // Obtener valores de storyName y text del JSON decodificado
        $storyName = $data['storyName'] ?? '';
        $text = $data['text'] ?? '';

        // Validar los datos del formulario
        if (empty($storyName) || empty($text)) {
            echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
            exit();
        }

        // Preparar y ejecutar la consulta SQL
        $stmt = $conn->prepare('INSERT INTO historias (user_id, story_name, contenido, fecha_publicado) VALUES (?, ?, ?, NOW())');
        $stmt->bind_param('iss', $user_id, $storyName, $text);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Historia publicada exitosamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al publicar la historia: ' . $conn->error]);
        }

        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Acceso denegado.', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>