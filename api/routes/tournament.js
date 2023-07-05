export const prefix = '/api/tournament';

async function routes(app) {
    app.get('/:tournamentCode/join', () => {
        return {
            status: 'error',
            message: 'No tournament found with that code!'
        };
    });
}

export default routes;
