// Extend the existing hosting adapter with the accepted, explicitly selected full-HP batch.
// The mathematical renderer and private source/qualification engines are not distributed.
import fs from 'node:fs';
import {installSupplementalFont} from './naimark-font-asset.mjs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {gitIdentity} from './deployment-identity.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const dir=path.join(root,'publication/naimark-arxiv-card20');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const need=(v,m)=>{if(!v)throw Error('NAIMARK_ARXIV_CARD20_PUBLIC_REFUSED: '+m)};
const same=(a,b,m)=>need(JSON.stringify(a)===JSON.stringify(b),m);
const git=(...a)=>execFileSync('git',['-C',root,...a],{encoding:'utf8'}).trim();
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{need(!e.isSymbolicLink(),'linked file');return e.isDirectory()?files(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:(need(false,'special file'),[])});
const safe=p=>{need(typeof p==='string'&&!p.includes('\\')&&p.split('/').every(x=>/^[a-zA-Z0-9_.\[\]-]+$/.test(x)&&x!=='.'&&x!=='..'),'unsafe path');return p};
export const fullPublicProfile=p=>['FULL_LAUNCH','PUBLIC_RELEASE_QUALIFICATION'].includes(p);
function publicHTML(source,base,output){
 if(base==='/')return source;
 const assets=fs.readdirSync(path.join(output,'_astro'));
 const translated=source.replace(/((?:href|src|action)=")\/(?!\/)/g,'$1'+base).replace(/(https:\/\/exactmathematics\.org)\/(?!exact-mathematics\/)/g,'$1'+base);
 return translated.replace(/(\/_astro\/)([^/"<>]+\.js)/g,(all,prefix,name)=>{
  if(assets.includes(name))return all;
  const stem=name.replace(/\.[A-Za-z0-9_-]+\.js$/,'.');
  const matches=assets.filter(a=>a.startsWith(stem)&&a.endsWith('.js'));need(matches.length===1,'unresolved Astro asset '+name);
  return prefix+matches[0];
 });
}
export function verifyNaimarkArxivSelection(){
 const metadata=read(path.join(dir,'metadata.json')),selection=read(path.join(dir,'selection.json')),selected=path.join(dir,'selected');
 need(metadata.batch==='EM_NAIMARK_ARXIV_CARD20_PUBLICATION_R1'&&metadata.public_cards===64,'batch/card count');
 same(metadata.project_card_counts,{mankiewicz:11,'sphere-rigidity':0,rosenberg:33,'naimark-problem':16},'four selected Projects');
 need(metadata.card_identities.length===64&&new Set(metadata.card_identities.map(c=>c.stable_card_id)).size===64,'64 unique approved Cards');
 const seen=new Set();
 for(const row of selection.files){
  const rel=safe(row.path),fold=rel.normalize('NFKC').toLowerCase();need(!seen.has(fold),'path collision');seen.add(fold);
  need(!/(?:^|\/)(?:PRIVATE_INPUTS|AUDIT|CHECKPOINTS|node_modules|\.git)(?:\/|$)|\.(?:tex|zip|bundle|py|map|ttf|woff2)$/.test(rel),'unselected private or runtime input');
  const b=fs.readFileSync(path.join(selected,rel));need(b.length===row.bytes&&sha(b)===row.sha256,'selected bytes '+rel);
 }
 same(files(selected).map(p=>path.relative(selected,p).split(path.sep).join('/')).sort(),selection.files.map(r=>r.path).sort(),'exact selected file set');
 need(sha(fs.readFileSync(path.join(root,'publication/content-terms-public-effective.md')))===metadata.content_terms_sha256,'unchanged effective content terms');
 const cards=selection.files.filter(r=>/^mathlibannex\/cards\/[a-f0-9]{64}\/card.json$/.test(r.path));need(cards.length===64,'64 exact Card projections');
 for(const row of cards){const c=read(path.join(selected,row.path)),binding=metadata.card_identities.find(x=>x.stable_card_id===c.stable_card_id);need(binding,'selected Card identity');same(c.card_ref,binding.card_ref,'canonical Card ref');need(c.website_metadata?.catalog_current===true&&c.website_metadata?.approval_scope===binding.approval,'approval inheritance');need(sha(fs.readFileSync(path.join(selected,row.path)))===binding.public_file_sha256,'Card projection binding');if(binding.exposition_ref)same(c.exposition_ref,binding.exposition_ref,'approved exposition ref');}
 const catalog=read(path.join(selected,'mathlibannex/catalog/current.json'));need(catalog.card_count===64&&catalog.state==='PUBLIC_CURRENT','Catalog current');
 for(const r of metadata.reports){const b=fs.readFileSync(path.join(selected,r.path));need(b.length===r.bytes&&sha(b)===r.sha256,'report identity '+r.document);need(r.authors.length===0&&r.responsible_for_publication==='Ryotaro Tanaka','report responsibility');}
 need(sha(fs.readFileSync(path.join(selected,'research/naimark-problem/paper-record.json')))===metadata.paper_record_sha256,'paper record');
 need(metadata.catalog_only_naimark_cards===4,'Catalog-only four');
 return {metadata,selection,selected,selection_sha256:sha(fs.readFileSync(path.join(dir,'selection.json'))),metadata_sha256:sha(fs.readFileSync(path.join(dir,'metadata.json')))};
}
export function validateNaimarkArxivAct(act,identity,deployment,today){
 const {metadata,selection_sha256,metadata_sha256}=verifyNaimarkArxivSelection();
 need(act?.schema==='exact.owner-postpublic-update-act.v5'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE'&&act.owner==='Ryotaro Tanaka','explicit exact owner act');
 need(act.update_kind==='EM_NAIMARK_ARXIV_CARD20_PUBLICATION_R1','update kind');
 same([act.old_commit,act.old_tree],[metadata.old_commit,metadata.old_tree],'public baseline');
 same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'exact successor');
 same([act.public_repository,act.canonical_origin],[deployment.public_repository,deployment.origin],'deployment identity');same([act.public_repository,act.canonical_origin],[metadata.public_repository,metadata.canonical_origin],'bound public repository');
 need(deployment.base==='/'&&deployment.deployment_profile==='ROOT','public root deployment');
 need(act.update_date_asia_tokyo===today&&metadata.publication_date===today&&/^\d{4}-\d{2}-\d{2}$/.test(today),'actual Asia/Tokyo date');
 same([act.selection_sha256,act.metadata_sha256],[selection_sha256,metadata_sha256],'selected output and metadata');
 same(act.card_identities,metadata.card_identities,'all 64 approved Card identities');need(act.public_cards===64&&act.paper_record_sha256===metadata.paper_record_sha256,'64 Cards and paper');
 same(act.reports,metadata.reports,'report editions');
 same(act.source_release,metadata.source_release,'unchanged source v0.4.0');
 need(act.accepted_candidate_sha256===metadata.accepted_candidate_sha256&&act.content_terms_sha256===metadata.content_terms_sha256,'accepted candidate and legal continuity');
 need(git('rev-parse',metadata.old_commit+'^{tree}')===metadata.old_tree,'old tree');
 git('merge-base','--is-ancestor',metadata.old_commit,'HEAD');
 need(git('rev-list','--merges',metadata.old_commit+'..HEAD')==='','no private ancestry merge');
 const changed=git('diff','--name-only',metadata.old_commit,'HEAD').split('\n').filter(Boolean).sort();
 const manifestPath='publication/naimark-arxiv-card20/source-files.json',manifestBytes=fs.readFileSync(path.join(root,manifestPath));
 need(sha(manifestBytes)===act.source_files_sha256,'source manifest identity');
 const sourceFiles=JSON.parse(manifestBytes);
 need(sourceFiles.length===act.source_file_count,'source manifest count');
 same(changed,[...sourceFiles.map(r=>r.path),manifestPath].sort(),'exact changed-path allowlist');
 for(const row of sourceFiles){const p=path.join(root,safe(row.path));need(fs.existsSync(p)&&!fs.lstatSync(p).isSymbolicLink(),'selected source file');const b=fs.readFileSync(p);need(b.length===row.bytes&&sha(b)===row.sha256,'source identity '+row.path);}
 need(git('diff','--name-only',metadata.old_commit,'HEAD','--','.github/workflows/pages.yml','publication/content-terms-public-effective.md','publication/project-reader/r1-public-artifacts.json','public/favicon.svg','public/favicon.ico')==='','workflow, terms, history and favicon remain protected');
 return act;
}
export async function integrateNaimarkArxiv(output,base){
 const {selection,selected}=verifyNaimarkArxivSelection();
 for(const row of selection.files){
  let b=fs.readFileSync(path.join(selected,row.path));
  // Accepted relative source/graph/PDF bytes are reused; only root-local HTML URLs need a subpath prefix.
  if(base!=='/'&&row.path.endsWith('.html'))b=Buffer.from(publicHTML(b.toString('utf8'),base,output));
  const target=path.join(output,row.path);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,b);
 }
 // Fonts are the already verified assets of the existing public adapter, not private source inputs.
 for(const row of files(path.join(output,'mathlibannex/assets')).filter(p=>/\.(?:ttf|woff2)$/.test(p))){const target=path.join(output,'mathlibannex/projects/assets',path.basename(row));fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(row,target);}
 await installSupplementalFont(output);
 console.log('PASS_NAIMARK_ARXIV_CARD20_PUBLIC_SELECTION',selection.files.length,base);
}
export function finishNaimarkArxivOutput(output,deployment,profile,mode,release){
 const {metadata,selection_sha256,metadata_sha256}=verifyNaimarkArxivSelection();const identity=gitIdentity(profile),{base,origin}=deployment;
 const historical=read(path.join(dir,'protected-public-files.json'));
 const icons=[['icon','favicon.ico','sizes="any"'],['icon','favicon.svg','type="image/svg+xml"'],['icon','favicon-32x32.png','type="image/png" sizes="32x32"'],['icon','favicon-16x16.png','type="image/png" sizes="16x16"'],['apple-touch-icon','apple-touch-icon.png','sizes="180x180"']];
 const sitemap=[];
 for(const p of files(output).filter(p=>p.endsWith('.html'))){
  const rel=path.relative(output,p).split(path.sep).join('/');
  if(historical.some(r=>r.path===rel))continue;
  let t=fs.readFileSync(p,'utf8');const excluded=/^(?:404\.html|research\/sr\/|corrections\/(?:received|demo)\/|mathlibannex\/(?:sources|history)\/)/.test(rel);
  const route=rel==='research/sr/index.html'?'research/sphere-rigidity/':rel.replace(/index\.html$/,'');const canonical=origin+base+route;
  t=t.replace(/<meta name="robots"[^>]*>/g,'').replace(/<link rel="canonical"[^>]*>/g,'').replace(/<meta property="og:[^"]+"[^>]*>/g,'').replace(/<link\b[^>]*\brel="(?:icon|apple-touch-icon)"[^>]*>/g,'');
  t=t.replace('</head>',`<meta name="robots" content="${excluded?'noindex,follow,noarchive':'index,follow'}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Exact Mathematics with AI"><meta property="og:url" content="${canonical}">`+icons.map(([r,n,x])=>`<link rel="${r}" href="${base}${n}" ${x}>`).join('')+'</head>');
  fs.writeFileSync(p,t);if(!excluded)sitemap.push(canonical);
 }
 for(const row of historical){const p=path.join(output,row.path),b=fs.readFileSync(p);let expected=row;
  if(base!=='/'&&row.path.endsWith('.html')){const source=fs.readFileSync(path.join(dir,'selected',row.path),'utf8');const translated=Buffer.from(publicHTML(source,base,output));expected={bytes:translated.length,sha256:sha(translated)};}
  need(b.length===expected.bytes&&sha(b)===expected.sha256,'historical public bytes '+row.path);}
 // Build-only adapter manifests stay outside the deployed artifact.
 for(const name of ['PROJECT_READER_ROUTE_MAPPING.json','WORKBENCH_ADAPTER.json','PROJECT_ADAPTER.json','ROUTE_MANIFEST.json','CHECK.py','MANIFEST.json','SHA256SUMS.txt','SITE_EXPORT_BINDING.json','TERMINOLOGY_AUDIT.json']){const p=path.join(output,name);if(fs.existsSync(p))fs.unlinkSync(p);}
 fs.writeFileSync(path.join(output,'robots.txt'),'User-agent: *\nAllow: /\nDisallow: /corrections/received/\nDisallow: /corrections/demo/\nSitemap: '+origin+base+'sitemap.xml\n');
 fs.writeFileSync(path.join(output,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+sitemap.sort().map(u=>'<url><loc>'+u+'</loc></url>').join('')+'</urlset>\n');
 const state={schema:'exact.site-release-state.v7',site_commit:identity.commit,site_tree:identity.tree,public_parent_commit:metadata.old_commit,profile,canonical_origin:origin,base,deployment_profile:deployment.deployment_profile,public_repository:deployment.public_repository,publication_state:release?'AUTHORIZED_POSTPUBLIC_UPDATE':'LOCAL_POSTPUBLIC_SUCCESSOR_QUALIFICATION',publication_batch:metadata.batch,publication_date:metadata.publication_date,source:'PUBLISHED_V0_4_0',source_commit:metadata.source_release.commit,source_tree:metadata.source_release.tree,public_cards:64,catalog_only_naimark_cards:4,paper_record_sha256:metadata.paper_record_sha256,historical_publication_record:metadata.historical_release_record,selected_system_snapshot:metadata.selected_system_snapshot,catalog_current:'MANKIEWICZ_11_ROSENBERG_33_NAIMARK_20_PUBLIC',project_card_counts:metadata.project_card_counts,project_nodes:metadata.project_nodes,approval_scope:'REUSED_44_AND_APPROVED_R3_NAIMARK20_SOURCE_EXPOSITION_CORRESPONDENCE',new_mathematical_review:false,content_terms:'PUBLIC_EFFECTIVE',content_terms_effective_date:'2026-09-17',site_first_publication_date:'2026-09-17',brief_first_publication_date:'2026-09-17',reports:metadata.reports,selection_sha256,metadata_sha256,indexing:release?'PUBLIC_INDEXABLE':'LOCAL_INDEXABLE_QUALIFICATION',feedback_mode:mode,formspree_automated_live_posts:0};
 fs.writeFileSync(path.join(output,'release-state.json'),JSON.stringify(state,null,2)+'\n');
 console.log('PASS_NAIMARK_ARXIV_CARD20_PUBLIC_OUTPUT',files(output).length,profile);
}
