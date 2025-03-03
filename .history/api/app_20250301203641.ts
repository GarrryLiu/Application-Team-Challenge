import express from "express";
import { participants } from "./data";

const app = express();

app.get("/participants", (_, res) => {
  res.json(participants);
});

app.get("/participants/:id", async (req, res) => {
  const { id } = req.params;
  const participant = participants.find((p) => p.id === id);

  if (!participant) {
    return res.status(404).json({ message: "Participant not found" });
  }

  // 🔹 获取 ICD 代码对应的疾病名称
  const diagnoses = await Promise.all(
    participant.diagnoses.map(async (diag) => ({
      icdCode: diag.icdCode,
      conditionName: await getConditionName(diag.icdCode),
      timestamp: diag.timestamp,
    }))
  );

  res.json({ ...participant, diagnoses });
});



export { app };
