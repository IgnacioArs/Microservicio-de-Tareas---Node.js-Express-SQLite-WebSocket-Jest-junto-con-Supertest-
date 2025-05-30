// app.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io'); // <--- socket.io aquí
const setupSocket = require('./websocket/socket'); // <--- Tu socket.js modificado

//llamar al modulo correspondiente para tomar y mostrar los archivos staticos
const path = require('path');

//pila de rutas
const rutasTasks = require('./routes/routes/task-route/task-routes');
const setupSwagger = require('./swagger/swagger');

//INICIALIZACION
const app = express();
const server = http.createServer(app);

// Crear instancia de socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

// Middleware para inyectar io en cada petición
app.use((req, res, next) => {
  req.io = io;
  next();
});

//settings
app.set('port', process.env.PORT);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Swagger
setupSwagger(app);

// Inicializar socket.io con lógica personalizada
setupSocket(io);

//routes y le asignamos un prefijo
app.use('/tasks', rutasTasks);

module.exports = { app, server };

