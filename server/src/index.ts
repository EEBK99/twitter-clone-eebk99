import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

const app: Express = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL || "8000")
    .then(() => {
      console.log("connected to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(express.json());

/** api routes */
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  connect();
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});
