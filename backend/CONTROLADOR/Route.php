<?php

$ruta = $_SERVER['REQUEST_URI'];
$metodo = $_SERVER['REQUEST_METHOD'];

//echo $ruta ; //http://localhost/TrabajoFindeGradoClaudia/index.php
//if (strpos($ruta, '/Share your tale') === 0) {
//    echo "La ruta actual es: " . $ruta ;

if ($metodo == 'GET') 
{
    if (isset($_GET["pagina"])) 
    {
        
        switch ($_GET["pagina"]) 
        {
            case "inicio":
                require_once 'VISTA/Secciones/inicio.php';
                break;
            
            case "contacto":
                require_once 'VISTA/Secciones/contacto.php';
                break;

            default:
                break;
        }
    } 
    else 
    {
        require_once 'VISTA/Secciones/inicio.php';
    }
}
