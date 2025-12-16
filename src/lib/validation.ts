export function isNonEmptyString(value: string) {
  return value.trim().length > 0;
}

export function isValidEmail(value: string) {
  const email = value.trim();
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(value: string) {
  const phone = value.trim();
  if (!phone) return false;
  return /^[+]?[(]?[0-9]{1,4}[)]?[\s./0-9-]{7,}$/.test(phone);
}
