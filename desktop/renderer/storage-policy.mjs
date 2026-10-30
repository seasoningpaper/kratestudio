// Preserve the web export/import memory gates, independent of native disk quota.
export * from '../../src/storage-policy.mjs';
export const WRITE_LIMIT = 5000000000;
export const projectWriteLimit = () => WRITE_LIMIT;
export const isLargeProject = () => false;
export function assertWritableProjectSize(bytes) {
    if (!Number.isSafeInteger(bytes) || bytes < 0 || bytes > WRITE_LIMIT)
        throw Error('原生專案容量無效或超過 5 GB 政策界線');
}
