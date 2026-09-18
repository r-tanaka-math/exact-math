// Website-owned mount for the byte-pinned Project Reader Experience Restoration R1.
// The Workbench <main> is copied verbatim; only hosting links and frame are added.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const repo=fileURLToPath(new URL('../',import.meta.url));
const source=path.join(repo,'publication','workbench','reader-restoration-r1');
const lock=JSON.parse(fs.readFileSync(path.join(repo,'publication','project-reader','integration-lock.json'),'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const fail=s=>{throw Error('Reader restoration adapter: '+s)};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const safe=p=>{
  if(typeof p!=='string'||!p||p.includes('\\')||!p.split('/').every(x=>/^[A-Za-z0-9_.-]+$/.test(x)&&x!=='.'&&x!=='..'))fail('unsafe path '+p);
  return p;
};
const allFiles=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?allFiles(path.join(dir,e.name)):e.isFile()?[path.join(dir,e.name)]:fail('special selected input'));
const selected=rel=>fs.readFileSync(path.join(source,...safe(rel).split('/')));

export function verifyReaderSelection(){
  if(lock.schema!=='exact.site.project-reader-integration-lock.v1'||lock.workbench_return_sha256!=='19cc11eb56760753b484e5beaf3dbc1bfadaff4b765f3b3ae5dbf32884267250'||lock.website_ia_return_sha256!=='f4335f54cf9090173cf3c9ef408fb85d523e11dac1bcf1798c9c992b44b60465')fail('outer Return identity');
  for(const [name,key] of [['MANIFEST.json','workbench_manifest_sha256'],['ROUTE_MANIFEST.json','route_manifest_sha256'],['PRESENTATION_BINDING.json','presentation_binding_sha256']])if(sha(selected(name))!==lock[key])fail(name+' identity');
  const manifest=read(path.join(source,'MANIFEST.json'));
  if(manifest.expected_token!=='PASS_MATHLIBANNEX_PROJECT_READER_EXPERIENCE_RESTORATION_RETURN_R1'||manifest.files?.length!==46)fail('Workbench manifest');
  const expected=new Set(['MANIFEST.json']);
  for(const row of manifest.files){const rel=safe(row.path),bytes=selected(rel);if(expected.has(rel)||bytes.length!==row.bytes||sha(bytes)!==row.sha256)fail('selected file '+rel);expected.add(rel)}
  const actual=allFiles(source).map(p=>path.relative(source,p).split(path.sep).join('/'));
  if(actual.length!==expected.size||actual.some(p=>!expected.has(p)))fail('selected inventory');
  const routes=read(path.join(source,'ROUTE_MANIFEST.json'));
  const binding=read(path.join(source,'PRESENTATION_BINDING.json'));
  if(routes.schema!=='mathlibannex.project-route-manifest.restoration-r1'||binding.schema!=='mathlibannex.project-presentation-binding.restoration-r1'||binding.source_release?.commit!==lock.source_release_commit||binding.source_release?.tree!==lock.source_release_tree)fail('source or presentation binding');
  for(const [slug,count] of Object.entries(lock.projects)){
    const route=routes.routes?.[slug],project=binding.projects?.[slug];
    if(!route||!project||route.node_count!==count.tiles||route.level_count!==count.levels||route.canonical_card_actions!==count.public_cards||route.exact_source_actions!==count.source_actions)fail('route semantics '+slug);
    for(const [file,identity] of Object.entries(route.file_identity)){
      const bytes=selected(`projects/${slug}/${file}`);
      if(bytes.length!==identity.bytes||sha(bytes)!==identity.sha256)fail('Project identity '+slug+'/'+file);
    }
  }
  const r1File=path.join(repo,'publication','project-reader','r1-public-artifacts.json');
  if(sha(fs.readFileSync(r1File))!==lock.r1_public_artifacts_sha256)fail('R1 artifact ledger identity');
  return {routes,binding};
}

function verifyR1Artifacts(output){
  const ledger=read(path.join(repo,'publication','project-reader','r1-public-artifacts.json'));
  if(ledger.baseline_commit!==lock.live_parent_commit||ledger.baseline_tree!==lock.live_parent_tree||ledger.files.length!==18)fail('R1 baseline ledger');
  for(const row of ledger.files){
    const bytes=fs.readFileSync(path.join(output,...safe(row.path).split('/')));
    if(bytes.length!==row.bytes||sha(bytes)!==row.sha256)fail('published R1 artifact changed '+row.path);
  }
  return ledger.files;
}

function writeNew(output,rel,bytes){
  const target=path.join(output,...safe(rel).split('/'));
  if(fs.existsSync(target))fail('versioned route collision '+rel);
  fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes);
  return {path:rel,bytes:bytes.length,sha256:sha(bytes)};
}

