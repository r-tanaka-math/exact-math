// Final screen-CSS successor. Existing mathematical selections and gates remain in force.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {verifyResearchRelatedWorkSelection,assertPublicText} from './research-related-work-public-adapter.mjs';
import {gitIdentity} from './deployment-identity.mjs';
export const batch='EXACT_LFH_INLINE_MATH_BASELINE_PUBLICATION_R1';
const root=fileURLToPath(new URL('../',import.meta.url)),prefix='publication/lfh-inline-baseline-r1',dir=path.join(root,prefix);
const metadataDigest='04ac91e20f565a0c3ada786eb0ef429fbcf758970295b144c665b5f0aaed6acc',oldCommit='06a33866e488348da7424fd8fcc45722d14b42d5',oldTree='8fb1ee48154f9bcb2ec34153688182f6d3799dfe';
const css='mathlibannex/assets/lfh188.css',pages=['research/naimark-problem/index.html','research/sphere-rigidity/index.html'];
const sourcePaths=['astro.config.mjs','scripts/postpublic-gate.mjs','scripts/research-related-work-public-adapter.mjs','scripts/lfh-inline-baseline-public-adapter.mjs',prefix+'/.gitattributes',prefix+'/metadata.json',prefix+'/selected/'+css,...['SITE','SITE_SUBPATH'].flatMap(a=>[prefix+'/'+a+'-inventory.json',prefix+'/'+a+'-baseline-state.json'])].sort();
const sha=b=>createHash('sha256').update(b).digest('hex'),read=p=>JSON.parse(fs.readFileSync(p));
const need=(v,m)=>{if(!v)throw Error('LFH_INLINE_BASELINE_REFUSED: '+m)},same=(a,b,m)=>need(isDeepStrictEqual(a,b),m);
const git=(...a)=>execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/').replace(/\/$/,''),'-c','core.longpaths=true','-C',root,...a],{encoding:'utf8'}).trim();
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{need(!e.isSymbolicLink(),'linked output');return e.isDirectory()?files(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:(need(false,'special output'),[])});
export function validateSourceRows(rows,changed){
 same(rows.map(r=>r.path).sort(),sourcePaths,'exact source manifest');same(changed.slice().sort(),[...sourcePaths,prefix+'/source-files.json'].sort(),'bounded changed source paths');
 for(const r of rows)need(Number.isSafeInteger(r.bytes)&&r.bytes>0&&/^[0-9a-f]{64}$/.test(r.sha256),'source row');
}
export function verifyLFHInlineBaselineSelection(){
 const raw=fs.readFileSync(path.join(dir,'metadata.json'));need(sha(raw)===metadataDigest,'immutable metadata');const m=JSON.parse(raw);
 need(m.batch===batch&&m.schema==='exact.lfh-inline-baseline-selection.v1','new batch identity');same([m.old_commit,m.old_tree],[oldCommit,oldTree],'published baseline');
 need(git('merge-base','--is-ancestor',oldCommit,'HEAD')==='','ordinary public successor');need(git('rev-parse',oldCommit+'^{tree}')===oldTree&&git('rev-parse','HEAD')!==oldCommit,'baseline tree/current successor');
 need(git('rev-list','--merges',oldCommit+'..HEAD')==='','no private history merge');need(git('diff','--diff-filter=D','--name-only',oldCommit,'HEAD')==='','no deletion');
 const source=fs.readFileSync(path.join(dir,'source-files.json')),rows=JSON.parse(source);validateSourceRows(rows,git('diff','--name-only',oldCommit,'HEAD').split('\n').filter(Boolean));
 for(const r of rows){const b=fs.readFileSync(path.join(root,r.path));need(b.length===r.bytes&&sha(b)===r.sha256,'source bytes '+r.path);assertPublicText(b.toString());}
 need(git('diff','--name-only',oldCommit,'HEAD','--','.github','src','public','assets','package.json','package-lock.json','.node-version','publication/research-related-work-r1','publication/lfh188-fix4','publication/content-terms-public-effective.md')==='','historical selection/workflow/terms/source unchanged');
 const inherited=verifyResearchRelatedWorkSelection(oldCommit);
 const bytes=fs.readFileSync(path.join(dir,'selected',css));need(bytes.length===m.css_after.bytes&&sha(bytes)===m.css_after.sha256,'accepted CSS exact');
 need(m.css_after.sha256==='6ac2463cfdcb5d008e27e4234fd8ee78bd46fa8da3ff868affc57ceb646e5be4'&&m.css_before.sha256==='1eaa564e951167fb3023c0291debe85ade21185c81ede0bdc71fab5ca062a0ac'&&m.screen_only===true,'fixed screen repair');
 const inventories={},baselines={};
 for(const area of ['SITE','SITE_SUBPATH']){const info=m.profiles[area],i=fs.readFileSync(path.join(dir,area+'-inventory.json')),b=fs.readFileSync(path.join(dir,area+'-baseline-state.json'));need(sha(i)===info.inventory_sha256&&sha(b)===info.baseline_state_sha256,'accepted output/state binding');inventories[area]=JSON.parse(i);baselines[area]=JSON.parse(b);need(Object.keys(inventories[area]).length===info.file_count,'path count');need(baselines[area].site_commit===oldCommit&&baselines[area].site_tree===oldTree&&baselines[area].publication_batch==='EXACT_RESEARCH_RELATED_WORK_PUBLICATION_R1','prior actual publication');}
 return {m,inherited,inventories,baselines,rows,source_files_sha256:sha(source)};
}
export function validateLFHInlineBaselineAct(act,identity,deployment,today){
 need(act?.schema==='exact.owner-postpublic-update-act.v10'&&act.owner==='Ryotaro Tanaka'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE'&&act.update_kind===batch,'current explicit exact owner act');
 const v=verifyLFHInlineBaselineSelection(),m=v.m;
 same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'exact current commit/tree');same([identity.commit,identity.tree],[git('rev-parse','HEAD'),git('rev-parse','HEAD^{tree}')],'actual checkout');
 same([deployment.origin,deployment.public_repository,deployment.base,deployment.deployment_profile],[m.canonical_origin,m.public_repository,'/','ROOT'],'root production identity');same([act.base,act.deployment_profile],['/','ROOT'],'act root');
 need(/^\d{4}-\d{2}-\d{2}$/.test(today)&&act.update_date_asia_tokyo===today&&m.publication_date===today,'actual Asia/Tokyo publication date');
 for(const k of ['old_commit','old_tree','canonical_origin','public_repository','public_repository_id','accepted_candidate_commit','accepted_candidate_subtree','hp_acceptance_sha256','owner_instruction_sha256','dispatch_sha256','screen_only'])same(act[k],m[k],'exact authority '+k);
 same([act.metadata_sha256,act.source_files_sha256,act.source_file_count],[metadataDigest,v.source_files_sha256,v.rows.length],'exact source selection');same(act.css_before,m.css_before,'before CSS');same(act.css_after,m.css_after,'accepted CSS');same(act.output_inventory_sha256,Object.fromEntries(Object.entries(m.profiles).map(([a,x])=>[a,x.inventory_sha256])),'output inventories');
 return act;
}
export function compareOutputRows(actual,expected,cssBefore=null){
 same(Object.keys(actual).sort(),Object.keys(expected).sort(),'all served paths');
 for(const [rel,row] of Object.entries(expected))if(rel!=='release-state.json')same(actual[rel],cssBefore&&rel===css?{bytes:cssBefore.bytes,sha256:cssBefore.sha256}:{bytes:row.bytes,sha256:row.sha256},'served bytes '+rel);
}
function inventory(output){const rows={};for(const p of files(output)){const rel=path.relative(output,p).split(path.sep).join('/'),b=fs.readFileSync(p);rows[rel]={bytes:b.length,sha256:sha(b)};if(/\.(?:html|json|css|js|txt|bib|xml)$/.test(rel))assertPublicText(b.toString());}return rows;}
export function finishLFHInlineBaseline(output,deployment,profile,release){
 const v=verifyLFHInlineBaselineSelection(),m=v.m,identity=gitIdentity(profile),area=deployment.base==='/'?'SITE':'SITE_SUBPATH';
 same([deployment.origin,deployment.public_repository],[m.canonical_origin,m.public_repository],'deployment');same([deployment.base,deployment.deployment_profile],area==='SITE'?['/','ROOT']:['/exact-mathematics/','SUBPATH'],'profile');
 need((profile==='PUBLIC_RELEASE_QUALIFICATION'&&process.env.EXACT_QUALIFICATION_BATCH===batch)||(profile==='FULL_LAUNCH'&&area==='SITE'&&release?.act?.update_kind===batch),'bounded public profile');
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());need(m.publication_date===today,'publication date');
 // Mount the exact historical Research HTML after LFH188. Its old owner act is never reused.
 for(const rel of pages)fs.copyFileSync(path.join(root,'publication/research-related-work-r1',area,rel),path.join(output,rel));
 compareOutputRows(inventory(output),v.inventories[area],m.css_before);
 fs.copyFileSync(path.join(dir,'selected',css),path.join(output,css));
 const state=structuredClone(v.baselines[area]);Object.assign(state,{schema:'exact.site-release-state.v12',publication_batch:batch,site_commit:identity.commit,site_tree:identity.tree,public_parent_commit:oldCommit,publication_date:today,publication_state:release?'AUTHORIZED_POSTPUBLIC_UPDATE':'LOCAL_INDEXABLE_QUALIFICATION',profile,indexing:release?'PUBLIC_INDEXABLE':'LOCAL_INDEXABLE_QUALIFICATION'});
 state.lfh_inline_math_baseline={schema:'exact.lfh-inline-math-baseline-update.v1',accepted_candidate_commit:m.accepted_candidate_commit,accepted_candidate_subtree:m.accepted_candidate_subtree,css_before_sha256:m.css_before.sha256,css_sha256:m.css_after.sha256,screen_only:true,hp_acceptance_sha256:m.hp_acceptance_sha256,owner_instruction_sha256:m.owner_instruction_sha256,dispatch_sha256:m.dispatch_sha256,owner_publication_authorized:true};
 fs.writeFileSync(path.join(output,'release-state.json'),JSON.stringify(state,null,2)+'\n');compareOutputRows(inventory(output),v.inventories[area]);console.log('PASS_LFH_INLINE_BASELINE_FINAL_MOUNT',area,Object.keys(v.inventories[area]).length);
}
