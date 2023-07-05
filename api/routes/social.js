export const prefix = '/social';

async function routes(app) {
    app.get('/discord', (_, res) => {
        const discordUrl = process.env.DISCORD_URL;
        if (discordUrl) {
            res.redirect(discordUrl);
        } else {
            res.code(404).type('text/html').send('Not Found');
        }
    });
}

export default routes;
