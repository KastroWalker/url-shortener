import { Client } from 'pg'

class Database {
    async query(queryObject: any) {
        let client;
        try {
            client = await this.getNewClient();
            const result = await client.query(queryObject)
            return result
        } catch (error) {
            // TODO Adicionar Exception Customizada
            throw error
        } finally {
            await client?.end();
        }
    }

    async getNewClient(): Promise<Client> {
        const client = new Client({
            user: 'postgres',
            password: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'url_shortener'
        })
        await client.connect()
        return client
    }
}

const db = new Database()

export {
    db
}