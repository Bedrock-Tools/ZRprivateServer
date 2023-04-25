// Import core dependencies
import fastify from 'fastify';
import mysql from '@fastify/mysql';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import formbody from '@fastify/formbody';
import view from '@fastify/view';
import _static from '@fastify/static';
import path, { dirname } from 'path';
import * as dotenv from 'dotenv';
import * as url from 'url';
import pug from 'pug';
import fs from 'fs';

// Load environment config
dotenv.config();

// Create web server
const app = fastify();

// Create MySQL pool connection
app.register(mysql, {
    promise: true,
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: {
        rejectUnauthorized: true
    }
});

// Register miscellaneous plugins
app.register(cors);
app.register(formbody);
app.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'my-secret'
});
app.register(view, {
    engine: {
        pug
    }
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

// Serve static content
app.register(_static, {
    root: path.join(__dirname, 'public')
});

// Start web server
app.listen({ port: parseInt(process.env.PORT || '3001') }, (err, address) => {
    if (err) throw err;
    console.log(`[${process.env.SERVER_NAME || 'ZRPS'}] API is now listening on ${address}`);
});
