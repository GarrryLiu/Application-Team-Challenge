import express, { Request, Response } from "express";
import { participants } from "./data";
import { getConditionName } from "./utils/icdService";
import cors from "cors";


const app = express();

app.use(cors()); 
app.use(express.json());


app.get("/participants/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  console.log("Requested ID:", id);

  const participant = participants.find((p) => p.id === id);

  if (!participant) {
    console.log("Participant not found:", id);
    return res.status(404).json({ message: "Participant not found" });
  }

  console.log("🔍 Fetching ICD conditions...");

  const diagnosesWithCondition = await Promise.all(
    participant.diagnoses.map(async (diag) => {
      const conditionName = await getConditionName(diag.icdCode);
      console.log(`✅ Condition mapped: ${diag.icdCode} -> ${conditionName}`); 
      return {
        icdCode: diag.icdCode,
        conditionName,
        timestamp: diag.timestamp,
      };
    })
  );

  console.log("🚀 Final Diagnoses:", diagnosesWithCondition); 

  res.json({ ...participant, diagnoses: diagnosesWithCondition });
});

app.get("/participants", (req: Request, res: Response) => {
  let { page = "1", limit = "20", sort = "icdCount", sortOnlyOnPage = "", search = "", icdSearch = "", sortOrder = "desc" } = req.query;

  let filteredParticipants = [...participants];

  const pageNum = Math.max(1, parseInt(page as string, 10));
  const limitNum = Math.max(1, parseInt(limit as string, 10));

  // 🔍 **姓名搜索**
  if (search) {
    const lowerSearch = (search as string).toLowerCase();
    filteredParticipants = filteredParticipants.filter(
      (p) =>
        p.firstName.toLowerCase().includes(lowerSearch) ||
        p.lastName.toLowerCase().includes(lowerSearch)
    );
  }

  // 🔍 **ICD 代码搜索**
if (icdSearch) {
  const icdSearchList = (icdSearch as string).split(",").map(code => code.trim().toLowerCase());
  console.log("Backend Received ICD Search:", icdSearchList); 

  filteredParticipants = filteredParticipants.filter((p) =>
    p.diagnoses.some((diag) => icdSearchList.includes(diag.icdCode.toLowerCase()))
  );
}

  

  // 🔄 **排序**
  if (!sortOnlyOnPage || parseInt(sortOnlyOnPage as string, 10) === pageNum) {
    if (sort === "icdCount") {
      filteredParticipants.sort((a, b) => 
        sortOrder === "asc" 
          ? a.diagnoses.length - b.diagnoses.length  // ✅ 升序排列
          : b.diagnoses.length - a.diagnoses.length  // ✅ 降序排列
      );
    } else if (sort === "name") {
      filteredParticipants.sort((a, b) => 
        sortOrder === "asc"
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName)
      );
    }
  }

  // 📌 **分页**
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResults = filteredParticipants.slice(startIndex, startIndex + limitNum);

  res.json({
    total: filteredParticipants.length,
    totalPages: Math.ceil(filteredParticipants.length / limitNum),
    page: pageNum,
    limit: limitNum,
    sortedOnPage: sortOnlyOnPage || "all",
    searchQuery: search || "none",
    icdSearchQuery: icdSearch || "none",
    sortOrder,  // ✅ 确保返回当前排序方式
    data: paginatedResults,
  });
});




export { app };

