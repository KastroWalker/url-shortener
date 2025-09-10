import { FastifyInstance } from 'fastify';
import linkController from './controllers/links-controller'

export default async function registerRoutes(server: FastifyInstance) {
    server.post('/links', linkController.createShortLink);
}