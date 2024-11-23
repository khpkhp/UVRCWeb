# UVRC Web Application

A web application for managing tournaments and competitions.

## Setup and Deployment

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

### Production Deployment
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start production server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000` (or the port specified in your environment variables).

## API Endpoints

All API endpoints are now prefixed with `/api`. For example:
- GET `/api/team` - Get all teams
- GET `/api/pmmatches` - Get PM matches
- GET `/api/qmmatches` - Get QM matches
- GET `/api/pomatches` - Get PO matches
- GET `/api/results` - Get results

## Environment Variables
- `PORT` - Server port (default: 3000)

## Notes
- The production server serves static files and handles API requests
- CORS is enabled for all routes
- All routes fallback to index.html for client-side routing
