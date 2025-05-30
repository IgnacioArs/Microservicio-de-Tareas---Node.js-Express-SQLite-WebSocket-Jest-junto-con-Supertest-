require('dotenv').config();
const { app, server } = require('./app');

async function main() {
  const port = app.get('port');
  server.listen(port, () => {
    console.log('Servidor corriendo en el puerto', port);
  });
}

main();