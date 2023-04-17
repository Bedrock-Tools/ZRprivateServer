import fetch from 'node-fetch';

export const prefix = '/api/reward';

async function routes(app) {
    // TODO: Implement this route in the project. It currently mirrors the response from official server.
    app.get('/tracks', async () => {
        try {
            const response = await fetch('http://zombsroyale.io/api/reward/tracks');
            const data = await response.json();
            return data;
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    });
}

export default routes;
