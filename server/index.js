import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import convertRouter from './routes/convert.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS options
const corsOptions = {
  origin: true,
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Debugging middleware to log request body
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

// Routes
app.use('/api/convert', convertRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY); // Debugging the API key
});
