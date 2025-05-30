const { Router } = require('express');
const router = Router();

// Importa los métodos del controlador
const {
    getAllTask,
    createTask,
    updateTaskStatus,
    deleteTask
} = require('../../controller/task-controller/task-controller');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags:
 *       - Tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: Comprar leche
 *                   descripcion:
 *                     type: string
 *                     example: Ir al supermercado a comprar leche
 *                   status:
 *                     type: string
 *                     example: pendiente
 */
router.get('/', getAllTask);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags:
 *       - Tareas
 *     requestBody:
 *       description: Datos para crear la tarea
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *                 maxLength: 100
 *                 example: Limpiar la casa
 *               descripcion:
 *                 type: string
 *                 maxLength: 500
 *                 example: Limpiar la sala y la cocina
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 titulo:
 *                   type: string
 *                   example: Limpiar la casa
 *                 descripcion:
 *                   type: string
 *                   example: Limpiar la sala y la cocina
 *                 status:
 *                   type: string
 *                   example: pendiente
 */
router.post('/', createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar el estado de una tarea
 *     tags:
 *       - Tareas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nuevo estado de la tarea
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: completado
 *     responses:
 *       200:
 *         description: Estado de la tarea actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: Comprar leche
 *                 descripcion:
 *                   type: string
 *                   example: Ir al supermercado a comprar leche
 *                 status:
 *                   type: string
 *                   example: completado
 *       400:
 *         description: Estado no proporcionado o inválido
 */
router.put('/:id', updateTaskStatus);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags:
 *       - Tareas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', deleteTask);

module.exports = router;

