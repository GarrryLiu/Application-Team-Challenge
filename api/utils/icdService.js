var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
// API endpoints
const API_ENDPOINTS = {
    SEARCH: "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search",
    DOC: "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/doc"
};
// Cache for condition names to reduce API calls
const conditionCache = {};
// Non-standard ICD codes that should be returned as-is
const nonStandardICDCodes = new Set([
    "newAdmitLogic",
    "edVisit",
    "readmit",
    "multipleAdmit",
    "nursingFacility",
    "assistedLiving",
    "homelessShelter",
    "homeFamily",
]);
// Disease category mapping based on ICD-10 chapters
const ICD_CATEGORIES = [
    { range: { start: "A00", end: "B99" }, name: "infectious", displayName: "A00-B99 Infectious & Parasitic Diseases" },
    { range: { start: "C00", end: "D48" }, name: "malignancy", displayName: "C00-D48 Neoplasms, Malignancy" },
    { range: { start: "D50", end: "D89" }, name: "hematologic", displayName: "D50-D89 Hematologic & Immune Disorders" },
    { range: { start: "E00", end: "E90" }, name: "endocrine", displayName: "E00-E90 Endocrine, Metabolic" },
    { range: { start: "F00", end: "F99" }, name: "mental", displayName: "F00-F99 Mental & Behavioral Disorders" },
    { range: { start: "G00", end: "G99" }, name: "neurological", displayName: "G00-G99 Neurological Disorders" },
    { range: { start: "H00", end: "H59" }, name: "ophthalmological", displayName: "H00-H59 Ophthalmological Disorders" },
    { range: { start: "H60", end: "H95" }, name: "otological", displayName: "H60-H95 Otological Disorders" },
    { range: { start: "I00", end: "I99" }, name: "cardiovascular", displayName: "I00-I99 Cardiovascular Diseases" },
    { range: { start: "J00", end: "J99" }, name: "respiratory", displayName: "J00-J99 Respiratory Diseases" },
    { range: { start: "K00", end: "K93" }, name: "digestive", displayName: "K00-K93 Digestive Disorders" },
    { range: { start: "L00", end: "L99" }, name: "dermatological", displayName: "L00-L99 Dermatological Diseases" },
    { range: { start: "M00", end: "M99" }, name: "musculoskeletal", displayName: "M00-M99 Musculoskeletal Disorders" },
    { range: { start: "N00", end: "N99" }, name: "urogenital", displayName: "N00-N99 Urogenital Diseases" },
    { range: { start: "O00", end: "O99" }, name: "pregnancy", displayName: "O00-O99 Pregnancy & Perinatal Conditions" },
    { range: { start: "P00", end: "P96" }, name: "perinatal", displayName: "P00-P96 Perinatal & Neonatal Conditions" },
    { range: { start: "Q00", end: "Q99" }, name: "congenital", displayName: "Q00-Q99 Congenital Malformations" },
    { range: { start: "R00", end: "R99" }, name: "symptoms", displayName: "R00-R99 Symptoms & Abnormal Clinical Findings" },
    { range: { start: "S00", end: "T98" }, name: "injury", displayName: "S00-T98 Injury, Poisoning & External Causes" },
    { range: { start: "V00", end: "Y99" }, name: "external", displayName: "V00-Y99 External Causes of Morbidity & Mortality" },
    { range: { start: "Z00", end: "Z99" }, name: "factors", displayName: "Z00-Z99 Factors Influencing Health Status & Preventive Medicine" },
];
/**
 * Get the condition name for an ICD code
 * @param icdCode The ICD code to look up
 * @returns The condition name
 */
export function getConditionName(icdCode) {
    return __awaiter(this, void 0, void 0, function* () {
        // Handle non-standard codes
        if (nonStandardICDCodes.has(icdCode)) {
            return icdCode;
        }
        // Check cache first
        if (conditionCache[icdCode]) {
            return conditionCache[icdCode];
        }
        try {
            // Try the search API first
            const conditionName = yield fetchFromSearchAPI(icdCode);
            if (conditionName) {
                conditionCache[icdCode] = conditionName;
                return conditionName;
            }
            // If search API fails, try the doc API
            const docConditionName = yield fetchFromDocAPI(icdCode);
            if (docConditionName) {
                conditionCache[icdCode] = docConditionName;
                return docConditionName;
            }
            // If both APIs fail, return unknown condition
            return "Unknown Condition";
        }
        catch (error) {
            console.error(`Error fetching condition for ${icdCode}:`, error);
            return "Unknown Condition";
        }
    });
}
/**
 * Fetch condition name from the search API
 * @param icdCode The ICD code to look up
 * @returns The condition name or null if not found
 */
function fetchFromSearchAPI(icdCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(API_ENDPOINTS.SEARCH, {
                params: { terms: icdCode, sf: "code" },
                timeout: 5000 // 5 second timeout
            });
            const result = response.data;
            if (result &&
                result[3] &&
                result[3].length > 0 &&
                result[3][0].length > 1) {
                return result[3][0][1];
            }
            return null;
        }
        catch (error) {
            console.error(`Search API error for ${icdCode}:`, error);
            return null;
        }
    });
}
/**
 * Fetch condition name from the doc API
 * @param icdCode The ICD code to look up
 * @returns The condition name or null if not found
 */
function fetchFromDocAPI(icdCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(API_ENDPOINTS.DOC, {
                params: { code: icdCode },
                timeout: 5000 // 5 second timeout
            });
            if (response.data && response.data.name) {
                return response.data.name;
            }
            return null;
        }
        catch (error) {
            console.error(`Doc API error for ${icdCode}:`, error);
            return null;
        }
    });
}
/**
 * Helper function to check if a code is within a range
 * @param code The ICD code to check
 * @param start The start of the range
 * @param end The end of the range
 * @returns True if the code is within the range
 */
function isCodeInRange(code, start, end) {
    var _a, _b, _c;
    // Extract the letter part and number part
    const codeLetters = ((_a = code.match(/^[A-Z]+/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
    const codeNumbers = code.replace(/^[A-Z]+/, "");
    const startLetters = ((_b = start.match(/^[A-Z]+/)) === null || _b === void 0 ? void 0 : _b[0]) || "";
    const startNumbers = start.replace(/^[A-Z]+/, "");
    const endLetters = ((_c = end.match(/^[A-Z]+/)) === null || _c === void 0 ? void 0 : _c[0]) || "";
    const endNumbers = end.replace(/^[A-Z]+/, "");
    // If the letter parts don't match the range, return false
    if (codeLetters < startLetters || codeLetters > endLetters) {
        return false;
    }
    // If the letter parts match the start or end exactly, check the number part
    if (codeLetters === startLetters && codeNumbers < startNumbers) {
        return false;
    }
    if (codeLetters === endLetters && codeNumbers > endNumbers) {
        return false;
    }
    return true;
}
/**
 * Get the disease category for an ICD code
 * @param icdCode The ICD code to categorize
 * @returns The disease category
 */
export function getDiseaseCategory(icdCode) {
    // Handle non-standard codes
    if (nonStandardICDCodes.has(icdCode)) {
        return "other";
    }
    // Normalize the code format
    const normalizedCode = icdCode.toUpperCase();
    // Find the matching category
    const category = ICD_CATEGORIES.find((cat) => isCodeInRange(normalizedCode, cat.range.start, cat.range.end));
    return (category === null || category === void 0 ? void 0 : category.name) || "other";
}
