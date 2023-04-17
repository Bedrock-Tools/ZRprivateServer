// Import core dependencies
import fastify from 'fastify';
import mysql from '@fastify/mysql';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import formbody from '@fastify/formbody';
import view from '@fastify/view';
import _static from '@fastify/static';
import path, { dirname } from 'path';
import * as url from 'url';
import toml from 'toml';
import pug from 'pug';
import fs from 'fs';

// Load config and directory name
const __dirname = dirname(url.fileURLToPath(import.meta.url));
const configFile = fs.readFileSync('config.toml', 'utf8');
const config = toml.parse(configFile);

// Create web server
const app = fastify();

// Decorate config
app.decorate('opts', config);

// Create MySQL pool connection
app.register(mysql, {
    promise: true,
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database_name
});

// Register miscellaneous plugins
app.register(cors);
app.register(formbody);
app.register(cookie, {
    secret: config.server.cookie_secret || 'my-secret'
});
app.register(view, {
    engine: {
        pug
    }
});

// Register routes
const routesPath = path.join(__dirname, 'routes');
const routeFiles = fs.readdirSync(routesPath).filter(file => file.endsWith('.js'));
for (const file of routeFiles) {
    const filePath = path.join(url.pathToFileURL(routesPath).toString(), file);
    const route = await import(filePath);
    if ('prefix' in route) {
        app.register(route, { prefix: route.prefix });
    }
}

// Serve static content
app.register(_static, {
    root: path.join(__dirname, 'public')
});

// Start web server
app.listen({ port: config.server.port || 3001 }, (err, address) => {
    if (err) throw err;
    console.log(`[${config.server.name || 'ZRPS'}] API is now listening on ${address}`);
});
