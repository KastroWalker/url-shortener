import { FastifyInstance } from 'fastify';
import linkController from './controllers/link-controller'

export default async function registerRoutes(server: FastifyInstance) {
    server.post('/links', linkController.createShortLink);
}