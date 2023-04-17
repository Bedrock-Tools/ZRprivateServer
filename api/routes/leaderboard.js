export const prefix = '/api/leaderboard';

async function routes(app) {
    app.get('/live', () => {
        return {
            status: 'error',
            message: 'This feature is not yet implemented!'
        };
    });
}

export default routes;
