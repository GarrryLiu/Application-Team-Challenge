import axios from "axios";

const ICD_API_URL = "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search";
const cache: Record<string, string> = {}; 

export async function getConditionName(icdCode: string): Promise<string> {
  if (cache[icdCode]) return cache[icdCode]; 

  try {
    const response = await axios.get(ICD_API_URL, {
      params: { terms: icdCode, sf: "code" },
    });

    const result = response.data;
    if (result && result[1].length > 0) {
      cache[icdCode] = result[1][0];
      return result[1][0];
    }
  } catch (error) {
    console.error(`Error fetching condition name for ${icdCode}:`, error);
  }

  return "Unknown Condition";
}
