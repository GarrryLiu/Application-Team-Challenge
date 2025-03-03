import axios from "axios";

const ICD_API_URL = "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search";
const cache: Record<string, string> = {}; // 🔥 缓存 ICD 代码解析结果，提高速度

// ❌ 这些是 "非标准 ICD 代码"，它们不是疾病，而是医院逻辑标签
const nonStandardICDCodes = new Set([
  "newAdmitLogic",
  "edVisit",
  "readmit",
  "multipleAdmit",
  "nursingFacility",
  "assistedLiving",
  "homelessShelter",
  "homeFamily"
]);

export async function getConditionName(icdCode: string): Promise<string> {
  // ✅ 如果 `ICD` 代码是 "非标准" 的医院逻辑代码，直接返回 `icdCode`
  if (nonStandardICDCodes.has(icdCode)) {
    console.log(`🔹 Non-standard ICD code detected: ${icdCode} (Returning as-is)`);
    return icdCode;
  }

  // ✅ 如果 `ICD` 代码已在缓存中，直接返回
  if (cache[icdCode]) {
    console.log(`✅ Cache hit for ${icdCode}: ${cache[icdCode]}`);
    return cache[icdCode];
  }

  try {
    console.log(`🔍 Fetching condition for ICD code: ${icdCode}`);
    const response = await axios.get(ICD_API_URL, {
      params: { terms: icdCode, sf: "code" },
    });

    console.log("🌍 API Response:", response.data);

    const result = response.data;
    if (result && result[3] && result[3].length > 0 && result[3][0].length > 1) {
      cache[icdCode] = result[3][0][1]; // ✅ 取 `result[3][0][1]` 作为 `conditionName`
      return result[3][0][1];
    } else {
      console.warn(`⚠️ No condition found for ${icdCode}`);
    }
  } catch (error) {
    console.error(`❌ Error fetching condition for ${icdCode}:`, error);
  }

  console.log(`🚨 Returning 'Unknown Condition' for ${icdCode}`);
  return "Unknown Condition"; 
}
