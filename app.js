import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import { booksRouter } from "./routes/booksRouter.js";
import { pingService } from "./services/pingService.js";

const { DB_HOST, PORT } = process.env;

export const app = express();

app.use(morgan("tiny"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-manager-rho-six.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/books", booksRouter);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Online." });
});

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

pingService();
