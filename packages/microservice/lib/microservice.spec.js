import assert from 'assert';
import { service } from '../fixtures/service.js';
import request from 'supertest';
import { STATIC_PRODUCTS } from '../fixtures/data.js';

describe('microservice', () => {
  it('accepts requests', async () => {
    const resp = await request(service.app)
      .get('/')
      .query({ query: '' })
      .expect(200);
    assert.deepStrictEqual(resp.body, STATIC_PRODUCTS);
  });

  it('validates input', async () => {
    const resp = await request(service.app).get('/').expect(400);
    assert.deepStrictEqual(resp.body, {
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
});
