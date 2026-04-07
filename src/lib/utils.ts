/**
 * Generates a tracking code with the format: Fecha+Hora+tres caracteres alfanuméricos aleatorios.
 * Format: DDMMYY-HHMM-XYZ
 */
export function getTrackingCode(): string {
  const now = new Date();
  
  // Date components
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  
  // Time components
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  // Random alphanumeric string (3 chars)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomStr = '';
  for (let i = 0; i < 3; i++) {
    randomStr += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return `${day}${month}${year}-${hours}${minutes}-${randomStr}`;
}
