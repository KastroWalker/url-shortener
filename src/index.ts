import fastify from 'fastify';
import { SERVER_HOST, SERVER_PORT } from './config/envs';
import registerRoutes from './api/routes'
import errorHandler from './api/handlers/error-handler';

const server = fastify();

server.setErrorHandler(errorHandler)

server.get('/health', async (request, reply) => {
    return reply.status(200).send();
});
registerRoutes(server)

if (process.env.NODE_ENV !== 'test') {
    server.listen({ host: SERVER_HOST, port: SERVER_PORT }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address} ✅`);
    });
}

export default server;
