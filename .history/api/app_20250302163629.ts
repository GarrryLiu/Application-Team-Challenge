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
  let { page = "1", limit = "20", sort = "icdCount" } = req.query;

  let filteredParticipants = [...participants];

  // 🔄 排序功能
  if (sort === "icdCount") {
    filteredParticipants.sort((a, b) => b.diagnoses.length - a.diagnoses.length);
  } else if (sort === "name") {
    filteredParticipants.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  // 📌 分页功能
  const pageNum = Math.max(1, parseInt(page as string, 10));
  const limitNum = Math.max(1, parseInt(limit as string, 10));
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResults = filteredParticipants.slice(startIndex, startIndex + limitNum);

  const totalPages = Math.ceil(filteredParticipants.length / limitNum);

  res.json({
    total: filteredParticipants.length,
    totalPages: totalPages,
    page: pageNum,
    limit: limitNum,
    data: paginatedResults,
  });
});


export { app };
