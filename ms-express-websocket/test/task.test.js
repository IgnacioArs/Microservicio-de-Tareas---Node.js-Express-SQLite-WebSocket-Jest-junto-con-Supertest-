const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db/database'); // Asegúrate que este es el acceso a tu conexión SQLite

describe('Tareas API', () => {
  // Limpiar tareas antes de cada test
  beforeEach((done) => {
    db.run('DELETE FROM tareas', done);
  });

  // Cerrar base de datos al finalizar tests
  afterAll((done) => {
    db.close(done);
  });

  it('GET /task → debería responder con 200 y un array', async () => {
    const response = await request(app).get('/task');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /task → debería crear una nueva tarea', async () => {
    const nuevaTarea = {
      titulo: 'Test Tarea',
      descripcion: 'Descripción test'
    };

    const response = await request(app).post('/task').send(nuevaTarea);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.titulo).toBe(nuevaTarea.titulo);
  });

  it('PUT /task/:id → debería actualizar el estado de una tarea', async () => {
    const nueva = await request(app).post('/task').send({
      titulo: 'Actualizar',
      descripcion: 'Actualizar estado'
    });

    const tareaId = nueva.body.id;

    const response = await request(app)
      .put(`/task/${tareaId}`)
      .send({ status: 'completada' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/actualizada/i);
  });

  it('DELETE /task/:id → debería eliminar una tarea', async () => {
    const nueva = await request(app).post('/task').send({
      titulo: 'Eliminar',
      descripcion: 'Para borrar'
    });

    const tareaId = nueva.body.id;

    const response = await request(app).delete(`/task/${tareaId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/eliminada/i);
  });
});
