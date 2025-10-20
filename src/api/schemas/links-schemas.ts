export const createShortLinkSchema = {
    body: {
        type: 'object',
        required: ['originalUrl'],
        properties: {
            originalUrl: {
                type: 'string',
                format: 'uri'
            }
            },
        },
        additionalProperties: false
    }