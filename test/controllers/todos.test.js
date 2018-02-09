// import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import bookshelf from '../../src/db';

/**
 * Tests for '/api/todos'
 */
describe('todos Controller Test', () => {
  before(done => {
    bookshelf
      .knex('todos')
      .truncate()
      .then(() => done());
  });

  test('should return list of todos', done => {
    request(app)
      .get('/api/todos')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.lengthOf(0);

        done();
      });
  });

  test('should not create a new todo if title is not provided', done => {
    let todo = {
      notitle: 'Jane Doe'
    };

    request(app)
      .post('/api/todos')
      .send(todo)
      .end((err, res) => {
        let { code, message, details } = res.body.error;

        expect(res.statusCode).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'title');

        done();
      });
  });

  test('should create a new todo with valid data', done => {
    let todo = {
      title: 'Jane Doe'
    };

    request(app)
      .post('/api/todos')
      .send(todo)
      .end((err, res) => {
        let { data } = res.body;

        expect(res.statusCode).to.be.equal(201);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('title');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('updatedAt');
        expect(data.title).to.be.equal(todo.title);

        done();
      });
  });

  test('should get information of todo', done => {
    request(app)
      .get('/api/todos/1')
      .end((err, res) => {
        let { data } = res.body;

        expect(res.statusCode).to.be.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('title');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('updatedAt');

        done();
      });
  });

  test('should respond with not found error if random todo id is provided', done => {
    request(app)
      .get('/api/todos/1991')
      .end((err, res) => {
        let { code, message } = res.body.error;

        expect(res.statusCode).to.be.equal(404);
        expect(code).to.be.equal(404);
        expect(message).to.be.equal('todo not found');

        done();
      });
  });

  test('should update a todo if title is provided', done => {
    let todo = {
      title: 'John Doe'
    };

    request(app)
      .put('/api/todos/1')
      .send(todo)
      .end((err, res) => {
        let { data } = res.body;

        expect(res.statusCode).to.be.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('title');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('updatedAt');
        expect(data.title).to.be.equal(todo.title);

        done();
      });
  });

  test('should not update a todo if title is not provided', done => {
    let todo = {
      notitle: 'John Doe'
    };

    request(app)
      .put('/api/todos/1')
      .send(todo)
      .end((err, res) => {
        let { code, message, details } = res.body.error;

        expect(res.statusCode).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'title');

        done();
      });
  });

  test('should delete a todo if valid id is provided', done => {
    request(app)
      .delete('/api/todos/1')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(204);

        done();
      });
  });

  test('should respond with not found error if random todo id is provided for deletion', done => {
    request(app)
      .delete('/api/todos/1991')
      .end((err, res) => {
        let { code, message } = res.body.error;

        expect(res.statusCode).to.be.equal(404);
        expect(code).to.be.equal(404);
        expect(message).to.be.equal('todo not found');

        done();
      });
  });

  test('should respond with bad request for empty JSON in request body', done => {
    let todo = {};

    request(app)
      .post('/api/todos')
      .send(todo)
      .end((err, res) => {
        let { code, message } = res.body.error;

        expect(res.statusCode).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Empty JSON');

        done();
      });
  });
});
