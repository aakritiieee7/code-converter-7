import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import convertRouter from './routes/convert.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request body:', req.body);
  next();
});

// Mount the convert router
app.use('/api', convertRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Code Converter AI Server is running!',
    timestamp: new Date().toISOString(),
    routes: [
      'GET / - Health check',
      'POST /api/convert - Code conversion'
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    error: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /',
      'POST /api/convert'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Available routes:');
  console.log('  GET  / - Health check');
  console.log('  POST /api/convert - Code conversion');
});