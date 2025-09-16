import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import convertRouter from './routes/convert.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

app.use('/api/convert', convertRouter);

app.get('/', (req, res) => {
  res.send('Code Converter AI Server is running!');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});