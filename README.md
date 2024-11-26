Autor: Gonzalo Salas Tranolao


*************************************************************************************************************************

Características principales
Login:
. Permite a los usuarios iniciar sesión con las credenciales validas.

Lista de productos:
Muestra una lista de productos obtenida de la API https://fakestoreapi.com/products. Incluye detalles como:

. Imagen del producto.
. Nombre.
. Precio.

Detalles del producto:

. Al seleccionar un producto, se navega a una pantalla que muestra información detallada del producto.
Navegación:
. La navegación entre pantallas es manejada con React Navegación.

*************************************************************************************************************************

Requisitos
Node.js: 14.x o superior.
Expo CLI: Instalado globalmente.
Android Studio (para emuladores Android) o Xcode (para iOS).

Instalación
1. Clona el repositorio: git clone https://github.com/tuusuario/SeidorAppGST.git

2. cd SeidorAppGST
   
3. Instala las dependencias:
npm install

4. Si no tienes expo. instalalo de forma global 
npm install -g expo-cli exp

5. Inicia el servidor de desarrollo de expo: 
npx expo start 
6. Con dispositivo virtualizado en android studio:
npm run android

*************************************************************************************************************************

Al iniciar la App, Usa estas credenciales para iniciar sesion:

"username": "mor_2314",
"password": "83r5^_"


*************************************************************************************************************************


Funciones principales 

Componentes:
. CustomButton.js : Boton reutilizable para estilos personalizados.
Contexto:
. AuthoContext.js : Proporcionara estaodos y funciones relacionadas con la autenticacion global de la aplicación. 

Pantallas:
. LoginScreen: Pantalla para autenticación.
. ProductListScreen: Lista de productos obtenida desde la API.
. ProductDetailScreen: Información detallada de productos.

Servicios:
. authService.js: Módulo que maneja la interacción con la API para autenticación y otros servicios.

Navegación:
- AppNavigator.js: Configura el stack de navegación de la app:
- LoginScreen
- ProductListScreen
- ProductDetailScreen

Se consume la API pública de Fake Store:
. Base URL: https://fakestoreapi.com

Endpoints principales:
. Login: POST /auth/login
. Productos: GET /products


*************************************************************************************************************************
