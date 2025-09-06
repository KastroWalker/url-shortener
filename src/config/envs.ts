export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;
export const SERVER_HOST = 'RENDER' in process.env ? `0.0.0.0` : `localhost`;
