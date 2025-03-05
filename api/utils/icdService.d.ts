/**
 * Get the condition name for an ICD code
 * @param icdCode The ICD code to look up
 * @returns The condition name
 */
export declare function getConditionName(icdCode: string): Promise<string>;
/**
 * Get the disease category for an ICD code
 * @param icdCode The ICD code to categorize
 * @returns The disease category
 */
export declare function getDiseaseCategory(icdCode: string): string;
