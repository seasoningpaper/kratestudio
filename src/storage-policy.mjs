// Application policy, not a promise of browser quota or physical disk space.
export const PROJECT_LIMIT = 5_000_000_000;
// Public test release: retain r2's write boundary until large browser tests pass.
// The 5 GB policy/backup format is deliberately separate from writable capacity.
export const WRITE_LIMIT = 2 * 1024 * 1024 * 1024;
export const BUFFERED_EXPORT_LIMIT = 256_000_000;
export const BUFFERED_IMPORT_LIMIT = 350_000_000;
export const ASSET_LIMIT = 128 * 1024 * 1024;
export const VIDEO_LIMIT = 512 * 1024 * 1024;
export const ASSET_COLLECTIONS = ['images', 'audio', 'videos', 'fonts'];
export function assertProjectSize(bytes) {
  if (!Number.isSafeInteger(bytes) || bytes < 0) throw Error('專案容量資料無效');
  if (bytes > PROJECT_LIMIT) throw Error('專案超過 5.0 GB 政策上限，請先減少素材。');
}
export function isLargeProject(project) {
  return project?.storagePolicy?.version === 1 && project.storagePolicy.mode === 'experimental-5gb'
    && project.storagePolicy.testProject === true && typeof project.id === 'string'
    && project.id.startsWith('experimental-5gb-');
}
export function projectWriteLimit(project) { return isLargeProject(project) ? PROJECT_LIMIT : WRITE_LIMIT; }
export function assertWritableProjectSize(bytes, project) {
  assertProjectSize(bytes);
  if (bytes > projectWriteLimit(project))
    throw Error('本公開測試版尚未開放超過 2.1 GB 的一般專案寫入。5.0 GB 瀏覽器儲存仍待驗證；未開始寫入，原存檔保留。請先匯出串流備份。');
}
export function assertBufferedExport(bytes, {kind = 'project'} = {}) {
  if (bytes > BUFFERED_EXPORT_LIMIT)
    throw Error(kind === 'game'
      ? '大型遊戲 ZIP 尚未開放；本測試版封裝上限為 0.256 GB。請減少素材後再匯出；原專案未變更。'
      : 'JSON 備份上限為 0.256 GB；請使用支援檔案儲存選擇器的環境匯出串流專案備份。此環境未開放大型記憶體封裝，原專案未變更。');
}
export function browserCapacity(value = {}) {
  const valid = n => Number.isFinite(n) && n >= 0;
  const quota = valid(value.quota) ? value.quota : null;
  const usage = valid(value.usage) ? value.usage : null;
  return {browserQuota: quota, browserUsage: usage,
    browserAvailable: quota !== null && usage !== null ? Math.max(0, quota - usage) : null};
}
export function assertAvailableSpace(capacity, additionalBytes) {
  if (capacity.browserAvailable !== null && additionalBytes > capacity.browserAvailable)
    throw Error('瀏覽器估計可用額度不足，未開始寫入；原存檔保留。請匯出備份或釋放空間後重試。');
}
