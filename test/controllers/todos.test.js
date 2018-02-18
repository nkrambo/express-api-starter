import app from '../../src/index';
import bookshelf from '../../src/db';
import request from 'supertest';

/**
 * Tests for '/api/todos'
 */
describe('Todos Controller Test', () => {
  beforeAll(done => {
    bookshelf
      .knex('todos')
      .truncate()
      .then(() => done());
  });

  // GET - /api/todos
  test('should return list of todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(0);
  });

  // POST (BAD REQUEST) - /api/todos
  test('should not create a new todo if title is not provided', async () => {
    const todo = {
      noTitle: 'Jane Doe'
    };

    const response = await request(app)
      .post('/api/todos')
      .send(todo);

    const { code, message, details } = response.body.error;

    expect(response.statusCode).toBe(400);
    expect(code).toBe(400);
    expect(message).toBe('Bad Request');
    expect(details[0]).toHaveProperty('message');
    expect(details[0]).toHaveProperty('param', 'title');
  });

  // POST - /api/todos
  test('should create a new todo with valid data', async () => {
    let todo = {
      title: 'Jane Doe'
    };

    const response = await request(app)
      .post('/api/todos')
      .send(todo);

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('title', todo.title);
    expect(response.body.data).toHaveProperty('createdAt');
    expect(response.body.data).toHaveProperty('updatedAt');
  });

  // GET - /api/todos/1
  test('should get information of todo', async () => {
    const response = await request(app).get('/api/todos/1');

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data).toHaveProperty('createdAt');
    expect(response.body.data).toHaveProperty('updatedAt');
  });

  // GET - /api/todos/1984
  test('should respond with not found error if random todo id is provided', async () => {
    const response = await request(app).get('/api/todos/1984');
    let { code, message } = response.body.error;

    expect(response.statusCode).toBe(404);
    expect(code).toBe(404);
    expect(message).toBe('To do not found');
  });

  // PUT - /api/todos/1
  test('should update a todo if title is provided', async () => {
    const todo = {
      title: 'John Doe'
    };

    const response = await request(app)
      .put('/api/todos/1')
      .send(todo);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('title', todo.title);
    expect(response.body.data).toHaveProperty('createdAt');
    expect(response.body.data).toHaveProperty('updatedAt');
  });

  // PUT (BAD REQUEST) - /api/todos/1
  test('should not update a todo if title is not provided', async () => {
    let todo = {
      notitle: 'John Doe'
    };

    const response = await request(app)
      .put('/api/todos/1')
      .send(todo);

    const { code, message, details } = response.body.error;

    expect(response.statusCode).toBe(400);
    expect(code).toBe(400);
    expect(message).toBe('Bad Request');
    expect(details[0]).toHaveProperty('message');
    expect(details[0]).toHaveProperty('param', 'title');
  });

  // DELETE - /api/todos/1
  test('should delete a todo if valid id is provided', async () => {
    const response = await request(app).delete('/api/todos/1');
    expect(response.statusCode).toBe(204);
  });

  // DELETE (BAD REQUEST) - /api/todos/1984
  test('should respond with not found error if random todo id is provided for deletion', async () => {
    const response = await request(app).delete('/api/todos/1984');
    const { code, message } = response.body.error;

    expect(response.statusCode).toBe(404);
    expect(code).toBe(404);
    expect(message).toBe('To do not found');
  });

  // POST (BAD REQUEST) - /api/todos
  test('should respond with bad request for empty JSON in request body', async () => {
    let todo = {};

    const response = await request(app)
      .post('/api/todos')
      .send(todo);

    const { code, message } = response.body.error;

    expect(response.statusCode).toBe(400);
    expect(code).toBe(400);
    expect(message).toBe('Empty JSON');
  });
});
