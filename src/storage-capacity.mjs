import {audioRole} from './asset-selection.mjs';
import {ASSET_COLLECTIONS} from './storage-policy.mjs';

export const CAPACITY_CATEGORIES = [
  ['character', '角色立繪', '#52758f'], ['background', '背景', '#6387a2'],
  ['image', 'CG／一般圖片', '#7598af'], ['music', '音樂', '#8da6b7'],
  ['sound', '音效', '#486b85'], ['voice', '語音', '#9aafbd'],
  ['video', '影片', '#668097'], ['other', '專案資料及其他', '#b0bec9']
].map(([id, label, color]) => ({id, label, color}));

// One entry per stored asset row. Repeated event references are not extra files;
// distinct asset IDs are distinct rows even when filenames/content happen to match.
export function capacityBreakdown(project, metadataBytes, rows) {
  const categories = CAPACITY_CATEGORIES.map(c => ({...c, bytes: 0, assets: 0}));
  const byCategory = new Map(categories.map(c => [c.id, c]));
  byCategory.get('other').bytes = metadataBytes;
  const seen = new Set();
  for (const {collection, asset, bytes, key} of rows) {
    if (!ASSET_COLLECTIONS.includes(collection) || !Number.isSafeInteger(bytes) || bytes < 0)
      throw Error('素材容量資料無效');
    if (seen.has(key)) throw Error('素材儲存鍵重複：' + key);
    seen.add(key);
    const id = collection === 'videos' ? 'video' : collection === 'audio' ? audioRole(project, asset)
      : collection === 'images' ? (asset.kind === 'character' ? 'character'
        : asset.kind === 'background' || !asset.kind ? 'background' : ['cg', 'image'].includes(asset.kind) ? 'image' : 'other') : 'other';
    const category = byCategory.get(id) || byCategory.get('other');
    category.bytes += bytes; category.assets++;
  }
  return {bytes: categories.reduce((n, c) => n + c.bytes, 0), metadataBytes, categories};
}
