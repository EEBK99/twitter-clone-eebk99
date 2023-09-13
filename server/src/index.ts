import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

app.listen(8000, () => {
  connect();
  console.log(`⚡️[server]: Server is running at http://localhost:${8000}`);
});
