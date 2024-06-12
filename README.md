# TrabajoFindeGradoClaudia
El presente proyecto responde a la realización del módulo de Proyecto del CFGS en Desarrollo de Aplicaciones Web. Este proyecto consiste en crear un sitio web (llamado Share your tale) para quien le guste escribir pueda escribir relatos, editarlos y subirlos, pero también para quienes quieran leer historias.


# Configuración del proyecto

Para configurar el proyecto, sigue estos pasos:

1. Clona el repositorio en tu máquina local: `git clone https://github.com/ClaudiaAtkinsonBedia/TrabajoFindeGradoClaudia.git` y
   `cd tu_repositorio`.
2. Renombra el archivo `.env.example` a `.env`: `cp .env.example .env`.
3. Abre el archivo `.env` y completa los valores necesarios, como `JWT_SECRET_KEY`.
    3.1. Genera una nueva clave aleatoria en la terminal de Powershell: `[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Minimum 0 -Maximum 256) }))`.
    3.2. Agrega la clave secreta al archivo .env: `JWT_SECRET_KEY=TU_CLAVE_SECRETA_GENERADA`.
    3.3. Si es necesario, instala phpdotenv: `composer require vlucas/phpdotenv`.
4. Instala las dependencias: `composer install`.
5. Ejecuta el servidor en el puerto `8081`. Importante que sea ese puerto, si no, no va a funcionar. Se recomienda usar XAMPP.
6. Debemos instalar Node.js en nuestra máquina (si no la tenemos ya instalada) para que podamos hacer el siguiente paso.
7. Cuando abramos el proyecto en Visual Studio Code, debemos posicionarnos en "frontend" y ahí podemos abrir el proyecto (desde cmd): `cd frontend` y `npm start`.
8. Debemos asegurarnos de que el proyecto está ejecutándose en los puertos `3000` y `8081`, si no, no funcionará.
9. Debemos copiar y pegar la BBDD que está adjuntada en el proyecto. Se llama `shareyourtale.sql` y deberá ir en el localhost con el nombre de `shareyourtale`.
