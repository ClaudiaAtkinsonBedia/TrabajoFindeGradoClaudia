# TrabajoFindeGradoClaudia
El presente proyecto responde a la realización del módulo de Proyecto del CFGS en Desarrollo de Aplicaciones Web. Este proyecto consiste en crear un sitio web (llamado Share your tale) para quien le guste escribir pueda escribir relatos, editarlos y subirlos, pero también para quienes quieran leer historias.


# Configuración del proyecto

Para configurar el proyecto, sigue estos pasos:

1. Clona el repositorio en tu máquina local. git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio // CAMBIAR CUANDO PUEDA
2. Renombra el archivo `.env.example` a `.env`: `cp .env.example .env`
3. Abre el archivo `.env` y completa los valores necesarios, como `JWT_SECRET_KEY`.
    3.1. Genera una nueva clave aleatoria: `[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Minimum 0 -Maximum 256) }))`
    3.2. Agrega la clave secreta al archivo .env: `JWT_SECRET_KEY=TU_CLAVE_SECRETA_GENERADA`
    3.3. Si es necesario, instala phpdotenv: `composer require vlucas/phpdotenv`
4. Instala las dependencias: `composer install`
5. Ejecuta el servidor en el puerto `8081`. Importante que sea ese puerto, si no, no va a funcionar. Recomiendo usar XAMPP.
