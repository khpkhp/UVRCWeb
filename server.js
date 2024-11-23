const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
    static: '.',
    noCors: false
});

// Enable CORS for development and production
server.use(cors({
    origin: [
        'https://uvrc-web.vercel.app',
        'https://*.vercel.app',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5000',
        'http://127.0.0.1:5000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    credentials: true,
    optionsSuccessStatus: 204,
    maxAge: 86400 // 24 hours
}));

// Additional security headers
server.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        // Allow the specific origin that made the request
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
    
    // Security headers
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    next();
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/health', (req, res) => {
    res.json({ 
        status: 'UP',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API documentation endpoint
server.get('/api', (req, res) => {
    res.json({
        version: '1.0.0',
        endpoints: [
            { path: '/api/team', methods: ['GET'] },
            { path: '/api/pmmatches', methods: ['GET'] },
            { path: '/api/qmmatches', methods: ['GET'] },
            { path: '/api/pomatches', methods: ['GET'] },
            { path: '/api/results', methods: ['GET'] }
        ],
        documentation: 'UVRC Web Tournament Management System API'
    });
});

// Rewrite routes to add /api prefix
server.use('/api', (req, res, next) => {
    if (req.url === '/') {
        return res.json({
            endpoints: [
                '/api/team',
                '/api/pmmatches',
                '/api/qmmatches',
                '/api/pomatches',
                '/api/results'
            ]
        });
    }
    next();
});

// Mount json-server router under /api
server.use('/api', router);

// Handle all other routes by serving index.html
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    if (process.env.VERCEL) {
        console.log('Running on Vercel');
    }
    console.log('\nAvailable endpoints:');
    console.log('GET /api - API documentation');
    console.log('GET /api/team - Team information');
    console.log('GET /api/pmmatches - PM matches');
    console.log('GET /api/qmmatches - QM matches');
    console.log('GET /api/pomatches - PO matches');
    console.log('GET /api/results - Results');
    console.log('GET /health - Health check');
});
