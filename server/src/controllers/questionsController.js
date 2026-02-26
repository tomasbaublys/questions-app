import { pool, dbReady } from "../db/db.js";

const getQuestions = async (_req, res) => {
  if (!pool || !dbReady) {
    return res.status(200).send({ data: [] });
  }

  try {
    const result = await pool.query(
      'SELECT id, question, answer, created_at AS "createdAt" FROM questions ORDER BY created_at DESC'
    );
    return res.status(200).send({ data: result.rows });
  } catch (err) {
    console.error("GET /api/questions error:", err);
    return res.status(500).send({ error: "Server error." });
  }
};

const askQuestion = async (req, res) => {
  const { question } = req.body || {};

  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).send({ error: "Question is required." });
  }

  const q = question.trim();
  const answer = `You asked: ${q}`;

  if (!pool || !dbReady) {
    return res.status(200).send({ data: { answer } });
  }

  const id = crypto.randomUUID();

  try {
    await pool.query("INSERT INTO questions (id, question, answer) VALUES ($1, $2, $3)", [
      id,
      q,
      answer,
    ]);

    return res.status(200).send({ data: { answer, id, createdAt: new Date().toISOString() } });
  } catch (err) {
    console.error("POST /api/answer error:", err);
    return res.status(500).send({ error: "Server error." });
  }
};

export { getQuestions, askQuestion };