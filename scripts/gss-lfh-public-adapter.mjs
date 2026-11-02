// Exact Version1 GSS public-source projection. No act is created by this adapter.
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';import {isDeepStrictEqual} from 'node:util';
import {verifyF324Part2Selection,mountPriorF324Part2} from './f324-part2-topics-public-adapter.mjs';
const validatedGSSActs=new WeakMap();
export const batch='EXACT_GSS_LFH_PUBLICATION_R1';const root=fileURLToPath(new URL('../',import.meta.url)),prefix='publication/gss-lfh-v1',dir=path.join(root,prefix),metadataDigest='5437055a1580b444fa6db1b121545ef89be6213314b40dfc889e18a4e2a215ef';
const sha=b=>createHash('sha256').update(b).digest('hex'),need=(x,m)=>{if(!x)throw Error('GSS_PUBLICATION_REFUSED: '+m)},same=(a,b,m)=>need(isDeepStrictEqual(a,b),m),read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const git=(...a)=>execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/').replace(/\/$/,''),'-c','core.longpaths=true','-C',root,...a],{encoding:'utf8'}).trim();
export function verifyGSSSelectionFiles(){
 const raw=fs.readFileSync(path.join(dir,'metadata.json'));need(sha(raw)===metadataDigest,'immutable metadata');const m=JSON.parse(raw);need(m.schema==='exact.gss-lfh-public-selection.v1'&&m.batch===batch,'selection schema');same(m.runtime_assigned_output_fields,gssRuntimeAssignedOutputFields,'exact runtime field contract');
 const rows=read(path.join(dir,'source-files.json'));same(rows.map(x=>x.path).sort(),m.allowed_source_paths,'exact source allowlist');
 for(const r of rows){need(!r.path.startsWith('/')&&!r.path.split('/').includes('..'),'source path');const b=fs.readFileSync(path.join(root,r.path));need(b.length===r.bytes&&sha(b)===r.sha256,'source bytes '+r.path)}
 const profiles={};for(const a of ['SITE','SITE_SUBPATH']){profiles[a]={};for(const k of ['inventory','overlay','baseline']){const p=path.join(dir,a+'-'+k+'.json'),b=fs.readFileSync(p);need(b.length===m.profiles[a][k].bytes&&sha(b)===m.profiles[a][k].sha256,'profile '+a+k);profiles[a][k]=JSON.parse(b)}need(Object.keys(profiles[a].inventory).length===m.profiles[a].paths,'all output paths');}
 return{m,rows,profiles,metadataDigest,source_files_sha256:sha(fs.readFileSync(path.join(dir,'source-files.json')))};
}
// Keep the last *published* baseline distinct from local unpublished checkpoints.
// Every intermediate commit is single-parent, in scope, and bound into the new act.
export function verifyGSSSourceHistory(v=verifyGSSSelectionFiles()){
 const m=v.m,allowed=new Set([...m.allowed_source_paths,prefix+'/source-files.json']);
 same(git('rev-parse',m.public_parent+'^{tree}'),m.public_parent_tree,'fixed published baseline tree');
 need(git('merge-base','--is-ancestor',m.public_parent,'HEAD')==='','published baseline must be an ancestor');
 const lines=git('rev-list','--topo-order','--reverse','--parents',m.public_parent+'..HEAD').split('\n').filter(Boolean);
 need(lines.length>0,'nonempty ordinary publication successor');
 const lineage=[];let previous=m.public_parent;
 for(const line of lines){
  const ids=line.split(' ');need(ids.length===2&&ids[1]===previous,'single-parent linear publication history');
  const commit=ids[0],parent=ids[1],tree=git('rev-parse',commit+'^{tree}');
  const fields=git('diff-tree','--no-commit-id','--no-renames','--raw','-z','-r',parent,commit).split('\0');
  if(fields.at(-1)==='')fields.pop();need(fields.length>0&&fields.length%2===0,'nonempty exact source checkpoint');
  for(let i=0;i<fields.length;i+=2){
   const h=/^:(\d{6}) (\d{6}) ([a-f0-9]{40}) ([a-f0-9]{40}) ([A-Z])$/.exec(fields[i]);
   need(h&&['A','M'].includes(h[5])&&h[2]==='100644'&&['000000','100644'].includes(h[1]),'no deletion, rename, link, special file or mode change in publication history');
   need(allowed.has(fields[i+1]),'out-of-scope intermediate source '+fields[i+1]);
  }
  lineage.push({commit,tree,parent});previous=commit;
 }
 same(previous,git('rev-parse','HEAD'),'complete current publication lineage');
 same(git('diff','--no-renames','--name-only',m.public_parent,'HEAD').split('\n').filter(Boolean).sort(),[...allowed].sort(),'bounded cumulative public source delta');
 return lineage;
}
export function validateGSSAct(act,identity,deployment,today){
 need(act?.schema==='exact.owner-postpublic-update-act.gss-v2'&&act.owner==='Ryotaro Tanaka'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE'&&act.update_kind===batch,'new explicit exact owner authorization');
 const v=verifyGSSSelectionFiles(),m=v.m;need(m.publication_date===today&&/^\d{4}-\d{2}-\d{2}$/.test(today),'assigned actual Tokyo publication date');need(/^[a-f0-9]{64}$/.test(m.owner_instruction_sha256||'')&&/^[a-f0-9]{64}$/.test(m.publication_dispatch_sha256||''),'new owner/dispatch evidence required');
 same([identity.commit,identity.tree],[git('rev-parse','HEAD'),git('rev-parse','HEAD^{tree}')],'actual current public checkout');same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'act exact source commit/tree');same(act.source_lineage,verifyGSSSourceHistory(v),'act exact append-only publication lineage');
 need(git('rev-list','--merges',m.public_parent+'..HEAD')===''&&git('diff','--diff-filter=D','--name-only',m.public_parent,'HEAD')==='','no merge/deletion');same(git('diff','--name-only',m.public_parent,'HEAD').split('\n').filter(Boolean).sort(),[...m.allowed_source_paths,prefix+'/source-files.json'].sort(),'bounded public source delta');
 same([deployment.origin,deployment.public_repository,deployment.base,deployment.deployment_profile],[m.canonical_origin,m.public_repository,'/','ROOT'],'production deployment');
 for(const k of ['public_parent','public_parent_tree','accepted_candidate_commit','accepted_reader_manifest_sha256','owner_instruction_sha256','publication_dispatch_sha256','publication_date'])same(act[k],m[k],'act '+k);
 same([act.metadata_sha256,act.source_files_sha256,act.source_file_count],[metadataDigest,v.source_files_sha256,v.rows.length],'source binding');same(act.output_inventory_sha256,Object.fromEntries(Object.entries(m.profiles).map(([a,x])=>[a,x.inventory.sha256])),'output binding');validatedGSSActs.set(act,Object.freeze({snapshot:Object.freeze({commit:identity.commit,tree:identity.tree,date:today}),metadataDigest:v.metadataDigest,sourceFilesDigest:v.source_files_sha256}));return act;
}
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{need(!e.isSymbolicLink(),'linked output');return e.isDirectory()?walk(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:(need(false,'special output'),[])});
// Pure expected-byte projection for tests and the production comparator.
// Calling this function is NOT owner authorization; runtime output validation
// additionally requires a private WeakMap record made by validateGSSAct.
export const gssRuntimeAssignedOutputFields=Object.freeze([
 'release-state.json:site_commit','release-state.json:site_tree',
 'release-state.json:publication_date','release-state.json:publication_batch',
 'release-state.json:publication_state','release-state.json:gss.publication_date',
]);
export function expectedGSSReleaseStateBytes(preparedBytes,snapshot=null){
 const raw=Buffer.from(preparedBytes);
 if(snapshot===null)return raw;
 same(Object.keys(snapshot).sort(),['commit','date','tree'],'runtime prediction value keys');
 need(/^[a-f0-9]{40}$/.test(snapshot.commit)&&/^[a-f0-9]{40}$/.test(snapshot.tree),'runtime commit/tree values');
 need(/^\d{4}-\d{2}-\d{2}$/.test(snapshot.date)&&new Date(snapshot.date+'T00:00:00Z').toISOString().slice(0,10)===snapshot.date,'runtime calendar date');
 const s=JSON.parse(raw.toString('utf8'));
 need(s.publication_state==='PREPARED_EDITION'&&s.site_commit===null&&s.site_tree===null&&s.publication_date===null&&s.gss?.publication_date===null,'exact prepared edition required');
 s.site_commit=snapshot.commit;s.site_tree=snapshot.tree;s.publication_date=snapshot.date;
 s.publication_batch=batch;s.publication_state='AUTHORIZED_POSTPUBLIC_UPDATE';s.gss.publication_date=snapshot.date;
 return Buffer.from(JSON.stringify(s,null,2)+'\n');
}
export function compareGSSReleaseStateBytes(actualBytes,preparedBytes,snapshot=null){
 const expected=expectedGSSReleaseStateBytes(preparedBytes,snapshot),actual=Buffer.from(actualBytes);
 need(actual.equals(expected),'release-state complete expected bytes and runtime values');
 return {bytes:actual.length,sha256:sha(actual)};
}
function validatedRuntimeSnapshot(act,area,v){
 if(act===null)return null;
 need(area==='SITE','authorized runtime uses production root');
 const proof=validatedGSSActs.get(act);
 need(proof&&proof.metadataDigest===v.metadataDigest&&proof.sourceFilesDigest===v.source_files_sha256,'validated exact GSS owner act required for runtime comparison');
 same(proof.snapshot.date,v.m.publication_date,'runtime date bound to selected metadata');
 return proof.snapshot;
}
function preparedReleaseStateBytes(area,v){
 const row=v.profiles[area].overlay['release-state.json'];need(row,'selected prepared release-state');
 const raw=fs.readFileSync(path.join(root,row.source));
 same({bytes:raw.length,sha256:sha(raw)},v.profiles[area].inventory['release-state.json'],'prepared release-state binding');
 return raw;
}
export function verifyGSSOutput(output,area,v=verifyGSSSelectionFiles(),validatedAct=null){
 const snapshot=validatedRuntimeSnapshot(validatedAct,area,v),actual={};
 for(const p of walk(output)){const n=path.relative(output,p).split(path.sep).join('/'),b=fs.readFileSync(p);actual[n]={bytes:b.length,sha256:sha(b)}}
 same(Object.keys(actual).sort(),Object.keys(v.profiles[area].inventory).sort(),'final output path set');
 for(const n of Object.keys(actual)){
  if(n==='release-state.json')compareGSSReleaseStateBytes(fs.readFileSync(path.join(output,n)),preparedReleaseStateBytes(area,v),snapshot);
  else same(actual[n],v.profiles[area].inventory[n],'final output '+n);
 }
 return actual;
}

