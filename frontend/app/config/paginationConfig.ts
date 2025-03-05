// Configuration file for pagination settings

// Define the type for rows per page options
export type RowsPerPageOption = number | { label: string; value: number };

/**
 * Calculate rows per page options based on total items count
 * This dynamically adjusts the available options based on the dataset size
 * @param totalItems - Total number of items in the dataset
 * @returns Array of row options (numbers or {label, value} objects)
 */
export const calculateRowsPerPageOptions = (
  totalItems: number,
): RowsPerPageOption[] => {
  // Base options that are commonly used
  const baseOptions: number[] = [5, 10, 25, 50];

  // Add more options for larger datasets
  if (totalItems > 100) baseOptions.push(100);
  if (totalItems > 200) baseOptions.push(200);

  // For small datasets, remove unnecessarily large options
  if (totalItems < 50) {
    const filteredOptions = baseOptions.filter(
      (option) => option <= Math.min(totalItems, 25),
    );
    // Only add "All" option if there are more than 10 items
    return totalItems > 10
      ? [...filteredOptions, { label: "All", value: -1 }]
      : filteredOptions;
  }

  // Add "All" option for normal datasets
  return [...baseOptions, { label: "All", value: -1 }];
};

// Default options used for server-side rendering or initial loading
export const DEFAULT_ROWS_PER_PAGE_OPTIONS: RowsPerPageOption[] = [
  5,
  10,
  25,
  50,
  { label: "All", value: -1 },
];

// Maximum number of rows to fetch when "All" option is selected
// This prevents performance issues with very large datasets
export const MAX_ALL_ROWS = 1000;

// Default rows per page value
export const DEFAULT_ROWS_PER_PAGE = 10;
