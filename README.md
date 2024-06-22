# EcommersPanaderia

EcommersPanaderia es una aplicación web de comercio electrónico para una panadería, donde los usuarios pueden explorar y comprar productos de panadería, agregar productos a sus favoritos y gestionar su carrito de compras.

## Características
- Navegacion de diferentes productos.
- Navegación por diferentes categorías de productos (dulces y salados).
- Añadir productos a favoritos.
- Gestión de carrito de compras.
- Registro e inicio de sesión de usuarios.


## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB
- **Frontend**: HTML, CSS, JavaScript, EJS
- **Autenticación**: Sessions, Connect-Flash
- **Control de Versiones**: Git, GitHub

## Requisitos Previos

- Node.js (versión 14 o superior)
- MongoDB (local o Atlas)

## Instalación

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/ecommers-panaderia.git
    ```
2. Navegar al directorio del proyecto:
    ```bash
    cd ecommers-panaderia
    ```
3. Instalar las dependencias:
    npm install express ejs express-session express-valdation mongoose bcrypt dotenv connect-flash
    
   
5. Configurar las variables de entorno:
    Crear un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
    ```env
    PORT=3000
    MONGO_URL=tu-mongo-url
    SESSION_SECRET=tu-secreto
    ```

## Uso

1. Iniciar el servidor:
    nodemon

2. Abre tu navegador y ve a `http://localhost:3062`.

Se realizo desde una computadora de escritorio con una resolucion grande, por eso realice el responsive de 1024 px, ademas de los responsive para dispositivos de Tablet (768px a 480px) y dispositivos móviles (320px a 480px) 
