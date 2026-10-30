import http from 'node:http';
import {parseArgs} from 'node:util';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import worker from '../worker/index.js';

// Reuse the built app's exact asset map. No Sites SDK, account or credentials.
export function createLocalServer() {
  return http.createServer(async (req, res) => {
    try {
      const result = await worker.fetch(new Request(
        new URL(req.url, 'http://localhost'), {method: req.method}
      ));
      res.writeHead(result.status, {...Object.fromEntries(result.headers), 'cache-control':'no-store'});
      res.end(req.method === 'HEAD' ? undefined : Buffer.from(await result.arrayBuffer()));
    } catch (error) {
      console.error('本機請求失敗：', error.message);
      if (!res.headersSent) res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
      res.end('本機伺服器發生錯誤，請檢查終端機。');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  let options;
  try {
    options = parseArgs({options:{host:{type:'string',default:'127.0.0.1'},port:{type:'string',default:'4173'},strictPort:{type:'boolean',default:false}}}).values;
  } catch (error) {console.error('啟動參數錯誤：', error.message); process.exit(1);}
  const port = Number(options.port), host = options.host;
  if (!Number.isInteger(port) || port < 1024 || port > 65535 || !['127.0.0.1','0.0.0.0'].includes(host)) {
    console.error('連接埠必須是 1024～65535；host 僅支援 127.0.0.1 或預覽環境的 0.0.0.0。'); process.exit(1);
  }
  const server = createLocalServer();
  server.on('error', error => {
    console.error('無法啟動本機伺服器：', error.message); process.exitCode = 1;
  });
  server.listen(port, host, () => {
    console.log(`Koi Maker 本機開發：http://127.0.0.1:${port}/`);
    console.log('按 Ctrl+C 停止。修改原始碼後請重新建置並重新啟動；不提供自動重載。');
  });
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => {
    server.close(); server.closeAllConnections();
  });
}
