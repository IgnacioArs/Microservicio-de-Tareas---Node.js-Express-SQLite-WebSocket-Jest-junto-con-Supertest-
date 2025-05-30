const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'data.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('Error al abrir la base de datos:', err.message);
  console.log('Base de datos SQLite conectada');
});

// Crear tabla tareas si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL CHECK(length(titulo) <= 100),
    descripcion TEXT CHECK(length(descripcion) <= 500),
    status TEXT DEFAULT 'pendiente' CHECK(status IN ('pendiente', 'completado')),
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;

