const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS for specific origins
server.use(cors({
    origin: [
        'https://uvrc-web.vercel.app',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Serve static files
server.use(express.static('.'));

// Use JSON Server router
server.use('/api', router);

// Handle all other routes by serving index.html
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('API is configured for Vercel deployment at https://uvrc-web.vercel.app');
});
