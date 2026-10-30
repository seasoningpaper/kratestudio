import path from 'node:path';

// Filesystem separators are platform-specific; URL paths always use '/'.
export function assetPath(root, file, pathApi = path) {
  return pathApi.relative(root, file).split(pathApi.sep).join('/');
}
