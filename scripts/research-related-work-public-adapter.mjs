// Final, bounded mount for the accepted two-page Research update.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {verifyLFH188Selection} from './lfh188-public-adapter.mjs';
import {gitIdentity} from './deployment-identity.mjs';
export const batch='EXACT_RESEARCH_RELATED_WORK_PUBLICATION_R1';
const root=fileURLToPath(new URL('../',import.meta.url));
const prefix='publication/research-related-work-r1',dir=path.join(root,prefix);
const metadataDigest='8577b6b1b317d6b35d44b08a271e546d15a2bfe354162fdc72dbfb9c77da04ea';
const sha=b=>createHash('sha256').update(b).digest('hex');
const need=(v,m)=>{if(!v)throw Error('RESEARCH_RELATED_WORK_REFUSED: '+m)};
const same=(a,b,m)=>need(isDeepStrictEqual(a,b),m);
const read=p=>JSON.parse(fs.readFileSync(p));
const git=(...a)=>execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/').replace(/\/$/,''),'-c','core.longpaths=true','-C',root,...a],{encoding:'utf8'}).trim();
const pages=['research/naimark-problem/index.html','research/sphere-rigidity/index.html'];
const sourcePaths=['astro.config.mjs','scripts/postpublic-gate.mjs','scripts/research-related-work-public-adapter.mjs',prefix+'/metadata.json',...['SITE','SITE_SUBPATH'].flatMap(a=>[prefix+'/'+a+'-inventory.json',prefix+'/'+a+'-baseline-state.json',...pages.map(p=>prefix+'/'+a+'/'+p)])].sort();
const safe=p=>{need(typeof p==='string'&&!p.includes('\\')&&!p.startsWith('/')&&p.split('/').every(x=>/^[a-zA-Z0-9_.\[\]-]+$/.test(x)&&x!=='.'&&x!=='..'),'unsafe path');return p};
function files(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{need(!e.isSymbolicLink(),'linked file');return e.isDirectory()?files(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:(need(false,'special file'),[])});}
export function assertPublicText(text){need(!/github\.com\/r-tanaka-math\/(?:lfh-cards|semantic-bridge|exact-math-private)|[A-Za-z]:[\\/](?:Users|ExactMathematics|EXACT_MAIN)|review\.md|github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----/.test(text),'private path or secret disclosure');}
export function validateSourceRows(rows,changed){
 same(rows.map(r=>safe(r.path)).sort(),sourcePaths,'bounded source manifest');
 same(changed.slice().sort(),[...sourcePaths,prefix+'/source-files.json'].sort(),'exact source allowlist');
 for(const r of rows)need(Number.isSafeInteger(r.bytes)&&r.bytes>0&&/^[0-9a-f]{64}$/.test(r.sha256),'source row');
}
function verifySource(sourceCommit='HEAD'){
 need(sourceCommit==='HEAD'||(sourceCommit==='06a33866e488348da7424fd8fcc45722d14b42d5'&&git('rev-parse',sourceCommit+'^{tree}')==='8fb1ee48154f9bcb2ec34153688182f6d3799dfe'),'fixed historical publication only');
 const rows=read(path.join(dir,'source-files.json'));
 const m=read(path.join(dir,'metadata.json'));
 need(git('merge-base','--is-ancestor',m.old_commit,sourceCommit)==='','ordinary public descendant');
 need(git('rev-parse',m.old_commit+'^{tree}')===m.old_tree&&git('rev-parse',sourceCommit)!==m.old_commit,'public baseline tree');
 need(git('rev-list','--merges',m.old_commit+'..'+sourceCommit)==='','no private history merge');
 need(git('diff','--diff-filter=D','--name-only',m.old_commit,sourceCommit)==='','no deletions');
 const changed=git('diff','--name-only',m.old_commit,sourceCommit).split('\n').filter(Boolean);
 validateSourceRows(rows,changed);
 for(const r of rows){const b=sourceCommit==='HEAD'?fs.readFileSync(path.join(root,r.path)):execFileSync('git',['-C',root,'show',sourceCommit+':'+r.path]);need(b.length===r.bytes&&sha(b)===r.sha256,'exact source bytes '+r.path);assertPublicText(b.toString());}
 need(git('diff','--name-only',m.old_commit,sourceCommit,'--','.github','public','src','package.json','package-lock.json','.node-version','publication/lfh188-fix4','publication/content-terms-public-effective.md')==='','protected source unchanged');
 return {rows,source_files_sha256:sha(fs.readFileSync(path.join(dir,'source-files.json')))};
}
export function verifyResearchRelatedWorkSelection(sourceCommit='HEAD'){
 verifyLFH188Selection();
 const raw=fs.readFileSync(path.join(dir,'metadata.json'));need(sha(raw)===metadataDigest,'immutable publication metadata');
 const m=JSON.parse(raw);need(m.batch===batch&&m.schema==='exact.research-related-work-selection.v1','selection identity');
 const inventories={},baselines={};
 for(const area of ['SITE','SITE_SUBPATH']){
  const info=m.profiles[area],inv=fs.readFileSync(path.join(dir,area+'-inventory.json')),base=fs.readFileSync(path.join(dir,area+'-baseline-state.json'));
  need(sha(inv)===info.inventory_sha256&&sha(base)===info.baseline_state_sha256,'accepted output binding');
  inventories[area]=JSON.parse(inv);baselines[area]=JSON.parse(base);
  need(Object.keys(inventories[area]).length===info.file_count,'output count');
  for(const rel of pages){const b=fs.readFileSync(path.join(dir,area,rel)),row=info.html[rel];need(b.length===row.bytes&&sha(b)===row.sha256,'accepted page '+area+'/'+rel);assertPublicText(b.toString());}
 }
 return {m,inventories,baselines,...verifySource(sourceCommit)};
}
export function validateResearchRelatedWorkAct(act,identity,deployment,today){
 need(act?.schema==='exact.owner-postpublic-update-act.v9'&&act.owner==='Ryotaro Tanaka'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE'&&act.update_kind===batch,'explicit current exact owner act');
 const v=verifyResearchRelatedWorkSelection(),m=v.m;
 same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'exact successor commit/tree');
 same([identity.commit,identity.tree],[git('rev-parse','HEAD'),git('rev-parse','HEAD^{tree}')],'actual checkout identity');
 same([deployment.origin,deployment.public_repository,deployment.base,deployment.deployment_profile],[m.canonical_origin,m.public_repository,'/','ROOT'],'root deployment');
 same([act.base,act.deployment_profile],['/','ROOT'],'act root');
 need(/^\d{4}-\d{2}-\d{2}$/.test(today)&&today>='2026-10-08'&&act.update_date_asia_tokyo===today&&m.publication_date===today,'actual Asia/Tokyo publication date');
 for(const key of ['old_commit','old_tree','canonical_origin','public_repository','public_repository_id','accepted_candidate_commit','accepted_candidate_subtree','hp_acceptance_sha256','owner_message_sha256','patch_plan_sha256','consulted_date','external_source_commit','dispatch_sha256'])same(act[key],m[key],'exact authority '+key);
 same([act.metadata_sha256,act.source_files_sha256,act.source_file_count],[metadataDigest,v.source_files_sha256,v.rows.length],'final source binding');
 same(act.output_inventory_sha256,Object.fromEntries(Object.entries(m.profiles).map(([a,x])=>[a,x.inventory_sha256])),'final output inventory binding');
 same(act.approved_html,Object.fromEntries(Object.entries(m.profiles).map(([a,x])=>[a,x.html])),'four accepted HTML bindings');
 return act;
}
export function compareOutputRows(actual,expected){
 same(Object.keys(actual).sort(),Object.keys(expected).sort(),'exact output paths');
 for(const [rel,row] of Object.entries(expected))if(rel!=='release-state.json')same(actual[rel],{bytes:row.bytes,sha256:row.sha256},'unchanged accepted output '+rel);
}
export function finishResearchRelatedWork(output,deployment,profile,release){
 const v=verifyResearchRelatedWorkSelection(),m=v.m,identity=gitIdentity(profile);
 const area=deployment.base==='/'?'SITE':'SITE_SUBPATH';
 same([deployment.origin,deployment.public_repository],[m.canonical_origin,m.public_repository],'output deployment');
 same([deployment.base,deployment.deployment_profile],area==='SITE'?['/','ROOT']:['/exact-mathematics/','SUBPATH'],'accepted profile');
 need(profile==='PUBLIC_RELEASE_QUALIFICATION'||(profile==='FULL_LAUNCH'&&area==='SITE'&&release?.act?.update_kind===batch),'bounded build profile');
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 need(m.publication_date===today,'actual publication date');
 for(const rel of pages)fs.copyFileSync(path.join(dir,area,rel),path.join(output,rel));
 const state=structuredClone(v.baselines[area]);
 Object.assign(state,{schema:'exact.site-release-state.v11',publication_batch:batch,site_commit:identity.commit,site_tree:identity.tree,public_parent_commit:m.old_commit,publication_date:today,publication_state:release?'AUTHORIZED_POSTPUBLIC_UPDATE':'LOCAL_INDEXABLE_QUALIFICATION',profile,indexing:release?'PUBLIC_INDEXABLE':'LOCAL_INDEXABLE_QUALIFICATION'});
 state.research_related_work={schema:'exact.research-related-work-update.v1',accepted_candidate_commit:m.accepted_candidate_commit,accepted_candidate_subtree:m.accepted_candidate_subtree,hp_acceptance_sha256:m.hp_acceptance_sha256,owner_message_sha256:m.owner_message_sha256,patch_plan_sha256:m.patch_plan_sha256,consulted_date:m.consulted_date,external_source_commit:m.external_source_commit,page_sha256:Object.fromEntries(pages.map(p=>[p,m.profiles[area].html[p].sha256])),owner_publication_authorized:true};
 fs.writeFileSync(path.join(output,'release-state.json'),JSON.stringify(state,null,2)+'\n');
 const actual={};
 for(const p of files(output)){const rel=path.relative(output,p).split(path.sep).join('/'),b=fs.readFileSync(p);actual[rel]={bytes:b.length,sha256:sha(b)};if(/\.(?:html|json|css|js|txt|bib|xml)$/.test(rel))assertPublicText(b.toString());}
 compareOutputRows(actual,v.inventories[area]);
 console.log('PASS_RESEARCH_RELATED_WORK_FINAL_MOUNT',area,Object.keys(actual).length);
}
