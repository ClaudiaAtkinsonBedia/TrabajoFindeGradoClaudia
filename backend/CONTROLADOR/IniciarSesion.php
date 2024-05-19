<?php
include_once 'config.php';
include_once 'cors.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(['status' => 'success', 'message' => 'Has iniciado sesión :)']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Nombre de usuario o contraseña incorrecta']);
    }
}
?>

