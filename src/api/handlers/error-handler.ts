import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError } from "../../errors";

export default function errorHandler(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
) {
    console.error(error)

    if(error.validation) {
        const customError = new BadRequestError('Payload inválido.')
        return reply.status(customError.statusCode).send({
            name: customError.name,
            message: customError.message,
            action: customError.action,
            status_code: customError.statusCode
        })
    }

    return reply.status(500).send({
        name: 'InternalServerError',
        message: 'Error interno no servidor.',
        action: 'Contate um administrador do sistema.',
        status_code: 500
    })
}