export function applyGSSOverlay(output,area,v=verifyGSSSelectionFiles()){
 for(const[n,r]of Object.entries(v.profiles[area].overlay)){const dst=path.resolve(output,n);need(dst.startsWith(path.resolve(output)+path.sep),'output escape');fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(path.join(root,r.source),dst)}return verifyGSSOutput(output,area,v);
}
export async function finishGSS(output,deployment,profile,release){
 const v=verifyGSSSelectionFiles(),m=v.m,area=deployment.base==='/'?'SITE':'SITE_SUBPATH';need((profile==='PUBLIC_RELEASE_QUALIFICATION'&&process.env.EXACT_QUALIFICATION_BATCH===batch)||(profile==='FULL_LAUNCH'&&release?.act?.update_kind===batch&&area==='SITE'),'bounded build profile');
 let runtimeAct=null;if(profile==='FULL_LAUNCH'){const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());runtimeAct=validateGSSAct(release.act,{commit:git('rev-parse','HEAD'),tree:git('rev-parse','HEAD^{tree}')},deployment,today);}
 const prior=verifyF324Part2Selection(m.public_parent);mountPriorF324Part2(output,deployment,prior,area);
 applyGSSOverlay(output,area,v);
 if(runtimeAct){const expected=expectedGSSReleaseStateBytes(preparedReleaseStateBytes(area,v),validatedRuntimeSnapshot(runtimeAct,area,v));fs.writeFileSync(path.join(output,'release-state.json'),expected);}
 verifyGSSOutput(output,area,v,runtimeAct);console.log('PASS_GSS_EXACT_FINAL_MOUNT',area,Object.keys(v.profiles[area].inventory).length);
}
