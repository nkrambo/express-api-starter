import app from '../src/index';
import request from 'supertest';

describe('Base API Test', () => {
  test('should return API version and title for the app', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.body.app).toBe(app.locals.title);
    expect(response.body.apiVersion).toBe(app.locals.version);
  });

  test('should return 405 method not allowed for random API hits', async () => {
    const randomString = Math.random()
      .toString(36)
      .substr(2, 5);

    const response = await request(app).get(`/api/${randomString}`);
    expect(response.statusCode).toBe(405);
    expect(response.body.error.code).toBe(405);
    expect(response.body.error.message).toBe('Method Not Allowed');
  });
});
