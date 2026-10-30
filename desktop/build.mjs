import {build} from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const repo = path.dirname(root), out = path.join(root, 'out');
const renderer = path.join(out, 'renderer');
await fs.rm(out, {recursive:true, force:true});
await fs.mkdir(out, {recursive:true});
await fs.cp(path.join(repo, 'dist'), renderer, {recursive:true});
const desktopBindings = {
  name:'native-storage', setup(b) {
    // Only entry modules' relative bindings change; the provider's explicit
    // ../../src/storage.mjs import supplies pure Blob/import utilities.
    for (const name of ['storage', 'storage-policy']) b.onResolve(
      {filter:new RegExp('^\\./'+name+'\\.mjs$')}, args => {
        if (!args.importer.startsWith(path.join(repo,'src')+path.sep)) return;
        return {path:path.join(root, 'renderer', name==='storage'?'native-storage.mjs':'storage-policy.mjs')};
      });
    b.onLoad({filter:/[/\\]src[/\\]player\.jsx$/}, async args => ({
      contents:(await fs.readFile(args.path,'utf8')).replace(/\blocalStorage\b/g,'globalThis.KoiDesktop.settings'),
      loader:'jsx'
    }));
    b.onLoad({filter:/[/\\]src[/\\]packaging\.mjs$/}, async args => ({
      // Existing HTML5 exports keep their own browser runtime; never ship a
      // player that requires the editor's privileged preload bridge.
      contents:(await fs.readFile(args.path,'utf8')).replace(
        'await fetch(name)', "await fetch(name==='player.js'?'web-player.js':name)"),
      loader:'js'
    }));
  }
};
for (const entry of ['workspace','player']) await build({
  entryPoints:[path.join(repo,'src',entry+'.jsx')],bundle:true,minify:true,
  format:'iife',outfile:path.join(renderer,entry+'.js'),plugins:[desktopBindings]
});
for (const entry of ['main','preload']) await build({
  entryPoints:[path.join(root,'src',entry+'.ts')],bundle:true,platform:'node',
  format:'cjs',target:'node24',external:['electron','node:sqlite'],
  outfile:path.join(out,entry+'.cjs'),sourcemap:true
});
let app = await fs.readFile(path.join(renderer,'app.js'),'utf8');
app = app.replace(/\blocalStorage\b/g,'globalThis.KoiDesktop.settings');
app = app.replace('5.0 GB 為政策目標；公開測試版一般寫入上限 2.1 GB，實際仍受瀏覽器配額限制。','桌面開發版：5.0 GB 政策目標，實際受磁碟空間與尚未完成的大容量驗收限制。');
app += '\n'+await fs.readFile(path.join(root,'renderer','prepare-close.js'),'utf8');
await fs.writeFile(path.join(renderer,'app.js'),app);
let html = await fs.readFile(path.join(renderer,'index.html'),'utf8');
html = html.replaceAll('0.40.12_r4','0.41.0 開發驗證版')
  .replace('<script src="workspace.js','<script src="desktop-bootstrap.js"></script><script src="workspace.js');
await fs.writeFile(path.join(renderer,'index.html'),html);
await fs.copyFile(path.join(root,'renderer','bootstrap.js'),path.join(renderer,'desktop-bootstrap.js'));
await fs.copyFile(path.join(repo,'dist','player.js'),path.join(renderer,'web-player.js'));
console.log('桌面 Main／Preload／Renderer 建置完成；網頁版 dist 未修改。');
