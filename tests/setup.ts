import { config } from 'dotenv'

config({ path: '.env.test' })

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test'
}

beforeAll(() => {
  console.log('🧪 Iniciando testes...')
})

afterAll(() => {
  console.log('✅ Testes finalizados!')
})