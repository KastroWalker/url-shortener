export class BadRequestError extends Error {
    action: string
    statusCode: number

    constructor(message: string, action?: string) {
        super(message);
        this.name = "BadRequest";
        this.action = action || "Ajuste os dados enviados e tente novamente.";
        this.statusCode = 400
    }
}

export class ServiceError extends Error {
    constructor(message: string = 'Error interno no servidor.') {
        super(message)
    }
}