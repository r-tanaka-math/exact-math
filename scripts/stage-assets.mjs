import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {reports,requireAllowed,files,digest,auditOutput} from './distribution-policy.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),pub=path.join(root,'public'),dst=path.join(pub,'reports');
if(fs.existsSync(dst)&&fs.lstatSync(dst).isSymbolicLink())throw Error('Linked staging path');
if(path.resolve(dst)!==path.join(path.resolve(root),'public','reports'))throw Error('Staging boundary');
fs.rmSync(dst,{recursive:true,force:true});
const registry=JSON.parse(fs.readFileSync(path.join(root,'src/data/assets.json'),'utf8'));
if(registry.publication_authorized!==false||registry.public_release_date!==null)throw Error('Unexpected local release state');
const project=JSON.parse(fs.readFileSync(path.join(root,'src/content/projects/sr.json'),'utf8'));
for(const a of registry.assets){requireAllowed(a);const row=project.artifacts.find(r=>r.id===a.artifact_id);for(const k of ['url','bytes','sha256','mime','version','prepared_date','pages'])if(row?.[k]!==a[k])throw Error('Project/registry mismatch '+k);
 if(!/^reports\/[a-z0-9./-]+\.pdf$/.test(a.logical_path)||a.logical_path.split('/').includes('..'))throw Error('Unsafe asset');
 const b=fs.readFileSync(path.join(root,'assets',a.logical_path));if(b.length!==a.bytes||digest(b)!==a.sha256)throw Error('Changed selected PDF');const target=path.join(pub,a.logical_path);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,b);}
if(registry.assets.length!==reports.length)throw Error('Selection count');auditOutput(pub,{staging:true});console.log('PASS_RC4_SELECTED_PDF_STAGING');
