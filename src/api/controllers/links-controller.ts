import { FastifyReply, FastifyRequest } from "fastify";
import { CreateShortLinkInput } from "../../usecases/create-short-link-usecase";
import createShortLinkUseCase from "../../usecases/create-short-link-usecase";

interface CreateShortLinkRequest {
    originalUrl: string
}

interface CreateShortLinkResponse {
    shortUrl: string
}

class LinkController {
    async createShortLink(req: FastifyRequest, rep: FastifyReply) {
        const body = req.body as CreateShortLinkRequest 

        const createShortLinkInput = body as CreateShortLinkInput
        const newLink = await createShortLinkUseCase.execute(createShortLinkInput)

        rep.status(201).send(newLink as CreateShortLinkResponse)
    }
}

const linkController = new LinkController()

export default linkController