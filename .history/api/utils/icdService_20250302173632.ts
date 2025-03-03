import axios from "axios";

const ICD_API_URL = "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search";
const cache: Record<string, string> = {}; 


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
  if (nonStandardICDCodes.has(icdCode)) {
    console.log(`🔹 Non-standard ICD code detected: ${icdCode} (Returning as-is)`);
    return icdCode;
  }

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
      cache[icdCode] = result[3][0][1]; 
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
