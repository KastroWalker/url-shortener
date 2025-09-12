import { Client } from 'pg'

export interface Link {
    id?: string
    originalUrl: string
    shortCode: string,
    clicks: number,
    createdAt?: Date
    updatedAt?: Date
}

class LinkRepository {
    async create(link: Link): Promise<Link> {
        const client = new Client({
            user: 'postgres',
            password: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'url_shortener'
        })
        await client.connect()
        
        const query = `
        INSERT INTO links(
            id,
            original_url,
            short_code,
            clicks
        ) VALUES (
            $1,
            $2,
            $3,
            $4
        ) RETURNING *;
        `
        const values = [link.id, link.originalUrl,link.shortCode,link.clicks]

        const result = await client.query(query, values)

        await client.end()

        return {
            id: result.rows[0].id,
            originalUrl: result.rows[0].original_url,
            shortCode: result.rows[0].short_code,
            clicks: result.rows[0].clicks,
            createdAt: result.rows[0].created_at,
            updatedAt: result.rows[0].updated_at
        }
    }

    async findByShortCode(shortCode: string) {
        const client = new Client({
            user: 'postgres',
            password: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'url_shortener'
        })
        await client.connect()
        const query = `SELECT * FROM links WHERE short_code = $1`
        const values = [shortCode]

        const result = await client.query(query, values)

        await client.end()

        // Casos de teste pra ver se retorna null ou undefined
        return result.rows[0]
    }
}

const linkRepository = new LinkRepository

export default linkRepository