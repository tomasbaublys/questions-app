import express from "express";
import cors from "cors";
import "dotenv/config";
import { initDb, pool } from "./db/db.js";

const PORT = process.env.PORT || 5501;

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

await initDb();

app.get("/api/questions", async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, question, answer, created_at AS "createdAt" FROM questions ORDER BY created_at DESC'
    );
    return res.status(200).send({ data: result.rows });
  } catch (err) {
    console.error("GET /api/questions error:", err);
    return res.status(500).send({ error: "Server error." });
  }
});

app.post("/api/answer", async (req, res) => {
  const { question } = req.body || {};

  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).send({ error: "Question is required." });
  }

  const q = question.trim();
  const answer = `You asked: ${q}`;
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
});

app.use((_req, res) => {
  res.status(404).send({ error: "Your requested route does not exist." });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});