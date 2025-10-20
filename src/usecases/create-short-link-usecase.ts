import { randomUUID } from 'crypto'
import linkRepository from '../repositories/link-repository'
import { ServiceError } from '../errors'

export interface CreateShortLinkInput {
    originalUrl: string
}

export interface CreateShortLinkOutput {
    shortUrl: string
}

class CreateShortLinkUseCase {
    async execute(input: CreateShortLinkInput): Promise<CreateShortLinkOutput> {
        const MAX_ATTEMPTS = 10

        for(let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            const shortCode = this.generateShortCode()

            if(!(await linkRepository.findByShortCode(shortCode))) {
                const link = {
                    id: randomUUID(),
                    originalUrl: input.originalUrl,
                    shortCode: shortCode,
                    clicks: 0,
                }
                
                const response = await linkRepository.create(link)
        
                return { 
                    shortUrl: `https://short.cut/${response.shortCode}` 
                }
            }
        }

        throw new ServiceError("Erro ao gerar código da URL.");
    }

    private generateShortCode() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const SHORT_CODE_LENGTH = 6;
        let result = '';
        
        for (let i = 0; i < SHORT_CODE_LENGTH; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    }
}

const createShortLinkUseCase = new CreateShortLinkUseCase()

export default createShortLinkUseCase