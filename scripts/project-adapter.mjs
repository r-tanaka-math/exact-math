// RC5 website-owned adapter. The Workbench input directory is immutable evidence.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {isDeepStrictEqual} from 'node:util';
import postcss from 'postcss';
import {digest,files} from './distribution-policy.mjs';
import {publicWording} from './deployment-identity.mjs';
import {integratePostPublic} from './postpublic-adapter.mjs';

const repo=fileURLToPath(new URL('../',import.meta.url));
const input=path.join(repo,'publication','workbench','input');
const lockPath=path.join(repo,'publication','workbench','adapter-lock.json');
const successorRoot=path.join(repo,'publication','workbench','public-presentation');
const exact={tag:'v0.2.0',commit:'30963f26ac8ffa3dc3e9ec9de91fd0f9daf05305',tree:'b3378851a5287f5e3c8418f668e4d0ba52718739',repository:'https://github.com/r-tanaka-math/mathlib-annex'};
const expectedZip='b2d134860439de5547cd1678d5c9c68f57d6fc8ad6a1193a19afd309c756b4cc';
const expectedManifests={inner:'2c187976d6745b3ad20a8dc2679fbe2d1cfb6683ec74d6ee4cff327dc862ebcd',route:'b062fdb95dd569e87cd221752fad8c3b2e286d264fecbc09316ba0da8f94c77b',sphere:'bc61667f9afd4898a8c76f0e0874fd60048fa79b2ea7df1f861e899a26890d77',mankiewicz:'e0901857fdc2c9c0ec605b0c74db3824797f015a9ae8a08b452b3da1106a84a5'};
const fail=(message)=>{throw Error('RC5 adapter: '+message)};
const read=(p)=>JSON.parse(fs.readFileSync(p,'utf8'));
const sourceEq=(s)=>Object.entries(exact).every(([k,v])=>s?.[k]===v);

