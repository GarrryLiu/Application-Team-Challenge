import express from "express";
import { Request, Response } from "express";
import { participants } from "./data";

const app = express();

app.get("/participants", (_, res) => {
  res.json(participants);
});

app.get("/participants/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const participant = participants.find((p) => p.id === id);

  if (!participant) {
    return res.status(404).json({ message: "Participant not found" });
  }

  res.json(participant);
});


export { app };
