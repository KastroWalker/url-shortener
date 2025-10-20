import server from '../../src/index';

describe('Health Tests', () => {
    beforeAll(async () => {
        await server.ready();
    });

    afterAll(async () => {
        await server.close();
    });

    it('Should return 200 OK when GET /health', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/health',
        });

        expect(response.statusCode).toBe(200);
    });
});