export function safeRelative(rel){
  if(typeof rel!=='string'||!rel||!rel.split('/').every(x=>/^[A-Za-z0-9_.-]+$/.test(x)&&x!=='.'&&x!=='..')||rel.includes('\\')||path.isAbsolute(rel))fail('unsafe path: '+rel);
  return rel;
}
export function validateCardPolicy(project){
  const rows=project.nodes||project.cards;
  if(!Array.isArray(rows))fail('missing declaration/Card rows');
  for(const row of rows){
    if(row.card_resolution==='PUBLIC'){
      if(!/^\/mathlibannex\/cards\/[a-f0-9]{64}\/$/.test(row.canonical_card_link||''))fail('PUBLIC Card URL invalid');
    }else if(row.canonical_card_link!==null)fail('non-PUBLIC Card link');
  }
  return {rows:rows.length,public:rows.filter(x=>x.card_resolution==='PUBLIC').length,canonical_links:rows.filter(x=>x.canonical_card_link!==null).length};
}
export function verifyCurrentSource(data=read(path.join(repo,'src','data','mathlibannex-release.json'))){
  if(!sourceEq(data)||data.status!=='MATHLIBANNEX_V0_2_0_SOURCE_PUBLISHED')fail('stale v0.1.0-only source release');
  return data;
}
export function verifyInputs(){
  const lock=read(lockPath);
  if(lock.schema!=='exact.website-qualified-workbench-adapter-lock.v1'||lock.transform!=='website-project-adapter.v1'||lock.outer_zip?.bytes!==95772025||lock.outer_zip?.sha256!==expectedZip||!sourceEq(lock.source))fail('outer handoff/source identity');
  if(lock.inner_manifest_sha256!==expectedManifests.inner||lock.route_manifest_sha256!==expectedManifests.route||lock.project_manifest_sha256?.['sphere-rigidity']!==expectedManifests.sphere||lock.project_manifest_sha256?.mankiewicz!==expectedManifests.mankiewicz)fail('manifest identity');
  if(JSON.stringify(lock.base_profiles)!==JSON.stringify(['/','/exact-mathematics/']))fail('base profile identity');
  const expected=new Map();const folded=new Set();
  for(const row of lock.files){const rel=safeRelative(row.path),key=rel.normalize('NFKC').toLowerCase();if(expected.has(rel)||folded.has(key))fail('duplicate/colliding input path');expected.set(rel,row);folded.add(key)}
  const actual=files(input).map(p=>path.relative(input,p).split(path.sep).join('/'));
  if(actual.length!==expected.size||actual.some(p=>!expected.has(p)))fail('unknown extra or missing input file');
  for(const [rel,pin] of expected){const b=fs.readFileSync(path.join(input,...rel.split('/')));if(b.length!==pin.bytes||digest(b)!==pin.sha256)fail('changed input bytes: '+rel)}
  const by=(rel)=>fs.readFileSync(path.join(input,...rel.split('/')));
  if(digest(by('MANIFEST.json'))!==expectedManifests.inner||digest(by('EXPORT/WEBSITE_ROUTE_MANIFEST.json'))!==expectedManifests.route||digest(by('PROJECTS/sphere-rigidity/LFH_PROJECT_MANIFEST.json'))!==expectedManifests.sphere||digest(by('PROJECTS/mankiewicz/LFH_PROJECT_MANIFEST.json'))!==expectedManifests.mankiewicz)fail('changed authority manifest');
  const routes=read(path.join(input,'EXPORT','WEBSITE_ROUTE_MANIFEST.json'));
  const expectedRoutes={'sphere-rigidity':'/mathlibannex/projects/sphere-rigidity/','mankiewicz':'/mathlibannex/projects/mankiewicz/'};
  if(routes.schema!=='exact-mathematics.website-route-manifest.v1'||routes.routes?.length!==2||routes.source_release?.tag!==exact.tag||routes.source_release?.commit!==exact.commit)fail('route manifest');
  for(const route of routes.routes){if(expectedRoutes[route.project]!==route.path||route.local_file!==`site/projects/${route.project}/index.html`)fail('route path/collision');}
  const projects={};
  for(const slug of Object.keys(expectedRoutes)){
    const p=read(path.join(input,'PROJECTS',slug,'project.json'));
    const exportJson=read(path.join(input,'EXPORT','json',`${slug}-project-r1.json`));
    const manifest=read(path.join(input,'PROJECTS',slug,'LFH_PROJECT_MANIFEST.json'));
    if(JSON.stringify(p)!==JSON.stringify(exportJson)||!sourceEq(p.source_binding)||!sourceEq(manifest.source_binding)||p.identity?.slug!==slug||manifest.identity?.slug!==slug)fail('Project source or export identity: '+slug);
    const cards=validateCardPolicy(p);if(cards.public||cards.canonical_links)fail('current input must have zero public Cards');
    projects[slug]={data:p,manifest,cards};
  }
  const sphere=projects['sphere-rigidity'].data;
  if(sphere.nodes.length!==467||sphere.graph?.reachability_pairs!==10423||sphere.graph?.display_edges!==773||sphere.graph?.maximum_level!==27||projects.mankiewicz.cards.rows!==11)fail('Project count');
  if(JSON.stringify(projects.mankiewicz.data.cards)!==JSON.stringify(read(path.join(input,'PROJECTS','mankiewicz','cards.json')).cards))fail('accepted Card records changed');
  verifyCurrentSource();
  return {lock,routes,projects};
}

