import { describe, it, expect } from 'vitest';
import { ZRPCService, createRoute } from '../src';
import { z } from '../src/zod';
import request from 'supertest';

describe('ZRPCService with context', () => {
	it('should pass context to route handlers', async () => {
		const service = new ZRPCService({
			name: 'test-service',
			async context(req) {
				return { user: { id: req.headers['x-user-id'] } };
			},
			port: 0
		});

		const route = createRoute({
			path: '/test',
			method: 'get',
			input: z.object({}),
			output: z.object({ userId: z.string() })
		});

		service.addRoute(route, async (input, context) => {
			return { userId: context.user.id };
		});

		await service.start();

		const response = await request(service.app)
			.get('/test')
			.set('x-user-id', 'test-user')
			.expect(200);

		expect(response.body).toEqual({ userId: 'test-user' });

		await service.stop();
	});
});
