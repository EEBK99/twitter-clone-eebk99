import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import path from "path";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import tweetRoutes from "./routes/tweet";

const app: Express = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL || "")
    .then(() => {
      console.log("connected to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

/** api routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);

// /** production */
// app.use(express.static(path.join(__dirname, "../../client/build")));
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../client/build/index.html"));
// });

app.listen(process.env.PORT || 8000, () => {
  connect();
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});
