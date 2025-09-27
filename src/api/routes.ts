import { FastifyInstance } from 'fastify';
import linkController from './controllers/link-controller'
import { createShortLinkSchema } from './schemas/links-schemas';

export default async function registerRoutes(server: FastifyInstance) {
    server.post('/links', {
        schema: createShortLinkSchema,
        handler: linkController.createShortLink
    });
}