export function verifyPublicPresentationSuccessor(){
  const slots=read(path.join(repo,'publication','workbench-input-slots.json'));
  const slot=slots.slots.find(row=>row.id==='NEUTRAL_WORKBENCH_PUBLIC_PRESENTATION_SUCCESSOR');
  const lock=read(lockPath).public_presentation_successor;
  if(slot?.state!=='SUPPLIED_QUALIFIED_WORKBENCH'||slot.manifest!=='publication/workbench/public-presentation/WEBSITE_ROUTE_MANIFEST.json'||!lock)fail('neutral Workbench public-presentation successor required');
  const manifestPath=path.join(successorRoot,'WEBSITE_ROUTE_MANIFEST.json');
  if(!fs.existsSync(manifestPath)||digest(fs.readFileSync(manifestPath))!==slot.manifest_sha256||slot.manifest_sha256!==lock.route_manifest.sha256||fs.statSync(manifestPath).size!==lock.route_manifest.bytes)fail('successor route manifest identity');
  const manifest=read(manifestPath);
  if(manifest.schema!=='exact-mathematics.website-route-manifest.v2'||manifest.presentation_profile!=='PROJECT_PUBLIC_PRESENTATION_R1'||manifest.public_cards!==0||manifest.canonical_card_links!==0||manifest.source_release?.commit!==exact.commit||manifest.source_release?.tree!==exact.tree||manifest.routes?.length!==2)fail('successor qualification/source state');
  if(lock.presentation_profile!==manifest.presentation_profile||lock.outer_zip?.sha256!=='6cc9215b87fc928b9bd1aa6266b09fc1b020cdd1cfed599b4cea187f134b805d'||lock.outer_zip?.bytes!==117280784||lock.return_manifest_sha256!==
    '47ce5194e9d6bf0194fdb3b7b13038a31a57b22c9263ed703d2db581127b6121')fail('successor return identity');
  if(!isDeepStrictEqual(manifest.files,lock.selected_files)||!isDeepStrictEqual(manifest.files,slot.selected_files)||manifest.files.length!==20)fail('selected inventory identity');
  const seen=new Set();
  for(const row of manifest.files){
    const rel=safeRelative(row.path),key=rel.normalize('NFKC').toLowerCase();
    if(seen.has(key))fail('selected file collision');seen.add(key);
    const file=path.join(successorRoot,'WEB',...rel.split('/'));
    if(!fs.existsSync(file)||!fs.statSync(file).isFile())fail('missing successor file');
    const bytes=fs.readFileSync(file);
    if(bytes.length!==row.bytes||digest(bytes)!==row.sha256)fail('changed successor bytes: '+rel);
    if(rel.endsWith('.pdf')&&!bytes.subarray(0,5).equals(Buffer.from('%PDF-')))fail('invalid successor PDF');
  }
  for(const route of manifest.routes){
    if(!['sphere-rigidity','mankiewicz'].includes(route.project)||route.path!==`/mathlibannex/projects/${route.project}/`||route.local_file!==`WEB/mathlibannex/projects/${route.project}/index.html`)fail('successor route');
  }
  const actual=files(successorRoot).map(p=>path.relative(successorRoot,p).split(path.sep).join('/')).sort();
  if(JSON.stringify(actual)!==JSON.stringify(['WEBSITE_ROUTE_MANIFEST.json',...manifest.files.map(x=>'WEB/'+x.path)].sort()))fail('unselected successor file');
  return {manifest,manifest_sha256:slot.manifest_sha256,root:path.join(successorRoot,'WEB'),binding:lock};
}