export function integrateReaderRestoration(output,base,adapter,frameRel,controlRel){
  const {routes}=verifyReaderSelection();
  const historical=verifyR1Artifacts(output);
  const versioned=lock.versioned_root;
  const mounted=[];
  const assets=['project.css','project.js','DejaVuSans.ttf','DejaVuSans-Bold.ttf','LICENSE.txt'];
  for(const name of assets)mounted.push(writeNew(output,`${versioned}/assets/${name}`,selected(`projects/assets/${name}`)));
  const mapping={schema:'exact.site.project-reader-route-mapping.v1',base,workbench_return_sha256:lock.workbench_return_sha256,website_ia_return_sha256:lock.website_ia_return_sha256,route_manifest_sha256:lock.route_manifest_sha256,presentation_binding_sha256:lock.presentation_binding_sha256,r1_ledger_sha256:lock.r1_public_artifacts_sha256,versioned_root:versioned,assets:[...mounted],preserved_r1_artifacts:historical,projects:{}};
  for(const [slug,count] of Object.entries(lock.projects)){
    const route=`mathlibannex/projects/${slug}/index.html`;
    const versionedProject=`${versioned}/projects/${slug}`;
    const pdf=writeNew(output,`${versionedProject}/project.pdf`,selected(`projects/${slug}/project.pdf`));
    const json=writeNew(output,`${versionedProject}/project.json`,selected(`projects/${slug}/project.json`));
    mounted.push(pdf,json);
    const original=selected(`projects/${slug}/index.html`).toString('utf8');
    const main=/<main id="main">[\s\S]*?<\/main>/.exec(original)?.[0];
    if(!main||original.includes('id="site-top"')||original.includes('data-exact-mounted'))fail('unexpected selected HTML '+slug);
    const cssRef='href="../assets/project.css"',jsRef='src="../assets/project.js"';
    if(original.split(cssRef).length!==2||original.split(jsRef).length!==2||original.split('href="project.pdf"').length!==2||original.split('href="project.json"').length!==2)fail('selected hosting links '+slug);
    let html=original.replace(cssRef,`href="${base}${versioned}/assets/project.css"`)
      .replace(jsRef,`src="${base}${versioned}/assets/project.js"`)
      .replace('href="project.pdf"',`href="${base}${pdf.path}"`)
      .replace('href="project.json"',`href="${base}${json.path}"`);
    const context=`<div class="exact-site-context"><a href="${base}">Exact Mathematics home</a> · <a href="${base}mathlibannex/">MathlibAnnex hub</a> · <a href="${base}mathlibannex/catalog/">Declaration Card Catalog</a> · <a href="${base}corrections/">Corrections</a></div>`;
    html=html.replace('</header>',`${context}</header>`)
      .replace('<body>','<body><div id="site-top" tabindex="-1"></div>')
      .replace('</head>',`<meta name="robots" content="noindex,follow"><meta name="description" content="${slug==='mankiewicz'?'Mankiewicz Extension Theorem':'Sphere Rigidity'} Project reader"><link rel="stylesheet" href="${base}${frameRel}"></head>`)
      .replace("base-uri 'none'","connect-src 'none'; object-src 'none'; base-uri 'none'")
      .replace('</body>',`<p class="exact-back"><a href="#site-top">Back to top</a></p><a class="back-to-top" data-exact-mounted href="#site-top" aria-label="Back to top" hidden><span aria-hidden="true">↑</span><span class="back-to-top-label">Back to top</span></a><script src="${base}${controlRel}" defer></script></body>`);
    if(!html.includes(main)||html.match(/data-exact-mounted/g)?.length!==1||html.match(/id="site-top"/g)?.length!==1)fail('Project main or site frame changed '+slug);
    const target=path.join(output,...route.split('/'));
    if(!fs.existsSync(target))fail('missing current Project route '+slug);
    fs.writeFileSync(target,html);
    const htmlRow={path:route,bytes:Buffer.byteLength(html),sha256:sha(Buffer.from(html)),accepted_html_sha256:routes.routes[slug].file_identity['index.html'].sha256,preserved_main_sha256:sha(Buffer.from(main)),reader_restoration:true};
    mounted.push(htmlRow);
    mapping.projects[slug]={current_html:route,selected_html_sha256:htmlRow.accepted_html_sha256,preserved_main_sha256:htmlRow.preserved_main_sha256,levels:count.levels,tiles:count.tiles,public_cards:count.public_cards,relation_links:count.relation_links,source_actions:count.source_actions,versioned_pdf:pdf,versioned_json:json};
  }
  adapter.mounted=adapter.mounted.filter(r=>!/^mathlibannex\/projects\/(mankiewicz|sphere-rigidity)\/index\.html$/.test(r.path)).concat(mounted);
  adapter.reader_restoration={outer_return_sha256:lock.workbench_return_sha256,route_manifest_sha256:lock.route_manifest_sha256,presentation_binding_sha256:lock.presentation_binding_sha256,versioned_root:versioned,projects:mapping.projects,r1_artifacts_verified:historical.length};
  verifyR1Artifacts(output);
  fs.writeFileSync(path.join(output,'PROJECT_READER_ROUTE_MAPPING.json'),JSON.stringify(mapping,null,2)+'\n');
  console.log(`PASS_PROJECT_READER_RESTORATION_ADAPTER ${base}`);
}
