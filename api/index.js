// Import core dependencies
import fastify from 'fastify';
import mysql from '@fastify/mysql';
import toml from 'toml';
import * as url from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

// Load config
const configFile = fs.readFileSync('config.toml', 'utf8');
const config = toml.parse(configFile);

// Create web server
const app = fastify();

// Create MySQL pool connection
app.register(mysql, {
    promise: true,
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database_name
});

// Register routes
const __dirname = dirname(url.fileURLToPath(import.meta.url));
const routesPath = path.join(__dirname, 'routes');
const routeFiles = fs.readdirSync(routesPath).filter(file => file.endsWith('.js'));
for (const file of routeFiles) {
    const filePath = path.join(url.pathToFileURL(routesPath).toString(), file);
    const route = await import(filePath);
    if ('prefix' in route) {
        app.register(route, { prefix: route.prefix });
    }
}

// Start web server
app.listen({ port: config.server.port || 3001 }, (err, address) => {
    if (err) throw err;
    console.log(`[${config.server.name || 'ZRPS'}] API is now listening on ${address}`);
});
