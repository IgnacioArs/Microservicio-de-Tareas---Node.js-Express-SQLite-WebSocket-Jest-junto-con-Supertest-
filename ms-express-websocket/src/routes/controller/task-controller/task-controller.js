const taskController = {};
const taskModel = require('../../models/task-models/taskModel'); // Ajusta la ruta si cambia tu estructura

// Obtener todas las tareas
taskController.getAllTask = async (req, res) => {
  taskModel.getAllTasks((err, tasks) => {
    if (err) {
      console.error('Error al obtener tareas:', err);
      return res.status(500).json({ message: 'Error al obtener tareas' });
    }
    res.status(200).json(tasks);
  });
};

// Crear una nueva tarea
taskController.createTask = async (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo || titulo.length > 100) {
    return res.status(400).json({ message: 'El título es obligatorio y debe tener como máximo 100 caracteres.' });
  }

  if (descripcion && descripcion.length > 500) {
    return res.status(400).json({ message: 'La descripción debe tener como máximo 500 caracteres.' });
  }

  taskModel.createTask(titulo, descripcion, (err, newTask) => {
    if (err) {
      console.error('Error al crear la tarea:', err);
      return res.status(500).json({ message: 'Error al crear la tarea' });
    }

    // Emitimos evento vía WebSocket si lo integras
    if (req.io){
      console.log('Enviando evento WebSocket: newTask', newTask);
      req.io.emit('newTask', newTask);
    } 
        

    res.status(201).json(newTask);
  });
};

// Actualizar el estado de una tarea
taskController.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'El nuevo estado es requerido' });
  }

  taskModel.updateTaskStatus(id, status, (err, updatedTask) => {
    if (err) {
      console.error('Error al actualizar el estado de la tarea:', err);
      return res.status(500).json({ message: 'Error al actualizar la tarea' });
    }

    if (req.io) {
      console.log('Enviando evento WebSocket: taskUpdated', updatedTask);
      req.io.emit('taskUpdated', updatedTask,{statusMessage:'nuevo_estado'});
    }

    res.status(200).json({ message: 'nuevo_estado', updatedTask });

  });
};

// Eliminar una tarea
taskController.deleteTask = async (req, res) => {
  const { id } = req.params;

  taskModel.deleteTask(id, (err, result) => {
    if (err) {
      console.error('Error al eliminar la tarea:', err);
      return res.status(500).json({ message: 'Error al eliminar la tarea' });
    }

    if (req.io) {
      console.log('Enviando evento WebSocket: taskDeleted', id);
      req.io.emit('taskDeleted', { id });
    } 

    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  });
};

module.exports = taskController;
