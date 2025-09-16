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
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

app.use('/api', convertRouter);

app.get('/', (req, res) => {
  res.send('Code Converter AI Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});