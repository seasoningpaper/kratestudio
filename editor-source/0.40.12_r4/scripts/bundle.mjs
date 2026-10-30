import{build}from'esbuild';
const requested=process.argv.slice(2);if(requested.some(entry=>!['workspace','player'].includes(entry)))throw Error('Unknown bundle entry');
for(const entry of (requested.length?requested:['workspace','player']))await build({entryPoints:['src/'+entry+'.jsx'],bundle:true,minify:true,format:'iife',outfile:'dist/'+entry+'.js'});
