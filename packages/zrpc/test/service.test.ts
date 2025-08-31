import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { service } from './fixtures/service';
import { STATIC_PRODUCTS } from './fixtures/data';

describe('ZRPCService', () => {
  beforeAll(async () => {
    await service.start();
  });

  afterAll(async () => {
    await service.stop();
  });

  it('accepts requests and filters products', async () => {
    const resp = await request(service.app).get('/').query({ query: 'product a' }).expect(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Product A',
        price: 10.99,
      },
    ]);
  });

  it('validates input for GET requests', async () => {
    const resp = await request(service.app).get('/').expect(400);
    expect(resp.body).toEqual({
      errors: [
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['query'],
          message: 'Required',
        },
      ],
    });
  });

  it('accepts POST requests and adds a new product', async () => {
    const newProductData = { name: 'Product C', price: 30.00 };
    const resp = await request(service.app).post('/products').send(newProductData).expect(200);
    expect(resp.body).toEqual({
      id: '3',
      name: 'Product C',
      price: 30.00,
    });
  });

  it('validates input for POST requests', async () => {
    const resp = await request(service.app).post('/products').send({ name: 'Product D' }).expect(400);
    expect(resp.body).toEqual({
      errors: [
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path: ['price'],
          message: 'Required',
        },
      ],
    });
  });

  it('should expose the OpenAPI spec at /openapi.json', async () => {
    const resp = await request(service.app).get('/openapi.json').expect(200);
    expect(resp.body).toMatchSnapshot();
  });
});