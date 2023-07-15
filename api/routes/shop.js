import fetch from 'node-fetch';

export const prefix = '/api/shop';

async function routes(app) {
    // TODO: Implement this route in the project. It currently mirrors the response from official server.
    app.get('/available', async (req) => {
        try {
            const response = await fetch('http://zombsroyale.io/api/shop/available?' + new URLSearchParams(req.query).toString());
            const data = await response.json();
            delete data.itemsSignature;
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
