import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {assetPath} from '../scripts/asset-path.mjs';
import {createLocalServer} from '../scripts/serve-local.mjs';

test('local handoff: Windows and POSIX filesystem paths produce the same asset URL', () => {
  assert.equal(assetPath('dist', 'dist/assets/brand/icon-32.png', path.posix), 'assets/brand/icon-32.png');
  assert.equal(assetPath('C:\\Koi Maker\\dist', 'C:\\Koi Maker\\dist\\assets\\brand\\icon-32.png', path.win32), 'assets/brand/icon-32.png');
});

test('local handoff: application source, Logo, HTML and CSS remain byte-identical', async () => {
  const baseline = JSON.parse(await readFile('research/04012-r4/APP-BASELINE.json', 'utf8'));
  for (const [file, sha] of Object.entries(baseline.files))
    assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'), sha, file);
});

test('local handoff: localhost serves exact root, scripts, CSS and nested Logo; HEAD and missing routes behave correctly', {timeout:15000}, async () => {
  const server = createLocalServer();
  await new Promise((resolve, reject) => {server.once('error', reject); server.listen(0, '127.0.0.1', resolve);});
  const base = 'http://127.0.0.1:' + server.address().port;
  try {
    for (const [url, file, mime] of [
      ['/?theme=dark', 'dist/index.html', 'text/html'],
      ['/workspace.js?v=04012-r1-fix1', 'dist/workspace.js', 'text/javascript'],
      ['/player.js', 'dist/player.js', 'text/javascript'],
      ['/app.js', 'dist/app.js', 'text/javascript'],
      ['/style.css', 'dist/style.css', 'text/css'],
      ['/assets/brand/koi-maker-dark.png', 'dist/assets/brand/koi-maker-dark.png', 'image/png']
    ]) {
      const r = await fetch(base + url);
      assert.equal(r.status, 200); assert.ok(r.headers.get('content-type').startsWith(mime));
      assert.equal(r.headers.get('cache-control'), 'no-store');
      assert.deepEqual(Buffer.from(await r.arrayBuffer()), await readFile(file));
    }
    const head = await fetch(base + '/', {method:'HEAD'});
    assert.equal(head.status, 200); assert.equal(await head.text(), '');
    for (const route of ['/missing.png', '/package.json', '/%2e%2e%2fpackage.json'])
      assert.equal((await fetch(base + route)).status, 404);
    assert.equal((await fetch(base + '/', {method:'POST'})).status, 405);
  } finally {
    server.closeAllConnections(); await new Promise(resolve => server.close(resolve));
  }
});
