
/**
 * Formats a number as Indonesian Rupiah
 * @param value The number to format
 * @param includeSymbol Whether to include the Rp symbol
 * @returns Formatted currency string
 */
export const formatRupiah = (value: number | string, includeSymbol: boolean = true): string => {
  // Ensure value is a number before formatting
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  
  // Check if value is a valid number after conversion
  if (isNaN(value)) {
    return 'Invalid amount';
  }
  
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
