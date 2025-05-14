# Proyecto Cafetería - Sistema de Gestión

Este proyecto es un sistema de gestión para una cafetería, desarrollado con un backend en Node.js y un frontend en React. Permite administrar usuarios y empleados, y está conectado a una base de datos MySQL.

## Estructura del Proyecto

El proyecto se compone de las siguientes carpetas:

* `backend`: Contiene el código del backend de la aplicación, construido con Node.js y Express.js. Se encarga de la lógica del servidor, define la API REST, y se conecta a la base de datos MySQL.
* `cafeteria`: Contiene el código del frontend de la aplicación, construido con React. Proporciona la interfaz de usuario para administrar usuarios y empleados.
* `base_datos`: Contiene el archivo `cafeteria_db.sql`, que es un dump de la base de datos MySQL.

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

###   Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **Node.js:** Entorno de ejecución para el backend. Descargar de [https://nodejs.org/](https://nodejs.org/)
* **MySQL:** Sistema de gestión de bases de datos. Descargar de [https://www.mysql.com/](https://www.mysql.com/)
* **Git:** Sistema de control de versiones. Descargar de [https://git-scm.com/](https://git-scm.com/) (Opcional, si quieres clonar el repositorio desde GitHub)
* **npm** o **yarn:** Gestores de paquetes de Node.js. Normalmente se instalan con Node.js.

###   Pasos

1.  **Clonar el Repositorio (Opcional):**

    Si tienes el código en un repositorio de GitHub, clónalo a tu máquina local:

    ```bash
    git clone <URL_del_repositorio>
    cd <nombre_del_repositorio>
    ```

2.  **Importar la Base de Datos:**

    * Crea una base de datos llamada `cafeteria_db` en tu servidor MySQL. Puedes usar una herramienta como phpMyAdmin, MySQL Workbench, o la línea de comandos de MySQL. Por ejemplo, en la línea de comandos de MySQL:

        ```sql
        CREATE DATABASE cafeteria_db;
        ```

    * Importa el archivo `cafeteria_db.sql` que se encuentra en la carpeta `base_datos` a la base de datos que acabas de crear. Puedes hacerlo con una herramienta como phpMyAdmin, o con la línea de comandos de MySQL:

        ```bash
        mysql -u root -p cafeteria_db < base_datos/cafeteria_db.sql
        ```

        (Reemplaza `root` con tu nombre de usuario de MySQL si es diferente).

3.  **Configurar el Backend:**

    * Navega al directorio `backend`:

        ```bash
        cd backend
        ```

    * Instala las dependencias del backend:

        ```bash
        npm install
        ```

        o

        ```bash
        yarn install
        ```

    * Crea un archivo `.env` en el directorio `backend`.  Puedes copiar el contenido del archivo `.env.example` y modificarlo con los valores de tu configuración local:

        ```bash
        cp .env.example .env
        nano .env  # o vim, o tu editor de texto preferido
        ```

        Contenido de .env (Ejemplo):

        ```
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=
        DB_NAME=cafeteria_db
        PORT=3001
        ```

        Asegúrate de cambiar los valores por los de tu configuración local. Si no tienes contraseña para el usuario de la base de datos, deja `DB_PASSWORD` vacío.

4.  **Ejecutar el Backend:**

    * Inicia el servidor backend:

        ```bash
        npm start
        ```

        o

        ```bash
        yarn start
        ```

    * El servidor se ejecutará en el puerto 3001 (o el puerto que hayas especificado en el archivo `.env`).

5.  **Configurar el Frontend:**

    * Navega al directorio `cafeteria`:

        ```bash
        cd cafeteria
        ```

    * Instala las dependencias del frontend:

        ```bash
        npm install
        ```

        o

        ```bash
        yarn install
        ```

6.  **Ejecutar el Frontend:**

    * Inicia la aplicación frontend:

        ```bash
        npm run start
        ```

        o

        ```bash
        yarn start
        ```

    * Abre tu navegador y visita [http://localhost:3000](http://localhost:3000) para ver la aplicación. El frontend se conectará al backend que está corriendo en el puerto 3001.

## Uso

La aplicación permite gestionar usuarios y empleados de una cafetería. Las funcionalidades principales son:

* **Usuarios:**

    * Crear, editar, eliminar y listar usuarios.
    * Autenticación de usuarios (login).
* **Empleados:**

    * Crear, editar, eliminar y listar empleados, asociándolos a un usuario del sistema.

## Tecnologías Utilizadas

* **Backend:** Node.js, Express.js, mysql2
* **Frontend:** React
* **Base de Datos:** MySQL

## Créditos

Creador de la aplicación: RAIZA NORELA VERGARA ACOSTA
