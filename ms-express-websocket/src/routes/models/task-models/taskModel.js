const db = require('../../../db/database');

const TaskModel = {
  createTask: (titulo, descripcion, callback) => {
    const sql = `
      INSERT INTO tareas (titulo, descripcion)
      VALUES (?, ?)
    `;
    db.run(sql, [titulo, descripcion], function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, titulo, descripcion, status: 'pendiente', fechaCreacion: new Date(), fechaActualizacion: new Date() });
    });
  },

  getAllTasks: (callback) => {
    db.all(`SELECT * FROM tareas`, [], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },

  updateTaskStatus: (id, status, callback) => {
    const sql = `
      UPDATE tareas
      SET status = ?, fechaActualizacion = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    db.run(sql, [status, id], function (err) {
      if (err) return callback(err);

      if (this.changes === 0) {
        // No se encontró la tarea con ese ID
        return callback(new Error('Tarea no encontrada'));
      }

      callback(null, { id, status });
    });
  },

  deleteTask: (id, callback) => {
    db.run(`DELETE FROM tareas WHERE id = ?`, [id], function (err) {
      if (err) return callback(err);

      if (this.changes === 0) {
        return callback(new Error('Tarea no encontrada'));
      }

      callback(null, { message: 'Tarea eliminada correctamente' });
    });
  }

};

module.exports = TaskModel;
