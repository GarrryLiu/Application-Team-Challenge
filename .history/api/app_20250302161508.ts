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

  const pageNum = Math.max(1, parseInt(page as string, 10)); 
  const limitNum = Math.max(1, parseInt(limit as string, 10)); 

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedResults = participants.slice(startIndex, endIndex);

  // 计算总页数
  const totalPages = Math.ceil(participants.length / limitNum);

  res.json({
    total: participants.length,
    page: pageNum,
    limit: limitNum,
    totalPages: totalPages,
    data: paginatedResults, 
  });
});

export { app };
