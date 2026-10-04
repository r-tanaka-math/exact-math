// HP output mounting and fixed public revision selection. No private LFH engine.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
import {publicHTML} from './naimark-arxiv-public-adapter.mjs';
import {verifyNaimark69SRSelection} from './naimark69-sr-public-adapter.mjs';
import {gitIdentity} from './deployment-identity.mjs';
export const batch='EXACT_LFH188_PUBLICATION_R1';
const root=fileURLToPath(new URL('../',import.meta.url)),prefix='publication/lfh188-fix4',dir=path.join(root,prefix);
const digest='19cef1e4f98bc2cf4b730999d556b8216c1ec78ce2d32c4be9736c7385ff5f91';
const sha=b=>createHash('sha256').update(b).digest('hex'),read=p=>JSON.parse(fs.readFileSync(p));
const need=(x,m)=>{if(!x)throw Error('LFH188_PUBLICATION_REFUSED: '+m)},same=(a,b,m)=>need(isDeepStrictEqual(a,b),m);
const git=(...a)=>execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/').replace(/\/$/,''),'-c','core.longpaths=true','-C',root,...a],{encoding:'utf8'}).trim();
const safe=p=>{need(typeof p==='string'&&!p.includes('\\')&&!p.startsWith('/')&&p.split('/').every(x=>/^[a-zA-Z0-9_.\[\]-]+$/.test(x)&&x!=='.'&&x!=='..'),'unsafe path');return p};
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{need(!e.isSymbolicLink(),'linked input');return e.isDirectory()?files(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:(need(false,'special input'),[])});
const canonical=x=>Array.isArray(x)?x.map(canonical):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
function verifyBody(text,rel,metadata){
 let body=text.split('</head>').slice(1).join('</head>');const successor=metadata.public_body_metadata_successors?.[rel];
 if(successor){need(['mathlibannex/index.html','mathlibannex/projects/sphere-rigidity/source-exploration/index.html','research/sphere-rigidity/index.html'].includes(rel),'bounded public status description');need(sha(Buffer.from(body))===successor.public_body_sha256,'public status body');for(const r of successor.substitutions){need(r.count===1&&body.split(r.after).length===2,'one status substitution');body=body.replace(r.after,r.before);}need(successor.accepted_body_sha256===metadata.accepted_visible_body_sha256[rel],'accepted status binding');}
 return sha(Buffer.from(body))===metadata.accepted_visible_body_sha256[rel];
}
export function verifyLFH188Selection(){
 verifyNaimark69SRSelection();
 const metadata=read(path.join(dir,'metadata.json')),selection=read(path.join(dir,'selection.json')),accepted=read(path.join(dir,'accepted-input-set.json')),revision=read(path.join(dir,'revision-set.json')),selected=path.join(dir,'selected');
 need(metadata.schema==='exact.lfh188-fix4-publication.v1'&&metadata.batch===batch,'task identity');
 same([metadata.old_commit,metadata.old_tree],['40839b74a20f2b0b62bd115e3419fe10b4093b0e','3754c6434558be5af6ab262c7d0f8d492274eaab'],'actual published baseline');
 same([metadata.accepted_candidate_commit,metadata.accepted_candidate_subtree],['b06dfabca25f9bf1f0e536be2c0976c527078c67','7201cb56092b9a1068eca99d4905dcc475789fc4'],'accepted Fix4');
 need(metadata.dispatch_sha256==='908e2b4b1dcbdba66f3f82c363f6328576764cf8e1a6547e101ff29d27cc956b','current dispatch');
 need(metadata.public_cards===188&&!metadata.formal_CURRENT_changed&&!metadata.new_native_registration&&!metadata.new_mathematical_review,'HP selection only');
 need(metadata.selection_mode==='IMMUTABLE_SOURCE_AND_EXACT_CARD_REVISION_SET'&&metadata.accepted_revision_entries_digest===digest,'fixed revision selection');
 need(accepted.entries.length===188&&new Set(accepted.entries.map(e=>e.identity_key)).size===188&&accepted.entries_digest===digest&&sha(Buffer.from(JSON.stringify(canonical(accepted.entries))))===digest,'all188 immutable accepted entries digest');
 need(sha(fs.readFileSync(path.join(dir,'accepted-input-set.json')))===metadata.accepted_input_set_sha256,'accepted binding manifest');
 need(sha(fs.readFileSync(path.join(dir,'revision-set.json')))===metadata.revision_set_sha256&&revision.entries.length===188&&revision.accepted_revision_entries_digest===digest,'public exact revision set');
 same(metadata.counts,{total:188,'sphere-rigidity':75,'naimark-problem':69,mankiewicz:11,rosenberg:33},'four Project totals');
 same(metadata.source_release,{tag:'v0.4.0',commit:'437e6e46228bbb8e91211ebded349d7a30020e73',tree:'b752cf746a8660427937b3497f49c1797bf3ff3f'},'immutable source release');
 need(sha(fs.readFileSync(path.join(root,'publication/content-terms-public-effective.md')))===metadata.content_terms_sha256,'terms unchanged');
 const seen=new Set();
 for(const row of selection.files){
  const rel=safe(row.path),fold=rel.normalize('NFKC').toLowerCase();need(!seen.has(fold),'case or Unicode collision');seen.add(fold);
  need(!/(?:^|\/)(?:PRIVATE_INPUTS|AUDIT|AUTHORITY|EVIDENCE|HISTORY|CHECKPOINTS|node_modules|\.git|RENDERER)(?:\/|$)|\.(?:zip|bundle|py|map|tex|ttf|woff2)$/.test(rel)&&rel!=='preview-state.json','private or runtime payload');
  const b=fs.readFileSync(path.join(selected,rel));need(b.length===row.bytes&&sha(b)===row.sha256,'selected bytes '+rel);
  if(/\.(?:html|json|css|js|bib|txt)$/.test(rel))need(!/github\.com\/r-tanaka-math\/(?:lfh-cards|lean-workbench|semantic-bridge|exact-math-private)|[A-Za-z]:[\\/](?:Users|EXACT_MAIN)|review\.md|github_pat_|gh[pousr]_[A-Za-z0-9]{20,}/.test(b.toString()),'private disclosure '+rel);
  if(metadata.accepted_visible_body_sha256[rel]){const text=b.toString();need(text.includes('</head>')&&verifyBody(text,rel,metadata),'accepted visible body '+rel);}
 }
 same(files(selected).map(p=>path.relative(selected,p).split(path.sep).join('/')).sort(),selection.files.map(r=>r.path).sort(),'exact public files');
 const cat=read(path.join(selected,'mathlibannex/catalog/current.json'));need(cat.state==='PUBLIC_CURRENT'&&cat.card_count===188&&cat.cards.length===188,'current188');
 same(cat.cards.map(e=>e.url).sort(),accepted.entries.map(e=>e.url).sort(),'Catalog exact target set');
 for(let i=0;i<accepted.entries.length;i++){
  const e=accepted.entries[i],v=revision.entries[i];for(const k of ['identity_key','qualified_name','url','approved_commit','body_sha256','guide_sha256','source_binding','source_signature_sha256'])same(v[k],e[k],'accepted revision '+k);
  need(e.source_binding.commit===metadata.source_release.commit,'fixed source pin');
  const jsonPath=e.url.replace('index.html','card.json'),b=fs.readFileSync(path.join(selected,jsonPath)),c=JSON.parse(b),original=e.derived_files.find(f=>f.path===jsonPath);need(sha(b)===original.sha256,'immutable public Card JSON '+jsonPath);
  same([c.accepted_content_sha256,c.accepted_guide_sha256,c.approved_commit],[e.body_sha256,e.guide_sha256,e.approved_commit],'exact exposition binding');
  for(const f of v.derived_files){const b=fs.readFileSync(path.join(selected,safe(f.path)));need(b.length===f.bytes&&sha(b)===f.sha256,'public derived file '+f.path);}
 }
 need(revision.R15_adopted_content_sha256==='936294cbca18b24420eace805432491fc8ac9c46c1cf5712a079fa4514306de6','R15 selected corrected export');
 need(selection.files.filter(r=>r.path.endsWith('.pdf')).length===382,'221 current and161 inherited PDFs');
 return {metadata,selection,revision,selected,metadata_sha256:sha(fs.readFileSync(path.join(dir,'metadata.json'))),selection_sha256:sha(fs.readFileSync(path.join(dir,'selection.json')))};
}
export function validateLFH188Act(act,identity,deployment,today){
 const v=verifyLFH188Selection(),m=v.metadata;
 need(act?.schema==='exact.owner-postpublic-update-act.v8'&&act.owner==='Ryotaro Tanaka'&&act.authorized===true&&act.authorization_state==='OWNER_AUTHORIZED_FOR_EXACT_UPDATE'&&act.update_kind===batch,'explicit current exact owner act');
 same([act.new_commit,act.new_tree],[identity.commit,identity.tree],'exact successor commit/tree');same([act.old_commit,act.old_tree],[m.old_commit,m.old_tree],'public parent');
 same([deployment.origin,deployment.public_repository,deployment.base,deployment.deployment_profile],[m.canonical_origin,m.public_repository,'/','ROOT'],'public root deployment');
 same([act.public_repository,act.canonical_origin],[m.public_repository,m.canonical_origin],'act deployment');
 need(/^\d{4}-\d{2}-\d{2}$/.test(today)&&act.update_date_asia_tokyo===today&&m.publication_date===today,'actual Asia/Tokyo publication date');
 for(const key of ['owner_instruction_sha256','dispatch_sha256','HP_acceptance_sha256','conditional_resolution_sha256','accepted_candidate_commit','accepted_candidate_subtree','accepted_revision_entries_digest','accepted_input_set_sha256','revision_set_sha256','content_terms_sha256'])same(act[key],m[key],'exact authority/selection '+key);
 same([act.metadata_sha256,act.selection_sha256],[v.metadata_sha256,v.selection_sha256],'bound full public set');same(act.counts,m.counts,'scope');same(act.source_release,m.source_release,'source');need(act.public_cards===188&&!act.formal_CURRENT_changed&&!act.new_native_registration,'publication only');
 need(git('rev-parse','HEAD^')==='64d5e2c28dcb32e3cb9334d7abb413da135a0213'&&git('rev-parse','HEAD^^')===m.old_commit&&git('rev-parse',m.old_commit+'^{tree}')===m.old_tree,'ordinary two-commit public successor preserving prepublication checkpoint');need(git('rev-list','--merges',m.old_commit+'..HEAD')==='','no private-history merge');
 const manifest=prefix+'/source-files.json',bytes=fs.readFileSync(path.join(root,manifest)),rows=JSON.parse(bytes);need(sha(bytes)===act.source_files_sha256&&rows.length===act.source_file_count,'exact public source manifest');
 same(git('diff','--name-only',m.old_commit,'HEAD').split('\n').filter(Boolean).sort(),[manifest,...rows.map(r=>r.path)].sort(),'exact source allowlist');need(git('diff','--diff-filter=D','--name-only',m.old_commit,'HEAD')==='','no deletion');
 for(const r of rows){safe(r.path);need(['.gitignore','.gitattributes','astro.config.mjs','scripts/postpublic-gate.mjs','scripts/lfh188-public-adapter.mjs','scripts/stage-assets.mjs'].includes(r.path)||r.path.startsWith(prefix+'/'),'bounded HP mounting');const b=fs.readFileSync(path.join(root,r.path));need(b.length===r.bytes&&sha(b)===r.sha256,'source bytes '+r.path);}
 need(git('diff','--name-only',m.old_commit,'HEAD','--','.github','public','package.json','package-lock.json','publication/content-terms-public-effective.md')==='','workflow, locks, terms and existing public assets protected');
 return act;
}
export function integrateLFH188(output,base){
 const {selection,selected}=verifyLFH188Selection();
 for(const row of [...selection.files.filter(r=>!r.path.endsWith('.html')),...selection.files.filter(r=>r.path.endsWith('.html'))]){let b=fs.readFileSync(path.join(selected,row.path));if(base!=='/'&&row.path.endsWith('.html'))b=Buffer.from(publicHTML(b.toString(),base,output));const p=path.join(output,row.path);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,b);}
 if(base!=='/')for(const n of ['robots.txt','sitemap.xml']){const p=path.join(output,n);fs.writeFileSync(p,fs.readFileSync(p,'utf8').replaceAll('https://exactmathematics.org/','https://exactmathematics.org'+base).replaceAll('Disallow: /','Disallow: '+base));}
 console.log('PASS_LFH188_FIXED_PUBLIC_MOUNT',selection.files.length,base);
}
export function finishLFH188Output(output,deployment,profile,release){
 const v=verifyLFH188Selection(),identity=gitIdentity(profile),p=path.join(output,'release-state.json'),state=read(p);
 Object.assign(state,{site_commit:identity.commit,site_tree:identity.tree,public_parent_commit:v.metadata.old_commit,profile,base:deployment.base,deployment_profile:deployment.deployment_profile,public_repository:deployment.public_repository,publication_state:release?'AUTHORIZED_POSTPUBLIC_UPDATE':'LOCAL_INDEXABLE_QUALIFICATION',indexing:release?'PUBLIC_INDEXABLE':'LOCAL_INDEXABLE_QUALIFICATION',selection_sha256:v.selection_sha256,metadata_sha256:v.metadata_sha256});fs.writeFileSync(p,JSON.stringify(state,null,2)+'\n');
}
