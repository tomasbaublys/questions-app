import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT || 5501;

const corsOptions = {
  origin: 'http://localhost:5173',
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.post('/api/answer', (req, res) => {
  const { question } = req.body || {};

  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).send({ error: 'Question is required.' });
  }

  return res.status(200).send({ data: { answer: `You asked: ${question.trim()}` } });
});

app.use((req, res) => {
  res.status(404).send({ error: 'Your requested route does not exist.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});