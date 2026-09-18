import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
export const digest=b=>createHash('sha256').update(b).digest('hex');
export const reports=JSON.parse(fs.readFileSync(new URL('../publication/pdf-selection.json',import.meta.url),'utf8')).files;
export const report=reports[0];
export const siteIconSha256=Object.freeze({
  'favicon.svg':'1fbc7254544958acbb695f8b6d163536fcfec38d78d26bcf7db4416fa8aa2c0b',
  'favicon.ico':'a3a9b1fd0f2fdb8f6fefce9ecf92805a2cac97663b8e618d421a1229dafbf5a8',
  'favicon-16x16.png':'259a753fb3a8dc7204d3ddca57a5959e49f8da66e14c341317ad2f5289ad56f7',
  'favicon-32x32.png':'a7aa4f61742f48455796379550d660c3b1096511d5dab2639dc0431d3833ef52',
  'apple-touch-icon.png':'71f40e5d93b177585740069587d38edd6601020122613d15ce22ffe52169077e'
});
export const siteIconFiles=new Set(Object.keys(siteIconSha256));
export function requireAllowed(asset){const r=reports.find(r=>r.artifact_id===asset.artifact_id);if(!r)throw Error('Unselected PDF');for(const k of ['project_id','artifact_id','logical_path','bytes','sha256','mime','version','prepared_date','pages'])if(asset[k]!==r[k])throw Error('PDF selection mismatch '+k)}
export function files(root){let r=[];if(!fs.existsSync(root))return r;if(fs.lstatSync(root).isSymbolicLink())throw Error('Linked root');for(const x of fs.readdirSync(root,{withFileTypes:true})){const p=path.join(root,x.name);if(x.isSymbolicLink())throw Error('Linked file');if(x.isDirectory())r.push(...files(p));else if(x.isFile())r.push(p);else throw Error('Special file')}return r}
export function auditOutput(root,{staging=false}={}){let pdfs=0;for(const file of files(root)){const rel=path.relative(root,file).split(path.sep).join('/'),b=fs.readFileSync(file),r=reports.find(r=>r.logical_path===rel);if(siteIconFiles.has(rel)){if(digest(b)!==siteIconSha256[rel])throw Error('Favicon identity '+rel);continue}if(r){if(b.length!==r.bytes||digest(b)!==r.sha256)throw Error('PDF identity');pdfs++;continue}
 const allowed=staging?['robots.txt','research/sphere-rigidity/citation.json'].includes(rel):/^(?:index\.html|404\.html|(?:research|research\/(?:sr|sphere-rigidity)|about|verification|mathlibannex|mathlibannex\/releases\/v0\.[12]\.0|mathlibannex\/projects\/(?:sphere-rigidity|mankiewicz)|corrections|licensing)\/index\.html|corrections\/(?:received|demo)\/index\.html|research\/sphere-rigidity\/citation\.json|release-state\.json|licensing\/boundary\.json|robots\.txt|_astro\/[a-zA-Z0-9_.-]+\.(?:js|css))$/.test(rel);
 if(!allowed)throw Error('Unselected distribution file: '+rel);
 if(b.subarray(0,2).toString()==='PK'||/BEGIN .*PRIVATE KEY|\\documentclass|sourceMappingURL/.test(b.toString()))throw Error('Unexpected source or private content');}
 if(pdfs!==reports.length)throw Error('Selected PDFs absent');return {files:files(root).length,pdfs}}
