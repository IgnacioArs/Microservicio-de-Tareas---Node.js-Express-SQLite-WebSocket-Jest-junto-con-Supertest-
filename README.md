# Microservicio de Tareas - Node.js + Express + SQLite + WebSocket +  Jest junto con Supertest para realizar pruebas automatizadas de las rutas API.

Este proyecto implementa un microservicio backend utilizando **Node.js**, **Express**, **SQLite** y **WebSocket** (con `ws`). Permite la creación, visualización, actualización y eliminación de tareas, cumpliendo con un estilo arquitectónico basado en microservicios.

---

## 🚀 Requisitos

- Node.js >= 16
- npm >= 8

---

## ⚙️ Instalación del entorno

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/ms-express-websocket.git
   cd ms-express-websocket

## ⚙️ Instalar dependencias

- npm install
- npm install --save-dev jest supertest --prefer-offline
- npm install swagger-ui-express swagger-jsdoc

## 🚀 hacer correr microservicio desarrollo o produccion y SwaggerDocs

- Desarrollo= npm run dev
- Produccion= npm run start
- Test = npm test
- Documentacion Swagger= http://localhost:3000/api-docs/
- Frontend HTML = http://localhost:3000/

## 📌 Endpoints REST y Manejo de errores http status code buenas practicas ApisRest
- CRUD en base a la directriz de lo solicitado en el entregable.

- POST /task → Crear nueva tarea.
#### JSON esperado:
#### json
#### {
  #### "titulo": "Ejemplo",
  #### "descripcion": "Descripción de ejemplo"
#### }

- GET /task → Obtener todas las tareas.

- PUT /task/:id → Actualizar estado de una tarea.
#### JSON esperado:

#### json
#### {
  #### "status": "completada"
#### }
- DELETE /task/:id → Eliminar una tarea.


## 🧱 Patrón de diseño: Modelo - Vista - Controlador (MVC)
#### El proyecto utiliza la estructura MVC para mantener una separación clara entre:
- Modelos: Acceso y manipulación de datos
- Controladores: Lógica de negocio y respuesta a solicitudes
- Rutas: Definición de los endpoints REST
- Esto proporciona:
- Mayor escalabilidad
- Facilidad de mantenimiento
- Organización limpia del código

## 📁 Estructura del Proyecto

```plaintext
ms-express-websocket/
├── src/
│   ├── public/          # Archivos estáticos para el frontend
│   ├── websocket/       # Implementación de WebSocket
│   ├── swagger/         # Documentación de la API (Swagger)
│   ├── models/          # Modelos y lógica de acceso a datos (CRUD con SQLite)
│   ├── controller/      # Controladores de los endpoints
│   ├── routes/          # Rutas de la API REST
│   ├── app.js           # Configuraciones y módulos de la aplicación
│   └── index.js         # Punto de entrada principal
├── test/
│   └── task.test.js     # Pruebas unitarias para tareas
├── README.md            # Documentación general del proyecto
├── package.json         # Dependencias y configuraciones del proyecto
```


### 📡 Funcionalidad WebSocket

- Se utiliza la librería ws para establecer un canal WebSocket que notifica en tiempo real a 
  todos los clientes conectados cada vez que se modifica una tarea.

- Eventos emitidos:
  newTask: Cuando se crea una nueva tarea.
  taskUpdated: Cuando se actualiza una tarea.
  taskUpdated: Cuando se actualiza una tarea.
  taskDeleted: Cuando se elimina una tarea.


### 📌 Consideraciones de diseño

- SQLite se eligió por su facilidad de uso y por no requerir un servidor adicional.

- La arquitectura basada en microservicios permite desacoplar módulos y escalar mejor en el    
  futuro.

- WebSocket permite emitir notificaciones en tiempo real a todos los clientes conectados, útil 
  en aplicaciones interactivas o colaborativas.

✅ Estado del proyecto
- CRUD funcional con SQLite.
- WebSocket en tiempo real.
- Estructura basada en MVC.
- Documentación lista para producción.

### 🧪 Estructura de pruebas

- Las pruebas se encuentran en la carpeta test/, donde se realizan tests para los 
  endpoints REST, verificando respuestas y estados HTTP.

#### Configuración
- Jest está configurado para ejecutarse en un entorno de Node.js.

- Supertest se usa para simular peticiones HTTP a la aplicación Express durante las pruebas.

#### Setup y teardown
Se utiliza beforeEach y afterEach para limpiar y preparar la base de datos SQLite antes y después de cada test, asegurando un entorno de pruebas limpio.
