import dotenv from "dotenv";
dotenv.config({ path: "./.env" })

import express from 'express';
import connectDB from './config/db.js';
import mainRoute from './router/mainRoute.js';
import cors from 'cors';

const app = express();

connectDB();
console.log("ENV TEST:", process.env.API_KEY);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frontend = {
  origin: [
    "http://localhost:5173",
    "https://gravitydesignstudio001.netlify.app"
  ],
  credentials: true,
};

app.use(cors(frontend));

app.get("/", (req, res) => {
  res.send("This is backend..");
});

app.use("/api", mainRoute);

app.listen(2001, () => {
  console.log("server Running...");
});