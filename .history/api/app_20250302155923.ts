import express, { Request, Response } from "express";
import { participants } from "./data";
import { getConditionName } from "./utils/icdService";

const app = express();
const PORT = 5000;

/**
 * ✅ 获取所有参与者，支持分页、搜索、排序、ICD 代码过滤
 */
app.get("/participants", async (req: Request, res: Response) => {
  let { page = "1", limit = "20", sort = "icdCount", search = "", icdCode = "" } = req.query;

  let filteredParticipants = [...participants];

  // 🔎 ICD 代码过滤
  if (icdCode) {
    filteredParticipants = filteredParticipants.filter((p) =>
      p.diagnoses.some((d) => d.icdCode === icdCode)
    );
  }

  // 🔎 搜索功能
  if (search) {
    const lowerSearch = (search as string).toLowerCase();
    filteredParticipants = filteredParticipants.filter(
      (p) =>
        p.firstName.toLowerCase().includes(lowerSearch) ||
        p.lastName.toLowerCase().includes(lowerSearch)
    );
  }

  // 🔄 排序功能
  if (sort === "icdCount") {
    filteredParticipants.sort((a, b) => b.diagnoses.length - a.diagnoses.length);
  } else if (sort === "name") {
    filteredParticipants.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  // 📌 分页功能
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResults = filteredParticipants.slice(startIndex, startIndex + limitNum);

  res.json({
    total: filteredParticipants.length,
    page: pageNum,
    limit: limitNum,
    data: paginatedResults,
  });
});

/**
 * ✅ 获取单个参与者，包含 ICD 代码解析
 */
app.get("/participants/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const participant = participants.find((p) => p.id === id);

  if (!participant) {
    return res.status(404).json({ message: "Participant not found" });
  }

  // 🔹 获取 ICD 代码对应的疾病名称
  const diagnosesWithCondition = await Promise.all(
    participant.diagnoses.map(async (diag) => ({
      icdCode: diag.icdCode,
      conditionName: await getConditionName(diag.icdCode), // ✅ 这里增加疾病名称
      timestamp: diag.timestamp,
    }))
  );

  res.json({ ...participant, diagnoses: diagnosesWithCondition });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app };
