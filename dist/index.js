"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const next_1 = __importDefault(require("next"));
const path_1 = require("path");
const url_1 = require("url");
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const serverApp = () => {
    const server = (0, express_1.default)();
    /* server.get('/a', (req: express.Request, res: express.Response) => {
        return app.render(req, res, '/a')
    })

    server.get('/b', (req, res) => {
        return app.render(req, res, '/b')
    })
    */
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    // Serve static files.
    /* server.use(express.static(path.join(__dirname, 'public')))
    server.use('/_next', express.static(path.join(__dirname, '.next'))) */
    return server;
};
app.prepare().then(() => {
    // Start up the Node server //
    const server = serverApp();
    // gzip //
    server.use((0, compression_1.default)());
    // pwa //
    server.get('/sw.js', (req, res) => {
        const parsedUrl = (0, url_1.parse)(req.url, true);
        const { pathname } = parsedUrl;
        const filePath = (0, path_1.join)(__dirname, '.next', pathname);
        app.serveStatic(req, res, filePath);
    });
    server.listen(port, () => {
        //if (err) throw err
        console.log(`> Ready on http://localhost:${port}`);
    }).on('error', (err) => {
        console.log('error occurred', err);
        throw err;
    });
});
