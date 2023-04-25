export const prefix = '/api';

async function routes(app) {
    app.get('/', () => {
        return {
            status: 'success',
            gateway: {
                url: process.env.MASON_ENDPOINT,
                useHttps: process.env.MASON_USE_HTTPS?.toLowerCase() === 'true'
            }
        };
    });
}

export default routes;
