import supertest from 'supertest';
import app from '../index';
import { unlinkSync } from 'fs';
import path from 'path';

const request = supertest(app);

describe('images route testing', () => {
  const input_image = 'encenadaport';
  const width = 200;
  const height = 200;
  const url = '/api/images';

  it('should return status code 200 on valid new query parametars', async () => {
    const response = await request.get(
      `${url}?filename=${input_image}&width=${width}&height=${height + 5}`
    );
    expect(response.statusCode).toBe(200);
  });
  it('should return status code 304 on already processed image (cached)', async () => {
    const response = await request.get(
      `${url}?filename=${input_image}&width=${width}&height=${height}`
    );
    expect(response.statusCode).toBe(304);
  });

  it('should return status code 400 when unused a filename', async () => {
    const response = await request.get(
      `${url}?width=${width}&height=${height}`
    );
    expect(response.statusCode).toBe(400);
  });
  it('should return status code 400 when unused width', async () => {
    const response = await request.get(
      `${url}?filename=${input_image}&height=${height}`
    );
    expect(response.statusCode).toBe(400);
  });
  it('should return status code 400 when unused height', async () => {
    const response = await request.get(
      `${url}?filename=${input_image}&width=${width}`
    );
    expect(response.statusCode).toBe(400);
  });

  it('should return status code 404 when the input file name is not on our assets folder', async () => {
    const response = await request.get(
      `${url}?filename=falsy&width=${width}&height=${height}`
    );
    expect(response.statusCode).toBe(404);
  });
  afterAll(() =>
    unlinkSync(
      path.join(
        __dirname + `../../../assets/thumb/encenadaport_thumb_w=200_h=205.jpg`
      )
    )
  );
});
