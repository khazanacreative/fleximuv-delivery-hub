
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
  
  const formatter = new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  const formatted = formatter.format(value);
  
  if (!includeSymbol) {
    // Remove the 'Rp' symbol and any non-breaking space if present
    return formatted.replace(/^Rp\s*/, '');
  }
  
  return formatted;
};

/**
 * Formats a value in thousands of Rupiah
 * @param value The number to format in thousands
 * @param includeSymbol Whether to include the Rp symbol
 * @returns Formatted currency string in thousands
 */
export const formatRupiahInThousands = (value: number | string, includeSymbol: boolean = true): string => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  
  if (isNaN(value)) {
    return 'Invalid amount';
  }
  
  // Convert to thousands
  const valueInThousands = value / 1000;
  
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });
  
  const formatted = formatter.format(valueInThousands);
  
  if (includeSymbol) {
    return `Rp ${formatted}K`;
  }
  
  return `${formatted}K`;
};
