import fetch from 'node-fetch';

export const prefix = '/api/quest';

async function routes(app) {
    // TODO: Implement this route in the project. It currently mirrors the response from official server.
    app.get('/available', async () => {
        try {
            const response = await fetch('http://zombsroyale.io/api/quest/available');
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
