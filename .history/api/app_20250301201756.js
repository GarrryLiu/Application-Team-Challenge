import express from "express";
import { participants } from "./data";

const app = express();

app.get("/participants", (_, res) => {
  res.json(participants);
});

export { app };
