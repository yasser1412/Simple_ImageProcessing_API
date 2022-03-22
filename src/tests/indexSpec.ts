import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('main page testing', () => {
  it('should return status code 200 on get request', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});
