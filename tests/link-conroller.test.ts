// Quando enviar uma url válida ele deve retornar 201 created
// Quando enviar um payload inválido deve retornar 400
// Quando já existir um valor no banco com o mesmo shortLink deve recriar um novo
// Quando der um erro interno, deve retornar error 500

import server from "../src"
import orchestrator from "./orchestrator";
import { db } from '../src/database'
import { validate as uuidValidate } from 'uuid';

describe('Link Controller Tests', () => {
    beforeAll(async () => {
        await server.ready();
    })

    beforeEach(async () => {
        await orchestrator.resetDb()
    })

    afterAll(async () => {
        await server.close()
    })

    it('Should return 201 when POST /links with valid payload', async () => {
        const originalUrl = 'https://google.com'
        const response = await server.inject({
            method: 'POST',
            url: '/links',
            body: { originalUrl }
        })

        const responseDb = await db.query({
            text: 'SELECT * FROM links WHERE original_url = $1',
            values: [originalUrl]
        })

        const newLink = responseDb.rows[0]
        const responseBody = JSON.parse(response.body)

        expect(response.statusCode).toBe(201)
        expect(responseBody.shortUrl.startsWith('https://short.cut/')).toBe(true)
        expect(responseBody.shortUrl.split('/')[3]).toBe(newLink.short_code)
        expect(uuidValidate(newLink.id)).toBe(true)
        expect(newLink.clicks).toBe(0)
        expect(newLink.original_url).toBe(originalUrl)
        expect(new Date(newLink.created_at)).not.toBe(NaN)
        expect(new Date(newLink.updated_at)).not.toBe(NaN)
    })
})