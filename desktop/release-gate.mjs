import {readFile} from 'node:fs/promises';
const status=JSON.parse(await readFile(new URL('./P0-STATUS.json',import.meta.url)));
if(!status.formalReleaseReady){console.error('尚未達到0.41.0正式發布門檻：\n'+status.pending.join('\n'));process.exit(1)}
