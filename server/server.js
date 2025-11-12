import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import PostRoute from './routes/post.route.js';
import connectWithMongoDB from './db/Connection1.js';

const app = express();

// ✅ CORS setup (allow frontend)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://full-stack-web-question-bank.netlify.app"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Database connection
connectWithMongoDB();

// ✅ Routes
app.use("/api/v1", PostRoute);

// ✅ Default route (for testing)
app.get("/", (req, res) => {
  res.json({
    activeStatus: true,
    error: false,
  });
});

// ✅ Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server is listening on: http://localhost:${PORT}`));
