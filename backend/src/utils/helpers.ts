export function generateProtocol(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `COL-${timestamp.slice(-6)}-${random}`;
}

export function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6; // 0 = domingo, 6 = sábado
}

export function addBusinessDays(startDate: Date, businessDays: number): Date {
  const result = new Date(startDate);
  let daysAdded = 0;

  while (daysAdded < businessDays) {
    result.setDate(result.getDate() + 1);
    if (isBusinessDay(result)) {
      daysAdded++;
    }
  }

  return result;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR');
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString('pt-BR');
}