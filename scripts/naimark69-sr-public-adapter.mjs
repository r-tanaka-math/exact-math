// Selected, accepted presentation only. No mathematical/source renderer is distributed.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {publicHTML} from './naimark-arxiv-public-adapter.mjs';
import {verifyReviewDisplaySelection} from './review-display-cleanup.mjs';
import {gitIdentity} from './deployment-identity.mjs';
export const batch='EXACT_NAIMARK69_SR_PUBLICATION_R1';
const root=fileURLToPath(new URL('../',import.meta.url)),prefix='publication/naimark69-sr',dir=path.join(root,prefix);
const sha=b=>createHash('sha256').update(b).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p));
const need=(x,m)=>{if(!x)throw Error('NAIMARK69_SR_REFUSED: '+m)};
const same=(a,b,m)=>need(isDeepStrictEqual(a,b),m);
const git=(...a)=>execFileSync('git',['-c','core.longpaths=true','-C',root,...a],{encoding:'utf8'}).trim();
const safe=p=>{need(typeof p==='string'&&!p.includes('\\')&&!p.startsWith('/')&&p.split('/').every(x=>/^[a-zA-Z0-9_.\[\]-]+$/.test(x)&&x!=='.'&&x!=='..'),'unsafe path');return p};
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{need(!e.isSymbolicLink(),'linked input');return e.isDirectory()?files(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:(need(false,'special input'),[])});
export function verifyNaimark69SRSelection(){
 const inherited=verifyReviewDisplaySelection();
 const metadata=read(path.join(dir,'metadata.json')),selection=read(path.join(dir,'selection.json')),selected=path.join(dir,'selected');
 need(metadata.schema==='exact.naimark69-sr-publication.v1'&&metadata.batch===batch,'exact task');
 same([metadata.old_commit,metadata.old_tree],['efb29a8a6727f5a97de03757e16505774cd40709','56b9f994297b113428e62e67f93ca95b9de972e0'],'public baseline');
 need(metadata.accepted_candidate_sha256==='95367c8ea04332a0af2024f63d7c55b1d11f19f89d2ac08c0ee264d0b0e66007','accepted candidate');
 need(metadata.dispatch_sha256==='0cd14134bcd18dbf4d5951753e4fd9d71ec4f499a16af8193b1439903e3fe173','current owner dispatch');
 if(metadata.selection_mode==='EXPLICIT_FIXED_SNAPSHOT_PUBLICATION'){
  const f=metadata.fixed_selection;need(f?.kind==='IMMUTABLE_EXACT_CARD_REVISION_SET'&&f.decision_sha256==='4c1b3125e40f2eabd279e924b2f2a9724f5519030946cc5733b8f2f2f55899b5'&&f.selection_vector_sha256==='94d388cd706a857f82efe47fab65a9f736652812d8508b41a7a4cb42bf642bcf'&&f.snapshot_sha256==='fb904d9b39d72513621a1cfe6e4af2ef8d28739192f22ead30cb8034fcec0e6d'&&f.native_index_sha256==='e7170ab5cb24d102cdd279083d8caedc9d8621d7f779f0472c746128e91b5834'&&f.original_registered_selector_change_needed===true&&f.CURRENT_updated===false&&f.new_native_registration===false,'accepted fixed selection; CURRENT unchanged');
 }
 need(metadata.public_cards===113&&metadata.new_naimark_cards===69&&metadata.other_cards_unchanged===44&&metadata.main_cards===68&&metadata.ch_cards===3&&!metadata.new_mathematical_review,'accepted scope');
 same(metadata.source_release,{tag:'v0.4.0',commit:'437e6e46228bbb8e91211ebded349d7a30020e73',tree:'b752cf746a8660427937b3497f49c1797bf3ff3f'},'unchanged source');
 need(sha(fs.readFileSync(path.join(root,'publication/content-terms-public-effective.md')))===metadata.content_terms_sha256,'unchanged terms');
 const seen=new Set();
 for(const r of selection.files){const rel=safe(r.path),fold=rel.normalize('NFKC').toLowerCase();need(!seen.has(fold),'collision');seen.add(fold);
  need(!/(?:^|\/)(?:PRIVATE_INPUTS|AUDIT|CHECKPOINTS|node_modules|\.git|RENDERER|AUTHORITY)(?:\/|$)|\.(?:zip|bundle|py|map|ttf|woff2|tex)$/.test(rel)&&rel!=='preview-state.json','unselected private/runtime input');
  const b=fs.readFileSync(path.join(selected,rel));need(b.length===r.bytes&&sha(b)===r.sha256,'selected bytes '+rel);
  if(/\.(?:html|json|css|js|bib|txt)$/.test(rel))need(!/github\.com\/r-tanaka-math\/(?:lfh-cards|lean-workbench|semantic-bridge|exact-math-private)|[A-Za-z]:[\\/](?:Users|ExactMathematics)|review\.md|github_pat_|gh[pousr]_[A-Za-z0-9]{20,}/.test(b.toString()),'private leakage '+rel);
 }
 same(files(selected).map(p=>path.relative(selected,p).split(path.sep).join('/')).sort(),selection.files.map(r=>r.path).sort(),'exact file set');
 const cat=read(path.join(selected,'mathlibannex/catalog/current.json'));need(cat.state==='PUBLIC_CURRENT'&&cat.card_count===113&&cat.cards.length===113,'Catalog113');
 same(cat.cards.slice(0,44),metadata.unchanged_44_card_refs,'other44 preserved');
 need(metadata.targets.length===69&&new Set(metadata.targets.map(r=>r.target)).size===69,'69 unique targets');
 for(const r of metadata.targets){need(/^\/mathlibannex\/cards\/[a-f0-9]{64}\/versions\/n69-[a-f0-9]{16}\/index.html$/.test(r.target),'versioned target');const c=read(path.join(selected,r.target.slice(1).replace('index.html','card.json')));same(c.card_ref,r.card_ref,'Card ref');same(c.exposition_ref,r.exposition_ref,'exposition ref');need(c.qualified_name===r.qualified_name&&c.website.candidate===false&&c.website.canonical_url===r.target,'Card presentation');}
 for(const [rel,counts] of [['project-data.json',[68,1044,122,15]],['routes/r10/project-data.json',[3,3,2,2]]]){const g=read(path.join(selected,'mathlibannex/projects/naimark-problem',rel));same([g.node_count,g.reachability_count,g.display_edge_count,g.maximum_level],counts,'graph scope');}
 const paper=read(path.join(selected,'research/sphere-rigidity/paper-record.json'));need(paper.arxiv_id==='2609.31096'&&paper.displayed_version==='v1'&&paper.doi==='10.48550/arXiv.2609.31096'&&!paper.peer_review_claim&&paper.pages===null,'Sphere bibliography');
 need(selection.files.filter(r=>r.path.endsWith('.pdf')).length===157,'80 new + 77 old PDFs');
 return {metadata,selection,selected,metadata_sha256:sha(fs.readFileSync(path.join(dir,'metadata.json'))),selection_sha256:sha(fs.readFileSync(path.join(dir,'selection.json')))};
}
export function validateNaimark69SRAct(act,identity,deployment,today){
 const v=verifyNaimark69SRSelection(),m=v.metadata;
 need(act?.schema==='exact.owner-postpublic-update-act.v7'&&act.owner==='Ryotaro Tanaka'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE'&&act.update_kind===batch,'new explicit owner act');
 need(['FORMAL_CURRENT_SELECTION','EXPLICIT_FIXED_SNAPSHOT_PUBLICATION'].includes(m.selection_mode)&&/^[a-f0-9]{64}$/.test(m.selection_record_sha256||''),'Workbench selection receipt required');
 need(act.selection_record_sha256===m.selection_record_sha256&&act.selection_mode===m.selection_mode&&act.exact_bindings_verified===true,'verified selection adjudication binding');
 need(/^[a-f0-9]{64}$/.test(m.owner_instruction_sha256||'')&&act.owner_instruction_sha256===m.owner_instruction_sha256&&act.dispatch_sha256===m.dispatch_sha256&&act.accepted_candidate_sha256===m.accepted_candidate_sha256,'new exact authority');
 same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'commit/tree');same([act.old_commit,act.old_tree],[m.old_commit,m.old_tree],'parent binding');
 same([act.public_repository,act.canonical_origin],[m.public_repository,m.canonical_origin],'owner act deployment');same(act.fixed_selection,m.fixed_selection,'fixed selection identity');
 same([deployment.origin,deployment.public_repository,deployment.base,deployment.deployment_profile],[m.canonical_origin,m.public_repository,'/','ROOT'],'root identity');
 need(/^\d{4}-\d{2}-\d{2}$/.test(today)&&m.publication_date===today&&act.update_date_asia_tokyo===today,'actual Asia/Tokyo date');
 same([act.metadata_sha256,act.selection_sha256],[v.metadata_sha256,v.selection_sha256],'exact selection');same(act.targets,m.targets,'all69 targets');same(act.source_release,m.source_release,'source v0.4.0');
 need(act.public_cards===113&&act.content_terms_sha256===m.content_terms_sha256,'scope/terms');
 need(git('rev-parse','HEAD^')===m.old_commit&&git('rev-parse',m.old_commit+'^{tree}')===m.old_tree,'single public successor; no private ancestry');
 need(git('rev-list','--merges',m.old_commit+'..HEAD')==='','no history merge');
 const manifest=prefix+'/source-files.json',b=fs.readFileSync(path.join(root,manifest)),rows=JSON.parse(b);
 need(sha(b)===act.source_files_sha256&&rows.length===act.source_file_count,'source manifest');
 same(git('diff','--name-only',m.old_commit,'HEAD').split('\n').filter(Boolean).sort(),[manifest,...rows.map(r=>r.path)].sort(),'exact source allowlist');
 need(git('diff','--diff-filter=D','--name-only',m.old_commit,'HEAD')==='','no deletion');
 for(const r of rows){safe(r.path);need(['astro.config.mjs','scripts/postpublic-gate.mjs','scripts/naimark69-sr-public-adapter.mjs'].includes(r.path)||r.path.startsWith(prefix+'/'),'bounded implementation');const b=fs.readFileSync(path.join(root,r.path));need(b.length===r.bytes&&sha(b)===r.sha256,'source bytes');}
 need(git('diff','--name-only',m.old_commit,'HEAD','--','.github','publication/content-terms-public-effective.md','public','package.json','package-lock.json')==='','workflow, protections, terms, assets and dependency lock unchanged');
 return act;
}
export function integrateNaimark69SR(output,base){
 const {selection,selected}=verifyNaimark69SRSelection();
 // Install preserved assets before HTML translation, including a fresh output directory.
 const ordered=[...selection.files.filter(r=>!r.path.endsWith('.html')),...selection.files.filter(r=>r.path.endsWith('.html'))];
 for(const row of ordered){let b=fs.readFileSync(path.join(selected,row.path));if(base!=='/'&&row.path.endsWith('.html'))b=Buffer.from(publicHTML(b.toString(),base,output));const p=path.join(output,row.path);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,b);}
 if(base!=='/')for(const name of ['robots.txt','sitemap.xml']){const p=path.join(output,name);fs.writeFileSync(p,fs.readFileSync(p,'utf8').replaceAll('https://exactmathematics.org/','https://exactmathematics.org'+base).replaceAll('Disallow: /','Disallow: '+base));}
 console.log('PASS_NAIMARK69_SR_FINAL_MOUNT',selection.files.length,base);
}
export function finishNaimark69SROutput(output,deployment,profile,release){
 const v=verifyNaimark69SRSelection(),identity=gitIdentity(profile),p=path.join(output,'release-state.json'),state=read(p);
 need(!release||v.metadata.publication_date!==null,'actual date required');
 Object.assign(state,{site_commit:identity.commit,site_tree:identity.tree,profile,base:deployment.base,deployment_profile:deployment.deployment_profile,public_repository:deployment.public_repository,publication_state:release?'AUTHORIZED_POSTPUBLIC_UPDATE':'LOCAL_INDEXABLE_QUALIFICATION',indexing:release?'PUBLIC_INDEXABLE':'LOCAL_INDEXABLE_QUALIFICATION',selection_sha256:v.selection_sha256,metadata_sha256:v.metadata_sha256});fs.writeFileSync(p,JSON.stringify(state,null,2)+'\n');
}
