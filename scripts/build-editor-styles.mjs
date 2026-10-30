import{readFile,writeFile}from'node:fs/promises';import{softflowPalettes,softflowMetrics}from'../src/softflow-theme.mjs';
// One legacy compatibility layer. No change to the exported standalone game CSS.
const marker='/* KOI shared game skins */',end='/* End KOI shared game skins */';
const split=s=>{const a=s.indexOf(marker),b=s.indexOf(end);if(a<0||b<a)throw Error('Shared skin boundaries missing');return[s.slice(0,a),s.slice(b+end.length)]};
const[style,player,skins,fixes,brand]=await Promise.all(['dist/style.css','dist/player.css','src/game-skins.css','dist/editor-fixes.css','dist/brand.css'].map(f=>readFile(f,'utf8')));
const[s0,s1]=split(style),[p0,p1]=split(player);
// Retire visual priorities only. Preserve hidden, pointer, animation and block geometry guards.
const compatibility=[s0,p0,skins,s1,p1,fixes,brand].join('\n').replace(/((?:box-shadow|border-radius|outline(?:-offset)?|background(?:-color)?|border(?:-[a-z]+)?|color)\s*:[^;{}]*?)\s*!important/gi,'$1');
// Retire legacy editor-only typography priorities, while preserving game/preview sizes.
// Pixel sizes in these controls share the existing persisted text-scale preference.
const editorType=/\.(?:app-header|main-tools|modes|tree|chapter-row|panel-head|event-|editor-|prop-|field|preferences|tools-|asset-|capacity|image-edit|image-document|screen-tools|screen-inspector|screen-options|template-command-bar|template-notice|opening-|home-settings|blocks-|block-fields|block-actions|palette-block|code-|placement-details|game-designer)|#(?:toolNav|projectTitle|search|closeProperties|workTab)/;
const previewType=/koi-player|game-stage|designer-canvas|system-canvas|screen-preview|database-preview|vn-dialogue|title-content|title-menu/;
const legacy=compatibility.replace(/([^{}]+)\{([^{}]*)\}/g,(rule,selector,declarations)=>{
 if(/\.template-body \.screen-editor-layout/.test(selector))declarations=declarations.replace(/\s*!important/g,'');
 if(!editorType.test(selector)||previewType.test(selector))return selector+'{'+declarations+'}';
 const type=declarations.replace(/((?:font-size|font)\s*:[^;{}]*?)\s*!important/g,'$1').replace(/(font-size\s*:)\s*(\d+(?:\.\d+)?)px/g,'$1calc($2px * var(--ui-text-scale,1))').replace(/(font\s*:)\s*(\d+(?:\.\d+)?)px/g,'$1calc($2px * var(--ui-text-scale,1))');
 return selector+'{'+type+'}';
});
await writeFile('dist/editor-base.css','/* Generated compatibility layer; shared skin emitted once. */\n@layer legacy{\n'+legacy+'\n}\n');
const tokens={...softflowPalettes.blue,...softflowMetrics};await writeFile('dist/softflow.css','/* Generated from src/softflow-theme.mjs + src/design-system.css */\n:root{'+Object.entries(tokens).map(([k,v])=>'--sf-'+k+':'+v).join(';')+'}\n'+await readFile('src/design-system.css','utf8'));
console.log('Editor styles: one legacy layer and one semantic component source.');
