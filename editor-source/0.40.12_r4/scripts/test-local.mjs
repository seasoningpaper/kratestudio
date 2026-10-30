import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const all = process.argv.slice(2);
if (all.length && (all.length !== 1 || all[0] !== '--all')) {
  console.error('用法：npm test 或 npm run test:all'); process.exit(1);
}
// No Git-history dependency, ffprobe or multi-GB fixtures in the local smoke suite.
const files = all.length ? readdirSync(new URL('../tests/', import.meta.url))
  .filter(f => f.endsWith('.test.mjs')).sort() : [
  '04012-r3-public-safety.test.mjs', '04012-r3-backup-entry.test.mjs', '04012-r3-storage.test.mjs', '04012-r4-capacity.test.mjs', '04012-r4-release.test.mjs', '04012-r4-blocks.test.mjs', '04012-r4-player.test.mjs', '04012-r4-debug.test.mjs', '04012-r4-storage.test.mjs', '04012-r4-directory.test.mjs', '04012-r2-palette.test.mjs', '04012-r2-editor.test.mjs', '04012-r3-layout.test.mjs', '04012-r2-player.test.mjs', 'local-development.test.mjs', 'engine.test.mjs', 'p0d-dom.test.mjs',
  '04012-control.test.mjs', '04012-role.test.mjs', '04012-operators.test.mjs',
  '04012-stack-stability.test.mjs', 'import-package.test.mjs'
];
if (all.length) console.error('完整歷史測試包含多 GB 配置、Git 歷史與舊版本斷言；不是本機安裝驗收，詳 WINDOWS-SETUP.md。');
const result = spawnSync(process.execPath,
  ['--test', '--test-concurrency=1', '--test-timeout=20000', ...files.map(f => 'tests/' + f)],
  {cwd: root, stdio: 'inherit', timeout: all.length ? 300000 : 120000});
if (result.error) console.error('測試未完成：', result.error.message);
process.exit(result.status ?? 1);
