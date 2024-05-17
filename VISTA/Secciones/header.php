<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Share your tale</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="VISTA\CSS\style.css">
</head>

<body>

  <!-- HEADER -->
  <header>
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <!-- Botón cuenta de iniciar sesión de usuario versión escritorio -->
        <div class="col d-none d-lg-block text-center"> <!-- Entrar en cuenta y cambiar idioma -->
          <i class="bi bi-person-circle"></i> <!-- Icono -->
          <a href="#">Iniciar sesión</a> <!-- link para iniciar sesión -->
        </div>
        <!-- Fin de cuenta de iniciar sesión -->
        <div class="col-lg-auto text-center">
          <a href="index.php?pagina=inicio"><img class="d-flex d-none d-lg-block logoEscritorio mx-auto" src="VISTA\img\logoSYT.png" alt="Logo de Share your tale"></a> <!-- Logo para la versión escritorio -->
        </div>
        
        <!-- Botón idioma versión escritorio -->
          <div class="col d-none d-lg-block text-center"> <!-- CAMBIARLO MÁS ADELANTE -->
            <a href="#">ES</a> <!-- link idioma español-->
            |
            <a href="#">EN</a> <!-- link idioma inglés -->
          </div>
        <!-- Fin Botón cuenta versión escritorio -->
      </div>
    </div>
    

    <!-- BARRA DE NAVEGACIÓN -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <!-- Botón menú cuando colapsa (hamburguesa) -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <i class="bi bi-list"></i>
        </button>
        <div class="col d-lg-none">
          <a href="index.php?pagina=inicio"><img class="mx-auto d-flex d-block d-lg-none text-center logoMovil" src="VISTA\img\logoSYT.png" alt="Logo de Share your tale"></a><!-- Logo para la versión móvil -->
        </div>
        <!-- Iconos CUENTA e IDIOMA versión móvil -->
        
        <div class="d-lg-none text-center">
          <div> <!-- Link idioma --> <!-- VER COMO LO HAGO MÁS ADELANTE -->
            <a href="#">ES</a> <!-- link idioma español-->
            |
           <a href="#">EN</a> <!-- link idioma inglés -->
         </div>
          <div> <!-- Entrar en cuenta y cambiar idioma -->
            <a href="#">Iniciar sesión</a> <!-- Icono para iniciar sesión -->
          </div>
        </div>
        <!-- Fin Iconos CUENTA e IDIOMA versión móvil -->

        
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav mx-lg-auto align-items-lg-center">
            <li class="nav-item dropdown m-lg-4">
              <li class="nav-item">
                <a class="nav-link active m-lg-4" aria-current="page" href="index.php?pagina=inicio">Inicio</a>
              </li>
            </li>
            <li class="nav-item">
              <a class="nav-link active m-lg-4" aria-current="page" href="#">Hazte una cuenta</a>
            </li>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Descubre..." aria-label="Search">
              <button class="btn btn-outline-primary" type="submit">Busca</button>
            </form>
            </li>
            <li class="nav-item">
              <a class="nav-link m-lg-4" href="index.php?pagina=contacto">Contacto</a>
            </li>
            <li class="nav-item m-lg-4">
          </ul>
        </div>
      </div> 
    </nav>
  </header>