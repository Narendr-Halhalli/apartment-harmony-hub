export interface MaintenanceInput {
  electricity: number;
  water: number;
  watchman: number;
  garbage: number;
  numberOfFlats: number;
}

export interface MaintenanceResult {
  totalExpense: number;
  rawCostPerFlat: number;
  roundedCostPerFlat: number;
  totalCollected: number;
  surplus: number;
}

/**
 * Rounds a number to the nearest ₹500
 * Uses standard mathematical rounding
 */
export function roundToNearest500(amount: number): number {
  return Math.round(amount / 500) * 500;
}

/**
 * Calculates monthly maintenance with rounding to nearest ₹500
 */
export function calculateMaintenance(input: MaintenanceInput): MaintenanceResult {
  const { electricity, water, watchman, garbage, numberOfFlats } = input;

  // Total monthly expense
  const totalExpense = electricity + water + watchman + garbage;

  // Raw cost per flat
  const rawCostPerFlat = totalExpense / numberOfFlats;

  // Rounded to nearest ₹500
  const roundedCostPerFlat = roundToNearest500(rawCostPerFlat);

  // Total amount collected
  const totalCollected = roundedCostPerFlat * numberOfFlats;

  // Surplus (extra collected for miscellaneous fund)
  const surplus = totalCollected - totalExpense;

  return {
    totalExpense,
    rawCostPerFlat,
    roundedCostPerFlat,
    totalCollected,
    surplus,
  };
}

/**
 * Formats a number as Indian Rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generates WhatsApp message for maintenance summary
 */
export function generateWhatsAppMessage(
  input: MaintenanceInput,
  result: MaintenanceResult,
  paymentDueDate?: string
): string {
  const currentMonth = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const dueDate = paymentDueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `🏠 *Apartment Maintenance – ${currentMonth}*

💡 Electricity: ${formatCurrency(input.electricity)}
🚰 Water: ${formatCurrency(input.water)}
👮 Watchman: ${formatCurrency(input.watchman)}
🗑️ Garbage: ${formatCurrency(input.garbage)}

📊 *Total Expense:* ${formatCurrency(result.totalExpense)}
💰 *Maintenance Per Flat:* ${formatCurrency(result.roundedCostPerFlat)}
🏦 *Miscellaneous Fund Added:* ${formatCurrency(result.surplus)}

📅 Please complete payment by: *${dueDate}*

Thank you 😊`;
}

/**
 * Creates WhatsApp click-to-chat URL
 */
export function createWhatsAppUrl(message: string, phoneNumber?: string): string {
  const encodedMessage = encodeURIComponent(message);
  if (phoneNumber) {
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }
  return `https://wa.me/?text=${encodedMessage}`;
}
