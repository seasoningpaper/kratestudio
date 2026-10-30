// Decimal GB is a presentation unit, never an application-capacity migration.
export function formatStorageUsage(bytes, limit) {
  if (![bytes, limit].every(n => Number.isFinite(n) && n >= 0) || limit === 0)
    return '儲存空間尚未確認';
  return `${(bytes / 1e9).toFixed(1)} / ${(limit / 1e9).toFixed(1)} GB`;
}
export function formatGB(bytes) {
  return Number.isFinite(bytes) && bytes >= 0
    ? (bytes / 1e9).toLocaleString('zh-TW', {minimumFractionDigits: 3, maximumFractionDigits: 9}) + ' GB'
    : '容量未確認';
}
// Compact decimal capacity display; computations continue to use exact bytes.
export function formatCapacity(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return '容量未確認';
  if (!bytes) return '0 MB';
  return bytes < 1e9 ? (bytes / 1e6).toFixed(1) + ' MB' : (bytes / 1e9).toFixed(2) + ' GB';
}
