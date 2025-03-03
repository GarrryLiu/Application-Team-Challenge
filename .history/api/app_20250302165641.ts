import express, { Request, Response } from "express";
import { participants } from "./data";
import { getConditionName } from "./utils/icdService";

const app = express();

// app.get("/participants", (_, res) => {
//   res.json(participants);
// });



app.get("/participants/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  // ✅ 先打印日志，检查 `id` 是否正确传递
  console.log("Requested ID:", id);

  // ✅ 确保 `id` 以 `lowercase` 进行匹配，防止大小写问题
  const participant = participants.find((p) => p.id.toLowerCase() === id.toLowerCase());

  if (!participant) {
    console.log("Participant not found:", id);
    return res.status(404).json({ message: "Participant not found" });
  }

  // 🔹 获取 ICD 代码对应的疾病名称
  const diagnosesWithCondition = await Promise.all(
    participant.diagnoses.map(async (diag) => ({
      icdCode: diag.icdCode,
      conditionName: await getConditionName(diag.icdCode),
      timestamp: diag.timestamp,
    }))
  );

  res.json({ ...participant, diagnoses: diagnosesWithCondition });
});

app.get("/participants", (req: Request, res: Response) => {
  let { page = "1", limit = "20", sort = "icdCount", sortOnlyOnPage = "", search = "" } = req.query;

  let filteredParticipants = [...participants];

  const pageNum = Math.max(1, parseInt(page as string, 10));
  const limitNum = Math.max(1, parseInt(limit as string, 10));

  // 🔎 搜索功能（匹配 firstName 或 lastName）
  if (search) {
    const lowerSearch = (search as string).toLowerCase();
    filteredParticipants = filteredParticipants.filter(
      (p) =>
        p.firstName.toLowerCase().includes(lowerSearch) ||
        p.lastName.toLowerCase().includes(lowerSearch)
    );
  }

  // 🔄 仅在 `sortOnlyOnPage=N` 对应的页码时进行排序
  if (!sortOnlyOnPage || parseInt(sortOnlyOnPage as string, 10) === pageNum) {
    if (sort === "icdCount") {
      filteredParticipants.sort((a, b) => b.diagnoses.length - a.diagnoses.length);
    } else if (sort === "name") {
      filteredParticipants.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
  }

  // 📌 分页功能
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResults = filteredParticipants.slice(startIndex, startIndex + limitNum);

  // 计算总页数
  const totalPages = Math.ceil(filteredParticipants.length / limitNum);

  res.json({
    total: filteredParticipants.length,
    totalPages: totalPages,
    page: pageNum,
    limit: limitNum,
    sortedOnPage: sortOnlyOnPage || "all", // 记录在哪个页码排序
    searchQuery: search || "none",
    data: paginatedResults,
  });
});


export { app };

