module.exports = function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('Cliente conectado vía socket.io');

    socket.emit('welcome', 'Conexión exitosa');

    socket.on('message', (msg) => {
      console.log('Mensaje recibido del cliente:', msg);
    });

    // Puedes agregar más eventos aquí si quieres
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};
