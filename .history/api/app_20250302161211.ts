import express, { Request, Response } from "express";
import { participants } from "./data";

const app = express();

// app.get("/participants", (_, res) => {
//   res.json(participants);
// });

app.get("/participants/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const participant = participants.find((p) => p.id === id);

  if (!participant) {
    return res.status(404).json({ message: "Participant not found" });
  }

  res.json(participant);
});

app.get("/participants", (req: Request, res: Response) => {
  let { page = "1", limit = "20" } = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResults = participants.slice(startIndex, startIndex + limitNum);

  res.json({
    total: participants.length,
    page: pageNum,
    limit: limitNum,
    data: paginatedResults,
  });
});



export { app };
