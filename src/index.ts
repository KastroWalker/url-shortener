import fastify from 'fastify'
import { SERVER_PORT } from './config/envs'

const server = fastify()

server.get('/health', async (request, reply) => {
  return reply.status(200).send()
})

server.listen({ port: SERVER_PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address} ✅`)
})