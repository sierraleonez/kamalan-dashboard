/**
 * Format price to Indonesian Rupiah currency format
 * @param price - The price value to format
 * @returns Formatted price string (e.g., "Rp 250.000")
 */
export function formatRupiah(price: number | string): string {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (isNaN(numericPrice)) {
        return 'Rp 0';
    }
    
    return `Rp ${numericPrice.toLocaleString('id-ID')}`;
}

/**
 * Parse rupiah format back to number for form inputs
 * @param formattedPrice - The formatted price string (e.g., "Rp 250.000")
 * @returns Number value
 */
export function parseRupiah(formattedPrice: string): number {
    return parseFloat(formattedPrice.replace(/[^\d]/g, '')) || 0;
}