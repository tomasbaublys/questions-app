import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { initDb } from "./db/db.js";
import questionsRoutes from "./routes/questionsRoutes.js";

const PORT = process.env.PORT || 5501;

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

await initDb();

app.use("/api", questionsRoutes);

app.use((_req, res) => {
  res.status(404).send({ error: "Your requested route does not exist." });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});