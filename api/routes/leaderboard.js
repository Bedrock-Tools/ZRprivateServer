export const prefix = '/api/leaderboard';

async function routes(fastify) {
    fastify.get('/live', async () => {
        return {
            status: 'error',
            message: 'This feature is not yet implemented!'
        };
    });
}

export default routes;
