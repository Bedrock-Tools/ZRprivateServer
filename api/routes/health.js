export const prefix = '/api';

async function routes(fastify) {
    fastify.get('/', async () => {
        return { status: 'success' };
    });
}

export default routes;
