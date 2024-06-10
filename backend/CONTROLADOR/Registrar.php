<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

ob_start(); // Inicia el almacenamiento en búfer de salida

// Registra en log que el script ha comenzado
file_put_contents('php_debug.log', "Script started\n", FILE_APPEND);

try {
    include '../config.php'; // Incluye el archivo de configuración
    file_put_contents('php_debug.log', "Config included\n", FILE_APPEND);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // Maneja la acción de registro cuando se envía una solicitud POST y la acción es 'register'
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['action']) && $_GET['action'] == 'register') {
        header('Content-Type: application/json');
        file_put_contents('php_debug.log', "Handling register action\n", FILE_APPEND);

        // Obtiene los datos JSON enviados en la solicitud
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            throw new Exception('Invalid JSON input');
        }

        // Obtiene los datos del formulario
        $username = $input['username'];
        $name = $input['name'];
        $surname = $input['surname'];
        $email = $input['email'];
        $dateBorn = $input['dateBorn'];
        $password = password_hash($input['password'], PASSWORD_DEFAULT);
        $escritor = isset($input['escritor']) && $input['escritor'] ? 1 : 0;
        $editor = isset($input['editor']) && $input['editor'] ? 1 : 0;
        $lector = isset($input['lector']) && $input['lector'] ? 1 : 0;

        try {
            $conn->beginTransaction(); // Inicia una transacción
            file_put_contents('php_debug.log', "Transaction started\n", FILE_APPEND);

            // Inserta el usuario en la base de datos
            $stmt = $conn->prepare("INSERT INTO users (username, name, surname, email, date_born, password) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$username, $name, $surname, $email, $dateBorn, $password]);
            file_put_contents('php_debug.log', "User inserted\n", FILE_APPEND);

            // Obtiene el ID del último usuario insertado
            $userId = $conn->lastInsertId();

            // Inserta los roles del usuario en la tabla de roles
            $roles = [];
            if ($escritor) $roles[] = 'escritor';
            if ($editor) $roles[] = 'editor';
            if ($lector) $roles[] = 'lector';

            $stmt = $conn->prepare("INSERT INTO user_roles (user_id, role_id) VALUES (?, (SELECT id FROM roles WHERE role_name = ?))");
            foreach ($roles as $role) {
                $stmt->execute([$userId, $role]);
            }
            file_put_contents('php_debug.log', "Roles inserted\n", FILE_APPEND);

            $conn->commit(); // Confirma la transacción

            // Prepara la respuesta JSON
            $response = [
                'status' => 'success',
                'message' => 'Te has registrado correctamente'
            ];
        } catch (Exception $e) {
            $conn->rollBack(); // Cancela la transacción en caso de error
            $response = [
                'status' => 'error',
                'message' => 'No te has podido registrar: ' . $e->getMessage()
            ];
            file_put_contents('php_debug.log', "Error in transaction: " . $e->getMessage() . "\n", FILE_APPEND);
        }

        $output = ob_get_clean();

        if ($output) {
            file_put_contents('php_output.log', $output); // Registrar la salida inesperada en un archivo
        }

        // Devuelve la respuesta JSON
        echo json_encode($response);
    } else {
        // Devuelve una respuesta JSON de error si no se puede manejar la solicitud
        header('Content-Type: application/json');
        $response = [
            'status' => 'fail',
            'message' => 'Ha habido un error'
        ];

        $output = ob_get_clean();

        // Registra la salida inesperada en un archivo
        if ($output) {
            file_put_contents('php_output.log', $output); // Registrar la salida inesperada en un archivo
        }

        // Devuelve la respuesta JSON de error
        echo json_encode($response);
    }
} catch (Exception $e) {
    // Maneja cualquier excepción no controlada y devuelve una respuesta JSON de error
    header('Content-Type: application/json');
    $output = ob_get_clean();
    if ($output) {
        file_put_contents('php_output.log', $output); // Registrar la salida inesperada en un archivo
    }
    file_put_contents('php_debug.log', "General error: " . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode([
        'status' => 'error',
        'message' => 'Error general: ' . $e->getMessage(),
        'output' => $output
    ]);
}
?>