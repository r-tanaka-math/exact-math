// Version 1 Topics successor: bind the exact accepted output and retain every previous math layer.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {verifyLFHInlineBaselineSelection,compareOutputRows} from './lfh-inline-baseline-public-adapter.mjs';
import {assertPublicText} from './research-related-work-public-adapter.mjs';
import {gitIdentity} from './deployment-identity.mjs';
export const batch='EXACT_TINGLEY_TOPICS_PUBLICATION_R1';
const root=fileURLToPath(new URL('../',import.meta.url)),prefix='publication/tingley-topics-v1',dir=path.join(root,prefix);
const metadataDigest='8c47a38ec5494654cd664b8b2ed986d7e6eb5c15b539a5f459662bbba8ec2d05',oldCommit='12e4ae8a5a04f418daeb4e77fcc54e57e9cd3d56',oldTree='8a4e791add4145ba3c33a9fa6ff29244b96567e0';
const pages=['topics/index.html','topics/tingley-chord-argument/index.html'],pdf='topics/tingley-chord-argument/tingley-chord-argument-v1.pdf',css='mathlibannex/assets/lfh188.css';
const sourcePaths=['astro.config.mjs','scripts/postpublic-gate.mjs','scripts/lfh-inline-baseline-public-adapter.mjs','scripts/tingley-topics-public-adapter.mjs',prefix+'/.gitattributes',prefix+'/metadata.json',prefix+'/SOURCE/home_topics.html',prefix+'/selected/tingley-chord-argument-v1.pdf',...['SITE','SITE_SUBPATH'].flatMap(a=>[prefix+'/'+a+'-inventory.json',prefix+'/'+a+'-baseline-state.json',...pages.map(p=>prefix+'/'+a+'/'+p)])].sort();
const sha=b=>createHash('sha256').update(b).digest('hex'),read=p=>JSON.parse(fs.readFileSync(p));
const need=(v,m)=>{if(!v)throw Error('TINGLEY_PUBLICATION_REFUSED: '+m)},same=(a,b,m)=>need(isDeepStrictEqual(a,b),m);
const git=(...a)=>execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/').replace(/\/$/,''),'-c','core.longpaths=true','-C',root,...a],{encoding:'utf8'}).trim();
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{need(!e.isSymbolicLink(),'linked output');return e.isDirectory()?files(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:(need(false,'special output'),[])});
export function validateSourceRows(rows,changed){
 same(rows.map(r=>r.path).sort(),sourcePaths,'exact public source allowlist');same(changed.slice().sort(),[...sourcePaths,prefix+'/source-files.json'].sort(),'bounded changed paths');
 for(const r of rows)need(Number.isSafeInteger(r.bytes)&&r.bytes>0&&/^[0-9a-f]{64}$/.test(r.sha256),'source row');
}
export function verifyTingleySelection(){
 const raw=fs.readFileSync(path.join(dir,'metadata.json'));need(sha(raw)===metadataDigest,'immutable metadata');const m=JSON.parse(raw);
 need(m.batch===batch&&m.schema==='exact.tingley-topics-selection.v1','batch');same([m.old_commit,m.old_tree],[oldCommit,oldTree],'baseline');
 need(git('merge-base','--is-ancestor',oldCommit,'HEAD')==='','ordinary public successor');need(git('rev-parse',oldCommit+'^{tree}')===oldTree&&git('rev-parse','HEAD')!==oldCommit,'baseline tree');
 need(git('rev-list','--merges',oldCommit+'..HEAD')===''&&git('diff','--diff-filter=D','--name-only',oldCommit,'HEAD')==='','no merges or deletion');
 const source=fs.readFileSync(path.join(dir,'source-files.json')),rows=JSON.parse(source);validateSourceRows(rows,git('diff','--name-only',oldCommit,'HEAD').split('\n').filter(Boolean));
 for(const r of rows){const b=fs.readFileSync(path.join(root,r.path));need(b.length===r.bytes&&sha(b)===r.sha256,'source bytes '+r.path);if(!r.path.endsWith('.pdf'))assertPublicText(b.toString());}
 need(git('diff','--name-only',oldCommit,'HEAD','--','.github','src','public','assets','package.json','package-lock.json','.node-version','publication/lfh-inline-baseline-r1','publication/research-related-work-r1','publication/lfh188-fix4','publication/content-terms-public-effective.md')==='','historical source, math, workflow and terms unchanged');
 const inherited=verifyLFHInlineBaselineSelection(oldCommit),inventories={},baselines={};
 need(m.pdf.path===pdf&&m.pdf.bytes===352985&&m.pdf.sha256==='bbbfc7a9d207ef30de0783024bba48f61cf0f11354351846424e0d8978ac6d57'&&m.pdf.pages===21,'final PDF binding');
 same([m.author,m.publication_responsibility,m.prepared_date],['','Ryotaro Tanaka','2026-10-13'],'bibliographic responsibility');
 for(const area of ['SITE','SITE_SUBPATH']){const i=fs.readFileSync(path.join(dir,area+'-inventory.json')),b=fs.readFileSync(path.join(dir,area+'-baseline-state.json'));need(sha(i)===m.profiles[area].inventory_sha256&&sha(b)===m.profiles[area].baseline_state_sha256,'output binding');inventories[area]=JSON.parse(i);baselines[area]=JSON.parse(b);need(Object.keys(inventories[area]).length===m.profiles[area].file_count,'path count');same([baselines[area].site_commit,baselines[area].site_tree,baselines[area].publication_batch],[oldCommit,oldTree,'EXACT_LFH_INLINE_MATH_BASELINE_PUBLICATION_R1'],'exact math baseline');}
 return {m,inherited,inventories,baselines,rows,source_files_sha256:sha(source)};
}
export function validateTingleyAct(act,identity,deployment,today){
 need(act?.schema==='exact.owner-postpublic-update-act.v11'&&act.owner==='Ryotaro Tanaka'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE'&&act.update_kind===batch,'explicit exact owner act');
 const v=verifyTingleySelection(),m=v.m;
 same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'exact current artifact');same([identity.commit,identity.tree],[git('rev-parse','HEAD'),git('rev-parse','HEAD^{tree}')],'actual checkout');
 same([deployment.origin,deployment.public_repository,deployment.base,deployment.deployment_profile],[m.canonical_origin,m.public_repository,'/','ROOT'],'production identity');same([act.base,act.deployment_profile],['/','ROOT'],'act root');
 need(/^\d{4}-\d{2}-\d{2}$/.test(today)&&act.update_date_asia_tokyo===today&&m.publication_date===today,'actual Tokyo date');
 for(const k of ['old_commit','old_tree','canonical_origin','public_repository','public_repository_id','accepted_candidate_commit','accepted_candidate_subtree','owner_instruction_sha256','dispatch_sha256','accepted_return_sha256'])same(act[k],m[k],'authority '+k);
 same(act.pdf,m.pdf,'final PDF');same([act.metadata_sha256,act.source_files_sha256,act.source_file_count],[metadataDigest,v.source_files_sha256,v.rows.length],'source selection');same(act.output_inventory_sha256,Object.fromEntries(Object.entries(m.profiles).map(([a,x])=>[a,x.inventory_sha256])),'all served paths');return act;
}
function inventory(output){const rows={};for(const p of files(output)){const rel=path.relative(output,p).split(path.sep).join('/'),b=fs.readFileSync(p);rows[rel]={bytes:b.length,sha256:sha(b)};if(/\.(?:html|json|css|js|txt|bib|xml)$/.test(rel))assertPublicText(b.toString());}return rows;}
function navUpdate(text,base){return text.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/g,nav=>{if(!nav.includes('Research</a>')||!(nav.includes('Home</a>')||nav.includes('About</a>')))return nav;need(!nav.includes('Topics</a>'),'no duplicate Topics');const sep=nav.includes('exact-site-context')?' · ':'';return nav.replace(/(<a\b[^>]*>Research<\/a>)/,x=>x+sep+'<a href="'+base+'topics/">Topics</a>');});}
export function finishTingley(output,deployment,profile,release){
 const v=verifyTingleySelection(),m=v.m,identity=gitIdentity(profile),area=deployment.base==='/'?'SITE':'SITE_SUBPATH',base=deployment.base;
 same([deployment.origin,deployment.public_repository],[m.canonical_origin,m.public_repository],'deployment');same([base,deployment.deployment_profile],area==='SITE'?['/','ROOT']:['/exact-mathematics/','SUBPATH'],'profile');
 need((profile==='PUBLIC_RELEASE_QUALIFICATION'&&process.env.EXACT_QUALIFICATION_BATCH===batch)||(profile==='FULL_LAUNCH'&&area==='SITE'&&release?.act?.update_kind===batch),'bounded profile');
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());need(today===m.publication_date,'publication date');
 for(const rel of ['research/naimark-problem/index.html','research/sphere-rigidity/index.html'])fs.copyFileSync(path.join(root,'publication/research-related-work-r1',area,rel),path.join(output,rel));
 compareOutputRows(inventory(output),v.inherited.inventories[area],v.inherited.m.css_before);
 fs.copyFileSync(path.join(root,'publication/lfh-inline-baseline-r1/selected',css),path.join(output,css));compareOutputRows(inventory(output),v.inherited.inventories[area]);
 for(const p of files(output).filter(p=>p.endsWith('.html'))){let t=navUpdate(fs.readFileSync(p,'utf8'),base);if(path.relative(output,p)==='index.html'){const anchor='<section class="section" aria-label="Research principles">';need(t.split(anchor).length===2,'Home insertion');t=t.replace(anchor,fs.readFileSync(path.join(dir,'SOURCE/home_topics.html'),'utf8').replaceAll('{{BASE}}',base)+anchor);}fs.writeFileSync(p,t);}
 for(const rel of pages){const dst=path.join(output,rel);need(!fs.existsSync(dst),'new Topics path');fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(path.join(dir,area,rel),dst);}
 fs.copyFileSync(path.join(dir,'selected/tingley-chord-argument-v1.pdf'),path.join(output,pdf));
 const sm=path.join(output,'sitemap.xml'),s=fs.readFileSync(sm,'utf8');need(s.split('</urlset>').length===2,'sitemap');fs.writeFileSync(sm,s.replace('</urlset>',pages.map(r=>'<url><loc>'+deployment.origin+base+r.replace(/index.html$/,'')+'</loc></url>').join('')+'</urlset>'));
 const state=structuredClone(v.baselines[area]);Object.assign(state,{schema:'exact.site-release-state.v13',publication_batch:batch,site_commit:identity.commit,site_tree:identity.tree,public_parent_commit:oldCommit,publication_date:today,publication_state:release?'AUTHORIZED_POSTPUBLIC_UPDATE':'LOCAL_INDEXABLE_QUALIFICATION',profile,indexing:release?'PUBLIC_INDEXABLE':'LOCAL_INDEXABLE_QUALIFICATION'});
 state.tingley_expository_note={version:'1',author:'',publication_responsibility:m.publication_responsibility,prepared_date:m.prepared_date,first_publication_date:today,version_publication_date:today,pdf:m.pdf,owner_instruction_sha256:m.owner_instruction_sha256,dispatch_sha256:m.dispatch_sha256,owner_publication_authorized:true};
 fs.writeFileSync(path.join(output,'release-state.json'),JSON.stringify(state,null,2)+'\n');compareOutputRows(inventory(output),v.inventories[area]);console.log('PASS_TINGLEY_FINAL_MOUNT',area,Object.keys(v.inventories[area]).length);
}
