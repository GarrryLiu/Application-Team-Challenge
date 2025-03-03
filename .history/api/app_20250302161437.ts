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

  // 转换参数为数字
  const pageNum = Math.max(1, parseInt(page as string, 10)); // 确保 `page` 至少为 1
  const limitNum = Math.max(1, parseInt(limit as string, 10)); // 确保 `limit` 至少为 1

  // 计算分页索引
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedResults = participants.slice(startIndex, endIndex);

  // 计算总页数
  const totalPages = Math.ceil(participants.length / limitNum);

  res.json({
    total: participants.length,
    page: pageNum,
    limit: limitNum,
    totalPages: totalPages, // 总页数
    data: paginatedResults, // 当前页的数据
  });
});

export { app };
