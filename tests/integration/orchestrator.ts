// import { db } from "../src/database"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class Orchestrator {
    async resetDb() {
        const tablenames = await prisma.$queryRaw<
            { tablename: string }[]
        >`SELECT tablename FROM pg_tables WHERE schemaname='public'`
        
        for (const { tablename } of tablenames) {
            if (tablename !== '_prisma_migrations') {
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`)
            }
        }
    }
}

const orchestrator = new Orchestrator()

export default orchestrator