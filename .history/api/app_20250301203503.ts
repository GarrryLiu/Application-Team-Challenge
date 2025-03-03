import express from "express";
import { participants } from "./data";

const app = express();

app.get("/participants", (_, res) => {
  res.json(participants);
});

app.get("/participants/:id", (req, res) => {
  const { id } = req.params;
  const participant = participants.find((p) => p.id === id);

  if (!participant) {
    return res.status(404).json({ message: "Participant not found" });
  }

  res.json(participant);
});


export { app };