function scopedCss(original){
  const css=postcss.parse(original);
  css.walkRules(rule=>{rule.selectors=rule.selectors.map(s=>{
    const normalized=s.replace(/:root|\b(?:html|body|main)\b/g,'.wb-project');
    return normalized.startsWith('.wb-project')?normalized:`.wb-project ${normalized}`;
  });});
  return css.toString();
}
function outputFile(root,rel,bytes){
  safeRelative(rel);const dst=path.join(root,...rel.split('/'));
  if(fs.existsSync(dst))fail('output route collision: '+rel);
  fs.mkdirSync(path.dirname(dst),{recursive:true});fs.writeFileSync(dst,bytes);
  return {path:rel,bytes:Buffer.byteLength(bytes),sha256:digest(bytes)};
}
function integrateNeutral(output,base,profile,lock,projects,successor){
  const mounted=[];
  const source=rel=>fs.readFileSync(path.join(successor.root,...safeRelative(rel).split('/')));
  // The selected bytes stay unchanged in publication/workbench/public-presentation.
  // The website owns its route shell, CSP, canonical metadata and scoped styling.
  for(const row of successor.manifest.files){
    if(row.path.endsWith('/index.html'))continue;
    mounted.push(outputFile(output,row.path,source(row.path)));
  }
  const assetsRoot='mathlibannex/projects/assets/';
  const css=source('mathlibannex/assets/project-presentation-r1/style.css').toString('utf8');
  mounted.push(outputFile(output,assetsRoot+'project.css',scopedCss(css)));
  const originalJs=source('mathlibannex/assets/project-presentation-r1/project.js').toString('utf8');
  const adaptedJs=`(async()=>{const host=document.querySelector('.wb-project[data-project-data]');if(!host)return;const response=await fetch(host.dataset.projectData,{credentials:'same-origin'});if(!response.ok)throw Error('Project data unavailable');window.PROJECT_DATA=await response.json();${originalJs}\n})();\n`;
  mounted.push(outputFile(output,assetsRoot+'project.js',adaptedJs));
  for(const routeInfo of successor.manifest.routes){
    const slug=routeInfo.project,route=`mathlibannex/projects/${slug}/`;
    const original=source(`mathlibannex/projects/${slug}/index.html`).toString('utf8');
    const inner=/<main>([\s\S]*?)<\/main>/.exec(original)?.[1];
    const title=/<title>([\s\S]*?)<\/title>/.exec(original)?.[1];
    if(!inner||!title)fail('unexpected successor HTML shell: '+slug);
    const inline=[...original.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(Boolean);
    if(slug==='sphere-rigidity'){
      if(inline.length!==1||!inline[0].startsWith('window.PROJECT_DATA=')||!inline[0].endsWith(';'))fail('unexpected Sphere data script');
      const data=JSON.parse(inline[0].slice('window.PROJECT_DATA='.length,-1));
      if(data.nodes?.length!==467||!isDeepStrictEqual(data.nodes,projects[slug].data.nodes))fail('Sphere source node mismatch');
      mounted.push(outputFile(output,route+'project-data.json',JSON.stringify(data)+'\n'));
    }else if(inline.length)fail('unexpected Mankiewicz inline script');
    const jsonRel=routeInfo.json.replace(/^\//,'');
    const pdfRel=routeInfo.pdf.replace(/^\//,'');
    mounted.push(outputFile(output,route+'project.json',source(jsonRel)));
    const target=path.join(output,...(route+'index.html').split('/'));
    if(!fs.existsSync(target))fail('missing website route shell: '+route);
    let shell=fs.readFileSync(target,'utf8');
    const main=/<main id="main"[^>]*>[\s\S]*?<\/main>/;
    if(!main.test(shell))fail('website main missing');
    const projectContext=slug==='sphere-rigidity'?`<a href="${base}research/sphere-rigidity/">Sphere Rigidity research</a>`:'<span>Mankiewicz Theorem Project</span>';
    const wrapper=`<div class="container wb-frame"><nav aria-label="Project context"><a href="${base}mathlibannex/">MathlibAnnex</a> · ${projectContext}</nav><p class="wb-status">This Project view is available with the MathlibAnnex v0.2.0 source. Public Declaration Cards: 0. Mathematical review scope is recorded in the Project.</p><p class="wb-downloads"><a href="${base+pdfRel}">Read PDF</a> · <a href="${base+jsonRel}">Project JSON</a> · <a href="${base}mathlibannex/data/project-presentation-r1/${slug}/presentation-binding.json">Presentation binding</a></p><div class="wb-project"${slug==='sphere-rigidity'?` data-project-data="${base+route}project-data.json"`:''}>${inner}</div><p class="wb-feedback"><a href="${base}corrections/?project=${encodeURIComponent(slug)}&locator=${encodeURIComponent('/'+route)}">Corrections and prior-art feedback</a></p></div>`;
    shell=shell.replace(main,`<main id="main" tabindex="-1">${wrapper}</main>`)
      .replace('</head>',`<link rel="stylesheet" href="${base+assetsRoot}project.css"></head>`)
      .replace(/<title>[\s\S]*?<\/title>/,`<title>${title} — Exact Mathematics with AI</title>`);
    if(slug==='sphere-rigidity')shell=shell.replace('</body>',`<script src="${base+assetsRoot}project.js" defer></script></body>`);
    fs.writeFileSync(target,shell);
    mounted.push({path:route+'index.html',bytes:Buffer.byteLength(shell),sha256:digest(shell),preserved_main_sha256:digest(Buffer.from(inner)),selected_html_sha256:successor.manifest.files.find(x=>x.path===route+'index.html').sha256});
  }
  fs.writeFileSync(path.join(output,'WORKBENCH_ADAPTER.json'),JSON.stringify({schema:'exact.website-qualified-workbench-adapter.v2',transform:'website-neutral-presentation-adapter.v1',base,profile,outer_zip:lock.outer_zip,inner_manifest_sha256:lock.inner_manifest_sha256,route_manifest_sha256:lock.route_manifest_sha256,project_manifest_sha256:lock.project_manifest_sha256,public_presentation_successor:successor.binding,source:lock.source,counts:lock.expected,inputs:lock.files,mounted,site_commit:process.env.EXACT_SITE_REVISION||'LOCAL_REVIEW',site_tree:process.env.EXACT_SITE_TREE||'LOCAL_REVIEW'},null,2)+'\n');
  console.log('PASS_RC6_NEUTRAL_WORKBENCH_ADAPTER '+base);
}
export function integrateProjects(output,base,profile='LOCAL_REVIEW'){
  if(!['/','/exact-mathematics/'].includes(base))fail('unsupported base profile');
  const publicProfile=['FULL_LAUNCH','PUBLIC_RELEASE_QUALIFICATION'].includes(profile);
  if(publicProfile){
    // The old zero-Card successor remains historical input, never the selected mount.
    const successor=verifyPublicPresentationSuccessor(),lock=read(lockPath),projects={};
    for(const slug of ['sphere-rigidity','mankiewicz']){
      const data=read(path.join(successor.root,'mathlibannex','data','project-presentation-r1',slug,'project.json'));
      const cards=validateCardPolicy(data);
      if(cards.public!==0||cards.canonical_links!==0||cards.rows!==(slug==='sphere-rigidity'?467:11))fail('historical presentation changed');
      projects[slug]={data,cards};
    }
    integrateNeutral(output,base,profile,lock,projects,successor);
    return integratePostPublic(output,base,profile);
  }
  const {lock,projects}=verifyInputs(),mounted=[];
  const raw=(rel)=>fs.readFileSync(path.join(input,...rel.split('/')));
  const successor=null;
  const presentation=(rel)=>successor?fs.readFileSync(path.join(successor.root,...rel.split('/'))):raw('EXPORT/'+rel);
  const assetsRoot='mathlibannex/projects/assets/';
  mounted.push(outputFile(output,assetsRoot+'project.css',scopedCss(raw('EXPORT/site/assets/style.css').toString('utf8'))));
  const originalJs=raw('EXPORT/site/assets/project.js').toString('utf8');
  const adaptedJs=`(async()=>{const host=document.querySelector('.wb-project[data-project-data]');if(!host)return;const response=await fetch(host.dataset.projectData,{credentials:'same-origin'});if(!response.ok)throw Error('Project data unavailable');window.PROJECT_DATA=await response.json();${originalJs}\n})();\n`;
  mounted.push(outputFile(output,assetsRoot+'project.js',adaptedJs));
  for(const [slug,view] of Object.entries(projects)){
    const route=`mathlibannex/projects/${slug}/`;
    const original=presentation(`site/projects/${slug}/index.html`).toString('utf8');
    const inner=/<main>([\s\S]*?)<\/main>/.exec(original)?.[1];
    const title=/<title>([\s\S]*?)<\/title>/.exec(original)?.[1];
    if(!inner||!title||/<script\b/i.test(inner))fail('unexpected Workbench HTML shell');
    const inline=[...original.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(Boolean);
    if(slug==='sphere-rigidity'){
      if(inline.length!==1||!inline[0].startsWith('window.PROJECT_DATA=')||!inline[0].endsWith(';'))fail('unexpected Sphere data script');
      const data=JSON.parse(inline[0].slice('window.PROJECT_DATA='.length,-1));
      if(data.nodes?.length!==467||!isDeepStrictEqual(data.nodes,view.data.nodes))fail('Sphere node data mismatch');
      mounted.push(outputFile(output,route+'project-data.json',JSON.stringify(data)+'\n'));
    }else if(inline.length)fail('unexpected Mankiewicz executable script');
    const pdf=slug==='sphere-rigidity'?'sphere-rigidity-progressive-research-companion-r1.pdf':'mankiewicz-actual-source-bound-profile-r1.pdf';
    mounted.push(outputFile(output,route+pdf,presentation('pdf/'+pdf)));
    mounted.push(outputFile(output,route+'project.json',successor?presentation(`json/${slug}-project-r1.json`):raw(`EXPORT/json/${slug}-project-r1.json`)));
    mounted.push(outputFile(output,route+'LFH_PROJECT_MANIFEST.json',raw(`PROJECTS/${slug}/LFH_PROJECT_MANIFEST.json`)));
    const target=path.join(output,...(route+'index.html').split('/'));
    if(!fs.existsSync(target))fail('missing website route shell: '+route);
    let shell=fs.readFileSync(target,'utf8');
    const main=/<main id="main"[^>]*>[\s\S]*?<\/main>/;
    if(!main.test(shell))fail('website main missing');
    const prefix=base+route;
    const projectContext=slug==='sphere-rigidity'?`<a href="${base}research/sphere-rigidity/">Sphere Rigidity research</a>`:'<span>Mankiewicz Theorem Project</span>';
    const status=publicWording(profile)?'This Project view is available with the MathlibAnnex v0.2.0 source. Public Declaration Cards: 0. The mathematical review scope is recorded in the Project.':'Local integrated review. The MathlibAnnex v0.2.0 source is public; this website, Project view and Cards are not published.';
    const wrapper=`<div class="container wb-frame"><nav aria-label="Project context"><a href="${base}mathlibannex/">MathlibAnnex</a> · ${projectContext}</nav><p class="wb-status">${status}</p><p class="wb-downloads"><a href="${prefix+pdf}">Read PDF</a> · <a href="${prefix}project.json">Project JSON</a> · <a href="${prefix}LFH_PROJECT_MANIFEST.json">LFH Project Manifest</a></p><div class="wb-project"${slug==='sphere-rigidity'?` data-project-data="${prefix}project-data.json"`:''}>${inner}</div><p class="wb-feedback"><a href="${base}corrections/?project=${encodeURIComponent(slug)}&locator=${encodeURIComponent('/'+route)}">Corrections and prior-art feedback</a></p></div>`;
    shell=shell.replace(main,`<main id="main" tabindex="-1">${wrapper}</main>`)
      .replace('</head>',`<link rel="stylesheet" href="${base+assetsRoot}project.css"></head>`)
      .replace(/<title>[\s\S]*?<\/title>/,`<title>${title} — Exact Mathematics with AI</title>`);
    if(slug==='sphere-rigidity')shell=shell.replace('</body>',`<script src="${base+assetsRoot}project.js" defer></script></body>`);
    if(!shell.includes(inner))fail('mathematical HTML changed');
    fs.writeFileSync(target,shell);
    mounted.push({path:route+'index.html',bytes:Buffer.byteLength(shell),sha256:digest(shell),preserved_main_sha256:digest(Buffer.from(inner))});
  }
  fs.writeFileSync(path.join(output,'WORKBENCH_ADAPTER.json'),JSON.stringify({schema:'exact.website-qualified-workbench-adapter.v1',transform:lock.transform,base,profile,outer_zip:lock.outer_zip,inner_manifest_sha256:lock.inner_manifest_sha256,route_manifest_sha256:lock.route_manifest_sha256,project_manifest_sha256:lock.project_manifest_sha256,source:lock.source,counts:lock.expected,inputs:lock.files,mounted,qualification_receipts:lock.files.filter(x=>x.path.startsWith('QUALIFICATION/')),site_commit:process.env.EXACT_SITE_REVISION||'LOCAL_REVIEW',site_tree:process.env.EXACT_SITE_TREE||'LOCAL_REVIEW'},null,2)+'\n');
  console.log('PASS_RC5_QUALIFIED_WORKBENCH_ADAPTER '+base);
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{verifyInputs();console.log('PASS_RC5_ADAPTER_INPUTS');}catch(e){console.error(e.message);process.exitCode=1}
}
