import createShortLinkUseCase from '../../../src/usecases/create-short-link-usecase'
import linkRepository from '../../../src/repositories/link-repository'
import { ServiceError } from '../../../src/errors'

jest.mock('../../../src/repositories/link-repository')
const mockLinkRepository = linkRepository as jest.Mocked<typeof linkRepository>

describe('CreateShortLinkUseCaseTest', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should throw error when can not generate a short code', async () => {
        mockLinkRepository.findByShortCode.mockResolvedValue({
            id: 'id',
            originalUrl: 'https://example.com',
            shortCode: 'abc123',
            clicks: 0
        })

        await expect(createShortLinkUseCase.execute({
            originalUrl: 'https://test.com'
        })).rejects.toThrow(new ServiceError('Erro ao gerar código da URL.'))

        expect(mockLinkRepository.findByShortCode).toHaveBeenCalledTimes(10)
    })
})