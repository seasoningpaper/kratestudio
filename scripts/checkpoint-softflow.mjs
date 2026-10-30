import{execFileSync}from'node:child_process';import{createHash}from'node:crypto';import{readFile,writeFile,mkdir}from'node:fs/promises';import{resolve}from'node:path';
const stage=process.argv[2];if(!/^[A-Z][0-9](?:-[a-z0-9]+)?$/.test(stage||''))throw Error('請指定工作包代碼，如 H1 或 H8-final');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',timeout:60000}).trim();
if(git('status','--porcelain'))throw Error('請先提交所有修改，再建立可還原備份。');
const head=git('rev-parse','HEAD'),dir=resolve('..','r2-deliveries'),name='Koi-Maker-0.41.0-r2-'+stage+'-'+head.slice(0,7);await mkdir(dir,{recursive:true});
const zip=resolve(dir,name+'-source.zip'),bundle=resolve(dir,name+'.bundle');git('archive','--format=zip','--prefix=Koi-Maker-0.41.0-r2/','--output='+zip,'HEAD');git('bundle','create',bundle,'feature/softflow-0.41.0-r2','main');git('bundle','verify',bundle);
const files=[];for(const path of[zip,bundle]){const b=await readFile(path);files.push({path,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')})}
const record={stage,head,branch:git('branch','--show-current'),base:'5f4a6ac29cbfe0be0e498ee256a9af8a7bc993a0',reconstructed:true,files};await writeFile(resolve(dir,name+'.json'),JSON.stringify(record,null,2));console.log(JSON.stringify(record));
