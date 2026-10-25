// Bounded Brouwer Version 1 successor. Prior mathematical selections remain pinned.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {verifyFPPSelection,mountPriorTingley} from './fpp-topics-public-adapter.mjs';
import {compareOutputRows} from './lfh-inline-baseline-public-adapter.mjs';
import {assertPublicText} from './research-related-work-public-adapter.mjs';
import {gitIdentity} from './deployment-identity.mjs';
export const batch='EXACT_BROUWER_TOPICS_PUBLICATION_R1';
const root=fileURLToPath(new URL('../',import.meta.url)),prefix='publication/brouwer-topics-v1',dir=path.join(root,prefix);
const metadataDigest='2f57114f230306d830ecf0144b3071940a429246d85ae0b7f0a5e8a0fb0192a6',oldCommit='3f4cb2c3e0ef4abd8f58db3efd58d20c498c0aff',oldTree='2846a8aeeab605e6632519d4667c4034bcbeaae3';
const pages=['index.html','topics/index.html','topics/brouwer-commuting-operators/index.html'],pdf='topics/brouwer-commuting-operators/brouwer-commuting-operators-v1.pdf';
const priorPages=['topics/index.html','topics/tingley-chord-argument/index.html'],css='mathlibannex/assets/lfh188.css';
const sourcePaths=['astro.config.mjs','scripts/postpublic-gate.mjs','scripts/fpp-topics-public-adapter.mjs','scripts/brouwer-topics-public-adapter.mjs',prefix+'/.gitattributes',prefix+'/metadata.json',prefix+'/selected/brouwer-commuting-operators-v1.pdf',...['SITE','SITE_SUBPATH'].flatMap(a=>[prefix+'/'+a+'-inventory.json',prefix+'/'+a+'-baseline-state.json',...pages.map(p=>prefix+'/'+a+'/'+p)])].sort();
const sha=b=>createHash('sha256').update(b).digest('hex');
const need=(v,m)=>{if(!v)throw Error('Brouwer_PUBLICATION_REFUSED: '+m)},same=(a,b,m)=>need(isDeepStrictEqual(a,b),m);
const git=(...a)=>execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/').replace(/\/$/,''),'-c','core.longpaths=true','-C',root,...a],{encoding:'utf8'}).trim();
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{need(!e.isSymbolicLink(),'linked output');return e.isDirectory()?files(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:(need(false,'special output'),[])});
export function validateSourceRows(rows,changed){
 same(rows.map(r=>r.path).sort(),sourcePaths,'exact public source allowlist');same(changed.slice().sort(),[...sourcePaths,prefix+'/source-files.json'].sort(),'bounded changed paths');
 for(const r of rows)need(Number.isSafeInteger(r.bytes)&&r.bytes>0&&/^[0-9a-f]{64}$/.test(r.sha256),'source row');
}
export function verifyBrouwerSelection(sourceCommit='HEAD'){
 need(sourceCommit==='HEAD'||(sourceCommit==='075d2fb64b7cddeb0eeefe2568706fc72c649599'&&git('rev-parse',sourceCommit+'^{tree}')==='bccb2e76b5575e70bc58cb40853267bc695ed4bd'),'fixed historical Brouwer publication only');
 const raw=fs.readFileSync(path.join(dir,'metadata.json'));need(sha(raw)===metadataDigest,'immutable metadata');const m=JSON.parse(raw);
 need(m.batch===batch&&m.schema==='exact.brouwer-topics-selection.v1','batch');same([m.old_commit,m.old_tree,m.public_push_parent],[oldCommit,oldTree,oldCommit],'current public baseline');
 same([git('rev-parse',sourceCommit+'^'),git('rev-parse',oldCommit+'^{tree}')],[oldCommit,oldTree],'ordinary immediate public successor');
 need(git('rev-list','--merges',oldCommit+'..'+sourceCommit)===''&&git('diff','--diff-filter=D','--name-only',oldCommit,sourceCommit)==='','no merges or deletion');
 const source=fs.readFileSync(path.join(dir,'source-files.json')),rows=JSON.parse(source);validateSourceRows(rows,git('diff','--name-only',oldCommit,sourceCommit).split('\n').filter(Boolean));
 for(const r of rows){const b=sourceCommit==='HEAD'?fs.readFileSync(path.join(root,r.path)):execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/').replace(/\/$/,''),'-C',root,'show',sourceCommit+':'+r.path]);need(b.length===r.bytes&&sha(b)===r.sha256,'source bytes '+r.path);if(!r.path.endsWith('.pdf'))assertPublicText(b.toString());}
 need(git('diff','--name-only',oldCommit,sourceCommit,'--','.github','src','public','assets','package.json','package-lock.json','.node-version','publication/fpp-topics-v1','publication/tingley-topics-v1','publication/lfh-inline-baseline-r1','publication/research-related-work-r1','publication/lfh188-fix4','publication/content-terms-public-effective.md')==='','all historical math, workflow, terms and Tingley unchanged');
 const inherited=verifyFPPSelection(oldCommit),inventories={},baselines={};
 need(m.pdf.path===pdf&&m.pdf.bytes===351950&&m.pdf.sha256==='89af273b3b650c79d04fe22cfd90f13b3c9ade7c76c1b6bd0b2f20da7aacc87d'&&m.pdf.pages===13,'final PDF binding');
 need(m.final_tex_sha256==='ae1d5e91bb147d62c6f213a609e2d67e907c3e3a8d0bffde98b47a309e8a9802','private exact five-edit source binding');
 same([m.author,m.publication_responsibility,m.prepared_date],['','Ryotaro Tanaka','2026-10-16'],'bibliographic responsibility');
 for(const area of ['SITE','SITE_SUBPATH']){const i=fs.readFileSync(path.join(dir,area+'-inventory.json')),b=fs.readFileSync(path.join(dir,area+'-baseline-state.json'));need(sha(i)===m.profiles[area].inventory_sha256&&sha(b)===m.profiles[area].baseline_state_sha256,'output binding');inventories[area]=JSON.parse(i);baselines[area]=JSON.parse(b);need(Object.keys(inventories[area]).length===m.profiles[area].file_count,'path count');same([baselines[area].site_commit,baselines[area].site_tree,baselines[area].publication_batch],[oldCommit,oldTree,'EXACT_FPP_TOPICS_PUBLICATION_R1'],'exact FPP public baseline');}
 for(const area of ['SITE','SITE_SUBPATH']){const before=inherited.inventories[area],after=inventories[area],allowed=[...pages,pdf,'sitemap.xml','release-state.json'];need(Object.keys(before).every(p=>p in after),'no served deletion');const changed=Object.keys(after).filter(p=>!isDeepStrictEqual(after[p],before[p]));need(changed.every(p=>allowed.includes(p)),'served allowlist');same(changed.filter(p=>p!=='release-state.json').sort(),[...pages,pdf,'sitemap.xml'].sort(),'exact Brouwer served delta');}
 return {m,inherited,inventories,baselines,rows,source_files_sha256:sha(source)};
}
export function validateBrouwerAct(act,identity,deployment,today){
 need(act?.schema==='exact.owner-postpublic-update-act.v13'&&act.owner==='Ryotaro Tanaka'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE'&&act.update_kind===batch,'new explicit exact Brouwer owner act');
 const v=verifyBrouwerSelection(),m=v.m;
 same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'exact current artifact');same([identity.commit,identity.tree],[git('rev-parse','HEAD'),git('rev-parse','HEAD^{tree}')],'actual checkout');
 same([act.public_push_parent,m.public_push_parent],[git('rev-parse','HEAD^'),git('rev-parse','HEAD^')],'actual immediate public parent');
 same([deployment.origin,deployment.public_repository,deployment.base,deployment.deployment_profile],[m.canonical_origin,m.public_repository,'/','ROOT'],'production identity');same([act.base,act.deployment_profile],['/','ROOT'],'act root');
 need(/^\d{4}-\d{2}-\d{2}$/.test(today)&&act.update_date_asia_tokyo===today&&m.publication_date===today,'actual Tokyo date');
 for(const k of ['old_commit','old_tree','canonical_origin','public_repository','public_repository_id','accepted_candidate_commit','accepted_candidate_subtree','owner_instruction_sha256','dispatch_sha256','accepted_return_sha256','final_tex_sha256'])same(act[k],m[k],'authority '+k);
 same(act.pdf,m.pdf,'final PDF');same([act.metadata_sha256,act.source_files_sha256,act.source_file_count],[metadataDigest,v.source_files_sha256,v.rows.length],'source selection');same(act.output_inventory_sha256,Object.fromEntries(Object.entries(m.profiles).map(([a,x])=>[a,x.inventory_sha256])),'all served paths');return act;
}
function inventory(output){const rows={};for(const p of files(output)){const rel=path.relative(output,p).split(path.sep).join('/'),b=fs.readFileSync(p);rows[rel]={bytes:b.length,sha256:sha(b)};if(/\.(?:html|json|css|js|txt|bib|xml)$/.test(rel))assertPublicText(b.toString());}return rows;}
export function mountPriorFPP(output,deployment,v,area){
 mountPriorTingley(output,deployment,v.inherited,area);
 const priorDir=path.join(root,'publication/fpp-topics-v1');
 for(const rel of ['index.html','topics/index.html','topics/fixed-points-reflexive-banach-spaces/index.html']){const dst=path.join(output,rel);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(path.join(priorDir,area,rel),dst);}
 fs.copyFileSync(path.join(priorDir,'selected/fixed-points-reflexive-banach-spaces-v1.pdf'),path.join(output,'topics/fixed-points-reflexive-banach-spaces/fixed-points-reflexive-banach-spaces-v1.pdf'));
 const sm=path.join(output,'sitemap.xml'),s=fs.readFileSync(sm,'utf8');need(s.split('</urlset>').length===2,'historical FPP sitemap');fs.writeFileSync(sm,s.replace('</urlset>','<url><loc>'+deployment.origin+deployment.base+'topics/fixed-points-reflexive-banach-spaces/</loc></url></urlset>'));
 compareOutputRows(inventory(output),v.inventories[area]);
}
export function finishBrouwer(output,deployment,profile,release){
 const v=verifyBrouwerSelection(),m=v.m,identity=gitIdentity(profile),area=deployment.base==='/'?'SITE':'SITE_SUBPATH',base=deployment.base;
 same([deployment.origin,deployment.public_repository],[m.canonical_origin,m.public_repository],'deployment');same([base,deployment.deployment_profile],area==='SITE'?['/','ROOT']:['/exact-mathematics/','SUBPATH'],'profile');
 need((profile==='PUBLIC_RELEASE_QUALIFICATION'&&process.env.EXACT_QUALIFICATION_BATCH===batch)||(profile==='FULL_LAUNCH'&&area==='SITE'&&release?.act?.update_kind===batch),'bounded profile');
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());need(today===m.publication_date,'publication date');
 mountPriorFPP(output,deployment,v.inherited,area);
 for(const rel of pages){const dst=path.join(output,rel);fs.mkdirSync(path.dirname(dst),{recursive:true});if(rel.startsWith('topics/brouwer-'))need(!fs.existsSync(dst),'new Brouwer path');fs.copyFileSync(path.join(dir,area,rel),dst);}
 fs.copyFileSync(path.join(dir,'selected/brouwer-commuting-operators-v1.pdf'),path.join(output,pdf));
 const sm=path.join(output,'sitemap.xml'),s=fs.readFileSync(sm,'utf8');need(s.split('</urlset>').length===2,'sitemap');fs.writeFileSync(sm,s.replace('</urlset>','<url><loc>'+deployment.origin+base+'topics/brouwer-commuting-operators/</loc></url></urlset>'));
 const state=structuredClone(v.baselines[area]);Object.assign(state,{schema:'exact.site-release-state.v15',publication_batch:batch,site_commit:identity.commit,site_tree:identity.tree,public_parent_commit:oldCommit,publication_date:today,publication_state:release?'AUTHORIZED_POSTPUBLIC_UPDATE':'LOCAL_INDEXABLE_QUALIFICATION',profile,indexing:release?'PUBLIC_INDEXABLE':'LOCAL_INDEXABLE_QUALIFICATION'});
 state.brouwer_expository_note={version:'1',author:'',publication_responsibility:m.publication_responsibility,prepared_date:m.prepared_date,first_publication_date:today,version_publication_date:today,pdf:m.pdf,owner_instruction_sha256:m.owner_instruction_sha256,dispatch_sha256:m.dispatch_sha256,owner_publication_authorized:true};
 fs.writeFileSync(path.join(output,'release-state.json'),JSON.stringify(state,null,2)+'\n');compareOutputRows(inventory(output),v.inventories[area]);console.log('PASS_Brouwer_FINAL_MOUNT',area,Object.keys(v.inventories[area]).length);
}
